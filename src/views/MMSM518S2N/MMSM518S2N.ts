
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import xrEfSearchBox from "EFX/xrEfSearchBox";
import xrEfDialog from "EFX/xrEfDialog";
import EFUtility from "EFX/EFUtility";
import eBFR from "EFX/eBFR";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import MMSM81FG from "../MMSM81FG/MMSM81FG.vue";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
import { useRoute, useRouter } from "vue-router";
import { Console } from "console";

export default defineComponent({
  name: "MMSM81V",
  components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    MMSM50ADDS2N,
    MMSM81FG,
    erGrid,
    erLayout,
    ErPopFree,
    ErPopQuery,
  },
  setup: () => {
    const dialogFormName = ref(""); // 弹出画面的画面名
    const initializeService = "";
    const $router = useRouter();
    const gridToolbar: Ref<any[]> = ref([]);
    const detailTabsRef = ref<any>(null);
    const bunker = reactive(new Array());
    const erFormHelper: ER.FormHelper = new ER.FormHelper()
    const efFormInfo = ref<{ [key: string]: any }>({});
    let suoding = true;
    const initializeFlag = ref(0);
    // let gridView1!: kendo.ui.Grid;
    let gridView1: any;
    const editable = ref(false);
    const LayoutGroupFilter = ref("");
    const xrEfDialogRef = ref<any>(null);
    let S_MAT_CODE:any;
    const i_func_id_q = ref("");
    const i_func_id_p = ref("");
    // let i_func_id_p;
    let formPartition: string;
    let formName: string;
    // console.log("111",efFormInfo.value.formName);
    const parentInfo = ref({});
    const RETURN_BUNKER = ref("");
    const RETURN_NAME = ref("");
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      initializePage();
    }
   

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };

    //通过炼钢配置表，进行模板画面参数查询
    const queryMainGrid = async () => {
      if (!erFormHelper.checkRequiredInput("layoutControlGroup1")) {
        return false;
      }
      //清空grid数据

      // erFormHelper.clearGridData('gridView1');
      erFormHelper.clearLayoutOrGridData("gridView1");

      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup1");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService("mmsm81s_inq", eiInfo, true, true,true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
    };
    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => { };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        if(dialogFormName.value=="MMSM50ADDS2N")
        {
          console.log(info.MAT_CODE);
          erFormHelper.setControlValue("layoutControlGroup2","MAT_CODE",info.MAT_CODE);
          S_MAT_CODE = info.MAT_CODE;
          //erFormHelper.setControlValue("layoutControlGroup2","MAT_NAME",info.MAT_NAME);
        }
         else
         {
          RETURN_BUNKER.value = info.BUNKER_NO;
          erFormHelper.setControlValue("layoutControlGroup4","BUNKER_NO",info.BUNKER_NO);
          erFormHelper.setControlValue("layoutControlGroup4","BUNKER_NAME",info.BUNKER_NAME);
         }
        xrEfDialogClose();
      }
    };
   
    const initializePage = async () => {
      console.log("产线sql_mat_kind", 1111);
      // i_form_ename = EFFormInfo.getFormParams().formName;
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        'MMSM518S2N',
        "",
        ""
      );

      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          nextTick(() => {
             erFormHelper.setAllControlReadOnly("layoutControlGroup2", true)
            });
        });
      } else {
        console.log("99999", 1111);
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
          initialResult.msg +
          "]!"
        );
      }
    };

    onMounted(() => {
      // initializePage();
    });
    const GridView1FocusChanged = async (e: any) => {
      if (e && e.data) {
        let selectedMainGridRow: any = [];
        bunker.length=0;
        bunker.push(e.data.MAT_CODE);
        bunker.push(e.data.MAT_NAME);
        if (suoding) {
           S_MAT_CODE = e.data.MAT_CODE;
        }
        selectedMainGridRow = e.data.toJSON();
        listQuery(selectedMainGridRow);
      }
    }
    const listQuery = async (datarow: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(datarow, true);
      // 子表查询
      console.log(eiInfo);
      if (suoding) {
        erFormHelper.mergeDataToLayoutOrGrid(eiInfo, true, "layoutControlGroup2");
      }
    };

    onMounted(() => {
      // initializePage();
    });
    const layout2_Changed = async (e: any) => {

      if (e.itemCode == "BOTTON_MAT_CODE") {
        const data = {

        };
        console.log("111", data);
        dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

        parentInfo.value = data;
        openXrEfDialog();
      }
    };
    const F2_DO = async (e: any) => {
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", true)
      queryMainGrid();
    };


    const F3_DO = async (e: any) => {
      erFormHelper.resetLayout("layoutControlGroup2");
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", false)

     
    };

    
    const F4_DO = async (e: any) => {
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", true)
      if (!await erFormHelper.checkRequiredInput("layoutControlGroup2")) return;
      const mes_res = await erFormHelper.messageConfirm(
        "成功：通过数据合法性检查！ 只有锁定才能成分输入和库存选择（注意：锁定后无法修改信息）"
      );
      if (!mes_res) {
        return;
      } else {
        suoding = false;
        const eiInfo = new EI.EIInfo();
        const eiBlock =
          erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup2");
        eiInfo.addBlock(eiBlock, "Table0");
        S_MAT_CODE = (eiBlock.data[0]["MAT_CODE"])?.toString();
        await erFormHelper
          .callService("mmsm81s_ins", eiInfo, true, true,true)
          .then((res) => {
          })
      }

    };
    const F5_DO = async (e: any) => {
      if (suoding) {
        return;
      }
      const data = {
        MAT_CODE:  S_MAT_CODE,
      };

      dialogFormName.value = "MMSM81FG"; // 读配置表获取画面名

      parentInfo.value = data;

      openXrEfDialog();
    }

    const F6_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
       erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup2");
      eiInfo.addBlock(eiBlock, "Table0");
      const eiBlock1 =
        erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup4");
      eiInfo.addBlock(eiBlock1, "Table1");

       await erFormHelper
          .callService("mmsm81sf3_ins", eiInfo, true, true,true)
          .then((res) => {
            nextTick(() => {
              queryMainGrid();
              suoding = true;
            });
          });
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      erGrid1Ready,
      dialogVisible,
      layout2_Changed,
      GridView1FocusChanged,
      gridView1,
      LayoutGroupFilter,
      xrEfDialogRef,
      xrEfDialogClose,
      getChildInfo,
      parentInfo,
      gridToolbar,
      i_func_id_q,
      dialogFormName,
      i_func_id_p,
      bunker,
      RETURN_BUNKER
    };
  },
});
