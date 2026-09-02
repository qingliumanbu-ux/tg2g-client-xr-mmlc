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
import MMSM81VT from "../MMSM81VT/MMSM81VT.vue";
import { useRoute, useRouter } from "vue-router";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
export default defineComponent({
  name: "MMSM433S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
    MMSM50ADDS2N,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeService = "";
    const bunker = reactive(new Array());

    const parentInfo = ref({});
    let flag: any;
    const dialogFormName = ref(""); // 弹出画面的画面名
    const dialogVisible = ref(false);
    const detailTabsRef = ref<any>(null);

    let i_form_ename; // 当前画面名
    const i_func_id_q = ref("");
    const i_func_id_p = ref("");

    const table0 = {};

    // let i_func_id_p;
    let i_func_id;

    let formName: string;
    let formPartition: string;
    let PROGRAM_NAME: string;
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);

    const bunker1 = reactive(new Array());
    const bunker_mat_code1 = reactive(new Array());
    const bunker_mat_name1 = reactive(new Array());
    const bunker_mat_type1 = reactive(new Array());
    const bunker_stock_wt1 = reactive(new Array());
    const buiker_stock_wt1 = reactive(new Array());
    const bunker_bunker_no1 = reactive(new Array());
    const bunker_rate1 = reactive(new Array());
    const bunker_type1 = reactive(new Array());
    const bunker_color_status1 = reactive(new Array());
    const bunker_l2_code1 = reactive(new Array());
    const bunker_mat_type_code1 = reactive(new Array());
    const bunker_wt_warn1 = reactive(new Array());
    const gm_wt1 = reactive(new Array());
    const up_value1 = reactive(new Array());
    const BS_WT1 = reactive(new Array());
    const BL_WT1 = reactive(new Array());
    const BAOJI1 = reactive(new Array());
    let index_1: 1000;

    const bunker2 = reactive(new Array());
    const bunker_mat_code2 = reactive(new Array());
    const bunker_mat_name2 = reactive(new Array());
    const bunker_mat_type2 = reactive(new Array());
    const bunker_stock_wt2 = reactive(new Array());
    const buiker_stock_wt2 = reactive(new Array());
    const bunker_bunker_no2 = reactive(new Array());
    const bunker_rate2 = reactive(new Array());
    const bunker_type2 = reactive(new Array());
    const bunker_color_status2 = reactive(new Array());
    const bunker_l2_code2 = reactive(new Array());
    const bunker_mat_type_code2 = reactive(new Array());
    const bunker_wt_warn2 = reactive(new Array());
    const gm_wt2 = reactive(new Array());
    const up_value2 = reactive(new Array());
    const BS_WT2 = reactive(new Array());
    const BL_WT2 = reactive(new Array());
    const BAOJI2 = reactive(new Array());
    let index_2: 1000;

    const bunker3 = reactive(new Array());
    const bunker_mat_code3 = reactive(new Array());
    const bunker_mat_name3 = reactive(new Array());
    const bunker_mat_type3 = reactive(new Array());
    const bunker_stock_wt3 = reactive(new Array());
    const buiker_stock_wt3 = reactive(new Array());
    const bunker_bunker_no3 = reactive(new Array());
    const bunker_rate3 = reactive(new Array());
    const bunker_type3 = reactive(new Array());
    const bunker_color_status3 = reactive(new Array());
    const bunker_l2_code3 = reactive(new Array());
    const bunker_mat_type_code3 = reactive(new Array());
    const bunker_wt_warn3 = reactive(new Array());
    const gm_wt3 = reactive(new Array());
    const up_value3 = reactive(new Array());
    const BS_WT3 = reactive(new Array());
    const BL_WT3 = reactive(new Array());
    const BAOJI3 = reactive(new Array());
    let index_3: 1000;

    const bunker4 = reactive(new Array());
    const bunker_mat_code4 = reactive(new Array());
    const bunker_mat_name4 = reactive(new Array());
    const bunker_mat_type4 = reactive(new Array());
    const bunker_stock_wt4 = reactive(new Array());
    const buiker_stock_wt4 = reactive(new Array());
    const bunker_bunker_no4 = reactive(new Array());
    const bunker_rate4 = reactive(new Array());
    const bunker_type4 = reactive(new Array());
    const bunker_color_status4 = reactive(new Array());
    const bunker_l2_code4 = reactive(new Array());
    const bunker_mat_type_code4 = reactive(new Array());
    const bunker_wt_warn4 = reactive(new Array());
    const gm_wt4 = reactive(new Array());
    const up_value4 = reactive(new Array());
    const BS_WT4 = reactive(new Array());
    const BL_WT4 = reactive(new Array());
    const BAOJI4 = reactive(new Array());
    let index_4: 1000;

    const bunker5 = reactive(new Array());
    const bunker_mat_code5 = reactive(new Array());
    const bunker_mat_name5 = reactive(new Array());
    const bunker_mat_type5 = reactive(new Array());
    const bunker_stock_wt5 = reactive(new Array());
    const buiker_stock_wt5 = reactive(new Array());
    const bunker_bunker_no5 = reactive(new Array());
    const bunker_rate5 = reactive(new Array());
    const bunker_type5 = reactive(new Array());
    const bunker_color_status5 = reactive(new Array());
    const bunker_l2_code5 = reactive(new Array());
    const bunker_mat_type_code5 = reactive(new Array());
    const bunker_wt_warn5 = reactive(new Array());
    const gm_wt5 = reactive(new Array());
    const up_value5 = reactive(new Array());
    const BS_WT5 = reactive(new Array());
    const BL_WT5 = reactive(new Array());
    const BAOJI5 = reactive(new Array());
    let index_5: 1000;

    const bunker6 = reactive(new Array());
    const bunker_mat_code6 = reactive(new Array());
    const bunker_mat_name6 = reactive(new Array());
    const bunker_mat_type6 = reactive(new Array());
    const bunker_stock_wt6 = reactive(new Array());
    const buiker_stock_wt6 = reactive(new Array());
    const bunker_bunker_no6 = reactive(new Array());
    const bunker_rate6 = reactive(new Array());
    const bunker_type6 = reactive(new Array());
    const bunker_color_status6 = reactive(new Array());
    const bunker_l2_code6 = reactive(new Array());
    const bunker_mat_type_code6 = reactive(new Array());
    const bunker_wt_warn6 = reactive(new Array());
    const gm_wt6 = reactive(new Array());
    const up_value6 = reactive(new Array());
    const BS_WT6 = reactive(new Array());
    const BL_WT6 = reactive(new Array());
    const BAOJI6 = reactive(new Array());
    let index_6: 1000;

    const bunker7 = reactive(new Array());
    const bunker_mat_code7 = reactive(new Array());
    const bunker_mat_name7 = reactive(new Array());
    const bunker_mat_type7 = reactive(new Array());
    const bunker_stock_wt7 = reactive(new Array());
    const buiker_stock_wt7 = reactive(new Array());
    const bunker_bunker_no7 = reactive(new Array());
    const bunker_rate7 = reactive(new Array());
    const bunker_type7 = reactive(new Array());
    const bunker_color_status7 = reactive(new Array());
    const bunker_l2_code7 = reactive(new Array());
    const bunker_mat_type_code7 = reactive(new Array());
    const bunker_wt_warn7 = reactive(new Array());
    const gm_wt7 = reactive(new Array());
    const up_value7 = reactive(new Array());
    const BS_WT7 = reactive(new Array());
    const BL_WT7 = reactive(new Array());
    const BAOJI7 = reactive(new Array());
    let index_7: 1000;

    const bunker8 = reactive(new Array());
    const bunker_mat_code8 = reactive(new Array());
    const bunker_mat_name8 = reactive(new Array());
    const bunker_mat_type8 = reactive(new Array());
    const bunker_stock_wt8 = reactive(new Array());
    const buiker_stock_wt8 = reactive(new Array());
    const bunker_bunker_no8 = reactive(new Array());
    const bunker_rate8 = reactive(new Array());
    const bunker_type8 = reactive(new Array());
    const bunker_color_status8 = reactive(new Array());
    const bunker_l2_code8 = reactive(new Array());
    const bunker_mat_type_code8 = reactive(new Array());
    const bunker_wt_warn8 = reactive(new Array());
    const gm_wt8 = reactive(new Array());
    const up_value8 = reactive(new Array());
    const BS_WT8 = reactive(new Array());
    const BL_WT8 = reactive(new Array());
    const BAOJI8 = reactive(new Array());
    let index_8: 1000;

    const bunker9 = reactive(new Array());
    const bunker_mat_code9 = reactive(new Array());
    const bunker_mat_name9 = reactive(new Array());
    const bunker_mat_type9 = reactive(new Array());
    const bunker_stock_wt9 = reactive(new Array());
    const buiker_stock_wt9 = reactive(new Array());
    const bunker_bunker_no9 = reactive(new Array());
    const bunker_rate9 = reactive(new Array());
    const bunker_type9 = reactive(new Array());
    const bunker_color_status9 = reactive(new Array());
    const bunker_l2_code9 = reactive(new Array());
    const bunker_mat_type_code9 = reactive(new Array());
    const bunker_wt_warn9 = reactive(new Array());
    const gm_wt9 = reactive(new Array());
    const up_value9 = reactive(new Array());
    const BS_WT9 = reactive(new Array());
    const BL_WT9 = reactive(new Array());
    const BAOJI9 = reactive(new Array());
    let index_9: 1000;

    const bunker10 = reactive(new Array());
    const bunker_mat_code10 = reactive(new Array());
    const bunker_mat_name10 = reactive(new Array());
    const bunker_mat_type10 = reactive(new Array());
    const bunker_stock_wt10 = reactive(new Array());
    const buiker_stock_wt10 = reactive(new Array());
    const bunker_bunker_no10 = reactive(new Array());
    const bunker_rate10 = reactive(new Array());
    const bunker_type10 = reactive(new Array());
    const bunker_color_status10 = reactive(new Array());
    const bunker_l2_code10 = reactive(new Array());
    const bunker_mat_type_code10 = reactive(new Array());
    const bunker_wt_warn10 = reactive(new Array());
    const gm_wt10 = reactive(new Array());
    const up_value10 = reactive(new Array());
    const BS_WT10 = reactive(new Array());
    const BL_WT10 = reactive(new Array());
    const BAOJI10 = reactive(new Array());
    let index_10: 1000;

    const bunker11 = reactive(new Array());
    const bunker_mat_code11 = reactive(new Array());
    const bunker_mat_name11 = reactive(new Array());
    const bunker_mat_type11 = reactive(new Array());
    const bunker_stock_wt11 = reactive(new Array());
    const buiker_stock_wt11 = reactive(new Array());
    const bunker_bunker_no11 = reactive(new Array());
    const bunker_rate11 = reactive(new Array());
    const bunker_type11 = reactive(new Array());
    const bunker_color_status11 = reactive(new Array());
    const bunker_l2_code11 = reactive(new Array());
    const bunker_mat_type_code11 = reactive(new Array());
    const bunker_wt_warn11 = reactive(new Array());
    const gm_wt11 = reactive(new Array());
    const up_value11 = reactive(new Array());
    const BS_WT11 = reactive(new Array());
    const BL_WT11 = reactive(new Array());
    const BAOJI11 = reactive(new Array());
    let index_11: 1000;

    const bunker12 = reactive(new Array());
    const bunker_mat_code12 = reactive(new Array());
    const bunker_mat_name12 = reactive(new Array());
    const bunker_mat_type12 = reactive(new Array());
    const bunker_stock_wt12 = reactive(new Array());
    const buiker_stock_wt12 = reactive(new Array());
    const bunker_bunker_no12 = reactive(new Array());
    const bunker_rate12 = reactive(new Array());
    const bunker_type12 = reactive(new Array());
    const bunker_color_status12 = reactive(new Array());
    const bunker_l2_code12 = reactive(new Array());
    const bunker_mat_type_code12 = reactive(new Array());
    const bunker_wt_warn12 = reactive(new Array());
    const gm_wt12 = reactive(new Array());
    const up_value12 = reactive(new Array());
    const BS_WT12 = reactive(new Array());
    const BL_WT12 = reactive(new Array());
    const BAOJI12 = reactive(new Array());
    let index_12: 1000;

    const bunker13 = reactive(new Array());
    const bunker_mat_code13 = reactive(new Array());
    const bunker_mat_name13 = reactive(new Array());
    const bunker_mat_type13 = reactive(new Array());
    const bunker_stock_wt13 = reactive(new Array());
    const buiker_stock_wt13 = reactive(new Array());
    const bunker_bunker_no13 = reactive(new Array());
    const bunker_rate13 = reactive(new Array());
    const bunker_type13 = reactive(new Array());
    const bunker_color_status13 = reactive(new Array());
    const bunker_l2_code13 = reactive(new Array());
    const bunker_mat_type_code13 = reactive(new Array());
    const bunker_wt_warn13 = reactive(new Array());
    const gm_wt13 = reactive(new Array());
    const up_value13 = reactive(new Array());
    const BS_WT13 = reactive(new Array());
    const BL_WT13 = reactive(new Array());
    const BAOJI13 = reactive(new Array());
    let index_13: 1000;

    const initializeFlag = ref(0);

    const bunker_stk_no1 = reactive(new Array());
    const bunker_stk_no2 = reactive(new Array());
    const bunker_stk_no3 = reactive(new Array());
    const bunker_stk_no4 = reactive(new Array());
    const bunker_stk_no5 = reactive(new Array());
    const bunker_stk_no6 = reactive(new Array());
    const bunker_stk_no7 = reactive(new Array());
    const bunker_stk_no8 = reactive(new Array());
    const bunker_stk_no9 = reactive(new Array());
    const bunker_stk_no10 = reactive(new Array());
    const bunker_stk_no11 = reactive(new Array());
    const bunker_stk_no12 = reactive(new Array());
    const bunker_stk_no13 = reactive(new Array());
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    let gridView1: any;
    let gridView2: any;

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log(
        "efFormInfo.value.formPartition",
        efFormInfo.value.formPartition
      );
      console.log("efFormInfo.value.formName", efFormInfo.value.formName);
      if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams["PROGRAM_NAME"];
      }
      initializePage();
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("GridView1", false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSM85VT",
      "LayoutGroupFilter",
      ""
    );
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => {};
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        if (flag == "0") {
          popFreeAdd.setValue({ QUALITY_BATCH_NO: info.QUALITY_BATCH_NO });
          flag = "";
        } else if (flag == "1") {
          popFreeAdd.setValue({ MAT_CODE: info.MAT_CODE });
          // popFreeAdd.setValue({ MAT_NAME: info.MAT_NAME });
          popFreeAdd.setValue({ MAT_SIMPLE_ENAME: info.MAT_SIMPLE_ENAME });
          popFreeAdd.setValue({ MAT_TYPE: info.MAT_TYPE });
          flag = "";
        }
        xrEfDialogClose();
      }
    };
    const showContextMenu = async (item: any) => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },

        true
      );
      console.log("dfujgvfh", eiBlock);
    };
    // 变量定义
    const butClick1 = async (item: any, index: any) => {
      if (index != index_1) {
        bunker_color_status1[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status12[index_13] = false;

        index_1 = index;

        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick1 = async (index: any) => {
      if (index != index_1) {
        bunker_color_status1[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status12[index_13] = false;

        index_1 = index;

        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no1[index],
        STK_NO: bunker_stk_no1[index],
        MAT_CODE: bunker_mat_code1[index],
        MAT_NAME: bunker_mat_name1[index],
        BUNKER_TYPE: bunker_type1[index],
        MAT_SIMPLE_ENAME: bunker_l2_code1[index],
        MAT_TYPE: bunker_mat_type_code1[index],
        GM_VALUE: gm_wt1[index],
        STOCK_WT_WARN: bunker_wt_warn1[index],
        UPPER_LIMIT_VALUE: up_value1[index],
      });
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      // console.log('dfujgvfh333', data);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick2 = async (item: any, index: any) => {
      if (index != index_2) {
        bunker_color_status2[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_2 = index;

        index_1 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick2 = async (index: any) => {
      if (index != index_2) {
        bunker_color_status2[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_2 = index;

        index_1 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no2[index],
        STK_NO: bunker_stk_no2[index],
        MAT_CODE: bunker_mat_code2[index],
        MAT_NAME: bunker_mat_name2[index],
        BUNKER_TYPE: bunker_type2[index],
        MAT_SIMPLE_ENAME: bunker_l2_code2[index],
        MAT_TYPE: bunker_mat_type_code2[index],
        GM_VALUE: gm_wt2[index],
        STOCK_WT_WARN: bunker_wt_warn2[index],
        UPPER_LIMIT_VALUE: up_value2[index],
      });
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      // console.log('dfujgvfh333', data);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick3 = async (item: any, index: any) => {
      if (index != index_3) {
        bunker_color_status3[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_3 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick3 = async (index: any) => {
      if (index != index_3) {
        bunker_color_status3[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_3 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no3[index],
        STK_NO: bunker_stk_no3[index],
        MAT_CODE: bunker_mat_code3[index],
        MAT_NAME: bunker_mat_name3[index],
        BUNKER_TYPE: bunker_type3[index],
        MAT_SIMPLE_ENAME: bunker_l2_code3[index],
        MAT_TYPE: bunker_mat_type_code3[index],
        GM_VALUE: gm_wt3[index],
        STOCK_WT_WARN: bunker_wt_warn3[index],
        UPPER_LIMIT_VALUE: up_value3[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick4 = async (item: any, index: any) => {
      if (index != index_4) {
        bunker_color_status4[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_4 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick4 = async (index: any) => {
      if (index != index_4) {
        bunker_color_status4[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_4 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no4[index],
        STK_NO: bunker_stk_no4[index],
        MAT_CODE: bunker_mat_code4[index],
        MAT_NAME: bunker_mat_name4[index],
        BUNKER_TYPE: bunker_type4[index],
        MAT_SIMPLE_ENAME: bunker_l2_code4[index],
        MAT_TYPE: bunker_mat_type_code4[index],
        GM_VALUE: gm_wt4[index],
        STOCK_WT_WARN: bunker_wt_warn4[index],
        UPPER_LIMIT_VALUE: up_value4[index],
      });
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      // console.log('dfujgvfh333', data);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick5 = async (item: any, index: any) => {
      if (index != index_5) {
        bunker_color_status5[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_5 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick5 = async (index: any) => {
      if (index != index_5) {
        bunker_color_status5[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_5 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no5[index],
        STK_NO: bunker_stk_no5[index],
        MAT_CODE: bunker_mat_code5[index],
        MAT_NAME: bunker_mat_name5[index],
        BUNKER_TYPE: bunker_type5[index],
        MAT_SIMPLE_ENAME: bunker_l2_code5[index],
        MAT_TYPE: bunker_mat_type_code5[index],
        GM_VALUE: gm_wt5[index],
        STOCK_WT_WARN: bunker_wt_warn5[index],
        UPPER_LIMIT_VALUE: up_value5[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick6 = async (item: any, index: any) => {
      if (index != index_6) {
        bunker_color_status6[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_6 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick6 = async (index: any) => {
      if (index != index_6) {
        bunker_color_status6[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_6 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no6[index],
        STK_NO: bunker_stk_no6[index],
        MAT_CODE: bunker_mat_code6[index],
        MAT_NAME: bunker_mat_name6[index],
        BUNKER_TYPE: bunker_type6[index],
        MAT_SIMPLE_ENAME: bunker_l2_code6[index],
        MAT_TYPE: bunker_mat_type_code6[index],
        GM_VALUE: gm_wt6[index],
        STOCK_WT_WARN: bunker_wt_warn6[index],
        UPPER_LIMIT_VALUE: up_value6[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick7 = async (item: any, index: any) => {
      if (index != index_7) {
        bunker_color_status7[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_7 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick7 = async (index: any) => {
      if (index != index_7) {
        bunker_color_status7[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_7 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no7[index],
        STK_NO: bunker_stk_no7[index],
        MAT_CODE: bunker_mat_code7[index],
        MAT_NAME: bunker_mat_name7[index],
        BUNKER_TYPE: bunker_type7[index],
        MAT_SIMPLE_ENAME: bunker_l2_code7[index],
        MAT_TYPE: bunker_mat_type_code7[index],
        GM_VALUE: gm_wt7[index],
        STOCK_WT_WARN: bunker_wt_warn7[index],
        UPPER_LIMIT_VALUE: up_value7[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick8 = async (item: any, index: any) => {
      if (index != index_8) {
        bunker_color_status8[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_8 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick8 = async (index: any) => {
      if (index != index_8) {
        bunker_color_status8[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_8 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no8[index],
        STK_NO: bunker_stk_no8[index],
        MAT_CODE: bunker_mat_code8[index],
        MAT_NAME: bunker_mat_name8[index],
        BUNKER_TYPE: bunker_type8[index],
        MAT_SIMPLE_ENAME: bunker_l2_code8[index],
        MAT_TYPE: bunker_mat_type_code8[index],
        GM_VALUE: gm_wt8[index],
        STOCK_WT_WARN: bunker_wt_warn8[index],
        UPPER_LIMIT_VALUE: up_value8[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick9 = async (item: any, index: any) => {
      if (index != index_9) {
        bunker_color_status9[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_9 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick9 = async (index: any) => {
      if (index != index_9) {
        bunker_color_status9[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_9 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no9[index],
        STK_NO: bunker_stk_no9[index],
        MAT_CODE: bunker_mat_code9[index],
        MAT_NAME: bunker_mat_name9[index],
        BUNKER_TYPE: bunker_type9[index],
        MAT_SIMPLE_ENAME: bunker_l2_code9[index],
        MAT_TYPE: bunker_mat_type_code9[index],
        GM_VALUE: gm_wt9[index],
        STOCK_WT_WARN: bunker_wt_warn9[index],
        UPPER_LIMIT_VALUE: up_value9[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick10 = async (item: any, index: any) => {
      if (index != index_10) {
        bunker_color_status10[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_10 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick10 = async (index: any) => {
      if (index != index_10) {
        bunker_color_status10[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_10 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_11 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no10[index],
        STK_NO: bunker_stk_no10[index],
        MAT_CODE: bunker_mat_code10[index],
        MAT_NAME: bunker_mat_name10[index],
        BUNKER_TYPE: bunker_type10[index],
        MAT_SIMPLE_ENAME: bunker_l2_code10[index],
        MAT_TYPE: bunker_mat_type_code10[index],
        GM_VALUE: gm_wt10[index],
        STOCK_WT_WARN: bunker_wt_warn10[index],
        UPPER_LIMIT_VALUE: up_value10[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick11 = async (item: any, index: any) => {
      if (index != index_11) {
        bunker_color_status11[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_11 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick11 = async (index: any) => {
      if (index != index_11) {
        bunker_color_status11[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_11 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_12 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no11[index],
        STK_NO: bunker_stk_no11[index],
        MAT_CODE: bunker_mat_code11[index],
        MAT_NAME: bunker_mat_name11[index],
        BUNKER_TYPE: bunker_type11[index],
        MAT_SIMPLE_ENAME: bunker_l2_code11[index],
        MAT_TYPE: bunker_mat_type_code11[index],
        GM_VALUE: gm_wt11[index],
        STOCK_WT_WARN: bunker_wt_warn11[index],
        UPPER_LIMIT_VALUE: up_value11[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick12 = async (item: any, index: any) => {
      if (index != index_12) {
        bunker_color_status12[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_12 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_13 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick12 = async (index: any) => {
      if (index != index_12) {
        bunker_color_status12[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_12 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_13 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no12[index],
        STK_NO: bunker_stk_no12[index],
        MAT_CODE: bunker_mat_code12[index],
        MAT_NAME: bunker_mat_name12[index],
        BUNKER_TYPE: bunker_type12[index],
        MAT_SIMPLE_ENAME: bunker_l2_code12[index],
        MAT_TYPE: bunker_mat_type_code12[index],
        GM_VALUE: gm_wt12[index],
        STOCK_WT_WARN: bunker_wt_warn12[index],
        UPPER_LIMIT_VALUE: up_value12[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const butClick13 = async (item: any, index: any) => {
      if (index != index_13) {
        bunker_color_status13[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_13 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
      );
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dbbutClick13 = async (index: any) => {
      if (index != index_13) {
        bunker_color_status13[index] = true;

        bunker_color_status1[index_1] = false;
        bunker_color_status2[index_2] = false;
        bunker_color_status3[index_3] = false;
        bunker_color_status4[index_4] = false;
        bunker_color_status5[index_5] = false;
        bunker_color_status6[index_6] = false;
        bunker_color_status7[index_7] = false;
        bunker_color_status8[index_8] = false;
        bunker_color_status9[index_9] = false;
        bunker_color_status10[index_10] = false;
        bunker_color_status11[index_11] = false;
        bunker_color_status12[index_12] = false;
        bunker_color_status13[index_13] = false;

        index_13 = index;

        index_1 = 1000;
        index_2 = 1000;
        index_3 = 1000;
        index_4 = 1000;
        index_5 = 1000;
        index_6 = 1000;
        index_7 = 1000;
        index_8 = 1000;
        index_9 = 1000;
        index_10 = 1000;
        index_11 = 1000;
        index_12 = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no13[index],
        STK_NO: bunker_stk_no13[index],
        MAT_CODE: bunker_mat_code13[index],
        MAT_NAME: bunker_mat_name13[index],
        BUNKER_TYPE: bunker_type13[index],
        MAT_SIMPLE_ENAME: bunker_l2_code13[index],
        MAT_TYPE: bunker_mat_type_code13[index],
        GM_VALUE: gm_wt13[index],
        STOCK_WT_WARN: bunker_wt_warn13[index],
        UPPER_LIMIT_VALUE: up_value13[index],
      });
      // console.log('dfujgvfh333', data);
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          //   EFCallForm('MMSM81ADDV',{});

          const data = {};
          console.log("111", data);
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

          parentInfo.value = data;
          flag = "1";
          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        //console.log('dfujgvfh444', eiBlock);
        if (popFreeAdd.getEvent("ok")) {
          queryData(e);
        }
      });
    };
    const queryData = async (e: any) => {
      //1.压入查询条件
      const eiInfo = new EI.EIInfo();
      eiInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel),
        "Table1"
      );
      console.log("rxm", eiInfo);
      //控制台日志
      await erFormHelper
        .callService("mmsm60_upd", eiInfo, true, false,true)
        .then((res) => {
          console.log("调用结果", res);
          if (res.status >= 0) {
            erFormHelper.messageSuccess("修改成功!!");
            nextTick(() => {
              QueryBunker();
            });
          } else {
            erFormHelper.messageError("修改失败!!，失败原因:" + res.sys.msg);
          }
          nextTick(() => {});
        });
    };
    // const erFormHelper = reactive(new ErFormHelper());

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        "MMSM433S2N",
        "",
        ""
      );
      console.log("产线sql_mat_kind");
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          QueryBunker();
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    const QueryBunker = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker1.length = 0;
      bunker_bunker_no1.length = 0;
      bunker_mat_code1.length = 0;
      bunker_mat_name1.length = 0;
      bunker_mat_type1.length = 0;
      bunker_stock_wt1.length = 0;
      buiker_stock_wt1.length = 0;
      bunker_type1.length = 0;
      bunker_l2_code1.length = 0;
      bunker_mat_type_code1.length = 0;
      bunker_wt_warn1.length = 0;
      gm_wt1.length = 0;
      up_value1.length = 0;
      bunker_color_status1.length = 0;

      bunker2.length = 0;
      bunker_bunker_no2.length = 0;
      bunker_mat_code2.length = 0;
      bunker_mat_name2.length = 0;
      bunker_mat_type2.length = 0;
      bunker_stock_wt2.length = 0;
      buiker_stock_wt2.length = 0;
      bunker_type2.length = 0;
      bunker_l2_code2.length = 0;
      bunker_mat_type_code2.length = 0;
      bunker_wt_warn2.length = 0;
      gm_wt2.length = 0;
      up_value2.length = 0;
      bunker_color_status2.length = 0;

      bunker3.length = 0;
      bunker_bunker_no3.length = 0;
      bunker_mat_code3.length = 0;
      bunker_mat_name3.length = 0;
      bunker_mat_type3.length = 0;
      bunker_stock_wt3.length = 0;
      buiker_stock_wt3.length = 0;
      bunker_type3.length = 0;
      bunker_l2_code3.length = 0;
      bunker_mat_type_code3.length = 0;
      bunker_wt_warn3.length = 0;
      gm_wt3.length = 0;
      up_value3.length = 0;
      bunker_color_status3.length = 0;

      bunker4.length = 0;
      bunker_bunker_no4.length = 0;
      bunker_mat_code4.length = 0;
      bunker_mat_name4.length = 0;
      bunker_mat_type4.length = 0;
      bunker_stock_wt4.length = 0;
      buiker_stock_wt4.length = 0;
      bunker_type4.length = 0;
      bunker_l2_code4.length = 0;
      bunker_mat_type_code4.length = 0;
      bunker_wt_warn4.length = 0;
      gm_wt4.length = 0;
      up_value4.length = 0;
      bunker_color_status4.length = 0;

      bunker5.length = 0;
      bunker_bunker_no5.length = 0;
      bunker_mat_code5.length = 0;
      bunker_mat_name5.length = 0;
      bunker_mat_type5.length = 0;
      bunker_stock_wt5.length = 0;
      buiker_stock_wt5.length = 0;
      bunker_type5.length = 0;
      bunker_l2_code5.length = 0;
      bunker_mat_type_code5.length = 0;
      bunker_wt_warn5.length = 0;
      gm_wt5.length = 0;
      up_value5.length = 0;
      bunker_color_status5.length = 0;

      bunker6.length = 0;
      bunker_bunker_no6.length = 0;
      bunker_mat_code6.length = 0;
      bunker_mat_name6.length = 0;
      bunker_mat_type6.length = 0;
      bunker_stock_wt6.length = 0;
      buiker_stock_wt6.length = 0;
      bunker_type6.length = 0;
      bunker_l2_code6.length = 0;
      bunker_mat_type_code6.length = 0;
      bunker_wt_warn6.length = 0;
      gm_wt6.length = 0;
      up_value6.length = 0;
      bunker_color_status6.length = 0;

      bunker7.length = 0;
      bunker_bunker_no7.length = 0;
      bunker_mat_code7.length = 0;
      bunker_mat_name7.length = 0;
      bunker_mat_type7.length = 0;
      bunker_stock_wt7.length = 0;
      buiker_stock_wt7.length = 0;
      bunker_type7.length = 0;
      bunker_l2_code7.length = 0;
      bunker_mat_type_code7.length = 0;
      bunker_wt_warn7.length = 0;
      gm_wt7.length = 0;
      up_value7.length = 0;
      bunker_color_status7.length = 0;

      bunker8.length = 0;
      bunker_bunker_no8.length = 0;
      bunker_mat_code8.length = 0;
      bunker_mat_name8.length = 0;
      bunker_mat_type8.length = 0;
      bunker_stock_wt8.length = 0;
      buiker_stock_wt8.length = 0;
      bunker_type8.length = 0;
      bunker_l2_code8.length = 0;
      bunker_mat_type_code8.length = 0;
      bunker_wt_warn8.length = 0;
      gm_wt8.length = 0;
      up_value8.length = 0;
      bunker_color_status8.length = 0;

      bunker9.length = 0;
      bunker_bunker_no9.length = 0;
      bunker_mat_code9.length = 0;
      bunker_mat_name9.length = 0;
      bunker_mat_type9.length = 0;
      bunker_stock_wt9.length = 0;
      buiker_stock_wt9.length = 0;
      bunker_type9.length = 0;
      bunker_l2_code9.length = 0;
      bunker_mat_type_code9.length = 0;
      bunker_wt_warn9.length = 0;
      gm_wt9.length = 0;
      up_value9.length = 0;
      bunker_color_status9.length = 0;

      bunker10.length = 0;
      bunker_bunker_no10.length = 0;
      bunker_mat_code10.length = 0;
      bunker_mat_name10.length = 0;
      bunker_mat_type10.length = 0;
      bunker_stock_wt10.length = 0;
      buiker_stock_wt10.length = 0;
      bunker_type10.length = 0;
      bunker_l2_code10.length = 0;
      bunker_mat_type_code10.length = 0;
      bunker_wt_warn10.length = 0;
      gm_wt10.length = 0;
      up_value10.length = 0;
      bunker_color_status10.length = 0;

      bunker11.length = 0;
      bunker_bunker_no11.length = 0;
      bunker_mat_code11.length = 0;
      bunker_mat_name11.length = 0;
      bunker_mat_type11.length = 0;
      bunker_stock_wt11.length = 0;
      buiker_stock_wt11.length = 0;
      bunker_type11.length = 0;
      bunker_l2_code11.length = 0;
      bunker_mat_type_code11.length = 0;
      bunker_wt_warn11.length = 0;
      gm_wt11.length = 0;
      up_value11.length = 0;
      bunker_color_status11.length = 0;

      bunker12.length = 0;
      bunker_bunker_no12.length = 0;
      bunker_mat_code12.length = 0;
      bunker_mat_name12.length = 0;
      bunker_mat_type12.length = 0;
      bunker_stock_wt12.length = 0;
      buiker_stock_wt12.length = 0;
      bunker_type12.length = 0;
      bunker_l2_code12.length = 0;
      bunker_mat_type_code12.length = 0;
      bunker_wt_warn12.length = 0;
      gm_wt12.length = 0;
      up_value12.length = 0;
      bunker_color_status12.length = 0;

      bunker13.length = 0;
      bunker_bunker_no13.length = 0;
      bunker_mat_code13.length = 0;
      bunker_mat_name13.length = 0;
      bunker_mat_type13.length = 0;
      bunker_stock_wt13.length = 0;
      buiker_stock_wt13.length = 0;
      bunker_type13.length = 0;
      bunker_l2_code13.length = 0;
      bunker_mat_type_code13.length = 0;
      bunker_wt_warn13.length = 0;
      gm_wt13.length = 0;
      up_value13.length = 0;
      bunker_color_status13.length = 0;

      bunker_stk_no1.length = 0;
      bunker_stk_no2.length = 0;
      bunker_stk_no3.length = 0;
      bunker_stk_no4.length = 0;
      bunker_stk_no5.length = 0;
      bunker_stk_no6.length = 0;
      bunker_stk_no7.length = 0;
      bunker_stk_no8.length = 0;
      bunker_stk_no9.length = 0;
      bunker_stk_no10.length = 0;
      bunker_stk_no11.length = 0;
      bunker_stk_no12.length = 0;
      bunker_stk_no13.length = 0;

      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          CS_FLAG: "HCK",
        },
        true
      );

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm81fg_inq",
        inInfo
      ).then((res: EI.EIInfo) => {
        console.log("res123", res);
        for (let i = 0; i < res.getBlock(0).data.length; i++) {
          if ("B0" === "B0") {
            bunker1.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            BS_WT1.push(res.getBlock(0).data[i]["BL_WT"]);
            BL_WT1.push(res.getBlock(0).data[i]["BL_WT1"]);
            BAOJI1.push(res.getBlock(0).data[i]["BAOJI"]);
            bunker_bunker_no1.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_stk_no1.push(res.getBlock(0).data[i]["STK_NO"]);
            bunker_mat_code1.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name1.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_stock_wt1.push(res.getBlock(0).data[i]["STOCK_WT"]);
            buiker_stock_wt1.push(res.getBlock(0).data[i]["STOCK_WT"]);
            bunker_rate1.push(res.getBlock(0).data[i]["RATE"]);
            bunker_type1.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
            bunker_color_status1.push(false);
            bunker_mat_type1.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_l2_code1.push(res.getBlock(0).data[i]["BACK_C5"]);
            bunker_wt_warn1.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
            gm_wt1.push(res.getBlock(0).data[i]["GM_VALUE"]);
            up_value1.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
            bunker_mat_type_code1.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          } 
          // else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "B1") {
          //   bunker2.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT2.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT2.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI2.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no2.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no2.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code2.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name2.push(res.getBlock(0).data[i]["MAT_NAME"]);
          //   bunker_stock_wt2.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt2.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate2.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type2.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status2.push(false);
          //   bunker_mat_type2.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code2.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn2.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt2.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value2.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code2.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "B2") {
          //   bunker3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT3.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT3.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI3.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no3.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no3.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code3.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name3.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt3.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt3.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate3.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type3.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status3.push(false);
          //   bunker_mat_type3.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code3.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn3.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt3.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value3.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code3.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "E1") {
          //   bunker4.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT4.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT4.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI4.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no4.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no4.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code4.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name4.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt4.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt4.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate4.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type4.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status4.push(false);
          //   bunker_mat_type4.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code4.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn4.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt4.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value4.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code4.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "E2") {
          //   bunker5.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT5.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT5.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI5.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no5.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no5.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code5.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name5.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt5.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt5.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate5.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type5.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status5.push(false);
          //   bunker_mat_type5.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code5.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn5.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt5.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value5.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code5.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "A0") {
          //   bunker6.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT6.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT6.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI6.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no6.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no6.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code6.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name6.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt6.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt6.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate6.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type6.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status6.push(false);
          //   bunker_mat_type6.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code6.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn6.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt6.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value6.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code6.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "A1") {
          //   bunker7.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT7.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT7.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI7.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no7.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no7.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code7.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name7.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt7.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt7.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate7.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type7.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status7.push(false);
          //   bunker_mat_type7.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code7.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn7.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt7.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value7.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code7.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "A2") {
          //   bunker8.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT8.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT8.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI8.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no8.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no8.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code8.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name8.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt8.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt8.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate8.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type8.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status8.push(false);
          //   bunker_mat_type8.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code8.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn8.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt8.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value8.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code8.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "F1") {
          //   bunker9.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT9.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT9.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI9.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no9.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no9.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code9.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name9.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt9.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt9.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate9.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type9.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status9.push(false);
          //   bunker_mat_type9.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code9.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn9.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt9.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value9.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code9.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "F2") {
          //   bunker10.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT10.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT10.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI10.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no10.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no10.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code10.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name10.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt10.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt10.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate10.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type10.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status10.push(false);
          //   bunker_mat_type10.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code10.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn10.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt10.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value10.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code10.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // } else if (res.getBlock(0).data[i]["BUNKER_TYPE"] === "V1") {
          //   bunker11.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   BS_WT11.push(res.getBlock(0).data[i]["BL_WT"]);
          //   BL_WT11.push(res.getBlock(0).data[i]["BL_WT1"]);
          //   BAOJI11.push(res.getBlock(0).data[i]["BAOJI"]);
          //   bunker_bunker_no11.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          //   bunker_stk_no11.push(res.getBlock(0).data[i]["STK_NO"]);
          //   bunker_mat_code11.push(res.getBlock(0).data[i]["MAT_CODE"]);
          //   bunker_mat_name11.push(res.getBlock(0).data[i]["MAT_NAME"]);

          //   bunker_stock_wt11.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   buiker_stock_wt11.push(res.getBlock(0).data[i]["STOCK_WT"]);
          //   bunker_rate11.push(res.getBlock(0).data[i]["RATE"]);
          //   bunker_type11.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          //   bunker_color_status11.push(false);
          //   bunker_mat_type11.push(res.getBlock(0).data[i]["BASE_NAME"]);
          //   bunker_l2_code11.push(res.getBlock(0).data[i]["BACK_C5"]);
          //   bunker_wt_warn11.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          //   gm_wt11.push(res.getBlock(0).data[i]["GM_VALUE"]);
          //   up_value11.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
          //   bunker_mat_type_code11.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          // }
        }
        console.log("SW325", bunker11);
      });
    };
    onMounted(() => {});

    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView2"); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
          });
        }
      }
      console.log("333");
    };

    const queryDetailInfo = async (currentRowInfo: any) => {
      // 成分信息
      console.log("4444");
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm81al_inq",
        eiInfo1,
        true,
        false,
        true
      );
      console.log("333");
      console.log("111222333", eiInfo1);

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView2");
      }
    };

    const F2_DO = async (e: any) => {
      QueryBunker();
    };
    const F3_DO = async (e: any) => {
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
      // popFreeAdd.ReceiveData(selectedRows);
      // ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
      //   if(popFreeAdd.getEvent('ok'))
      //   {
      //     // queryData(e);
      //   }
      // })
    };
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      F2_DO,
      F3_DO,
      gridView1,
      gridView2,
      GridView1FocusChanged,
      bunker,
      bunker1,
      bunker_rate1,
      bunker_mat_code1,
      bunker_mat_name1,
      bunker_mat_type1,
      bunker_stock_wt1,
      buiker_stock_wt1,
      bunker_bunker_no1,
      bunker_l2_code1,
      bunker_mat_type_code1,
      bunker_color_status1,
      BS_WT1,
      BL_WT1,
      BAOJI1,

      bunker2,
      bunker_rate2,
      bunker_mat_code2,
      bunker_mat_name2,
      bunker_mat_type2,
      bunker_stock_wt2,
      buiker_stock_wt2,
      bunker_bunker_no2,
      bunker_l2_code2,
      bunker_mat_type_code2,
      bunker_color_status2,
      BS_WT2,
      BL_WT2,
      BAOJI2,

      bunker3,
      bunker_rate3,
      bunker_mat_code3,
      bunker_mat_name3,
      bunker_mat_type3,
      bunker_stock_wt3,
      buiker_stock_wt3,
      bunker_bunker_no3,
      bunker_l2_code3,
      bunker_mat_type_code3,
      bunker_color_status3,
      BS_WT3,
      BL_WT3,
      BAOJI3,

      bunker4,
      bunker_rate4,
      bunker_mat_code4,
      bunker_mat_name4,
      bunker_mat_type4,
      bunker_stock_wt4,
      buiker_stock_wt4,
      bunker_bunker_no4,
      bunker_l2_code4,
      bunker_mat_type_code4,
      bunker_color_status4,
      BS_WT4,
      BL_WT4,
      BAOJI4,

      bunker5,
      bunker_rate5,
      bunker_mat_code5,
      bunker_mat_name5,
      bunker_mat_type5,
      bunker_stock_wt5,
      buiker_stock_wt5,
      bunker_bunker_no5,
      bunker_l2_code5,
      bunker_mat_type_code5,
      bunker_color_status5,
      BS_WT5,
      BL_WT5,
      BAOJI5,

      bunker6,
      bunker_rate6,
      bunker_mat_code6,
      bunker_mat_name6,
      bunker_mat_type6,
      bunker_stock_wt6,
      buiker_stock_wt6,
      bunker_bunker_no6,
      bunker_l2_code6,
      bunker_mat_type_code6,
      bunker_color_status6,
      BS_WT6,
      BL_WT6,
      BAOJI6,

      bunker7,
      bunker_rate7,
      bunker_mat_code7,
      bunker_mat_name7,
      bunker_mat_type7,
      bunker_stock_wt7,
      buiker_stock_wt7,
      bunker_bunker_no7,
      bunker_l2_code7,
      bunker_mat_type_code7,
      bunker_color_status7,
      BS_WT7,
      BL_WT7,
      BAOJI7,

      bunker8,
      bunker_rate8,
      bunker_mat_code8,
      bunker_mat_name8,
      bunker_mat_type8,
      bunker_stock_wt8,
      buiker_stock_wt8,
      bunker_bunker_no8,
      bunker_l2_code8,
      bunker_mat_type_code8,
      bunker_color_status8,
      BS_WT8,
      BL_WT8,
      BAOJI8,

      bunker9,
      bunker_rate9,
      bunker_mat_code9,
      bunker_mat_name9,
      bunker_mat_type9,
      bunker_stock_wt9,
      buiker_stock_wt9,
      bunker_bunker_no9,
      bunker_l2_code9,
      bunker_mat_type_code9,
      bunker_color_status9,
      BS_WT9,
      BL_WT9,
      BAOJI9,

      bunker10,
      bunker_rate10,
      bunker_mat_code10,
      bunker_mat_name10,
      bunker_mat_type10,
      bunker_stock_wt10,
      buiker_stock_wt10,
      bunker_bunker_no10,
      bunker_l2_code10,
      bunker_mat_type_code10,
      bunker_color_status10,
      BS_WT10,
      BL_WT10,
      BAOJI10,

      bunker11,
      bunker_rate11,
      bunker_mat_code11,
      bunker_mat_name11,
      bunker_mat_type11,
      bunker_stock_wt11,
      buiker_stock_wt11,
      bunker_bunker_no11,
      bunker_l2_code11,
      bunker_mat_type_code11,
      bunker_color_status11,
      BS_WT11,
      BL_WT11,
      BAOJI11,

      bunker12,
      bunker_rate12,
      bunker_mat_code12,
      bunker_mat_name12,
      bunker_mat_type12,
      bunker_stock_wt12,
      buiker_stock_wt12,
      bunker_bunker_no12,
      bunker_l2_code12,
      bunker_mat_type_code12,
      bunker_color_status12,
      BS_WT12,
      BL_WT12,
      BAOJI12,

      bunker13,
      bunker_rate13,
      bunker_mat_code13,
      bunker_mat_name13,
      bunker_mat_type13,
      bunker_stock_wt13,
      buiker_stock_wt13,
      bunker_bunker_no13,
      bunker_l2_code13,
      bunker_mat_type_code13,
      bunker_color_status13,
      BS_WT13,
      BL_WT13,
      BAOJI13,

      butClick1,
      dbbutClick1,
      butClick2,
      dbbutClick2,
      butClick3,
      dbbutClick3,
      butClick4,
      dbbutClick4,
      butClick5,
      dbbutClick5,
      butClick6,
      dbbutClick6,
      butClick7,
      dbbutClick7,
      butClick8,
      dbbutClick8,
      butClick9,
      dbbutClick9,
      butClick10,
      dbbutClick10,
      butClick11,
      dbbutClick11,
      butClick12,
      dbbutClick12,
      butClick13,
      dbbutClick13,

      showContextMenu,
      parentInfo,
      getChildInfo,
      xrEfDialogClose,
      dialogFormName,
      dialogVisible,
    };
  },
});
