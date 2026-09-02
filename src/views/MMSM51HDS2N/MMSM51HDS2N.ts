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
import { useRoute, useRouter } from "vue-router";
import MMSM81518ADDV from "../MMSM81518ADDV/MMSM81518ADDV.vue";
export default defineComponent({
  name: "MMSM51Z",
  components: {
    xrEfForm,
    xrEfPanel,
    MMSM81FG,
    MMSM81518ADDV,
    xrEfSearchBox,
    xrEfDialog,
    MMSM81ADDV,
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
    let formNamePara = ref("");
    // let gridView1!: kendo.ui.Grid;
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
      // if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
      //   return false;
      // }
      // //清空grid数据
      // erFormHelper.clearLayoutOrGridData("gridView1");
      // //获取查询条件dt
      // const inInfo = new EI.EIInfo();
      // // const queryCondition =
      // //   erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      // // inInfo.addBlock(queryCondition);

      // const outInfo = await erFormHelper.callService(
      //   "mmsm81f3_zxhfg_inq",
      //   inInfo,
      //   true,
      //   true,
      //   true
      // );
      // // eiBlock2.pushData({ ...currentRowInfo, TABLE_TYPE: 'TMMSM2B' }, true);
      // for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
      //   outInfo.getBlock(0).data[i]["MEASURE_UNIT"] = "TON";
      // }
      // console.log(outInfo.getBlock(0).data.length);
      // if (outInfo.sys.status >= 0) {
      //   // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
      //   erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
      // } else {
      //   erFormHelper.messageError(outInfo.sys.msg);
      // }
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
      // erFormHelper.setControlValue("LayoutGroupFilter", "BUNKER_NO", bunker_NO);
      erFormHelper.setControlValue(
        "LayoutGroupFilter",
        "BUNKER_NO",
        LayoutGroupFilter_NO
      );
    };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      bunker_NO.length = 0;
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        console.log(info.BUNKER_NO);
        bunker_NO.push(info.BUNKER_NO);
        // console.log(info.BUNKER_NAME);
        // popFreeAdd.setValue({ BUNKER_NO: info.BUNKER_NO });
        xrEfDialogClose();

        // erFormHelper.setControlValue("LayoutGroupFilter", 'BUNKER_NO', 'A02');
      }
      console.log(bunker_NO);
      // bunker_NO.push(info);
      LayoutGroupFilter_NO =info.BUNKER_NO.toString();

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
        "mmsmlcjl_ins",
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

    //查询物料信息
    const TC0 = async (e: any) => {
      console.log("9999", outInfo1);
      console.log(e.itemCode);
      if ((e.itemCode == "CX")) {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilter0")) {
        return false;
      }
      //清空grid数据
      // // erFormHelper.clearLayoutOrGridData("gridView1");
      erFormHelper.clearGridData("gridView1");
      //获取查询条件dt
      const inInfo = new EI.EIInfo();
      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter0");
      inInfo.addBlock(queryCondition);

      const outInfo = await erFormHelper.callService(
        "mmsmnb01_inq1",
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
    }
    };

    //查询物料信息
    const TC2 = async (e: any) => {
      console.log("99991", outInfo1);
      console.log(e.itemCode);
      if ((e.itemCode == "CX1")) {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilterHs")) {
        return false;
      }
      //清空grid数据
      // erFormHelper.clearLayoutOrGridData("gridView2");
      erFormHelper.clearGridData("gridView2");
      //获取查询条件dt
      const inInfo = new EI.EIInfo();
      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilterHs");
      inInfo.addBlock(queryCondition);

      const outInfo = await erFormHelper.callService(
        "mmsmnb01_inq2",
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
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView2");
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    }
    };


    //点击收货选择料仓号
    const TC = async (e: any) => {
      console.log("9999", outInfo1);
      console.log(e.itemCode);
      if ((e.itemCode == "DJ1")) {
        
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
        const data1 = {
          MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
          WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
          STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
          FORMNAME: "MMSM512S2N",
          rateWidth: "10",
          rateHeight: "50",
        };
        formNamePara.value = "MMSM512S2N";
        dialogFormName.value = "MMSM81ADDVS2N";
        parentInfo.value = data1;
        openXrEfDialog();
      }
      if ((e.itemCode == "DJ2")) {
      
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data2 = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM513S2N",
        rateWidth: "4.5",
        rateHeight: "33.5",
      };
      formNamePara.value = "MMSM513S2N";
      dialogFormName.value = "MMSM81ADDVS2N";
      parentInfo.value = data2;
      openXrEfDialog();
      }
      if ((e.itemCode == "DJ3")) {
      
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data3 = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM515S2N",
        rateWidth: "10",
        rateHeight: "33.5",
      };
      formNamePara.value = "MMSM515S2N";
      dialogFormName.value = "MMSM81ADDVS2N";
      parentInfo.value = data3;
      openXrEfDialog();
      }
      if ((e.itemCode == "DJ4")) {
        
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data4 = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM81FG",
        rateWidth: "10",
        rateHeight: "33.5",
      };
      formNamePara.value = "MMSM81518ADDV";
      dialogFormName.value = "MMSM81FG";
      parentInfo.value = data4;
      openXrEfDialog();
      }
      if ((e.itemCode == "DJ5")) {
       
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
      const data5 = {
        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
        FORMNAME: "MMSM511S2N",
        rateWidth: "5.5",
        rateHeight: "33.5",
      };
      formNamePara.value = "MMSM511S2N";
      dialogFormName.value = "MMSM81ADDVS2N";
      parentInfo.value = data5;
      openXrEfDialog();
      }
      if ((e.itemCode == "DJ6")) {
        
        const mes_res = await erFormHelper.messageConfirm(
          "所有其他原材料都存放在编号为GEN的虚拟库存中"
        );
        if (!mes_res) {
          return;
        } else {
          erFormHelper.setControlValue("LayoutGroupFilter", "BUNKER_NO", "GEN");
        }
      }
      if ((e.itemCode == "DJ7")) {
        const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        const inInfo = new EI.EIInfo();
          //获取查询条件dt
         
          inInfo.addBlock(Query,"Tables0");
        if (Query.data[0]["BUNKER_NO"] != "") {
          console.log("11111111111111");
          outInfo2 = await erFormHelper.callService(
            "mmsmnb02_snd",
            inInfo,
            true,
            false,
            true
          );
          if (outInfo2.sys.status < 0) {
          //   erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
          // } else {
          //   erFormHelper.mergeDataToLayoutOrGrid(outInfo2, true, "gridView2");
          }
        }
      }
      if ((e.itemCode == "DJ8")) {
        // const queryCondition =
        // erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        const mes_res = await erFormHelper.messageConfirm(
          "是否确认选择料仓收货？ 料仓号：" + Query.data[0]["BUNKER_NO"]
          // popFreeAdd.getValue("BUNKER_NO") bunker_NO
        );
        if (!mes_res) {
          return;
        } else {
          const inInfo = new EI.EIInfo();
          //获取查询条件dt
         
          inInfo.addBlock(Query,"Tables0");
          inInfo.addBlock(
            erFormHelper.getGridSelectRowsAsBlock("gridView1"),
            "Tables1"
          );
          console.log("111111", inInfo);
          console.log("222", Query.data[0]["BUNKER_NO"]);
          console.log("333", bunker_NO);
          // if (Query.data[0]["BUNKER_NO"] != "")
          if (Query.data[0]["BUNKER_NO"] != "") {
            console.log("11111111111111");
            outInfo2 = await erFormHelper.callService(
              "mmsm81f3_nb_ins",
              inInfo,
              true,
              false,
              true
            );
            if (outInfo2.sys.status < 0) {
              erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
            } else {
              erFormHelper.mergeDataToLayoutOrGrid(outInfo2, true, "gridView2");
            }
          }
        }
      }

   
    };
   
    const F4_DO = async (e: any) => {
     
    };
    const F5_DO = async (e: any) => {
      
    };
    const F6_DO = async (e: any) => {
     
    };
    const F7_DO = async (e: any) => {
      
    };
    const F8_DO = async (e: any) => {
     
    };

    // const popFreeEditOkClick = async (a: any) => {
    //   const inInfo = new EI.EIInfo();
    //   let outInfo: EI.EIInfo = new EI.EIInfo();
    //   let blockname = '';
    //   if (a == 'I') blockname = 'MMSM65_ADD';
    //   if (a == 'U') blockname = 'MMSM65_MODIFY';
    //   // if( a == 'I'){
    //   //   const inInfo2 = new EI.EIInfo();
    //   //   popFreeAdd1.ReceiveData(inInfo2);
    //   //   console.log('2322',inInfo2);
    //   //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel), blockname);
    //   // }
    //   // else{
    //   //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel), blockname);
    //   // }
    //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel), blockname);
    //   console.log('111111',inInfo);
    //   if(inInfo.getBlock(0).data[0]["DG_UNIT_CODE"] != " " && inInfo.getBlock(0).data[0]["DG_UNIT_CODE"] != "" )
    //   {
    //     if(inInfo.getBlock(0).data[0]["DG_UNIT_CODE"] == "6460")
    //     {
    //       if(inInfo.getBlock(0).data[0]["LOAD_CODE"]==" "|| inInfo.getBlock(0).data[0]["LOAD_CODE"]=="" || inInfo.getBlock(0).data[0]["UNLOAD_POINT_CODE"]==" "|| inInfo.getBlock(0).data[0]["UNLOAD_POINT_CODE"]=="")
    //       {
    //           erFormHelper.messageSuccess('加工厂必须填写装点和卸点代码');
    //           popFreeAdd1.CloseDialogWhenOkClick = false;
    //       }else{
    //         console.log('22222',inInfo);
    //         outInfo = await erFormHelper.callService('mmsm65_pro', inInfo, true,false, true);
    //         if (outInfo?.sys.status >= 0) {
    //           erFormHelper.messageSuccess('操作成功');
    //         }
    //         // if(popFreeAdd1.getEvent('ok'))
    //         popFreeAdd1.CloseDialog();
    //         queryMainGrid();
    //       }
    //     }
    //   }
    // };

    // const popFreeAdd1 = new ER.PopFreeHelper(
    //   efFormInfo.value.formPartition,
    //   'MMSM82D_POP',
    //   'MMSM81POP_LAYOUT',
    //   ''
    // )
    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        // erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          // queryDetailInfo({
          //   QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
          // });
        }
      }
      // const inInfo = new EI.EIInfo();
      // const outInfo = inInfo.addBlock(new EI.EiBlock());
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);

      erFormHelper.setControlValueEx("LayoutGroupFilter", selectedRows);
      erFormHelper.setControlValue("LayoutGroupFilter", "NET_WT", selectedRows['MAT_WT']);
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
      
    };
    const F11_DO = async (e: any) => {
      
    };

    const F11_PRE_DO = async (e: any) => {};
    const F11_CANCEL = async (e: any) => {};
    const F12_DO = async (e: any) => {
      queryMainGrid1();
    };

    const queryMainGrid1 = async () => {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
        return false;
      }
      //清空grid数据
      erFormHelper.clearGridData(["GridView1"]);

      const inInfo = new EI.EIInfo();
      //获取查询条件dt
      const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

      inInfo.addBlock(Query);
      //let ss = inInfo.blocks.Table1.data[0].START_TIME;
      //let ss = inInfo.blocks.Table1;
      let ss = inInfo.getBlock(0).data[0]["START_TIME"];
      console.log(ss);
      const outInfo = await erFormHelper.callService(
        "mmsm81xz_ins",
        inInfo,
        true,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // queryMainGrid();
        // // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        // erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        // erFormHelper.setGridEditable('GridView1', false);
        // erFormHelper.messageInfo('SUCCESS');
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      formNamePara,
      TC0,
      TC,
      TC2,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F8_DO,
      F9_DO,
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
      i_func_id_q,
      dialogFormName,
      i_func_id_p,
    };
  },
});
