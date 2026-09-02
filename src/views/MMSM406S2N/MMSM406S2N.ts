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
import MMSM53POP_KC from "../MMSM53POP_KC/MMSM53POP_KC.vue";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MMSM406S2N",
  components: {
    MMSM53POP_KC,
    MMSM50ADDS2N,
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeService = "";
    const bunker = reactive(new Array());
    const bunker_type = reactive(new Array());
    const bunker_color_status = reactive(new Array());
    const bunker_wt_warn = reactive(new Array());
    const gm_wt = reactive(new Array());
    const up_value = reactive(new Array());
    let b_index: 1000;
    const bunker_l2_code = reactive(new Array());
    const bunker_mat_type_code = reactive(new Array());
    const xrEfDialogRef = ref<any>(null);
    const parentInfo = ref({});
    const dialogFormName = ref(""); // 弹出画面的画面名
    const detailTabsRef = ref<any>(null);
    let i_form_ename; // 当前画面名
    const i_func_id_q = ref("");
    const i_func_id_p = ref("");
    const quality_batch_no= ref();
    const c_weigh_no= ref();


    const table0 = {};
    let flag: any;
    // let i_func_id_p;
    let i_func_id;

    let formName: string;
    let formPartition: string;
    let PROGRAM_NAME: string;
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);
    const bunker_mat_code = reactive(new Array());
    const bunker_mat_name = reactive(new Array());
    const bunker_mat_type = reactive(new Array());
    const bunker_stock_wt = reactive(new Array());
    const buiker_stock_wt = reactive(new Array());
    const bunker_bunker_no = reactive(new Array());
    const bunker_stk_no = reactive(new Array());
    const bunker_co_bunker = reactive(new Array());
    const bunker_quality_batch_no = reactive(new Array());
    const bunker_rate = reactive(new Array());
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
    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => {};
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        if (flag == "0") {
          popFreeAdd.setValue({ QUALITY_BATCH_NO: info.QUALITY_BATCH_NO });
         
          console.log("222", info.QUALITY_BATCH_NO);
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

    const butClick = async (item: any, index: any) => {
      if (index != b_index) {
        bunker_color_status[index] = true;
        bunker_color_status[b_index] = false;
        b_index = index;
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

    const dbbutClick = async (index: any) => {
      if (index != b_index) {
        bunker_color_status[index] = true;
        bunker_color_status[b_index] = false;
        b_index = index;
        
      }
      
      console.log("123", quality_batch_no.value);
      popFreeAdd.ReceiveData({
        BUNKER_NO: bunker_bunker_no[index],
        STK_NO: bunker_stk_no[index],
        CO_BUNKER: bunker_co_bunker[index],
        QUALITY_BATCH_NO:quality_batch_no.value,
        WEIGH_NO:c_weigh_no.value,
      
        MAT_CODE: bunker_mat_code[index],
        MAT_NAME: bunker_mat_name[index],
        BUNKER_TYPE: bunker_type[index],
        MAT_SIMPLE_ENAME: bunker_l2_code[index],
        MAT_TYPE: bunker_mat_type_code[index],
        GM_VALUE: gm_wt[index],
        STOCK_WT_WARN: bunker_wt_warn[index],
        UPPER_LIMIT_VALUE: up_value[index],
      });
      quality_batch_no.value="";
      c_weigh_no.value="";
      console.log("123", quality_batch_no.value);

      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "Q_CHOOSE") {
          //   EFCallForm('MMSM81ADDV',{});
          const selectedRows_BLOCK =
            erFormHelper.getGridCurrentRowAsBlock("gridView1");
          const data = {
            MAT_CODE: bunker_mat_code[index],
            WEIGH_NO: c_weigh_no.value,
            QUALITY_BATCH_NO: bunker_quality_batch_no[index],
            PROC_DIV: "I",
            BUNKER_NO: bunker_bunker_no[index],
          };
          console.log("111", data);
          dialogFormName.value = "MMSM53POP_KCS2N"; // 读配置表获取画面名
          flag = "0";
          parentInfo.value = data;

          openXrEfDialog();
        }
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
        "MMSM406S2N",
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
      bunker.length = 0;
      bunker_l2_code.length = 0;
      bunker_wt_warn.length = 0;
      gm_wt.length = 0;
      up_value.length = 0;
      bunker_mat_type_code.length = 0;
      bunker_type.length = 0;
      bunker_color_status.length = 0;
      bunker_bunker_no.length = 0;
      bunker_mat_code.length = 0;
      bunker_mat_name.length = 0;
      bunker_mat_type.length = 0;
      bunker_stock_wt.length = 0;
      buiker_stock_wt.length = 0;
      bunker_stk_no.length = 0;
      bunker_co_bunker.length = 0;
      const inInfo = new EI.EIInfo();
      const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          BUNKER_TYPE: "LIMEMIX",
        },
        true
      );

      inInfo.addBlock(eiBlock);

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm85fg_bunker_inq",
        inInfo
      )
        // EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            // console.log('dfujgvfh', bunker);

            bunker.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_color_status.push(false);
            bunker_type.push(res.getBlock(0).data[i]["BUNKER_TYPE"]);
            bunker_bunker_no.push(res.getBlock(0).data[i]["BUNKER_NO"]);
            bunker_stk_no.push(res.getBlock(0).data[i]["STK_NO"]);
            bunker_co_bunker.push(res.getBlock(0).data[i]["CO_BUNKER"]);
            bunker_quality_batch_no.push(res.getBlock(0).data[i]["QUALITY_BATCH_NO"]);
            bunker_mat_code.push(res.getBlock(0).data[i]["MAT_CODE"]);
            bunker_mat_name.push(res.getBlock(0).data[i]["MAT_NAME"]);
            bunker_mat_type.push(res.getBlock(0).data[i]["BASE_NAME"]);
            bunker_l2_code.push(res.getBlock(0).data[i]["BACK_C5"]);
            bunker_mat_type_code.push(res.getBlock(0).data[i]["MAT_TYPE"]);
            bunker_stock_wt.push(res.getBlock(0).data[i]["STOCK_WT"]);
            buiker_stock_wt.push(res.getBlock(0).data[i]["STOCK_WT"]);
            bunker_rate.push(res.getBlock(0).data[i]["RATE"]);
            bunker_wt_warn.push(res.getBlock(0).data[i]["STOCK_WT_WARN"]);
            gm_wt.push(res.getBlock(0).data[i]["GM_VALUE"]);
            up_value.push(res.getBlock(0).data[i]["UPPER_LIMIT_VALUE"]);
            if (res.getBlock(0).data[i]["BUNKER_NO"] == "N29") {
              console.log("n29", res.getBlock(0).data[i]["STOCK_WT"]);
            }
          }
        });
    };
    onMounted(() => {});

    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView2"); // 清空子表数据
        quality_batch_no.value="";
        c_weigh_no.value="";
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          quality_batch_no.value=e.data.get("QUALITY_BATCH_NO")
          c_weigh_no.value=e.data.get("WEIGH_NO");
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
      console.log('aaa',eiBlock1);

     
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
      bunker_l2_code,
      bunker_mat_type_code,
      bunker_rate,
      bunker_mat_code,
      bunker_mat_name,
      bunker_mat_type,
      bunker_stock_wt,
      buiker_stock_wt,
      bunker_bunker_no,
      bunker_quality_batch_no,
      butClick,
      dbbutClick,
      showContextMenu,
      xrEfDialogRef,
      xrEfDialogClose,
      getChildInfo,
      dialogFormName,
      dialogVisible,
      parentInfo,
      bunker_color_status,
    };
  },
});
