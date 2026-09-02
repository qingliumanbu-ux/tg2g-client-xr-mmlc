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
  name: "MMSM408N1S2N",
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

    const parentInfo = ref({});
    let flag: any;
    const dialogVisible = ref(false);
    const dialogFormName = ref(""); // 弹出画面的画面名
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

    const bunker_J = reactive(new Array());
    const bunker_J_type = reactive(new Array());
    const bunker_J_color_status = reactive(new Array());
    const bunker_mat_code_J = reactive(new Array());
    const bunker_mat_name_J = reactive(new Array());
    const bunker_mat_type_J = reactive(new Array());
    const bunker_stock_wt_J = reactive(new Array());
    const buiker_stock_wt_J = reactive(new Array());
    const bunker_bunker_no_J = reactive(new Array());
    const bunker_rate_J = reactive(new Array());
    const bunker_l2_code_J = reactive(new Array());
    const bunker_mat_type_code_J = reactive(new Array());
    const bunker_wt_warn_J = reactive(new Array());
    const gm_wt_J = reactive(new Array());
    const up_value_J = reactive(new Array());
    let index_j: 1000;

    const bunker_K = reactive(new Array());
    const bunker_K_type = reactive(new Array());
    const bunker_K_color_status = reactive(new Array());
    const bunker_mat_code_K = reactive(new Array());
    const bunker_mat_name_K = reactive(new Array());
    const bunker_mat_type_K = reactive(new Array());
    const bunker_stock_wt_K = reactive(new Array());
    const buiker_stock_wt_K = reactive(new Array());
    const bunker_bunker_no_K = reactive(new Array());
    const bunker_rate_K = reactive(new Array());
    const bunker_l2_code_K = reactive(new Array());
    const bunker_mat_type_code_K = reactive(new Array());
    const bunker_wt_warn_K = reactive(new Array());
    const gm_wt_K = reactive(new Array());
    const up_value_K = reactive(new Array());
    let index_k: 1000;

    const bunker_V = reactive(new Array());
    const bunker_V_type = reactive(new Array());
    const bunker_V_color_status = reactive(new Array());
    const bunker_mat_code_V = reactive(new Array());
    const bunker_mat_name_V = reactive(new Array());
    const bunker_mat_type_V = reactive(new Array());
    const bunker_stock_wt_V = reactive(new Array());
    const buiker_stock_wt_V = reactive(new Array());
    const bunker_bunker_no_V = reactive(new Array());
    const bunker_rate_V = reactive(new Array());
    const bunker_l2_code_V = reactive(new Array());
    const bunker_mat_type_code_V = reactive(new Array());
    const bunker_wt_warn_V = reactive(new Array());
    const gm_wt_V = reactive(new Array());
    const up_value_V = reactive(new Array());
    let index_v: 1000;

    const bunker_M = reactive(new Array());
    const bunker_M_type = reactive(new Array());
    const bunker_M_color_status = reactive(new Array());
    const bunker_mat_code_M = reactive(new Array());
    const bunker_mat_name_M = reactive(new Array());
    const bunker_mat_type_M = reactive(new Array());
    const bunker_stock_wt_M = reactive(new Array());
    const buiker_stock_wt_M = reactive(new Array());
    const bunker_bunker_no_M = reactive(new Array());
    const bunker_rate_M = reactive(new Array());
    const bunker_l2_code_M = reactive(new Array());
    const bunker_mat_type_code_M = reactive(new Array());
    const bunker_wt_warn_M = reactive(new Array());
    const gm_wt_M = reactive(new Array());
    const up_value_M = reactive(new Array());
    let index_m: 1000;

    const bunker_stk_no_J = reactive(new Array());
    const bunker_stk_no_K = reactive(new Array());
    const bunker_stk_no_V = reactive(new Array());
    const bunker_stk_no_M = reactive(new Array());

    const initializeFlag = ref(0);

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
        efFormInfo.value.formPartition,
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
      "",
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

        true,
      );
      console.log("dfujgvfh", eiBlock);
    };
    // 变量定义

    const butClick_J = async (item: any, index: any) => {
      if (index != index_j) {
        bunker_J_color_status[index] = true;

        bunker_J_color_status[index_j] = false;
        bunker_V_color_status[index_v] = false;
        bunker_M_color_status[index_m] = false;
        bunker_K_color_status[index_k] = false;
        index_j = index;
        index_k = 1000;
        index_v = 1000;
        index_m = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true,
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true,
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

    const dbbutClick_J = async (index: any) => {
      if (index != index_j) {
        bunker_J_color_status[index] = true;

        bunker_J_color_status[index_j] = false;
        bunker_V_color_status[index_v] = false;
        bunker_M_color_status[index_m] = false;
        bunker_K_color_status[index_k] = false;

        index_j = index;

        index_k = 1000;
        index_v = 1000;
        index_m = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no_J[index],
        STK_NO: bunker_stk_no_J[index],
        MAT_CODE: bunker_mat_code_J[index],
        MAT_NAME: bunker_mat_name_J[index],
        BUNKER_TYPE: bunker_J_type[index],
        MAT_SIMPLE_ENAME: bunker_l2_code_J[index],
        MAT_TYPE: bunker_mat_type_code_J[index],
        GM_VALUE: gm_wt_J[index],
        STOCK_WT_WARN: bunker_wt_warn_J[index],
        UPPER_LIMIT_VALUE: up_value_J[index],
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
    const butClick_K = async (item: any, index: any) => {
      if (index != index_k) {
        bunker_K_color_status[index] = true;
        bunker_K_color_status[index_k] = false;
        bunker_V_color_status[index_v] = false;
        bunker_M_color_status[index_m] = false;
        bunker_J_color_status[index_j] = false;
        index_k = index;
        index_j = 1000;
        index_v = 1000;
        index_m = 1000;
      }

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true,
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true,
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

    const dbbutClick_K = async (index: any) => {
      if (index != index_k) {
        bunker_K_color_status[index] = true;
        bunker_K_color_status[index_k] = false;
        bunker_V_color_status[index_v] = false;
        bunker_M_color_status[index_m] = false;
        bunker_J_color_status[index_j] = false;
        index_k = index;
        index_j = 1000;
        index_v = 1000;
        index_m = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no_K[index],
        STK_NO: bunker_stk_no_K[index],
        MAT_CODE: bunker_mat_code_K[index],
        MAT_NAME: bunker_mat_name_K[index],
        BUNKER_TYPE: bunker_K_type[index],
        MAT_SIMPLE_ENAME: bunker_l2_code_K[index],
        MAT_TYPE: bunker_mat_type_code_K[index],
        GM_VALUE: gm_wt_K[index],
        STOCK_WT_WARN: bunker_wt_warn_K[index],
        UPPER_LIMIT_VALUE: up_value_K[index],
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

    const butClick_V = async (item: any, index: any) => {
      if (index != index_v) {
        bunker_V_color_status[index] = true;
        bunker_V_color_status[index_v] = false;
        bunker_K_color_status[index_k] = false;
        bunker_M_color_status[index_m] = false;
        bunker_J_color_status[index_j] = false;
        index_v = index;
        index_j = 1000;
        index_k = 1000;
        index_m = 1000;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item,
        },
        true,
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true,
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

    const dbbutClick_V = async (index: any) => {
      if (index != index_v) {
        bunker_V_color_status[index] = true;
        bunker_V_color_status[index_v] = false;
        bunker_K_color_status[index_k] = false;
        bunker_M_color_status[index_m] = false;
        bunker_J_color_status[index_j] = false;
        index_v = index;
        index_j = 1000;
        index_k = 1000;
        index_m = 1000;
      }
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no_V[index],
        STK_NO: bunker_stk_no_V[index],
        MAT_CODE: bunker_mat_code_V[index],
        MAT_NAME: bunker_mat_name_V[index],
        BUNKER_TYPE: bunker_V_type[index],
        MAT_SIMPLE_ENAME: bunker_l2_code_V[index],
        MAT_TYPE: bunker_mat_type_code_V[index],
        GM_VALUE: gm_wt_V[index],
        STOCK_WT_WARN: bunker_wt_warn_V[index],
        UPPER_LIMIT_VALUE: up_value_V[index],
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

    const queryData = async (e: any) => {
      //1.压入查询条件
      const eiInfo = new EI.EIInfo();
      eiInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel),
        "Table1",
      );
      console.log("rxm", eiInfo);
      //控制台日志
      await erFormHelper
        .callService("mmsm60_upd", eiInfo, true, false, true)
        .then((res) => {
          console.log("调用结果", res);
          if (res.status >= 0) {
            erFormHelper.messageSuccess("修改成功!!");
            nextTick(() => {
              QueryBunker_J();
              QueryBunker_K();
              QueryBunker_V();
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
        "MMSM408N1S2N",
        "",
        "",
      );
      console.log("产线sql_mat_kind");
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        await nextTick();
        // 获取画面上的主要控件信息
        QueryBunker_J();
        QueryBunker_K();
        QueryBunker_V();
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!",
        );
      }
    };
    const QueryBunker_J = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker_J.length = 0;
      bunker_J_type.length = 0;
      bunker_l2_code_J.length = 0;
      bunker_mat_type_code_J.length = 0;
      bunker_wt_warn_J.length = 0;
      gm_wt_J.length = 0;
      bunker_J_color_status.length = 0;
      bunker_bunker_no_J.length = 0;
      bunker_mat_code_J.length = 0;
      bunker_mat_name_J.length = 0;
      bunker_mat_type_J.length = 0;
      bunker_stock_wt_J.length = 0;
      buiker_stock_wt_J.length = 0;
      up_value_J.length = 0;
      bunker_stk_no_J.length = 0;
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D1",
        },
        true,
      );

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm408n_inq",
        inInfo,
      ).then((res: EI.EIInfo) => {
        console.log("res123", res);
        for (let i = 0; i < res.getBlock(0).data.length; i++) {
          bunker_J_color_status.push(false);
          bunker_J.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_stk_no_J.push(res.getBlock(0).data[i]["STK_NO"]);
          bunker_J_type.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          bunker_bunker_no_J.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_mat_code_J.push(res.getBlock(0).data[i]["MAT_CODE"]);
          bunker_mat_name_J.push(res.getBlock(0).data[i]["MAT_NAME"]);
          bunker_mat_type_J.push(res.getBlock(0).data[i]["BASE_NAME"]);
          bunker_l2_code_J.push(res.getBlock(0).data[i]["BACK_C5"]);
          bunker_mat_type_code_J.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          bunker_wt_warn_J.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          gm_wt_J.push(res.getBlock(0).data[i]["GM_VALUE"]);
          bunker_stock_wt_J.push(res.getBlock(0).data[i]["STOCK_WT"]);
          buiker_stock_wt_J.push(res.getBlock(0).data[i]["STOCK_WT"]);
          bunker_rate_J.push(res.getBlock(0).data[i]["RATE"]);
          up_value_J.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
        }
      });
    };

    const QueryBunker_K = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      bunker_K.length = 0;
      bunker_K_type.length = 0;
      bunker_l2_code_K.length = 0;
      bunker_mat_type_code_K.length = 0;
      bunker_wt_warn_K.length = 0;
      gm_wt_K.length = 0;
      bunker_K_color_status.length = 0;
      bunker_bunker_no_K.length = 0;
      bunker_mat_code_K.length = 0;
      bunker_mat_name_K.length = 0;
      bunker_mat_type_K.length = 0;
      bunker_stock_wt_K.length = 0;
      buiker_stock_wt_K.length = 0;
      bunker_stk_no_K.length = 0;
      up_value_K.length = 0;
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D2",
        },
        true,
      );

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm408n_inq",
        inInfo,
      ).then((res: EI.EIInfo) => {
        console.log("res123", res);
        for (let i = 0; i < res.getBlock(0).data.length; i++) {
          bunker_K.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_K_type.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          bunker_K_color_status.push(false);
          bunker_bunker_no_K.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_stk_no_K.push(res.getBlock(0).data[i]["STK_NO"]);
          bunker_mat_code_K.push(res.getBlock(0).data[i]["MAT_CODE"]);
          bunker_mat_name_K.push(res.getBlock(0).data[i]["MAT_NAME"]);
          bunker_mat_type_K.push(res.getBlock(0).data[i]["BASE_NAME"]);
          bunker_l2_code_K.push(res.getBlock(0).data[i]["BACK_C5"]);
          bunker_mat_type_code_K.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          bunker_wt_warn_K.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          gm_wt_K.push(res.getBlock(0).data[i]["GM_VALUE"]);
          bunker_stock_wt_K.push(res.getBlock(0).data[i]["STOCK_WT"]);
          buiker_stock_wt_K.push(res.getBlock(0).data[i]["STOCK_WT"]);
          bunker_rate_K.push(res.getBlock(0).data[i]["RATE"]);
          up_value_K.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
        }
      });
    };

    const QueryBunker_V = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      // bunker.length = 0;
      // bunker_flag.length = 0;
      bunker_V.length = 0;
      bunker_V_type.length = 0;
      bunker_l2_code_V.length = 0;
      bunker_mat_type_code_V.length = 0;
      bunker_wt_warn_V.length = 0;
      gm_wt_V.length = 0;
      bunker_V_color_status.length = 0;
      bunker_bunker_no_V.length = 0;
      bunker_mat_code_V.length = 0;
      bunker_mat_name_V.length = 0;
      bunker_mat_type_V.length = 0;
      bunker_stock_wt_V.length = 0;
      buiker_stock_wt_V.length = 0;
      bunker_stk_no_V.length = 0;
      up_value_V.length = 0;
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          BACK_C6: "MMSM408N1S2N",
          CS_FLAG: "D3",
        },
        true,
      );

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm408n_inq",
        inInfo,
      ).then((res: EI.EIInfo) => {
        console.log("res123", res);
        for (let i = 0; i < res.getBlock(0).data.length; i++) {
          bunker_V.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_V_type.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
          bunker_V_color_status.push(false);
          bunker_bunker_no_V.push(res.getBlock(0).data[i]["BUNKER_NO"]);
          bunker_stk_no_V.push(res.getBlock(0).data[i]["STK_NO"]);
          bunker_mat_code_V.push(res.getBlock(0).data[i]["MAT_CODE"]);
          bunker_mat_name_V.push(res.getBlock(0).data[i]["MAT_NAME"]);
          bunker_mat_type_V.push(res.getBlock(0).data[i]["BASE_NAME"]);
          bunker_l2_code_V.push(res.getBlock(0).data[i]["BACK_C5"]);
          bunker_mat_type_code_V.push(res.getBlock(0).data[i]["MAT_TYPE"]);
          bunker_wt_warn_V.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
          gm_wt_V.push(res.getBlock(0).data[i]["GM_VALUE"]);
          bunker_stock_wt_V.push(res.getBlock(0).data[i]["STOCK_WT"]);
          buiker_stock_wt_V.push(res.getBlock(0).data[i]["STOCK_WT"]);
          bunker_rate_V.push(res.getBlock(0).data[i]["RATE"]);
          up_value_V.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
        }
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
        true,
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
      QueryBunker_J();
      QueryBunker_K();
      QueryBunker_V();
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
    const deflautColor = async () => {
      for (let i in bunker_K_color_status) {
        bunker_K_color_status[i] === false;
      }
      for (let i in bunker_V_color_status) {
        bunker_V_color_status[i] === false;
      }
      for (let i in bunker_M_color_status) {
        bunker_M_color_status[i] === false;
      }
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
      bunker_J,
      bunker_rate_J,
      bunker_mat_code_J,
      bunker_mat_name_J,
      bunker_mat_type_J,
      bunker_stock_wt_J,
      buiker_stock_wt_J,
      bunker_bunker_no_J,
      bunker_l2_code_J,
      bunker_mat_type_code_J,

      bunker_K,
      bunker_rate_K,
      bunker_mat_code_K,
      bunker_mat_name_K,
      bunker_mat_type_K,
      bunker_stock_wt_K,
      buiker_stock_wt_K,
      bunker_bunker_no_K,
      bunker_l2_code_K,
      bunker_mat_type_code_K,

      bunker_V,
      bunker_rate_V,
      bunker_mat_code_V,
      bunker_mat_name_V,
      bunker_mat_type_V,
      bunker_stock_wt_V,
      buiker_stock_wt_V,
      bunker_bunker_no_V,
      bunker_l2_code_V,
      bunker_mat_type_code_V,

      bunker_J_color_status,
      bunker_K_color_status,
      bunker_V_color_status,
      bunker_M_color_status,

      butClick_J,
      dbbutClick_J,
      butClick_K,
      dbbutClick_K,
      butClick_V,
      dbbutClick_V,
      showContextMenu,
      parentInfo,
      getChildInfo,
      xrEfDialogClose,
      dialogFormName,
      dialogVisible,
    };
  },
});
