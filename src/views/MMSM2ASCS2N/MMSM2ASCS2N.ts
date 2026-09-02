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
  name: "MMSM2ASCS2N",
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
    const dialogVisible = ref(false);

    // 获取tab页组件的ref和实例
    const detailTabsRef = ref<any>(null);
    let now = new Date();
    // let year = now.getDate();
    // console.log("sw");
    // console.log(year);
    // 变量定义
    const formName = "MMSM2ASCS2N";

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);
    let gridView1!: any;
    let gridView1Api: any;
    let currentDate = "";
    const editable = ref(false);
    const C_ORDERID = ref('');

    const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    //物料代码
    // const MAT_CODE = parentInfo.value?.MAT_CODE;
    const BUNKER_NO_ORIGINAL = parentInfo.value?.BUNKER_NO_ORIGINAL;
    const BUNKER_NO = parentInfo.value?.BUNKER_NO;
    // const WEIGH_NO = parentInfo.value?.WEIGH_NO;
    // const PROC_DIV = parentInfo.value?.PROC_DIV;
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
        // 回调函数获取控件信息及设置定义事件等操作
        // setTimeout(() => {
        //   // 获取画面上的主要控件信息
        //   handleEfDialogMessage();
        //   if (PROC_DIV === "U") {
        //     queryMainGrid();
        //   }
        // }, 5);
        queryMainGrid();
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
      Initialize();
    };
    const efFormInitialized = (formInfo: any) => {
      nextTick(() => {
        Initialize();
      });
    };
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
              // const currentRow = gridData[gridData.length - 1]; // 新增行在最后一行
              // const currentRowNode = gridView1Api.getRowNode(currentRow.uid);
              // currentRowNode.setDataValue("MAT_CODE", MAT_CODE);
              // currentRowNode.setDataValue("QUALITY_BATCH_NO", QUALITY_BATCH_NO);
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
      // erFormHelper.setControlValue("layoutControlGroup1", "MAT_CODE", MAT_CODE);
      // erFormHelper.setControlValue(
      //   "layoutControlGroup1",
      //   "QUALITY_BATCH_NO",
      //   QUALITY_BATCH_NO
      // );
      // erFormHelper.setControlValue("layoutControlGroup1", "WEIGH_NO", WEIGH_NO);
    };

    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      // const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
      //   "layoutControlGroup1",
      //   {
      //     BUNKER_NO_ORIGINAL: BUNKER_NO_ORIGINAL,
      //     BUNKER_NO:BUNKER_NO
      //   }
      //   // ''
      // );
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO_ORIGINAL: BUNKER_NO_ORIGINAL,
          BUNKER_NO:BUNKER_NO
        },
        true
      );

      console.log("2223332123123",eiBlock);
      
      // eiInfo.addBlock(eiBlock);

      // if (
      //   eiBlock.data[0]["MAT_CODE"]?.toString() === "" &&
      //   eiBlock.data[0]["QUALITY_BATCH_NO"]?.toString() === ""
      // )
      //   return;

      const outInfo = await erFormHelper.callService(
        "mmsm82bd1_inq",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "gridView1");
      }
    };
    // onMounted(() => {
    //   Initialize();
    // });

    const F3_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(
        // erFormHelper.getGridSelectRowsAsBlock('GridView1')
        erFormHelper.getGridSelectRowsAsBlock('gridView1')

      );
      // const selectedRows = erFormHelper.getGridCurrentRow('gridView1',false);
      // C_ORDERID.value = <string>inInfo.getBlock(0).data[0]['C_ORDERID'];
      const outInfo = await erFormHelper.callService(
        "mmsm82bd_upd",
        inInfo,
        true,
        false,
        true
      );
      console.log('111111',outInfo);
      closeEfDialog();
    };
    const F2_PRE_DO = async (e: any) => {
      editable.value = true;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      //设置grid可编辑
      erFormHelper.setGridEditable("gridView1", true);
    };
    const F2_CANCEL = async (e: any) => {
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
    const F2_DO = async (e: any) => {
      queryMainGrid();
      // closeEfDialog();
    };

    // 主表焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      // if (!e.data) {
      //   erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
      //   return;
      // }
      if (e && e.rowChanged) {
        if (e.data) {
          // queryDetailInfo({
          //   QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
          // });
        }
      }
    };

        // 查询子表明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
          // 成分信息
          let outInfo1: EI.EIInfo;
          let outInfo2: EI.EIInfo;
          erFormHelper.clearGridData("gridView2"); // 清空子表数据
          const eiInfo1 = new EI.EIInfo();
    
          const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
          eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
    
          if (eiBlock1.data[0]["QUALITY_BATCH_NO"] !== "") {
            outInfo1 = await erFormHelper.callService(
              "mmsm81al_inq",
              eiInfo1,
              true,
              false,
              true
            );
    
          if (outInfo1.sys.status < 0) {
          erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
          } else {
            erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView2");
          }
        }
    
        // 计量单信息
        erFormHelper.clearGridData("gridView3"); // 清空子表数据
        const eiInfo2 = new EI.EIInfo();
        const eiBlock2 = eiInfo2.addBlock(new EI.EiBlock());
        eiBlock2.pushData({ ...currentRowInfo }, true);
    
        if (eiBlock2.data[0]["QUALITY_BATCH_NO"] !== "") {
          outInfo2 = await erFormHelper.callService(
          "mmsm81_inq",
          eiInfo2,
          true,
          false,
          true
         );
        if (outInfo2.sys.status < 0) {
          erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
        } else {
          erFormHelper.mergeDataToLayoutOrGrid(outInfo2, true, "gridView3");
        }
      }
    };

    const dbbutClick = async () => {
      // if (erFormHelper.getGridDataCount("gridView1") === 0) {
      //   erFormHelper.messageWarning("请选择一条信息再修改");
      //   return false;
      // }
      // //加载弹窗配置
      // cs_OkClick = "F4";
      // i_proc_div = "U";
      // popFreeEdit = new ER.PopFreeHelper(
      //   formPartition,
      //   "MMSM81VX_DIALOG",
      //   "MMSM81VX_DIALOG"
      // );
      // popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
      // ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };

    // 点击关闭按钮，绑定事件closeEfDialog
    // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名
    const closeEfDialog = () => {
      console.log("sw111111",C_ORDERID.value);
      const data = {
        C_ORDERID:C_ORDERID.value,
        // name: formName,
        close: true,
      };
      console.log("sw222222");
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
      dbbutClick,
      F3_DO,
      F2_DO,
      F2_PRE_DO,
      F2_CANCEL,
      efFormInitialized,
      GridView1FocusChanged,
      closeEfDialog,
      efFormReady,
      erGrid1Ready,
    };
  },
});
