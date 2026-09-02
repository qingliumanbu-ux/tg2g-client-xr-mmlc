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
  name: "MMSM82POP",
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
    // 变量定义
    const formName = "MMSM82POP";

    let formserve: string;
     formserve = "mmsm82bd_upd";

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);
    let gridView1!: any;
    let gridView1Api: any;
    let currentDate = "";
    let v_bunker_no:any;
    const editable = ref(false);
    const C_ORDERID = ref('');

    const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    const BUNKER_NO_ORIGINAL = parentInfo.value?.BUNKER_NO_ORIGINAL;
    const BUNKER_NO = parentInfo.value?.BUNKER_NO;
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
          nextTick(() => {
            erFormHelper.addModelToLayout("LayoutGroupFilter",true,false);
            erFormHelper.setLayoutItemContentBackColor("LayoutGroupFilter",["BUNKER_NO"], "rgb(213 213 213)");
           
            erFormHelper.setControlValue("LayoutGroupFilter", "BUNKER_NO", BUNKER_NO);
            
          });
        });
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
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO_ORIGINAL: BUNKER_NO_ORIGINAL,
          BUNKER_NO:BUNKER_NO
        },
        true
      );
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
      erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables0');
      const queryCondition =
      erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      inInfo.addBlock(queryCondition,'Tables1');
      v_bunker_no = inInfo.getBlock("Tables0").data[0]["BUNKER_NO"];
      console.log("BUNKER_NO",v_bunker_no);
      console.log("123321",inInfo) ;
      console.log("BUNKER_NO_ORIGINAL",BUNKER_NO_ORIGINAL) ;
      
      if(BUNKER_NO_ORIGINAL ==="1")
      {
         formserve = 'mmsm82bd_upd2';
      }
      if(BUNKER_NO_ORIGINAL ==="2")
        {
           formserve = 'mmsm82bd_upd2';
        }
      const outInfo = await erFormHelper.callService(
        formserve,
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("卸载料槽料篮失败:" + outInfo.sys.msg);
      } else {
        erFormHelper.messageSuccess("卸载料槽料篮成功");
        closeEfDialog();
      }
      queryMainGrid();
      nextTick(()=>{
        erFormHelper.setGridIndicator('gridView5',{BUNKER_NO:v_bunker_no});
      });

      
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
      closeEfDialog,
      efFormReady,
      erGrid1Ready,
    };
  },
});
