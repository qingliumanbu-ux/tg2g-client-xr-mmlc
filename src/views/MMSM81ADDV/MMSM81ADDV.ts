/*
 * @Description:
 * @Author: Edward
 * @Date: 2022-06-02 17:21:37
 * @LastEditors: zhangTing
 * @LastEditTime: 2023-07-19 15:13:06
 */
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
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import xrEfDialog from "EFX/xrEfDialog";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { useRoute } from "vue-router";
import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";

export default defineComponent({
  name: "MMSM81ADDV",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
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
  // setup中添加props和emit
  setup: (props, { emit }) => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const bunker = reactive(new Array());
    const bunker_name = reactive(new Array());
    const bunker_flag = reactive(new Array());
    const bunker_mat_code = reactive(new Array());
    const bunker_mat_name = reactive(new Array());
    const bunker_mat_type = reactive(new Array());
    const bunker_l2_code = reactive(new Array());
    const bunker_stock_wt = reactive(new Array());
    // const { postMessageToParent, listenerMessageEvent } = EFDialogFormMessage();
    let formParams: string;
    let formPartition: string;
    let bunker_Message2 = new EI.EIInfo();

    // 变量定义
    // const erFormHelper = reactive(new ErFormHelper());

    const initializeFlag = ref(0);
    // let gridView1!: kendo.ui.Grid;
    let gridView1: any;

    const parentInfo = ref(props.parentInfo);
    // const formName = 'MMSM81ADDV';
    let cs_mat_code = parentInfo.value?.MAT_CODE;
    let cs_weigh_no = parentInfo.value?.WEIGH_NO;
    let cs_stock_wt = parentInfo.value?.STOCK_WT;
    let CS_BUCKLE_WT = parentInfo.value?.BUCKLE_WT;
    let CS_BUNKER_TYPE = parentInfo.value?.BUNKER_TYPE;
    let CS_BACK_CODE_5 = parentInfo.value?.BACK_CODE_5;
    let CS_UNLOAD_POINT_CODE = parentInfo.value?.UNLOAD_POINT_CODE;
    let BACK_C4 = parentInfo.value?.FORMNAME;

    const initializeService = "";
    const LayoutGroupFilter = ref("");
    const rateWidth = ref("");
    const rateHeight = ref("");
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formParams = efFormInfo.value.formPartition; // 分区
      formPartition = efFormInfo.value.formName; // 当前画面名
      console.log("eformPartition", formPartition);
      console.log("formParams", formParams);
      QueryBunker();

      rateWidth.value = parentInfo.value?.rateWidth;
      rateHeight.value = parentInfo.value?.rateHeight;
    };

    let bunker_Message = new EI.EIInfo();
    const butClick = async (item: any,mat_name:any) => {     
      closeEfDialog(item, mat_name);     
    };
    const closeEfDialog = (
      BUNKER_NO: string,      
      MAT_NAME: string
    ) => {
      const data = {
        close: true,
        BUNKER_NO,
        MAT_NAME
      };

      emit("getChildInfo", data);
    };
   
    const QueryBunker = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      bunker.length = 0;
      bunker_mat_code.length = 0;
      bunker_mat_name.length = 0;
      bunker_mat_type.length = 0;
      bunker_flag.length = 0;
      bunker_l2_code.length = 0;
      bunker_stock_wt.length = 0;
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          BACK_C4: BACK_C4,
        },
        true
      );

      EIManager.callService(formParams, "mmsm60_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_name.push(res.getBlock(0).data[i]["BUNKER_NAME"]);
            bunker_mat_code.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_mat_type.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_flag.push(res.getBlock(0).data[i]["FLAG"]);
            bunker_l2_code.push(res.getBlock(0).data[i]["BACK_C5"]);
            bunker_stock_wt.push(res.getBlock(0).data[i]["STOCK_WT"]);
          }
        }
      );
    };
    onMounted(() => {
    });

    
    const F2_DO = async (_e: any) => {};

    const F4_PRE_DO = async (e: any) => {};

    const F4_CANCEL = async (e: any) => {    
    };
    const F4_DO = async (e: any) => {
     
    };

    return {
      efFormReady,
      erFormHelper,
      initializeFlag,
      rateWidth,
      rateHeight,
      F2_DO,
      F4_DO,
      F4_CANCEL,
      F4_PRE_DO,
      bunker_mat_code,
      bunker_mat_name,
      bunker_mat_type,
      bunker,
      bunker_name,
      bunker_flag,
      bunker_l2_code,
      bunker_stock_wt,
      butClick,
      closeEfDialog
    };
  },
});
