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
  name: "MMSM8151CADDV",
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
    const bunker1 = reactive(new Array());
    const bunker_flag1 = reactive(new Array());
    const bunker_mat_code1 = reactive(new Array());
    const bunker_mat_name1 = reactive(new Array());
    const bunker_mat_type1 = reactive(new Array());
    const bunker_l2_code1 = reactive(new Array());
    const bunker_stock_wt1 = reactive(new Array());

    const bunker2 = reactive(new Array());
    const bunker_flag2 = reactive(new Array());
    const bunker_mat_code2 = reactive(new Array());
    const bunker_mat_name2 = reactive(new Array());
    const bunker_mat_type2 = reactive(new Array());
    const bunker_l2_code2 = reactive(new Array());
    const bunker_stock_wt2 = reactive(new Array());

    const bunker3 = reactive(new Array());
    const bunker_flag3 = reactive(new Array());
    const bunker_mat_code3 = reactive(new Array());
    const bunker_mat_name3 = reactive(new Array());
    const bunker_mat_type3 = reactive(new Array());
    const bunker_l2_code3 = reactive(new Array());
    const bunker_stock_wt3 = reactive(new Array());

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
      console.log("cs_mat_code", cs_mat_code);
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
    // let bunker_Message1 = new EI.EIInfo();
    const butClick1 = async (item: any) => {
      console.log(cs_mat_code);
      const eiBlock = new EI.EiBlock();
      eiBlock.pushData(
        {
          MAT_CODE: cs_mat_code,
          WEIGH_NO: cs_weigh_no,
          STOCK_WT: cs_stock_wt,
          BUNKER_NO: item,
          BUCKLE_WT: CS_BUCKLE_WT,
          BACK_CODE_5: CS_BACK_CODE_5,
          UNLOAD_POINT_CODE: CS_UNLOAD_POINT_CODE,
        },
        true
      );
      closeEfDialog(item, cs_mat_code, cs_weigh_no);
    };
    const butClick2 = async (item: any) => {
      console.log(cs_mat_code);
      const eiBlock = new EI.EiBlock();
      eiBlock.pushData(
        {
          MAT_CODE: cs_mat_code,
          WEIGH_NO: cs_weigh_no,
          STOCK_WT: cs_stock_wt,
          BUNKER_NO: item,
          BUCKLE_WT: CS_BUCKLE_WT,
          BACK_CODE_5: CS_BACK_CODE_5,
          UNLOAD_POINT_CODE: CS_UNLOAD_POINT_CODE,
        },
        true
      );
      closeEfDialog(item, cs_mat_code, cs_weigh_no);
    };
    const butClick3 = async (item: any) => {
      console.log(cs_mat_code);
      const eiBlock = new EI.EiBlock();
      eiBlock.pushData(
        {
          MAT_CODE: cs_mat_code,
          WEIGH_NO: cs_weigh_no,
          STOCK_WT: cs_stock_wt,
          BUNKER_NO: item,
          BUCKLE_WT: CS_BUCKLE_WT,
          BACK_CODE_5: CS_BACK_CODE_5,
          UNLOAD_POINT_CODE: CS_UNLOAD_POINT_CODE,
        },
        true
      );
      closeEfDialog(item, cs_mat_code, cs_weigh_no);
    };
    const closeEfDialog = (
      BUNKER_NO: string,
      MAT_CODE: string,
      WEIGH_NO: string
    ) => {
      const data = {
        close: true,
        BUNKER_NO,
        MAT_CODE,
        WEIGH_NO,
      };

      emit("getChildInfo", data);
    };

    const QueryBunker = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker1.length = 0;
      bunker_mat_code1.length = 0;
      bunker_mat_name1.length = 0;
      bunker_mat_type1.length = 0;
      bunker_flag1.length = 0;
      bunker_l2_code1.length = 0;
      bunker_stock_wt1.length = 0;

      bunker2.length = 0;
      bunker_mat_code2.length = 0;
      bunker_mat_name2.length = 0;
      bunker_mat_type2.length = 0;
      bunker_flag2.length = 0;
      bunker_l2_code2.length = 0;
      bunker_stock_wt2.length = 0;

      bunker3.length = 0;
      bunker_mat_code3.length = 0;
      bunker_mat_name3.length = 0;
      bunker_mat_type3.length = 0;
      bunker_flag3.length = 0;
      bunker_l2_code3.length = 0;
      bunker_stock_wt3.length = 0;

      console.log("SW", BACK_C4);
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          //BUNKER_TYPE: CS_BUNKER_TYPE,
          BACK_C4: BACK_C4,
        },
        true
      );

      console.log(formParams);
      EIManager.callService(formParams, "mmsm60_inq", inInfo).then(
        (res: EI.EIInfo) => {
          console.log("res123", res);
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "DESMG") {
              bunker1.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_mat_code1.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name1.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_type1.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_flag1.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_l2_code1.push(res.getBlock(0).data[i]["BACK_C5"]);
              bunker_stock_wt1.push(res.getBlock(0).data[i]["STOCK_WT"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "D2") {
              bunker2.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_mat_code2.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name2.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_type2.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_flag2.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_l2_code2.push(res.getBlock(0).data[i]["BACK_C5"]);
              bunker_stock_wt2.push(res.getBlock(0).data[i]["STOCK_WT"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "D3") {
              bunker3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_mat_code3.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name3.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_type3.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_flag3.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_l2_code3.push(res.getBlock(0).data[i]["BACK_C5"]);
              bunker_stock_wt3.push(res.getBlock(0).data[i]["STOCK_WT"]);
            }
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

      bunker_mat_code1,
      bunker_mat_name1,
      bunker_mat_type1,
      bunker1,
      bunker_flag1,
      bunker_l2_code1,
      bunker_stock_wt1,

      bunker_mat_code2,
      bunker_mat_name2,
      bunker_mat_type2,
      bunker2,
      bunker_flag2,
      bunker_l2_code2,
      bunker_stock_wt2,

      bunker_mat_code3,
      bunker_mat_name3,
      bunker_mat_type3,
      bunker3,
      bunker_flag3,
      bunker_l2_code3,
      bunker_stock_wt3,
      // gridView1,
      butClick1,
      butClick2,
      butClick3,
      closeEfDialog,
    };
  },
});
