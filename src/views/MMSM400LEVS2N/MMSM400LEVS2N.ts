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
import MMSM53POP_KC from "../MMSM53POP_KC/MMSM53POP_KC.vue";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
import MMSM400BUNKER from "../MMSM400BUNKER/MMSM400BUNKER.vue";

export default defineComponent({
  name: "MMSM400LEVS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
    MMSM53POP_KC,
    MMSM50ADDS2N,
    MMSM400BUNKER,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeService = "";
    const initializeFlag = ref(0);

    const parentInfo = ref({});
    let flag: any;

    const dialogFormName = ref(""); // 弹出画面的画面名
    const dialogVisible = ref(false);
    const detailTabsRef = ref<any>(null);

    const tabActiveKey = ref("tab1");
    let tabFlag = 1;

    let formName: string; // 当前画面名
    let formPartition: string;
    let PROGRAM_NAME: string; // 查询配置表的参数
    const formlayout: Ref<any[]> = ref([]);
    const bunker_info = ref<any>([]); // 料仓信息

    const v_bunker_type = ref<string>(""); // 料仓类型
    const v_bunker_container_total_height = ref<string>(""); // 料仓信息容器总高度
    const v_bunker_cols = ref<number>(); // 料仓信息列数
    const l1_bunker_type = ref<string>(""); // 料仓类型
    const l1_bunker_container_total_height = ref<string>(""); // 料仓信息容器总高度
    const l1_bunker_cols = ref<number>(); // 料仓信息列数
    const l2_bunker_type = ref<string>(""); // 料仓类型
    const l2_bunker_container_total_height = ref<string>(""); // 料仓信息容器总高度
    const l2_bunker_cols = ref<number>(); // 料仓信息列数

    const e1_bunker_type = ref<string>(""); // 料仓类型
    const e1_bunker_container_total_height = ref<string>(""); // 料仓信息容器总高度
    const e1_bunker_cols = ref<number>(); // 料仓信息列数
    const e2_bunker_type = ref<string>(""); // 料仓类型
    const e2_bunker_container_total_height = ref<string>(""); // 料仓信息容器总高度
    const e2_bunker_cols = ref<number>(); // 料仓信息列数

    let gridView1: any;
    let gridView2: any;

    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };

    //通过炼钢配置表，进行模板画面参数查询
    const QueryPara = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          PROGRAM_NAME: formName,
        },
        true
      );
      EIManager.callService(formPartition, "mmsmpara_inq", eiInfo)
        .then((res: EI.EIInfo) => {
          if (res.status === 0) {
            const resData: any = {};
            res.blocks["MMSMPARA_INQ"].data.forEach((item: any) => {
              resData[item.PARA_NAME] = item.PARA;
            });
            console.log("配置表", resData);
            v_bunker_type.value = resData.v_bunker_type;
            v_bunker_cols.value = Number(resData.v_first_row_num);
            v_bunker_container_total_height.value = resData.v_height + "%";
            l1_bunker_type.value = resData.l1_bunker_type;
            l1_bunker_cols.value = Number(resData.l1_first_row_num);
            l1_bunker_container_total_height.value = resData.l1_height + "%";
            l2_bunker_type.value = resData.l2_bunker_type;
            l2_bunker_cols.value = Number(resData.l2_first_row_num);
            l2_bunker_container_total_height.value = resData.l2_height + "%";

            e1_bunker_type.value = resData.e1_bunker_type;
            e1_bunker_cols.value = Number(resData.e1_first_row_num);
            e1_bunker_container_total_height.value = resData.e1_height + "%";
            e2_bunker_type.value = resData.e2_bunker_type;
            e2_bunker_cols.value = Number(resData.e2_first_row_num);
            e2_bunker_container_total_height.value = resData.e2_height + "%";

            nextTick(() => {
              initializePage();
            });
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    };

    // xr-ef-form的ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      console.log(efFormInfo.value);
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      QueryPara(); // 查询配置表
    };

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
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
          popFreeAdd.setValue({ MAT_NAME: info.MAT_NAME });
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
    };

    const butClick = async (item: any) => {
      // 查询物料信息
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item.BUNKER_NO,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        console.log("🐅0725", outInfo.getBlock(0));
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };

    const dbbutClick = async (item: any) => {
      popFreeAdd.ReceiveData({
        BUNKER_NO: item.BUNKER_NO,
        STK_NO: item.STK_NO,
        MAT_CODE: item.MAT_CODE,
        MAT_NAME: item.MAT_NAME,
        BUNKER_TYPE: item.BUNKER_TYPE,
        MAT_SIMPLE_ENAME: item.BACK_C5,
        MAT_TYPE: item.MAT_TYPE,
        GM_VALUE: item.GM_VALUE,
        STOCK_WT_WARN: item.STOCK_WT_WARN,
        UPPER_LIMIT_VALUE: item.UPPER_LIMIT_VALUE,
      });
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        if (a.itemCode === "BOTTON_MAT_CODE") {
          const data = {};
          parentInfo.value = data;
          dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名
          flag = "1";
          openXrEfDialog();
        } else if (a.itemCode === "Q_CHOOSE") {
          const selectedRows_BLOCK =
            erFormHelper.getGridCurrentRowAsBlock("gridView1");
          const data = {
            MAT_CODE: item.MAT_CODE,
            WEIGH_NO: " ",
            QUALITY_BATCH_NO: "",
            PROC_DIV: "I",
            BUNKER_NO: item.BUNKER_NO,
          };
          console.log("111", data);
          dialogFormName.value = "MMSM53POP_KC"; // 读配置表获取画面名
          flag = "0";
          parentInfo.value = data;

          openXrEfDialog();
        }
      });
      ER.PopUtils.showErPopFree(
        ErPopFree,
        popFreeAdd,
        (e: PopFreeReturnInfo) => {
          if (e.dialogResult === "ok") {
            queryData(e.dataModel);
          }
        }
      );
    };

    const queryData = async (e: any) => {
      //1.压入查询条件
      const eiInfo = new EI.EIInfo();
      eiInfo.addBlock(erFormHelper.convertModelAsBlock(e), "Table1");
      console.log("rxm", eiInfo);
      //控制台日志
      await erFormHelper
        .callService("mmsm60_upd", eiInfo, true, false)
        .then((res) => {
          console.log("调用结果", res);
          if (res.status >= 0) {
            erFormHelper.messageSuccess("修改成功!!");
            nextTick(() => {
              if (tabFlag === 1) QueryBunker(v_bunker_type.value);
              else if (tabFlag === 2) QueryBunker(l1_bunker_type.value);
              else if (tabFlag === 3) QueryBunker(l2_bunker_type.value);
              else if (tabFlag === 4) QueryBunker(e1_bunker_type.value);
              else if (tabFlag === 5) QueryBunker(e2_bunker_type.value);
            });
          } else {
            erFormHelper.messageError("修改失败!!，失败原因:" + res.sys.msg);
          }
          nextTick(() => {});
        });
    };

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        formName,
        "",
        ""
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          if (tabFlag === 1) QueryBunker(v_bunker_type.value);
          else if (tabFlag === 2) QueryBunker(l1_bunker_type.value);
          else if (tabFlag === 3) QueryBunker(l2_bunker_type.value);
          else if (tabFlag === 4) QueryBunker(e1_bunker_type.value);
          else if (tabFlag === 5) QueryBunker(e2_bunker_type.value);
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    // 查询料仓信息
    const QueryBunker = async (tabName: any) => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_CODE: " ",
          BUNKER_TYPE: tabName,
        },
        true
      );

      EIManager.callService(
        efFormInfo.value.formPartition,
        "mmsm85fg_bunker_inq",
        inInfo
      ).then((res: EI.EIInfo) => {
        console.log("🐅", res.getBlock(0).data);
        bunker_info.value = res.getBlock(0).data;
      });
    };
    const handleTabChange = (activeKey: string) => {
      console.log("tab", tabActiveKey);
      if (activeKey === "tab1") {
        tabFlag = 1;
        QueryBunker(v_bunker_type.value);
      } else if (activeKey === "tab2") {
        tabFlag = 2;
        QueryBunker(l1_bunker_type.value);
      } else if (activeKey === "tab3") {
        tabFlag = 3;
        QueryBunker(l2_bunker_type.value);
      } else if (activeKey === "tab4") {
        tabFlag = 4;
        QueryBunker(e1_bunker_type.value);
      } else if (activeKey === "tab5") {
        tabFlag = 5;
        QueryBunker(e2_bunker_type.value);
      }
    };
    onMounted(() => {});

    // 物料信息表焦点行事件
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
    };

    // 查询成分信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 成分信息
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
      console.log("111222333", eiInfo1);

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView2");
      }
    };

    const F2_DO = async (e: any) => {
      if (tabFlag === 1) QueryBunker(v_bunker_type.value);
      else if (tabFlag === 2) QueryBunker(l1_bunker_type.value);
      else if (tabFlag === 3) QueryBunker(l2_bunker_type.value);
      else if (tabFlag === 4) QueryBunker(e1_bunker_type.value);
      else if (tabFlag === 5) QueryBunker(e2_bunker_type.value);
    };
    const F3_DO = async (e: any) => {};
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
      butClick,
      dbbutClick,
      showContextMenu,
      parentInfo,
      getChildInfo,
      xrEfDialogClose,
      handleTabChange,
      dialogFormName,
      dialogVisible,
      bunker_info,
      v_bunker_container_total_height,
      v_bunker_cols,
      l1_bunker_container_total_height,
      l1_bunker_cols,
      l2_bunker_container_total_height,
      l2_bunker_cols,
      e1_bunker_container_total_height,
      e1_bunker_cols,
      e2_bunker_container_total_height,
      e2_bunker_cols,
      tabActiveKey,
    };
  },
});
