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
import { Console } from "console";

export default defineComponent({
  name: "MMSM81BDS2N1",
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
    // 变量定义
    const formName = "MMSM81POP";

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);
    let gridView1!: any;
    let gridView1Api: any;
    let currentDate = "";
    const editable = ref(false);
    const C_ORDERID = ref('');
    const C_X_ITEM = ref('');

    const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    //物料代码
    const MAT_CODE = parentInfo.value?.MAT_CODE;
  
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
            },
          },
        },
        {
          showIco: true,
          showText: true,
        }
      );
    };

    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      const obj: any = {
        MAT_CODE:MAT_CODE,
      };
      eiBlock.pushData(obj, true);

      const outInfo = await erFormHelper.callService(
        "mmsm81bd1_inq",
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
  
    const F3_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(       
        erFormHelper.getGridSelectRowsAsBlock('gridView1')

      );
      C_ORDERID.value = <string>inInfo.getBlock(0).data[0]['C_ORDERID'];
     if(<string>inInfo.getBlock(0).data[0]['X_ITEM']?.toString().trim()==="")
      {
        C_X_ITEM.value = "001";
      }
      else
      {
        C_X_ITEM.value =<string>inInfo.getBlock(0).data[0]['X_ITEM'];
      }
      
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
    
    const GridView1FocusChanged = async (e: any) => {
    
      erFormHelper.checkGridCurrentRow("gridView1");
    };

    // 点击关闭按钮，绑定事件closeEfDialog
    // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名
    const closeEfDialog = () => {
      const data = {
        C_ORDERID:C_ORDERID.value,
        C_X_ITEM:C_X_ITEM.value,
        // name: formName,
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
