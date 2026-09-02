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
  name: "MMSM537S2N",
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
    let WEIGH_NO_DW: any;
    let formPartition: string;
    const initializeService = "";
    const dialogFormName = ref("");
    const parentInfo = ref({});
    const xrEfDialogRef = ref<any>(null);
    const xrEfDialogRefBath = ref<any>(null);
    let QUALITY_BATCH_NO: any;
    let layOutDiv = ""; //设置查询条件的layout
    let proc_div = ""; // 'I'新增，'U'修改
    let popFreeEdit: ER.PopFreeHelper;
    let gridView1!: any;
    let gridView2!: any;
    let gridView3!: any;
    let gridView4!: any;
    let outInfo1: EI.EIInfo;
    let outInfo2: EI.EIInfo;
    let BUNKER_NO_cx = "";
    let MAT_CODE_Q = "";
    const NO_SELECT = ref({ name: "" });
    const AA_TIME = ref("");
    const SEND_FLAG = ref("");
    const SENT_TIME = ref("");
    const XIANSHI_FLAG = ref(true);
    const readonly_sex = ref(true);
    const bunker_no = reactive(new Array());
    // 变量定义
    const formName = "MMSM537S2N";
    const initializeFlag = ref(0);
    const aaa = ref(false);
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
          nextTick(() => {});
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
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid("gridView4");
      erFormHelper.setGridEditable("gridView4", false); // 设置grid不可编辑
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
        erFormHelper.mergeDataToGrid(outInfo, "gridView4");
      }
    };
    const queryElmGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
      eiBlock.pushData(
        {
          QUALITY_BATCH_NO: NO_SELECT.value.name,
        },
        true
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

    const valueChanged = async () => {
      // 质检批查询
      console.log("lxxxxx", NO_SELECT.value.name);
      queryDetailInfo({
        QUALITY_BATCH_NO: NO_SELECT.value.name,
      });
    };
    const valueChanged_CX = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "BUNKER_NO") {
        BUNKER_NO_cx = e.value;
      }
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
      console.log("sw0722", eiInfo2);
      if (eiBlock2.data[0]["QUALITY_BATCH_NO"] !== "") {
        outInfo2 = await erFormHelper.callService(
          "mmsm81_cf_inq",
          eiInfo2,
          true,
          false,
          true
        );

        if (outInfo2.sys.status < 0) {
          erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
        } else {
          erFormHelper.mergeDataToLayoutOrGrid(outInfo2, true, "gridView3");
          // erFormHelper.setControlValueEx("LayoutGroupFilter2", outInfo2.getBlock(0).data[0]);
        }
      }
    };

    const F2_DO = async (e: any) => {
      if (BUNKER_NO_cx != "") {
        XIANSHI_FLAG.value = false;
      } else {
        XIANSHI_FLAG.value = true;
      }
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      if (erFormHelper.getGridCheckedRows("gridView1").length === 1) {
        const mainGridCheckedRow = erFormHelper.getGridCheckedRows(
          "gridView1",
          true
        )[0]; // 获取主表勾选行
        const mes_res = await erFormHelper.messageConfirm(
          "找到最近同种物料的质检批号，是否复制成分数据！"
        );
        if (!mes_res) {
          const MAT_CODE = mainGridCheckedRow.MAT_CODE;
          const QUALITY_BATCH_NO = mainGridCheckedRow.QUALITY_BATCH_NO;
          const WEIGH_NO = mainGridCheckedRow.WEIGH_NO;
          const data = {
            PROC_DIV: "I",
            MAT_CODE: MAT_CODE,
            QUALITY_BATCH_NO: QUALITY_BATCH_NO,
            WEIGH_NO: WEIGH_NO,
          };
          WEIGH_NO_DW = mainGridCheckedRow.BUNKER_NO;
          dialogFormName.value = "MMSM53POPS2N"; // 读配置表获取画面名
          dialogVisible.value = true;
          parentInfo.value = data;
          openXrEfDialog("I");
        } else {
          const MAT_CODE = mainGridCheckedRow.MAT_CODE;
          const QUALITY_BATCH_NO = mainGridCheckedRow.QUALITY_BATCH_NO;
          const WEIGH_NO = mainGridCheckedRow.WEIGH_NO;
          const data = {
            PROC_DIV: "U",
            MAT_CODE: MAT_CODE,
            QUALITY_BATCH_NO: QUALITY_BATCH_NO,
            WEIGH_NO: WEIGH_NO,
          };
          dialogFormName.value = "MMSM53POPS2N"; // 读配置表获取画面名
          dialogVisible.value = true;
          parentInfo.value = data;
        }
      } else if (erFormHelper.getGridCheckedRows("gridView4").length === 1) {
        const mainGridCheckedRow = erFormHelper.getGridCheckedRows(
          "gridView4",
          true
        )[0]; // 获取主表勾选行
        const mes_res = await erFormHelper.messageConfirm(
          "找到最近同种物料的质检批号，是否复制成分数据！"
        );
        if (!mes_res) {
          const MAT_CODE = mainGridCheckedRow.MAT_CODE;
          const QUALITY_BATCH_NO = mainGridCheckedRow.QUALITY_BATCH_NO;
          const WEIGH_NO = mainGridCheckedRow.WEIGH_NO;
          const data = {
            PROC_DIV: "I",
            MAT_CODE: MAT_CODE,
            QUALITY_BATCH_NO: QUALITY_BATCH_NO,
            WEIGH_NO: WEIGH_NO,
          };
          WEIGH_NO_DW = mainGridCheckedRow.BUNKER_NO;
          dialogFormName.value = "MMSM53POPS2N"; // 读配置表获取画面名
          dialogVisible.value = true;
          parentInfo.value = data;
          openXrEfDialog("I");
        } else {
          const MAT_CODE = mainGridCheckedRow.MAT_CODE;
          const QUALITY_BATCH_NO = mainGridCheckedRow.QUALITY_BATCH_NO;
          const WEIGH_NO = mainGridCheckedRow.WEIGH_NO;
          const data = {
            PROC_DIV: "U",
            MAT_CODE: MAT_CODE,
            QUALITY_BATCH_NO: QUALITY_BATCH_NO,
            WEIGH_NO: WEIGH_NO,
          };
          dialogFormName.value = "MMSM53POPS2N"; // 读配置表获取画面名
          dialogVisible.value = true;
          parentInfo.value = data;
        }
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
    const F5_DO = async (e: any) => {
      const qmBatch = new EI.EiBlock();
      qmBatch.pushData(
        {
          QUALITY_BATCH_NO: NO_SELECT.value.name,
        },
        true
      );
      if (qmBatch.data[0]["QUALITY_BATCH_NO"] === "") {
        erFormHelper.messageWarning("请选择质检批号！");
        return;
      }
      const eiInfo = new EI.EIInfo();
      // const checkedRowEiBlock;

      console.log("CE", XIANSHI_FLAG.value);
      if (XIANSHI_FLAG.value) {
        if (erFormHelper.getGridCheckedRows("gridView1").length === 0) {
          erFormHelper.messageWarning("请选择一条信息进行操作");
          return;
        }
        console.log(qmBatch.data[0]["QUALITY_BATCH_NO"]);

        const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock(
          "gridView1",
          {
            CONN_QUALITY_BATCH_NO: qmBatch.data[0]["QUALITY_BATCH_NO"],
          }
        );
        const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
      } else {
        if (erFormHelper.getGridCheckedRows("gridView4").length === 0) {
          erFormHelper.messageWarning("请选择一条信息进行操作");
          return;
        }
        console.log(qmBatch.data[0]["QUALITY_BATCH_NO"]);
        const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock(
          "gridView4",
          {
            CONN_QUALITY_BATCH_NO: qmBatch.data[0]["QUALITY_BATCH_NO"],
          }
        );
        const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
      }

      const mes_res = await erFormHelper.messageConfirm("是否关联成分");
      if (!mes_res) {
        // {closeEfDialog(bunker_Message1);console.log('1',bunker_Message1);
        // }else{ closeEfDialog(bunker_Message);console.log('0',bunker_Message);}
      } else {
        const outInfo = await erFormHelper.callService(
          "mmsm81_upd",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("关联失败:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("关联成功");
          queryMainGrid();
        }
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
        true,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      }
      queryMainGrid();
    };

    // 打开修改弹出画面
    const openADDUDialog = (currentRow: any) => {};
    // 点击按钮打开弹框
    const openXrEfDialog = (PROC_DIV: string) => {
      dialogVisible.value = true;
      proc_div = PROC_DIV;
    };

    // 关闭弹框监听

    const xrEfDialogClose = async () => {
      bunker_no_get();
      //queryMainGrid();
      nextTick(() => {
        nextTick(() => {
          NO_SELECT.value.name = QUALITY_BATCH_NO;
          erFormHelper.setGridIndicator(gridView1, { WEIGH_NO: WEIGH_NO_DW });
        });
        nextTick(() => {
          valueChanged();
        });
      });
    };
    // 获取弹窗画面传递过来的数据 新增
    const getChildInfo = (info: any) => {
      if (info.close) {
        dialogVisible.value = false;
        QUALITY_BATCH_NO = info.QUALITY_BATCH_NO;
        xrEfDialogClose();
      }
    };
    const bunker_no_get = async () => {
      bunker_no.length = 0;
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          MAT_CODE: MAT_CODE_Q,
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        "mmsm81_quality_inq",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        //维护完成重新查询
        erFormHelper.messageError("查询错误：" + outInfo.sys.msg);
        return false;
      } else {
        for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
           const QUALITY_BATCH_NO = outInfo.getBlock(0).data[i]["QUALITY_BATCH_NO"];
const LOT_NO = outInfo.getBlock(0).data[i]["LOT_NO"] || ""; // 空值兼容
          bunker_no.push({
            id: i,
              name: outInfo.getBlock(0).data[i]["QUALITY_BATCH_NO"],
              text: `${QUALITY_BATCH_NO } - ${LOT_NO}`, // 新增显示文本
          });
        }
      }
    };
    // 主表焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      if (XIANSHI_FLAG.value) {
        if (!e.data) {
          erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
          erFormHelper.clearLayoutOrGridData("LayoutGroupFilter2"); // 清空子表数据
          return;
        }

        // const mainGridCurrentRow = erFormHelper.getGridCurrentRow(gridView1);

        // erFormHelper.mergeDataToLayoutOrGrid(
        //   eiBlock,
        //   true,
        //   "LayoutGroupFilter2"
        // );

        if (e && e.rowChanged) {
          erFormHelper.checkGridCurrentRow("gridView1");
          let selectedMainGridRow: any = [];
          selectedMainGridRow = e.data.toJSON();
          const eiBlock = new EI.EiBlock();
          eiBlock.pushData(selectedMainGridRow, true);
          console.log("33333", eiBlock);
          erFormHelper.setControlValue(
            "LayoutGroupFilter2",
            "MAT_NAME",
            eiBlock.data[0]["MAT_NAME"]
          );
          erFormHelper.setControlValue(
            "LayoutGroupFilter2",
            "MAT_RCV_TIME",
            eiBlock.data[0]["MAT_RCV_TIME"]
          );
          erFormHelper.setControlValue(
            "LayoutGroupFilter2",
            "RAW_WEIGHT",
            eiBlock.data[0]["RAW_WEIGHT"]
          );
          erFormHelper.setControlValue(
            "LayoutGroupFilter2",
            "SHIP_NAME",
            eiBlock.data[0]["SHIP_NAME"]
          );
          erFormHelper.setControlValue(
            "LayoutGroupFilter2",
            "VEHICLE_NO",
            eiBlock.data[0]["VEHICLE_NO"]
          );
          if (e.data) {
            if (e.data.get("AA_TIME") != "") {
              AA_TIME.value =
                e.data.get("AA_TIME").slice(0, 4) +
                "-" +
                e.data.get("AA_TIME").slice(4, 6) +
                "-" +
                e.data.get("AA_TIME").slice(6, 8) +
                " " +
                e.data.get("AA_TIME").slice(8, 10) +
                ":" +
                e.data.get("AA_TIME").slice(10, 12) +
                ":" +
                e.data.get("AA_TIME").slice(12, 14);
            } else {
              AA_TIME.value = "";
            }
            if (e.data.get("SEND_FLAG") != "1") {
              SEND_FLAG.value = "未发送";
            } else {
              SEND_FLAG.value = "已发送";
            }

            if (e.data.get("FORM_EDIT_FLAG") == "0") {
              NO_SELECT.value.name = "";
              MAT_CODE_Q = e.data.get("MAT_CODE");
              bunker_no_get();
            } else if (e.data.get("FORM_EDIT_FLAG") == "1") {
              NO_SELECT.value.name = "";
              bunker_no.length = 0;
              bunker_no.push({
                id: 0,
                name: e.data.get("QUALITY_BATCH_NO"),
              });
            }
            NO_SELECT.value.name = e.data.get("QUALITY_BATCH_NO");
            queryDetailInfo({
              QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
            });
          }
        }
      }
    };
    const GridView4FocusChanged = async (e: any) => {
      if (!XIANSHI_FLAG.value) {
        if (!e.data) {
          erFormHelper.clearGridData("gridView2", "gridView3"); // 清空子表数据
          return;
        }
        if (e && e.rowChanged) {
          if (e.data) {
            if (e.data.get("AA_TIME") != "") {
              AA_TIME.value =
                e.data.get("AA_TIME").slice(0, 4) +
                "-" +
                e.data.get("AA_TIME").slice(4, 6) +
                "-" +
                e.data.get("AA_TIME").slice(6, 8) +
                " " +
                e.data.get("AA_TIME").slice(8, 10) +
                ":" +
                e.data.get("AA_TIME").slice(10, 12) +
                ":" +
                e.data.get("AA_TIME").slice(12, 14);
            } else {
              AA_TIME.value = "";
            }
            if (e.data.get("SEND_FLAG") != "1") {
              SEND_FLAG.value = "未发送";
            } else {
              SEND_FLAG.value = "已发送";
            }

            if (e.data.get("FORM_EDIT_FLAG") == "0") {
              NO_SELECT.value.name = "";
              MAT_CODE_Q = e.data.get("MAT_CODE");
              bunker_no_get();
            } else if (e.data.get("FORM_EDIT_FLAG") == "1") {
              NO_SELECT.value.name = "";
              bunker_no.length = 0;
              bunker_no.push({
                id: 0,
                name: e.data.get("QUALITY_BATCH_NO"),
              });
            }
            NO_SELECT.value.name = e.data.get("QUALITY_BATCH_NO");
            queryDetailInfo({
              QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
            });
          }
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
      erGrid4Ready,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      getChildInfo,
      xrEfDialogClose,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      valueChanged,
      openXrEfDialog,
      GridView1FocusChanged,
      GridView4FocusChanged,
      XIANSHI_FLAG,
      valueChanged_CX,
      NO_SELECT,
      AA_TIME,
      SENT_TIME,
      SEND_FLAG,
      readonly_sex,
      bunker_no,
    };
  },
});
