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
import xrEfDialog from "EFX/xrEfDialog";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";

import { useRoute } from "vue-router";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import MMSM53POP from "../MMSM53POP/MMSM53POP.vue";

export default defineComponent({
  name: "MMSM536S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    MMSM53POP,
    erGrid,
    erLayout,
    ErPopFree,
    xrEfDialog,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const dialogVisible = ref(false);
    let formPartition: string;
    const initializeService = "";
    const dialogFormName = ref("");
    const parentInfo = ref({});
    const xrEfDialogRef = ref<any>(null);
    const xrEfDialogRefBath = ref<any>(null);
    let layOutDiv = ""; //设置查询条件的layout
    let proc_div = ""; // 'I'新增，'U'修改
    let popFreeEdit: ER.PopFreeHelper;
    let gridView1!: any;
    let gridView2!: any;
    let gridView3!: any;
    // 变量定义
    const formName = "MMSM536S2N";
    const initializeFlag = ref(0);

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      gridView1 = erFormHelper.getGrid("gridView1");
      Initialize();

      //加载弹窗配置
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSM_DIALOG",
        "MMSM53POPB_LAYOUT_DIALOG"
      );
    };
    // 画面相关数据初始化
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
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
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid("gridView3");
      erFormHelper.setGridEditable("gridView3", false); // 设置grid不可编辑
    };
    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "");
      const outInfo = await erFormHelper.callService(
        "mmsm81_inq",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "gridView1");
      }
    };
    const queryElmGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "LayoutGroupFilterEdit"
      );
      eiInfo.addBlock(eiBlock, "");
      const outInfo = await erFormHelper.callService(
        "mmsm81al_inq",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "gridView2");
      }
    };
    const valueChanged = (e: any) => {
      // 质检批查询
      if (e.itemCode === "QUALITY_BATCH_NO") {
        if (e.itemValue) {
          queryElmGrid();
        }
      }
    };

    // 查询子表明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 成分信息
      erFormHelper.clearGridData("gridView2"); // 清空子表数据
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);

      if (eiBlock1.data[0]["QUALITY_BATCH_NO"] !== " ") {
        const outInfo1 = await erFormHelper.callService(
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

      if (eiBlock2.data[0]["QUALITY_BATCH_NO"] !== " ") {
        const outInfo2 = await erFormHelper.callService(
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
    // onMounted(() => {
    //   Initialize();
    // });

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      console.log("00000");
      if (erFormHelper.getGridCheckedRows("gridView1").length === 1) {
        console.log("00001");
        const mainGridCheckedRow = erFormHelper.getGridAllRows(
          "gridView1",
          true
        )[0]; // 获取主表勾选行
        //openUPDialog(mainGridCheckedRow);
        // 使用框架弹窗组件EFDialogForm
        console.log("11111");
        openADDUDialog(mainGridCheckedRow);
      } else {
        // openADDialog();
      }
    };
    const F4_DO = async (e: any) => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请勾选信息再修改");
        return false;
      }
      if (popFreeEdit) {
        // 使用低代码弹窗组件ErPopFree
        popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1")); // 初始绑值，并设置可编辑
        ER.PopUtils.showErPopFree(
          ErPopFree,
          popFreeEdit,
          async (event: PopFreeReturnInfo) => {
            //确定按钮回调
            const recMsg = event as PopFreeReturnInfo; //XrErPopFree弹窗组件返回数据
            shijiSave(recMsg.dataModel, "U");
          }
        );
      }
    };

    const shijiSave = async (dataModel: any, PROC_DIV: string) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(dataModel?.get(""), {}),
        "PARA"
      );
      const para1 = erFormHelper.getGridCheckedRowsAsBlock("gridView1");
      inInfo.addBlock(para1, "QmBathEdit");
      outInfo = await erFormHelper.callService(
        "mmsm81bath_upd",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      }
      queryMainGrid();
    };

   
    // 打开修改弹出画面
    const openADDUDialog = (currentRow: any) => {
      console.log("22222");
      const MAT_CODE = currentRow.MAT_CODE;
      const QUALITY_BATCH_NO = currentRow.QUALITY_BATCH_NO;
      const WEIGH_NO = currentRow.WEIGH_NO;
      const data = {
        PROC_DIV: "U",
        MAT_CODE: MAT_CODE,
        QUALITY_BATCH_NO: QUALITY_BATCH_NO,
        WEIGH_NO: WEIGH_NO,
      };
      dialogFormName.value = "MMSM53POPS2N"; // 读配置表获取画面名
      dialogVisible.value = true;
      parentInfo.value = data;
      // 打开新增弹出画面
      // openEfDialog(dialogFormName, data, {
      //   height: 800,
      //   width: 1200
      // });
      console.log("33333");
      openXrEfDialog("U");
      console.log("5555");
    };
    // 点击按钮打开弹框
    // 点击按钮打开弹框
    const openXrEfDialog = (PROC_DIV: string) => {
      console.log("44444");
      dialogVisible.value = true;
      proc_div = PROC_DIV;
    };
    
    // 关闭弹框监听
    const xrEfDialogClose = () => {
      queryMainGrid();
    };
    // 获取弹窗画面传递过来的数据 新增
    const getChildInfo = (info: any) => {
      if (info.close) {
        xrEfDialogRef.value.close(); // 关闭弹框
      }
    };
    // 主表焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
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

    return {
      erFormHelper,
      initializeFlag,
      dialogFormName,
      parentInfo,
      xrEfDialogRef,
      efFormReady,
      dialogVisible,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      gridView1,
      gridView2,
      gridView3,
      getChildInfo,
      xrEfDialogClose,
      F2_DO,
      F3_DO,
      F4_DO,
      valueChanged,
      openXrEfDialog,
      GridView1FocusChanged,
    };
  },
});
