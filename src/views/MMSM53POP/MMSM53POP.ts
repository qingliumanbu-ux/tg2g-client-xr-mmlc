import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  toRaw,
  nextTick,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import { useRoute } from "vue-router";
import { DateStringCellEditor } from "@ag-grid-community/core";

export default defineComponent({
  name: "MMSM53POP",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  props: {
    openInDialog: {
      type: Boolean,
      default: false,
    },
    dialogFormName: {
      type: String,
      default: "",
    },
    parentInfo: {
      type: Object,
    },
  },
  // 向父画面传递数据-注册emit监听事件
  emits: ["getChildInfo"],
  setup: (props, { emit }) => {
    // 获取画面的分区信息及设置画面初始化service
    let formPartition: string;
    const initializeService = "";
    // 获取tab页组件的ref和实例
    const detailTabsRef = ref<any>(null);
    let now = new Date();
    // let year = now.getDate();
    // 变量定义
    const formName = "MMSM53POP";

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);
    let gridView1!: any;
    let gridView1Api: any;
    let currentDate = "";
    const editable = ref(false);

    const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    //物料代码
    const MAT_CODE = parentInfo.value?.MAT_CODE;
    const QUALITY_BATCH_NO = parentInfo.value?.QUALITY_BATCH_NO;
    const WEIGH_NO = parentInfo.value?.WEIGH_NO;
    const PROC_DIV = parentInfo.value?.PROC_DIV; //I新增新的，U调用最新的

    // 画面相关数据初始化
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        ""
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        nextTick(() => {
          handleEfDialogMessage();
          if (PROC_DIV === "U") {
            queryMainGrid();
          }
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    // 获取画面相关配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      gridView1 = erFormHelper.getGrid("gridView1");

      nextTick(() => {
        Initialize();
      });
    };
    const efFormInitialized = (formInfo: any) => {};
    const erGrid1Ready = (e: any) => {
      gridView1Api = e.api;
      erFormHelper.initialGridToolbar(
        "gridView1",
        {
          excel: { visible: true },
          addrow: {
            visible: false,
            action: () => {
              // 新增行自动填充熔炼号和生产处理号
              const mainGridCurrentRow =
                erFormHelper.getGridCurrentRow(gridView1);
              const gridData = erFormHelper.getGridAllRows("gridView1");
              const currentRow = gridData[gridData.length - 1]; // 新增行在最后一行
              const currentRowNode = gridView1Api.getRowNode(currentRow.uid);
              currentRowNode.setDataValue("MAT_CODE", MAT_CODE);
              currentRowNode.setDataValue("QUALITY_BATCH_NO", QUALITY_BATCH_NO);
            },
          },
        },
        {
          showIco: true,
          showText: true,
        }
      );
    };

    const handleEfDialogMessage = () => {
      erFormHelper.setControlValue("layoutControlGroup1", "MAT_CODE", MAT_CODE);
      erFormHelper.setControlValue("layoutControlGroup1", "WEIGH_NO", WEIGH_NO);
    };

    const queryMainGrid = async () => {
      const eiBlock1 = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup1"
      );
      eiBlock1.addColumn("CONN_QUALITY_BATCH_NO");
      eiBlock1.data[0]["CONN_QUALITY_BATCH_NO"] = "PRE";
      const eiInfo = new EI.EIInfo();
      eiInfo.addBlock(eiBlock1);
      if (
        eiBlock1.data[0]["MAT_CODE"]?.toString().trim() === "" &&
        eiBlock1.data[0]["QUALITY_BATCH_NO"]?.toString().trim() === ""
      ) {
        return;
      }
      const outInfo = await erFormHelper.callService(
        "mmsm81al_inq",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, "gridView1");
      }
    };
    onMounted(() => {});

    const F3_DO = async (e: any) => {
      erFormHelper.stopGridEditing("gridView1", async () => {
        const qmBatch = erFormHelper.getAllControlValueAsEiBlock(
          "layoutControlGroup1"
        );

        if (erFormHelper.getGridDataCount("gridView1") === 0) {
          erFormHelper.messageWarning("成分信息为空，请维护！");
          return;
        }
        if (qmBatch.data[0]["MAT_CODE"] === " ") {
          erFormHelper.messageWarning("物料代码为空，请录入！");
          return;
        }
        if (qmBatch.data[0]["ELE_TYPE"] === "") {
          erFormHelper.messageWarning("成分类型为空，请选择！");
          return;
        }
        const eiInfo = new EI.EIInfo();
        const eiBlock = eiInfo.addBlock(new EI.EiBlock());
        const layoutControlGroup1 = erFormHelper.getAllControlValue(
          "layoutControlGroup1"
        );
        const obj: any = {
          ...layoutControlGroup1,
          PROC_DIV: "I",
          QUALITY_BATCH_NO: qmBatch.data[0]["ELE_TYPE"] + currentDate,
        };
        eiBlock.pushData(obj, true);
        const para = erFormHelper.getGridAllRowsAsBlock("gridView1");
        eiInfo.addBlock(para, "QM_ELE");
        const outInfo = await erFormHelper.callService(
          "mmsm81ah_upd",
          eiInfo,
          true,
          false,
          true
        );

        // 判断调后台是否失败
        if (outInfo.sys.status < 0) {
          erFormHelper.messageWarning("保存错误:" + outInfo.sys.msg);
          return false;
        } else {
          erFormHelper.messageSuccess("保存成功");
          //同时录成分 不关闭弹窗
          closeEfDialog();
        }
      });
    };
    const F3_PRE_DO = async (e: any) => {
      editable.value = true;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      //设置grid可编辑
      erFormHelper.setGridEditable("gridView1", true);
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup1"
      );

      if (eiBlock.data[0]["QUALITY_BATCH_NO"] === "") {
        currentDate = getGurrentTime().substring(2, 14); // 创建一个新的Date对象表示当前日期和时间
        erFormHelper.setControlValue(
          "layoutControlGroup1",
          "QUALITY_BATCH_NO",
          currentDate
        );
      }
    };
    const F3_CANCEL = async (e: any) => {
      editable.value = false;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      //设置grid不可编辑
      erFormHelper.setGridEditable("gridView1", false);
      // 判断调后台是否失败
      erFormHelper.messageSuccess("保存成功");
      closeEfDialog();
    };
    const closeEfDialog = () => {
      const data = {
        QUALITY_BATCH_NO: currentDate,
        close: true,
      };
      emit("getChildInfo", data);
    };
    const getGurrentTime = () => {
      var day = new Date();
      let seconds = day.getSeconds();
      let strSeconds = " ";
      if (seconds < 10) {
        // 如果月份值小于10，则在前面加上0
        strSeconds = "0" + seconds.toString();
      } else {
        strSeconds = seconds.toString();
      }
      let minutes = day.getMinutes();
      let strMinutes = " ";
      if (minutes < 10) {
        strMinutes = "0" + minutes.toString();
      } else {
        strMinutes = minutes.toString();
      }
      let hours = day.getHours();
      let strHours = " ";
      if (hours < 10) {
        strHours = "0" + hours.toString();
      } else {
        strHours = hours.toString();
      }
      let month = day.getMonth() + 1;
      let strMonth = " ";
      if (month < 10) {
        strMonth = "0" + month.toString();
      } else {
        strMonth = month.toString();
      }
      let time =
        day.getFullYear().toString() +
        strMonth +
        day.getDate().toString() +
        strHours +
        strMinutes +
        strSeconds;
      return time;
    };
    return {
      erFormHelper,
      initializeFlag,
      gridToolbar,
      editable,
      // F3_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      efFormInitialized,
      closeEfDialog,
      efFormReady,
      erGrid1Ready,
    };
  },
});
