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
  name: "MMSM8151LADDV",
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
    const bunker_1 = reactive(new Array());
    const bunker_flag_1 = reactive(new Array());
    const bunker_mat_code_1 = reactive(new Array());
    const bunker_mat_name_1 = reactive(new Array());
    const bunker_mat_name_L2_1 = reactive(new Array());
    const bunker_STOCK_WT_1 = reactive(new Array());
    const bunker_mat_type_1 = reactive(new Array());
    const bunker_l2_code_1 = reactive(new Array());

    const bunker_2 = reactive(new Array());
    const bunker_flag_2 = reactive(new Array());
    const bunker_mat_code_2 = reactive(new Array());
    const bunker_mat_name_2 = reactive(new Array());
    const bunker_mat_name_L2_2 = reactive(new Array());
    const bunker_STOCK_WT_2 = reactive(new Array());
    const bunker_mat_type_2 = reactive(new Array());
    const bunker_l2_code_2 = reactive(new Array());

    const bunker_3 = reactive(new Array());
    const bunker_flag_3 = reactive(new Array());
    const bunker_mat_code_3 = reactive(new Array());
    const bunker_mat_name_3 = reactive(new Array());
    const bunker_mat_name_L2_3 = reactive(new Array());
    const bunker_STOCK_WT_3 = reactive(new Array());
    const bunker_mat_type_3 = reactive(new Array());
    const bunker_l2_code_3 = reactive(new Array());

    const bunker_4 = reactive(new Array());
    const bunker_flag_4 = reactive(new Array());
    const bunker_mat_code_4 = reactive(new Array());
    const bunker_mat_name_4 = reactive(new Array());
    const bunker_mat_name_L2_4 = reactive(new Array());
    const bunker_STOCK_WT_4 = reactive(new Array());
    const bunker_mat_type_4 = reactive(new Array());
    const bunker_l2_code_4 = reactive(new Array());

    const bunker_5 = reactive(new Array());
    const bunker_flag_5 = reactive(new Array());
    const bunker_mat_code_5 = reactive(new Array());
    const bunker_mat_name_5 = reactive(new Array());
    const bunker_mat_name_L2_5 = reactive(new Array());
    const bunker_STOCK_WT_5 = reactive(new Array());
    const bunker_mat_type_5 = reactive(new Array());
    const bunker_l2_code_5 = reactive(new Array());

    const bunker_6 = reactive(new Array());
    const bunker_flag_6 = reactive(new Array());
    const bunker_mat_code_6 = reactive(new Array());
    const bunker_mat_name_6 = reactive(new Array());
    const bunker_mat_name_L2_6 = reactive(new Array());
    const bunker_STOCK_WT_6 = reactive(new Array());
    const bunker_mat_type_6 = reactive(new Array());
    const bunker_l2_code_6 = reactive(new Array());

    const bunker_7 = reactive(new Array());
    const bunker_flag_7 = reactive(new Array());
    const bunker_mat_code_7 = reactive(new Array());
    const bunker_mat_name_7 = reactive(new Array());
    const bunker_mat_name_L2_7 = reactive(new Array());
    const bunker_STOCK_WT_7 = reactive(new Array());
    const bunker_mat_type_7 = reactive(new Array());
    const bunker_l2_code_7 = reactive(new Array());

    const bunker_8 = reactive(new Array());
    const bunker_flag_8 = reactive(new Array());
    const bunker_mat_code_8 = reactive(new Array());
    const bunker_mat_name_8 = reactive(new Array());
    const bunker_mat_name_L2_8 = reactive(new Array());
    const bunker_STOCK_WT_8 = reactive(new Array());
    const bunker_mat_type_8 = reactive(new Array());
    const bunker_l2_code_8 = reactive(new Array());

    const bunker_9 = reactive(new Array());
    const bunker_flag_9 = reactive(new Array());
    const bunker_mat_code_9 = reactive(new Array());
    const bunker_mat_name_9 = reactive(new Array());
    const bunker_mat_name_L2_9 = reactive(new Array());
    const bunker_STOCK_WT_9 = reactive(new Array());
    const bunker_mat_type_9 = reactive(new Array());
    const bunker_l2_code_9 = reactive(new Array());

    const bunker_10 = reactive(new Array());
    const bunker_flag_10 = reactive(new Array());
    const bunker_mat_code_10 = reactive(new Array());
    const bunker_mat_name_10 = reactive(new Array());
    const bunker_mat_name_L2_10 = reactive(new Array());
    const bunker_STOCK_WT_10 = reactive(new Array());
    const bunker_mat_type_10 = reactive(new Array());
    const bunker_l2_code_10 = reactive(new Array());

    const bunker_11 = reactive(new Array());
    const bunker_flag_11 = reactive(new Array());
    const bunker_mat_code_11 = reactive(new Array());
    const bunker_mat_name_11 = reactive(new Array());
    const bunker_mat_name_L2_11 = reactive(new Array());
    const bunker_STOCK_WT_11 = reactive(new Array());
    const bunker_mat_type_11 = reactive(new Array());
    const bunker_l2_code_11 = reactive(new Array());

    const bunker_12 = reactive(new Array());
    const bunker_flag_12 = reactive(new Array());
    const bunker_mat_code_12 = reactive(new Array());
    const bunker_mat_name_12 = reactive(new Array());
    const bunker_mat_name_L2_12 = reactive(new Array());
    const bunker_STOCK_WT_12 = reactive(new Array());
    const bunker_mat_type_12 = reactive(new Array());
    const bunker_l2_code_12 = reactive(new Array());

    const bunker_13 = reactive(new Array());
    const bunker_flag_13 = reactive(new Array());
    const bunker_mat_code_13 = reactive(new Array());
    const bunker_mat_name_13 = reactive(new Array());
    const bunker_mat_name_L2_13 = reactive(new Array());
    const bunker_STOCK_WT_13 = reactive(new Array());
    const bunker_mat_type_13 = reactive(new Array());
    const bunker_l2_code_13 = reactive(new Array());
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
      console.log("cs_mat_code", cs_mat_code);
      efFormInfo.value = e.formInfo;
      formParams = efFormInfo.value.formPartition; // 分区
      formPartition = efFormInfo.value.formName; // 当前画面名
      console.log("eformPartition", formPartition);
      console.log("formParams", formParams);
      QueryBunker();

      rateWidth.value = "";
      rateHeight.value = parentInfo.value?.rateHeight;
    };

    let bunker_Message = new EI.EIInfo();
    // let bunker_Message1 = new EI.EIInfo();
    const butClick = async (item: any) => {
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
      // 向母画面传输数据
      // closeEfDialog();
      // erFormHelper.messageWarning('无数据要保存');
      // const mes_res = await erFormHelper.messageConfirm('是否确认选择料仓收货？');
      // if (!mes_res)
      // // {closeEfDialog(bunker_Message1);console.log('1',bunker_Message1);
      // // }else{ closeEfDialog(bunker_Message);console.log('0',bunker_Message);}
      // {closeEfDialog(' ',' ',' ');}else{
      //   bunker_Message.addBlock(eiBlock);
      //   // EIManager.callService(formParams, 'mmsm81f3_ins', bunker_Message);
      //   closeEfDialog(item,cs_mat_code,cs_weigh_no);
      // }
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

    // const closeEfDialog = (bunker_Message: EI.EIInfo) => {

    //     const data = {
    //       close: true,
    //       bunker_Message

    //     };

    //   emit('getChildInfo', data);
    // };

    // const closeEfDialog = (bunker_Message: EI.EIInfo) => {
    //   if (bunker_Message.getBlock(0).data.length>0) {
    //     const data = {
    //       close: true,
    //       bunker_Message
    //     };
    //   }else {
    //     const data = {
    //       close: true
    //     };
    //   }

    //   emit('getChildInfo', data);
    // };
    const QueryBunker = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker_1.length = 0;
      bunker_flag_1.length = 0;
      bunker_mat_code_1.length = 0;
      bunker_mat_name_1.length = 0;
      bunker_mat_name_L2_1.length = 0;
      bunker_STOCK_WT_1.length = 0;
      bunker_mat_type_1.length = 0;
      bunker_l2_code_1.length = 0;

      bunker_2.length = 0;
      bunker_flag_2.length = 0;
      bunker_mat_code_2.length = 0;
      bunker_mat_name_2.length = 0;
      bunker_mat_name_L2_2.length = 0;
      bunker_STOCK_WT_2.length = 0;
      bunker_mat_type_2.length = 0;
      bunker_l2_code_2.length = 0;

      bunker_3.length = 0;
      bunker_flag_3.length = 0;
      bunker_mat_code_3.length = 0;
      bunker_mat_name_3.length = 0;
      bunker_mat_name_L2_3.length = 0;
      bunker_STOCK_WT_3.length = 0;
      bunker_mat_type_3.length = 0;
      bunker_l2_code_3.length = 0;

      bunker_4.length = 0;
      bunker_flag_4.length = 0;
      bunker_mat_code_4.length = 0;
      bunker_mat_name_4.length = 0;
      bunker_mat_name_L2_4.length = 0;
      bunker_STOCK_WT_4.length = 0;
      bunker_mat_type_4.length = 0;
      bunker_l2_code_4.length = 0;

      bunker_5.length = 0;
      bunker_flag_5.length = 0;
      bunker_mat_code_5.length = 0;
      bunker_mat_name_5.length = 0;
      bunker_mat_name_L2_5.length = 0;
      bunker_STOCK_WT_5.length = 0;
      bunker_mat_type_5.length = 0;
      bunker_l2_code_5.length = 0;

      bunker_6.length = 0;
      bunker_flag_6.length = 0;
      bunker_mat_code_6.length = 0;
      bunker_mat_name_6.length = 0;
      bunker_mat_name_L2_6.length = 0;
      bunker_STOCK_WT_6.length = 0;
      bunker_mat_type_6.length = 0;
      bunker_l2_code_6.length = 0;

      bunker_7.length = 0;
      bunker_flag_7.length = 0;
      bunker_mat_code_7.length = 0;
      bunker_mat_name_7.length = 0;
      bunker_mat_name_L2_7.length = 0;
      bunker_STOCK_WT_7.length = 0;
      bunker_mat_type_7.length = 0;
      bunker_l2_code_7.length = 0;

      bunker_8.length = 0;
      bunker_flag_8.length = 0;
      bunker_mat_code_8.length = 0;
      bunker_mat_name_8.length = 0;
      bunker_mat_name_L2_8.length = 0;
      bunker_STOCK_WT_8.length = 0;
      bunker_mat_type_8.length = 0;
      bunker_l2_code_8.length = 0;

      bunker_9.length = 0;
      bunker_flag_9.length = 0;
      bunker_mat_code_9.length = 0;
      bunker_mat_name_9.length = 0;
      bunker_mat_name_L2_9.length = 0;
      bunker_STOCK_WT_9.length = 0;
      bunker_mat_type_9.length = 0;
      bunker_l2_code_9.length = 0;

      bunker_10.length = 0;
      bunker_flag_10.length = 0;
      bunker_mat_code_10.length = 0;
      bunker_mat_name_10.length = 0;
      bunker_mat_name_L2_10.length = 0;
      bunker_STOCK_WT_10.length = 0;
      bunker_mat_type_10.length = 0;
      bunker_l2_code_10.length = 0;

      bunker_11.length = 0;
      bunker_flag_11.length = 0;
      bunker_mat_code_11.length = 0;
      bunker_mat_name_11.length = 0;
      bunker_mat_name_L2_11.length = 0;
      bunker_STOCK_WT_11.length = 0;
      bunker_mat_type_11.length = 0;
      bunker_l2_code_11.length = 0;

      bunker_12.length = 0;
      bunker_flag_12.length = 0;
      bunker_mat_code_12.length = 0;
      bunker_mat_name_12.length = 0;
      bunker_mat_name_L2_12.length = 0;
      bunker_STOCK_WT_12.length = 0;
      bunker_mat_type_12.length = 0;
      bunker_l2_code_12.length = 0;

      bunker_13.length = 0;
      bunker_flag_13.length = 0;
      bunker_mat_code_13.length = 0;
      bunker_mat_name_13.length = 0;
      bunker_mat_name_L2_13.length = 0;
      bunker_STOCK_WT_13.length = 0;
      bunker_mat_type_13.length = 0;
      bunker_l2_code_13.length = 0;

      console.log("SW", BACK_C4);
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          MAT_CODE: cs_mat_code,
          //BUNKER_TYPE: CS_BUNKER_TYPE,
          BACK_C4: BACK_C4,
          CS_FLAG: "DX",
        },
        true
      );

      console.log(formParams);
      EIManager.callService(formParams, "mmsm81fg_inq", inInfo).then(
        (res: EI.EIInfo) => {
          console.log("res123", res);
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL01") {
              bunker_1.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_1.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_1.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_1.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_1.push(res.getBlock(0).data[i]["MAT_CODE_L2"]);
              bunker_STOCK_WT_1.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_1.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_1.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL02") {
              bunker_2.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_2.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_2.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_2.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_2.push(res.getBlock(0).data[i]["MAT_CODE_L2"]);
              bunker_STOCK_WT_2.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_2.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_2.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL03") {
              bunker_3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_3.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_3.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_3.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_3.push(res.getBlock(0).data[i]["MAT_CODE_L3"]);
              bunker_STOCK_WT_3.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_3.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_3.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL04") {
              bunker_4.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_4.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_4.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_4.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_4.push(res.getBlock(0).data[i]["MAT_CODE_L4"]);
              bunker_STOCK_WT_4.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_4.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_4.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL05") {
              bunker_5.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_5.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_5.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_5.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_5.push(res.getBlock(0).data[i]["MAT_CODE_L5"]);
              bunker_STOCK_WT_5.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_5.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_5.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL06") {
              bunker_6.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_6.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_6.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_6.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_6.push(res.getBlock(0).data[i]["MAT_CODE_L6"]);
              bunker_STOCK_WT_6.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_6.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_6.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL07") {
              bunker_7.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_7.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_7.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_7.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_7.push(res.getBlock(0).data[i]["MAT_CODE_L7"]);
              bunker_STOCK_WT_7.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_7.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_7.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL08") {
              bunker_8.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_8.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_8.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_8.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_8.push(res.getBlock(0).data[i]["MAT_CODE_L8"]);
              bunker_STOCK_WT_8.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_8.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_8.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL09") {
              bunker_9.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_9.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_9.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_9.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_9.push(res.getBlock(0).data[i]["MAT_CODE_L9"]);
              bunker_STOCK_WT_9.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_9.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_9.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "CL10") {
              bunker_10.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_10.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_10.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_10.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_10.push(
                res.getBlock(0).data[i]["MAT_CODE_L10"]
              );
              bunker_STOCK_WT_10.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_10.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_10.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "COOLN") {
              bunker_11.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_11.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_11.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_11.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_11.push(
                res.getBlock(0).data[i]["MAT_CODE_L11"]
              );
              bunker_STOCK_WT_11.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_11.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_11.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "COOLS") {
              bunker_12.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_12.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_12.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_12.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_12.push(
                res.getBlock(0).data[i]["MAT_CODE_L12"]
              );
              bunker_STOCK_WT_12.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_12.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_12.push(res.getBlock(0).data[i]["BACK_C5"]);
            } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "COOLW") {
              bunker_13.push(res.getBlock(0).data[i]["BUNKER_NO"]);
              bunker_flag_13.push(res.getBlock(0).data[i]["FLAG"]);
              bunker_mat_code_13.push(res.getBlock(0).data[i]["MAT_CODE"]);
              bunker_mat_name_13.push(res.getBlock(0).data[i]["MAT_NAME"]);
              bunker_mat_name_L2_13.push(
                res.getBlock(0).data[i]["MAT_CODE_L13"]
              );
              bunker_STOCK_WT_13.push(res.getBlock(0).data[i]["STOCK_WT"]);
              bunker_mat_type_13.push(res.getBlock(0).data[i]["BASE_NAME"]);
              bunker_l2_code_13.push(res.getBlock(0).data[i]["BACK_C5"]);
            }
          }
        }
      );
    };
    onMounted(() => {
      //QueryBunker();
    });

    // 画面相关数据初始化
    /* const initializePage = async () => {
      console.log("1111");
      console.log("123",parentInfo);
      const initialResult = await erFormHelper.Initialize(formPartition, formParams, '', initializeService);
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        butClick;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          // gridView1 = erFormHelper.getKendoGrid('gridView1');
          // erFormHelper.setGridEditable('gridView1', false);
          // erFormHelper.mergeEiBlockToGrid(<EI.EDInfo>parentInfo.getBlock(0), gridView1);
          setTimeout(() => {
             erFormHelper.setControlValueEx('LayoutGroupFilter', parentInfo.value);
          }, 5);

        });
        console.log("2222");
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    }; */
    const F2_DO = async (_e: any) => {};

    const F4_PRE_DO = async (e: any) => {};

    const F4_CANCEL = async (e: any) => {
      // editable.value = false;
      // setToolbarVisible1(editable.value);
      // erFormHelper.setGridEditable('gridView1', false);
      // queryMainGrid();
    };
    const F4_DO = async (e: any) => {
      // console.log('11111',bunker_Message);
      // EIManager.callService(formParams, 'mmsm81f3_ins', bunker_Message);
      // const inInfo = new EI.EIInfo();
      // const Query = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      // inInfo.addBlock(Query);
      // EIManager.callService(formPartition, 'mmsm81f3_ins', inInfo);
      // 向母画面传输数据
      // closeEfDialog();
      // const eiInfo = new EI.EIInfo();
      // //获取增删改行的数据
      // const created = erFormHelper.getGridRowsAsBlock(gridView1, 'add');
      // eiInfo.addBlock(created, 'MMSM81_INS');
      // console.log('eiInfo', eiInfo);
      // // const outInfo = await erFormHelper.callService(i_service_f4, eiInfo, false, false, true);
      // const outInfo = await erFormHelper.callService('mmsm81_ins', eiInfo, false, true);
      // if (outInfo.sys.status < 0) {
      //   erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
      //   return false;
      // } else {
      //   // 隐藏工具栏按钮
      //   setToolbarVisible1(false);
      //   erFormHelper.setGridEditable('gridView1', false);
      //   queryMainGrid();
      // }
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
      bunker_flag,
      // gridView1,
      butClick,
      closeEfDialog,
      bunker_1,
      bunker_flag_1,
      bunker_mat_code_1,
      bunker_mat_name_1,
      bunker_mat_name_L2_1,
      bunker_STOCK_WT_1,
      bunker_mat_type_1,
      bunker_l2_code_1,

      bunker_2,
      bunker_flag_2,
      bunker_mat_code_2,
      bunker_mat_name_2,
      bunker_mat_name_L2_2,
      bunker_STOCK_WT_2,
      bunker_mat_type_2,
      bunker_l2_code_2,

      bunker_3,
      bunker_flag_3,
      bunker_mat_code_3,
      bunker_mat_name_3,
      bunker_mat_name_L2_3,
      bunker_STOCK_WT_3,
      bunker_mat_type_3,
      bunker_l2_code_3,

      bunker_4,
      bunker_flag_4,
      bunker_mat_code_4,
      bunker_mat_name_4,
      bunker_mat_name_L2_4,
      bunker_STOCK_WT_4,
      bunker_mat_type_4,
      bunker_l2_code_4,

      bunker_5,
      bunker_flag_5,
      bunker_mat_code_5,
      bunker_mat_name_5,
      bunker_mat_name_L2_5,
      bunker_STOCK_WT_5,
      bunker_mat_type_5,
      bunker_l2_code_5,

      bunker_6,
      bunker_flag_6,
      bunker_mat_code_6,
      bunker_mat_name_6,
      bunker_mat_name_L2_6,
      bunker_STOCK_WT_6,
      bunker_mat_type_6,
      bunker_l2_code_6,

      bunker_7,
      bunker_flag_7,
      bunker_mat_code_7,
      bunker_mat_name_7,
      bunker_mat_name_L2_7,
      bunker_STOCK_WT_7,
      bunker_mat_type_7,
      bunker_l2_code_7,

      bunker_8,
      bunker_flag_8,
      bunker_mat_code_8,
      bunker_mat_name_8,
      bunker_mat_name_L2_8,
      bunker_STOCK_WT_8,
      bunker_mat_type_8,
      bunker_l2_code_8,

      bunker_9,
      bunker_flag_9,
      bunker_mat_code_9,
      bunker_mat_name_9,
      bunker_mat_name_L2_9,
      bunker_STOCK_WT_9,
      bunker_mat_type_9,
      bunker_l2_code_9,

      bunker_10,
      bunker_flag_10,
      bunker_mat_code_10,
      bunker_mat_name_10,
      bunker_mat_name_L2_10,
      bunker_STOCK_WT_10,
      bunker_mat_type_10,
      bunker_l2_code_10,

      bunker_11,
      bunker_flag_11,
      bunker_mat_code_11,
      bunker_mat_name_11,
      bunker_mat_name_L2_11,
      bunker_STOCK_WT_11,
      bunker_mat_type_11,
      bunker_l2_code_11,

      bunker_12,
      bunker_flag_12,
      bunker_mat_code_12,
      bunker_mat_name_12,
      bunker_mat_name_L2_12,
      bunker_STOCK_WT_12,
      bunker_mat_type_12,
      bunker_l2_code_12,

      bunker_13,
      bunker_flag_13,
      bunker_mat_code_13,
      bunker_mat_name_13,
      bunker_mat_name_L2_13,
      bunker_STOCK_WT_13,
      bunker_mat_type_13,
      bunker_l2_code_13,
    };
  },
});
