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
// import { EI, EIManager } from "EIX/ei";
// import { ER } from "ERX/Er";
// import { SiUtils } from "ERX/SiUtils";
// import { FiUtils } from "ERX/FiUtils";
// import xrEfForm from "EFX/xrEfForm";
// import xrEfPanel from "EFX/xrEfPanel";
// import erLayout from "ERX/ErLayout";
// import erGrid from "ERX/ErGrid";

// import { useRoute } from "vue-router";

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
  name: "MMSM81518ADDV",
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
    const bunker_flag = reactive(new Array());
    const bunker_mat_code = reactive(new Array());
    const bunker_mat_name = reactive(new Array());
    const bunker_mat_type = reactive(new Array());
    const return_data = new EI.EiBlock();
    let formParams: string;
    let formPartition: string;
    let bunker_Message2 = new EI.EIInfo();
    const bunker_J = reactive(new Array());
    const bunker_flag_J = reactive(new Array());
    const bunker_mat_code_J = reactive(new Array());
    const bunker_mat_name_J = reactive(new Array());
    const bunker_mat_name_L2_J = reactive(new Array());
    const bunker_STOCK_WT_J = reactive(new Array());
    const bunker_mat_type_J = reactive(new Array());
    const bunker_l2_code_J = reactive(new Array());

    const bunker_K = reactive(new Array());
    const bunker_flag_K = reactive(new Array());
    const bunker_mat_code_K = reactive(new Array());
    const bunker_mat_name_K = reactive(new Array());
    const bunker_mat_name_L2_K = reactive(new Array());
    const bunker_STOCK_WT_K = reactive(new Array());
    const bunker_mat_type_K = reactive(new Array());
    const bunker_l2_code_K = reactive(new Array());

    const bunker_V = reactive(new Array());
    const bunker_flag_V = reactive(new Array());
    const bunker_mat_code_V = reactive(new Array());
    const bunker_mat_name_V = reactive(new Array());
    const bunker_mat_name_L2_V = reactive(new Array());
    const bunker_STOCK_WT_V = reactive(new Array());
    const bunker_mat_type_V = reactive(new Array());
    const bunker_l2_code_V = reactive(new Array());
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
      console.log("BACK_C4", BACK_C4);
      QueryBunker_J();
      QueryBunker_K();
      QueryBunker_V();

      rateWidth.value = "100";
      rateHeight.value = "100";
      rateHeight.value = parentInfo.value?.rateHeight;
    };

    let bunker_Message = new EI.EIInfo();
    // let bunker_Message1 = new EI.EIInfo();
    const butClick = async (item: any, mat_name: any) => {
      //查询使用的是哪个料仓号信息
      closeEfDialog(item, mat_name);
    };
    const closeEfDialog = (BUNKER_NO: string, MAT_NAME: string) => {
      const data = {
        close: true,
        BUNKER_NO,
        MAT_NAME,
      };

      emit("getChildInfo", data);
    };

    const QueryBunker_J = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker_J.length = 0;
      bunker_flag_J.length = 0;
      bunker_mat_code_J.length = 0;
      bunker_mat_name_J.length = 0;
      bunker_mat_name_L2_J.length = 0;
      bunker_STOCK_WT_J.length = 0;
      bunker_mat_type_J.length = 0;
      bunker_l2_code_J.length = 0;
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D1",
        },
        true
      );

      console.log(formParams);
      EIManager.callService(formParams, "mmsm408n_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_J.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_flag_J.push(res.getBlock(0).data[i]["FLAG"]);
            bunker_mat_code_J.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name_J.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_mat_name_L2_J.push(res.getBlock(0).data[i]["MAT_CODE_L2"]);
            bunker_STOCK_WT_J.push(res.getBlock(0).data[i]["STOCK_WT"]);
            bunker_mat_type_J.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_l2_code_J.push(res.getBlock(0).data[i]["BACK_C5"]);
          }
        }
      );
    };

    const QueryBunker_K = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      bunker_K.length = 0;
      bunker_flag_K.length = 0;
      bunker_mat_code_K.length = 0;
      bunker_mat_name_K.length = 0;
      bunker_mat_name_L2_K.length = 0;
      bunker_STOCK_WT_K.length = 0;
      bunker_mat_type_K.length = 0;
      bunker_l2_code_K.length = 0;
      console.log("SW", BACK_C4);
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D2",
        },
        true
      );

      console.log(formParams);
      EIManager.callService(formParams, "mmsm408n_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_K.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_flag_K.push(res.getBlock(0).data[i]["FLAG"]);
            bunker_mat_code_K.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name_K.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_mat_name_L2_K.push(res.getBlock(0).data[i]["MAT_CODE_L2"]);
            bunker_STOCK_WT_K.push(res.getBlock(0).data[i]["STOCK_WT"]);
            bunker_mat_type_K.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_l2_code_K.push(res.getBlock(0).data[i]["BACK_C5"]);
          }
        }
      );
    };

    const QueryBunker_V = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      bunker_V.length = 0;
      bunker_flag_V.length = 0;
      bunker_mat_code_V.length = 0;
      bunker_mat_name_V.length = 0;
      bunker_mat_name_L2_V.length = 0;
      bunker_STOCK_WT_V.length = 0;
      bunker_mat_type_V.length = 0;
      bunker_l2_code_V.length = 0;
      console.log("SW", BACK_C4);
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D3",
        },
        true
      );

      console.log(formParams);
      EIManager.callService(formParams, "mmsm408n_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_V.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_flag_V.push(res.getBlock(0).data[i]["FLAG"]);
            bunker_mat_code_V.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name_V.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_mat_name_L2_V.push(res.getBlock(0).data[i]["MAT_CODE_L2"]);
            bunker_STOCK_WT_V.push(res.getBlock(0).data[i]["STOCK_WT"]);
            bunker_mat_type_V.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_l2_code_V.push(res.getBlock(0).data[i]["BACK_C5"]);
          }
        }
      );
    };

    onMounted(() => {
      //QueryBunker();
    });

    const F2_DO = async (_e: any) => {};

    const F4_PRE_DO = async (e: any) => {};

    const F4_CANCEL = async (e: any) => {};
    const F4_DO = async (e: any) => {};

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
      bunker_flag,
      // gridView1,
      butClick,
      closeEfDialog,
      bunker_J,
      bunker_flag_J,
      bunker_mat_code_J,
      bunker_mat_name_J,
      bunker_mat_name_L2_J,
      bunker_STOCK_WT_J,
      bunker_mat_type_J,
      bunker_l2_code_J,

      bunker_K,
      bunker_flag_K,
      bunker_mat_code_K,
      bunker_mat_name_K,
      bunker_mat_name_L2_K,
      bunker_STOCK_WT_K,
      bunker_mat_type_K,
      bunker_l2_code_K,

      bunker_V,
      bunker_flag_V,
      bunker_mat_code_V,
      bunker_mat_name_V,
      bunker_mat_name_L2_V,
      bunker_STOCK_WT_V,
      bunker_mat_type_V,
      bunker_l2_code_V,
    };
  },
});
