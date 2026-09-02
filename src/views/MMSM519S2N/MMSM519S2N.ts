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
import MMSM81518ADDV from "../MMSM81518ADDV/MMSM81518ADDV.vue";
import MMSM408N1ADDV from "../MMSM408N1ADDV/MMSM408N1ADDV.vue";
import MMSM408N2ADDV from "../MMSM408N2ADDV/MMSM408N2ADDV.vue";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MMSM519S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    MMSM81ADDV,
    MMSM50ADDS2N,
    MMSM81518ADDV,
    MMSM408N1ADDV,
    MMSM408N2ADDV,
    erGrid,
    erLayout,
    ErPopFree,
    ErPopQuery,
  },
  setup: () => {
    const dialogFormName = ref(""); // 弹出画面的画面名
    const initializeService = "";
    const $router = useRouter();
    const detailTabsRef = ref<any>(null);
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    let suoding = false;
    const initializeFlag = ref(0);
    let gridView1: any;
    const editable = ref(false);
    const xrEfDialogRef = ref<any>(null);
    let S_MAT_CODE: any;
    let formNamePara = ref("");
    let formPartition: string;
    let formName: string;
    let rateWidth = "";
    let rateHeight = "";
    const parentInfo = ref({});
    const parentInfo1 = ref({});
    const RETURN_BUNKER = ref("");
    const RETURN_NAME = ref("");
    const formlayout: Ref<any[]> = ref([]);
    const bunker = reactive(new Array());
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      initializePage();
    };

    const erGrid1Ready = () => {
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };

    //通过炼钢配置表，进行模板画面参数查询
    const queryMainGrid = async () => {
      if (!erFormHelper.checkRequiredInput("layoutControlGroup1")) {
        return false;
      }
      erFormHelper.clearLayoutOrGridData("gridView1");
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup1"
      );
      eiInfo.addBlock(eiBlock, "Table0");
      await erFormHelper
        .callService("mmsm81s_inq", eiInfo, true, true, true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, "gridView1");
          });
        });
    };

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
        if (dialogFormName.value == "MMSM50ADDS2N") {
          console.log("LXX-LXX-LXX", info.MAT_CODE);
          erFormHelper.setControlValue(
            "layoutControlGroup2",
            "MAT_CODE",
            info.MAT_CODE
          );
          erFormHelper.setControlValue(
            "layoutControlGroup2",
            "MAT_NAME",
            info.MAT_NAME
          );
          S_MAT_CODE = info.MAT_CODE;
        } else {
          RETURN_BUNKER.value = info.BUNKER_NO;
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NO",
            info.BUNKER_NO
          );
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NAME",
            info.MAT_NAME
          );
        }
        bunker.length = 0;
        bunker.push(info.MAT_CODE);
        bunker.push(info.MAT_NAME);
        xrEfDialogClose();
      }
    };

    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        "MMSM519S2N",
        "",
        ""
      );

      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          nextTick(() => {
            erFormHelper.addModelToLayout("layoutControlGroup2", false, false);
            erFormHelper.addModelToLayout("layoutControlGroup4", true, false);
            erFormHelper.setLayoutItemContentBackColor(
              "layoutControlGroup2",
              [
                "WEIGH_NO",
                "MAT_CODE",
                "SHIP_NAME",
                "VEHICLE_NO",
                "GROSS_WT",
                "TARE_WT",
                "BUCKLE_WT",
                "NET_WT",
                "STOCK_WT",
                "LOT_NO",
              ],
              "rgb(213 213 213)"
            );
            erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
            erFormHelper.setLayoutItemContentBackColor(
              "layoutControlGroup4",
              ["BUNKER_NO", "BUNKER_NAME"],
              "rgb(213 213 213)"
            );
            erFormHelper.setAllControlReadOnly("layoutControlGroup4", true);
          });
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };

    onMounted(() => {
      // initializePage();
    });
    const GridView1FocusChanged = async (e: any) => {
      if (!suoding) {
        //未锁定时是生成的信息
        if (!e.data) {
          erFormHelper.clearLayoutOrGridData("LayoutGroupFilter2"); // 清空子表数据
          erFormHelper.clearLayoutOrGridData("LayoutGroupFilter3"); // 清空子表数据
          return;
        }
        if (e && e.rowChanged) {
          if (e.data) {
            queryDetailInfo({
              MAT_CODE: e.data.get("MAT_CODE"),
              WEIGH_NO: e.data.get("WEIGH_NO"),
              BUNKER_NO: e.data.get("BUNKER_NO"),
            });
          }
        }
      }
    };
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 计量信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo = await erFormHelper.callService(
        "mmsm81s_inq",
        eiInfo1,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.setControlValueEx(
          "layoutControlGroup2",
          outInfo.getBlock(0).data[0]
        );
        erFormHelper.setControlValueEx(
          "layoutControlGroup4",
          outInfo.getBlock(0).data[0]
        );
        erFormHelper.setControlValueEx(
          "layoutControlGroup4",
          outInfo.getBlock(0).data[0]
        );
        bunker.length = 0;
        bunker.push(outInfo.getBlock(0).data[0]["MAT_CODE"]);
        bunker.push(outInfo.getBlock(0).data[0]["MAT_NAME"]);
        bunker.push(outInfo.getBlock(0).data[0]["MAT_TYPE"]);
      }
    };

    onMounted(() => {
      // initializePage();
    });
    const layout2_Changed = async (e: any) => {
      if (e.itemCode == "BOTTON_MAT_CODE") {
        const data = {};
        dialogFormName.value = " "; // 读配置表获取画面名
        dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }

      if (e.itemCode == "QUE_LR") {
        const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
          "layoutControlGroup2"
        );
        if (eiBlock.data[0]["MAT_CODE"] == "") {
          erFormHelper.messageError("物料代码为空");
          return;
        }
        if (eiBlock.data[0]["SHIP_NAME"] == "") {
          erFormHelper.messageError("主车号为空");
          return;
        }
        if (eiBlock.data[0]["NET_WT"] == "0") {
          erFormHelper.messageError("重量不能为0");
          return;
        }
        if (
          eiBlock.data[0]["MAT_CODE"]?.toString().slice(0, 3) == "F01" ||
          eiBlock.data[0]["MAT_CODE"]?.toString().slice(0, 3) == "F02"
        ) {
          if (eiBlock.data[0]["LOT_NO"] == "") {
            erFormHelper.messageError("批次号为空");
            return;
          }
        }
        //20251117bywcm

        let resTable = erFormHelper.querySql(
          "",
          ` select T.BACK_C3, T.QUALITY_FLAS from tmmsm50 t WHERE MAT_CODE = '` +
            eiBlock.data[0]["MAT_CODE"] +
            `'`
        );

        const flag_207 = (await resTable)
          .getBlock(0)
          .data[0]["QUALITY_FLAS"]?.toString();
        const flag_209 = (await resTable)
          .getBlock(0)
          .data[0]["BACK_C3"]?.toString();
        console.log("20250418", flag_207);
        console.log("20250418", flag_209);
        if (flag_207 == "1" || flag_209 == "1") {
          if (eiBlock.data[0]["LOT_NO"] == "") {
            erFormHelper.messageError("该物料的批次号不能为空");
            return;
          }
        }
        erFormHelper.setLayoutItemContentBackColor(
          "layoutControlGroup2",
          [
            "WEIGH_NO",
            "MAT_CODE",
            "SHIP_NAME",
            "VEHICLE_NO",
            "GROSS_WT",
            "TARE_WT",
            "BUCKLE_WT",
            "NET_WT",
            "STOCK_WT",
            "LOT_NO",
          ],
          "rgb(213 213 213)"
        );
        erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
        const mes_res = await erFormHelper.messageConfirm(
          "成功：通过数据合法性检查！ 只有锁定才能成分输入和库存选择（注意：锁定后无法修改信息）"
        );
        if (!mes_res) {
          return;
        } else {
          //生成计量单号并锁定不可修改
          S_MAT_CODE = eiBlock.data[0]["MAT_CODE"];
          const eiInfo = new EI.EIInfo();
          eiInfo.addBlock(eiBlock, "Table0");
          const outInfo = await erFormHelper.callService(
            "mmsm81_inq_seq",
            eiInfo,
            true,
            false,
            true
          );
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError("生成计量单号错误:" + outInfo.sys.msg);
          } else {
            nextTick(() => {
              erFormHelper.setControlValue(
                "layoutControlGroup2",
                "WEIGH_NO",
                outInfo.getBlock(0).data[0]["WEIGH_NO"]
              );
            });
          }
          erFormHelper.setLayoutItemContentBackColor(
            "layoutControlGroup2",
            [
              "WEIGH_NO",
              "MAT_CODE",
              "SHIP_NAME",
              "VEHICLE_NO",
              "GROSS_WT",
              "TARE_WT",
              "BUCKLE_WT",
              "NET_WT",
              "STOCK_WT",
              "LOT_NO",
            ],
            "rgb(213 213 213)"
          );
          erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
          erFormHelper.setAllControlReadOnly("layoutControlGroup4", false);
          erFormHelper.setLayoutItemContentBackColor(
            "layoutControlGroup4",
            ["BUNKER_NO", "BUNKER_NAME"],
            "rgb(255 255 255)"
          );
          suoding = true;
        }
      }
    };
    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      erFormHelper.resetLayout("layoutControlGroup2");
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", false);
      erFormHelper.setLayoutItemContentBackColor(
        "layoutControlGroup2",
        [
          "WEIGH_NO",
          "MAT_CODE",
          "SHIP_NAME",
          "VEHICLE_NO",
          "GROSS_WT",
          "TARE_WT",
          "BUCKLE_WT",
          "NET_WT",
          "STOCK_WT",
          "LOT_NO",
        ],
        "rgb(255 255 255)"
      );
    };

    const F4_DO = async (e: any) => {
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup2"
      );
      if (eiBlock.data[0]["MAT_CODE"] == "") {
        erFormHelper.messageError("物料代码为空");
        return;
      }
      if (eiBlock.data[0]["SHIP_NAME"] == "") {
        erFormHelper.messageError("主车号为空");
        return;
      }
      if (eiBlock.data[0]["NET_WT"] == "0") {
        erFormHelper.messageError("重量不能为0");
        return;
      }
      erFormHelper.setLayoutItemContentBackColor(
        "layoutControlGroup2",
        [
          "WEIGH_NO",
          "MAT_CODE",
          "SHIP_NAME",
          "VEHICLE_NO",
          "GROSS_WT",
          "TARE_WT",
          "BUCKLE_WT",
          "NET_WT",
          "STOCK_WT",
          "LOT_NO",
        ],
        "rgb(213 213 213)"
      );
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
      const mes_res = await erFormHelper.messageConfirm(
        "成功：通过数据合法性检查！ 只有锁定才能成分输入和库存选择（注意：锁定后无法修改信息）"
      );
      if (!mes_res) {
        return;
      } else {
        //生成计量单号并锁定不可修改
        S_MAT_CODE = eiBlock.data[0]["MAT_CODE"];
        const eiInfo = new EI.EIInfo();
        eiInfo.addBlock(eiBlock, "Table0");
        const outInfo = await erFormHelper.callService(
          "mmsm81_inq_seq",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("生成计量单号错误:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "WEIGH_NO",
              outInfo.getBlock(0).data[0]["WEIGH_NO"]
            );
          });
        }
        erFormHelper.setLayoutItemContentBackColor(
          "layoutControlGroup2",
          [
            "WEIGH_NO",
            "MAT_CODE",
            "SHIP_NAME",
            "VEHICLE_NO",
            "GROSS_WT",
            "TARE_WT",
            "BUCKLE_WT",
            "NET_WT",
            "STOCK_WT",
            "LOT_NO",
          ],
          "rgb(213 213 213)"
        );
        erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
        erFormHelper.setAllControlReadOnly("layoutControlGroup4", false);
        erFormHelper.setLayoutItemContentBackColor(
          "layoutControlGroup4",
          ["BUNKER_NO", "BUNKER_NAME"],
          "rgb(255 255 255)"
        );
        suoding = true;
      }
    };
    const layout4_click = async (e: any) => {
      if (e.itemCode == "BTN_FGK") {
        //废钢坑
        const data = {
          MAT_CODE: S_MAT_CODE,
        };
        dialogFormName.value = " ";
        formNamePara.value = " ";
        dialogFormName.value = "MMSM81518ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_FGKD") {
        //废钢坑
        const data = {
          MAT_CODE: S_MAT_CODE,
        };
        dialogFormName.value = " ";
        formNamePara.value = " ";
        dialogFormName.value = "MMSM408N1ADDV"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_FGKX") {
        //废钢坑
        const data = {
          MAT_CODE: S_MAT_CODE,
        };
        dialogFormName.value = " ";
        formNamePara.value = " ";
        dialogFormName.value = "MMSM408N2ADDV"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }

      if (e.itemCode == "BTN_FGK1") {
        //废钢坑
        dialogFormName.value = " ";
        formNamePara.value = " ";
        const data1 = {
          // BACK_C4: 'MMSM518_1S2N',
          BUNKER_CODE: " ",
          FORMNAME: "MMSM518_1S2N",
          MAT_CODE: S_MAT_CODE,
          BUNKER_TYPE: "VS",
          rateWidth: "6.6",
          rateHeight: "25",
        };
        // rateWidth = "6.6";
        // rateHeight = "25";
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        // formNamePara.value = "MMSM518_1S2N";
        parentInfo1.value = data1;
        console.log("111111111", data1);
        console.log("111111111", parentInfo1);
      }
      openXrEfDialog();
    };
    const F12_DO = (e: any) => {
      if (!suoding) {
        erFormHelper.messageError("录入信息未锁定！");
        return;
      }
      const eiBlock1 = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup4"
      );
      if (eiBlock1.data[0]["BUNKER_NO"] === "") {
        erFormHelper.messageError("料仓号不能为空");
        return;
      }
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup2"
      );
      eiBlock.data[0]["MARK_POS_CODE"] = "7"; //自循环废钢

      eiInfo.addBlock(eiBlock, "Table0");
      eiInfo.addBlock(eiBlock1, "Table1");

      erFormHelper
        .callService("mmsm81xz1_ins", eiInfo, true, true, true)
        .then((res) => {
          nextTick(() => {
            queryMainGrid();
            suoding = false;
            erFormHelper.setLayoutItemContentBackColor(
              "layoutControlGroup2",
              [
                "WEIGH_NO",
                "MAT_CODE",
                "SHIP_NAME",
                "VEHICLE_NO",
                "GROSS_WT",
                "TARE_WT",
                "BUCKLE_WT",
                "NET_WT",
                "STOCK_WT",
                "LOT_NO",
              ],
              "rgb(213 213 213)"
            );
            erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
            erFormHelper.setLayoutItemContentBackColor(
              "layoutControlGroup4",
              ["BUNKER_NO", "BUNKER_NAME"],
              "rgb(213 213 213)"
            );
            erFormHelper.setAllControlReadOnly("layoutControlGroup4", true);
          });
        });
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F12_DO,
      erGrid1Ready,
      dialogVisible,
      layout2_Changed,
      layout4_click,
      GridView1FocusChanged,
      xrEfDialogRef,
      xrEfDialogClose,
      formNamePara,
      getChildInfo,
      parentInfo,
      parentInfo1,
      dialogFormName,
      bunker,
      RETURN_BUNKER,
    };
  },
});
