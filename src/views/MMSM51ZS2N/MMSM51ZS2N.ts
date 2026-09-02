/*
 * @Description:
 * @Author: Edward
 * @Date: 2022-06-02 17:21:37
 * @LastEditors: zhangTing
 * @LastEditTime: 2023-07-19 15:13:06
 */

// import { EI, EIManager } from "EIX/ei";
// import { ER } from "ERX/Er";
// import { SiUtils } from "ERX/SiUtils";
// import { FiUtils } from "ERX/FiUtils";
// import xrEfForm from "EFX/xrEfForm";
// import xrEfPanel from "EFX/xrEfPanel";
// import erLayout from "ERX/ErLayout";
// import erGrid from "ERX/ErGrid";

// import { useRoute } from "vue-router";
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
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
import MMSM81FG from "../MMSM81FG/MMSM81FG.vue";
import MMSM81518ADDV from "../MMSM81518ADDV/MMSM81518ADDV.vue";
import MMSM408N1ADDV from "../MMSM408N1ADDV/MMSM408N1ADDV.vue";
import MMSM408N2ADDV from "../MMSM408N2ADDV/MMSM408N2ADDV.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MMSM51Z",
  components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    MMSM81ADDV,
    MMSM81518ADDV,
    MMSM408N1ADDV,
    MMSM408N2ADDV,
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

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    // let gridView1!: kendo.ui.Grid;

    let popFreeEdit: ER.PopFreeHelper;
    let popFreeEdit_Q: ER.PopFreeHelper;
    let gridView1: any;
    const editable = ref(false);
    const LayoutGroupFilter = ref("");
    const xrEfDialogRef = ref<any>(null);

    const i_func_id_q = ref("");
    const i_func_id_p = ref("");
    // let i_func_id_p;
    let i_func_id;
    let i_service_f2: any;
    let i_service_f3: any;
    let i_service_f4: any;
    let i_service_f5: any;
    let i_service_f6: any;
    let i_service_f7: any;
    let i_service_f12: any;
    let i_formlayout: any;
    let i_pop_flag: any;
    let i_factory_div: any;
    let i_handle_div: any;
    let i_mat_kind: any;
    let sql_mat_kind: any;
    let i_formwidth: any;
    let i_formheight: any;
    let i_colcount: any;
    let cs_OkClick = "";
    let i_proc_div = "";
    let formPartition: string;
    let formName: string;
    let i_form_ename = ""; //画面英文名
    let rateWidth = "";
    let rateHeight = "";
    let outInfo1: EI.EIInfo;
    let outInfo2: EI.EIInfo;
    const bunker_NO = reactive(new Array());
    // console.log("111",efFormInfo.value.formName);
    const parentInfo = ref({});
    let formNamePara = ref("");

    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);
    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSM81VT",
      "LayoutGroupFilter1"
    );
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log("333", e);
      console.log("efFormInfo.value.formPartition", formPartition);
      console.log("efFormInfo.value.formName", formName);
      QueryPara();
      queryMainGrid();
      if (formName === "MMSM511S2N") {
        //废钢料场-废钢合金收货
        rateWidth = "5.5";
        rateHeight = "33.5";
      } else if (formName === "MMSM512S2N") {
        //原材料库-汽车收货
        rateWidth = "10";
        rateHeight = "50";
      } else if (formName === "MMSM513S2N") {
        //原材料库-火车收货
        rateWidth = "4.5";
        rateHeight = "33.5";
      } else if (formName === "MMSM514S2N") {
        //镍板库-镍板收货
        rateWidth = "100";
        rateHeight = "100";
      } else if (formName === "MMSM51RS2N") {
        //镍板库收货
        rateWidth = "6.6";
        rateHeight = "50";
      } else if (formName === "MMSM515S2N") {
        //虚拟料仓收货
        rateWidth = "10";
        rateHeight = "33.5";
      } else if (formName === "MMSM516S2N") {
        //原材料库-手投料/其他
        rateWidth = "100";
        rateHeight = "100";
      } else if (formName === "MMSM51BS2N") {
        //原材料库-手投料/其他
        rateWidth = "100";
        rateHeight = "100";
      } else if (formName === "MMSM51CS2N") {
        //DES料仓收货
        rateWidth = "50";
        rateHeight = "33.5";
      } else if (formName === "MMSM51NS2N") {
        //3#LF料仓收货
        rateWidth = "11.1";
        rateHeight = "50";
      } else if (formName === "MMSM51HS2N") {
        //VOD收货
        rateWidth = "14.2";
        rateHeight = "50";
      } else if (formName === "MMSM51PS2N") {
        //RH收货
        rateWidth = "9";
        rateHeight = "50";
      } else if (formName === "MMSM51TS2N") {
        //IF虚拟收货
        rateWidth = "6.6";
        rateHeight = "25";
      } else if (formName === "MMSM51MS2N") {
        //LTS收货
        rateWidth = "12.5";
        rateHeight = "50";
      }
    };

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };

    //通过炼钢配置表，进行模板画面参数查询
    const QueryPara = async () => {
      // const inInfo = new EI.EIInfo();
      // inInfo.addBlock(
      //   ErUtils.buildEiBlock([
      //     {
      //       PROGRAM_NAME: i_form_ename
      //     }
      //   ])
      // );
      console.log("789");
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          PROGRAM_NAME: efFormInfo.value.formName,
          // PROGRAM_NAME: programName
        },
        true
      );
      console.log("323", efFormInfo.value.formName);

      console.log("产线sql_mat_kind", 1111);
      const outInfo = await erFormHelper.callService(
        "mmsmpara_inq",
        inInfo,
        false,
        true
      );
      for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id_q") {
          i_func_id_q.value = <string>outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id_p") {
          i_func_id_p.value = <string>outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id") {
          i_func_id = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f2") {
          i_service_f2 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f3") {
          i_service_f3 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f4") {
          i_service_f4 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f5") {
          i_service_f5 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f6") {
          i_service_f6 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f7") {
          i_service_f7 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f12") {
          i_service_f12 = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "formlayout") {
          i_formlayout = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "pop_flag") {
          i_pop_flag = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "factory_div") {
          i_factory_div = outInfo.getBlock(0).data[i]["PARA"];
        }
        let i_mat: any;
        i_mat = outInfo.getBlock(0).data[i]["PARA_NAME"];
        if (i_mat.indexOf("mat_kind") > -1) {
          console.log("11", 22);
          i_mat_kind = outInfo.getBlock(0).data[i]["PARA"]?.toString().trim();
          console.log("22", 22);

          if (sql_mat_kind != "") {
            sql_mat_kind += "'" + i_mat_kind + "',";
          }
          console.log("产线sql_mat_kind21", sql_mat_kind);
        }
        if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "handle_div") {
          i_handle_div = outInfo.getBlock(0).data[i]["PARA"];
        }
        if (i_formlayout != "" && i_formlayout != null) {
          formlayout.value = i_formlayout.split(",");
          i_formwidth = formlayout.value[0];
          i_formheight = formlayout.value[1];
          i_colcount = formlayout.value[2];
        }
      }
      console.log("结束", 22);
      nextTick(() => {
        initializePage();
      });
    };

    const queryMainGrid = async () => {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
        return false;
      }
      //清空grid数据
      erFormHelper.clearLayoutOrGridData("gridView1");
      //获取查询条件dt
      const inInfo = new EI.EIInfo();
      // const queryCondition =
      //   erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      // inInfo.addBlock(queryCondition);

      const outInfo = await erFormHelper.callService(
        "mmsm81f3_zxhfg_inq",
        inInfo,
        true,
        true,
        true
      );
      // eiBlock2.pushData({ ...currentRowInfo, TABLE_TYPE: 'TMMSM2B' }, true);
      for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
        outInfo.getBlock(0).data[i]["MEASURE_UNIT"] = "TON";
      }
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };
    // 关闭弹框监听
    // const LayoutGroupFilter_NO = ref('');
    let LayoutGroupFilter_NO: string;
    const xrEfDialogClose = () => {
      // erFormHelper.setControlValue("LayoutGroupFilter", 'BUNKER_NO', 'A02');
      erFormHelper.setControlValue(
        "LayoutGroupFilter",
        "BUNKER_NO",
        LayoutGroupFilter_NO
      );
      // console.log("bunker_NO11111", bunker_NO);
    };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      // bunker_NO.length = 0;
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        console.log(info.BUNKER_NO);
        // bunker_NO.push(info.BUNKER_NO);
        LayoutGroupFilter_NO = info.BUNKER_NO;
        // console.log(info.BUNKER_NAME);
        // popFreeAdd.setValue({ BUNKER_NO: info.BUNKER_NO });
        xrEfDialogClose();

        // erFormHelper.setControlValue("LayoutGroupFilter", 'BUNKER_NO', 'A02');
      }
      console.log(bunker_NO);
      // bunker_NO.push(info);
      // LayoutGroupFilter_NO =info.BUNKER_NO.toString();

      // erFormHelper.setControlValue("LayoutGroupFilter", 'BUNKER_NO', info.BUNKER_NO);
      // erFormHelper.setControlValueEx("LayoutGroupFilter", outInfo1.getBlock(0).data[0]);
      // erFormHelper.SEtcont
    };

    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        efFormInfo.value.formName,
        "",
        ""
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          queryMainGrid();
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      console.log("1111");
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      // eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);

      outInfo1 = await erFormHelper.callService(
        "mmsm81_inq_seq",
        eiInfo1,
        true,
        false,
        true
      );
      console.log("1111", outInfo1);

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        // erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "LayoutGroupFilter");
        erFormHelper.setControlValueEx(
          "LayoutGroupFilter",
          outInfo1.getBlock(0).data[0]
        );
      }
    };

    const F4_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM512S2N",
        rateWidth: "10",
        rateHeight: "50",
      };
      formNamePara.value = "MMSM512S2N";
      dialogFormName.value = "MMSM81ADDVS2N";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F5_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM513S2N",
        rateWidth: "4.5",
        rateHeight: "33.5",
      };
      dialogFormName.value = "MMSM81ADDVS2N";
      formNamePara.value = "MMSM513S2N";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F6_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM515S2N",
        rateWidth: "10",
        rateHeight: "33.5",
      };
      dialogFormName.value = "MMSM81ADDVS2N";
      formNamePara.value = "MMSM515S2N";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F7_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM81FG",
        rateWidth: "10",
        rateHeight: "33.5",
      };
      formNamePara.value = "MMSM81518ADDV";
      dialogFormName.value = "MMSM81FG";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F8_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM511S2N",
        rateWidth: "5.5",
        rateHeight: "33.5",
      };
      dialogFormName.value = "MMSM81ADDVS2N";
      formNamePara.value = "MMSM511S2N";
      parentInfo.value = data;
      openXrEfDialog();
    };

    const GridView1FocusChanged = async (e: any) => {
      // if (!e.data) {
      //   erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
      //   return;
      // }
      // if (e && e.rowChanged) {
      //   if (e.data) {
      //     queryDetailInfo({
      //       QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
      //     });
      //   }
      // }
      // const inInfo = new EI.EIInfo();
      // const outInfo = inInfo.addBlock(new EI.EiBlock());
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);

      erFormHelper.setControlValueEx("LayoutGroupFilter", selectedRows);
    };

    // 查询子表明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 成分信息

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
    const F9_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM408N1ADDV",
      };
      formNamePara.value = "MMSM408N1ADDV";
      dialogFormName.value = "MMSM408N1ADDV";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F10_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM408N2ADDV",
      };
      formNamePara.value = "MMSM408N2ADDV";
      dialogFormName.value = "MMSM408N2ADDV";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F11_DO = async (e: any) => {
      queryMainGrid1();
    };

    const F11_PRE_DO = async (e: any) => {};
    const F11_CANCEL = async (e: any) => {};
    const F12_DO = async (e: any) => {
      const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM518_1S2N",
        rateWidth: "6.6",
        rateHeight: "25",
      };
      formNamePara.value = "MMSM518_1S2N";
      dialogFormName.value = "MMSM81ADDVS2N";
      parentInfo.value = data;
      openXrEfDialog();
    };
    const F12_PRE_DO = async (e: any) => {};
    const F12_CANCEL = async (e: any) => {};

    const queryMainGrid1 = async () => {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
        return false;
      }
      //清空grid数据
      // erFormHelper.clearGridData(["GridView1"]);

      const inInfo = new EI.EIInfo();
      //获取查询条件dt
      const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

      inInfo.addBlock(Query);
      //let ss = inInfo.blocks.Table1.data[0].START_TIME;
      //let ss = inInfo.blocks.Table1;
      // let ss = inInfo.getBlock(0).data[0]['START_TIME'];
      console.log("11111", inInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm81xz_ins",
        inInfo,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

        if (queryCondition.data[0]["WEIGH_NO"] == "") {
          erFormHelper.messageWarning("必须先生成计量单号");
          return;
        }
        if (queryCondition.data[0]["BUNKER_NO"] == "") {
          erFormHelper.messageWarning("料仓号不能为空");
          return;
        }
        const mes_res = await erFormHelper.messageConfirm(
          "是否确认选择料仓收货？ 料仓号：" +
            queryCondition.data[0]["BUNKER_NO"]
          // popFreeAdd.getValue("BUNKER_NO")
        );
        if (!mes_res) {
          return;
        } else {
          const inInfo = new EI.EIInfo();
          //获取查询条件dt

          console.log("1111112222", queryCondition);
          inInfo.addBlock(queryCondition);
          console.log("111111", inInfo);

          if (queryCondition.data[0]["SHIP_NAME"] === "") {
            erFormHelper.messageWarning("主车号位必输项");
            return;
          }
          if (queryCondition.data[0]["NET_WT"] == 0) {
            erFormHelper.messageWarning("净重不能为0");
            return;
          }

          if (queryCondition.data[0]["BUNKER_NO"] != "") {
            console.log("11111111111111");
            outInfo2 = await erFormHelper.callService(
              "mmsm81f3_s_ins",
              inInfo,
              true,
              false,
              true
            );
            if (outInfo2.sys.status < 0) {
              erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
            } else {
              // erFormHelper.mergeDataToLayoutOrGrid(outInfo2, true, "gridView2");

              queryMainGrid();
              queryGrid();
              erFormHelper.clearLayoutData("LayoutGroupFilter");
            }
          }
        }
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    //选择物料编码
    const layout2_Changed = async (e: any) => {
      if (e.itemCode == "QUE_CX") {
        queryGrid();
      }

      if (e.itemCode == "QUE_HT") {
        if (erFormHelper.getGridSelectRows("gridView2").length === 0) {
          erFormHelper.messageWarning("请选择至少一条信息再操作");
          return false;
        }
        popFreeEdit = new ER.PopFreeHelper(
          formPartition,
          "MMSM51ZPOP",
          "MMSM51Z_POP_LAYOUT"
        );
        //校验物料代码一致性 传参数
        let row_id = 0;
        let mat_code;
        const grid2sr = erFormHelper.getGridSelectRowsAsBlock("gridView2"); //勾选行数据
        for (row_id = 0; row_id < grid2sr.data.length; row_id++) {
          mat_code = grid2sr.data[0]["MAT_CODE"];
          if (mat_code != grid2sr.data[row_id]["MAT_CODE"]) {
            erFormHelper.messageWarning("勾选行物料代码不一致！");
            return false;
          }
        }
        let stock_wt = 0;
        for (let row_id = 0; row_id < grid2sr.data.length; row_id++) {
          stock_wt = stock_wt + Number(grid2sr.data[row_id]["STOCK_WT"]);
        }

        const eiInfo = new EI.EIInfo();
        const eiBlock = eiInfo.addBlock(new EI.EiBlock());
        eiBlock.pushData(
          {
            STOCK_WT: stock_wt,
            MAT_CODE: grid2sr.data[0]["MAT_CODE"],
            STOCK_WT_1: stock_wt,
          },
          true
        );
        console.log("1119");
        popFreeEdit.ReceiveData(eiBlock.data[0]);
        ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      }
      if (e.itemCode == "QUE_HT_Q") {
        popFreeEdit_Q = new ER.PopFreeHelper(
          formPartition,
          "MMSM51ZPOPQ",
          "MMSM51Z_POPQ_LAYOUT"
        );
        //校验物料代码一致性 传参数
        let row_id = 0;
        let mat_code;
        if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
          erFormHelper.messageWarning("物料代码未勾选！");
          return false;
        }
        const grid1sr = erFormHelper.getGridSelectRowsAsBlock("gridView1"); //勾选行数据
        const eiInfo = new EI.EIInfo();
        const eiBlock = eiInfo.addBlock(new EI.EiBlock());
        eiBlock.pushData(
          {
            MAT_CODE: grid1sr.data[0]["MAT_CODE"],
          },
          true
        );

        popFreeEdit_Q.ReceiveData(eiBlock.data[0]);
        ER.PopUtils.showErPopFree(
          ErPopFree,
          popFreeEdit_Q,
          popFreeEditOkClick_Q
        );
      }
    };
    const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView2"),
        "Tables0"
      );
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
      inInfo.addBlock(eiBlock, "Tables1");
      console.log("sw1119", inInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm81s_del",
        inInfo,
        true,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        queryMainGrid();
        queryGrid();
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const popFreeEditOkClick_Q = async (e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit_Q.DataModel);
      inInfo.addBlock(eiBlock, "Tables0");
      console.log("sw1119", inInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm81s_del_q",
        inInfo,
        true,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        queryMainGrid();
        queryGrid();
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    const queryGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "LayoutGroupFilterHs"
      );
      eiInfo.addBlock(eiBlock, "Table0");

      const outInfo = await erFormHelper.callService(
        "mmsm81s_zxh_inq",
        eiInfo,
        true,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView2");
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      formNamePara,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F8_DO,
      F9_DO,
      F10_DO,
      F11_DO,
      F11_PRE_DO,
      F11_CANCEL,
      F12_DO,
      erGrid1Ready,
      dialogVisible,
      gridView1,
      GridView1FocusChanged,
      LayoutGroupFilter,
      xrEfDialogRef,
      xrEfDialogClose,
      getChildInfo,
      parentInfo,
      gridToolbar,
      layout2_Changed,
      i_func_id_q,
      dialogFormName,
      i_func_id_p,
    };
  },
});
