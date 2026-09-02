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
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
import { useRoute, useRouter } from "vue-router";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";

export default defineComponent({
  name: "MMSM517S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    MMSM81ADDV,
    MMSM81518ADDV,
    MMSM50ADDS2N,
    erGrid,
    erLayout,
    ErPopFree,
    ErPopQuery,
  },
  setup: () => {
    const dialogFormName = ref(""); // 弹出画面的画面名
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    let suoding = false;
    const initializeFlag = ref(0);
    const xrEfDialogRef = ref<any>(null);
    let S_MAT_CODE: any;
    let S_MAT_NAME: "";
    let S_MAT_CODE1: "";
    let formPartition: string;
    let formName: string;
    const parentInfo = ref({});
    const RETURN_BUNKER = ref("");
    const RETURN_NAME = ref("");
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);
    const bunker = reactive(new Array());
    const bunker1 = reactive(new Array());
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
      //清空grid数据
      erFormHelper.clearLayoutOrGridData("gridView1");
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup1"
      );
      eiInfo.addBlock(eiBlock, "Table0");
      await erFormHelper
        .callService("mmsm81s_inq", eiInfo, true, true,true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, "gridView1");
            erFormHelper.setControlValueEx("layoutControlGroup4", mainData);
          });
        });
    };
    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };

    let LayoutGroupFilter_NO: string;
    // 关闭弹框监听
    const xrEfDialogClose = () => {};
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        LayoutGroupFilter_NO = info.BUNKER_NO;
        if (dialogFormName.value == "MMSM50ADDS2N") {
          erFormHelper.setControlValue(
            "layoutControlGroup2",
            "MAT_CODE",
            info.MAT_CODE
          );
          S_MAT_CODE = info.MAT_CODE;
          bunker1.length = 0;
          bunker1.push(info.MAT_CODE);
          bunker1.push(info.MAT_NAME);
          // S_MAT_NAME1 =  info.MAT_CODE;
          //erFormHelper.setControlValue("layoutControlGroup2","MAT_NAME",info.MAT_NAME);
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
        xrEfDialogClose();
      }
    };

    const initializePage = async () => {
      console.log("产线sql_mat_kind", 1111);
      // i_form_ename = EFFormInfo.getFormParams().formName;
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        "MMSM517S2N",
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
            erFormHelper.addModelToLayout("layoutControlGroup2", true, false);
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

    //选择物料编码
    const layout2_Changed = async (e: any) => {
      if (e.itemCode == "BOTTON_MAT_CODE") {
        const data = {};
        dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名

        parentInfo.value = data;
        openXrEfDialog();
      }

      if (e.itemCode == "BTN_LR") {
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
  //20251117bywcm
          
        let resTable = erFormHelper.querySql(
              '',
          ` select T.BACK_C3, T.QUALITY_FLAS from tmmsm50 t WHERE MAT_CODE = '`+ eiBlock.data[0]["MAT_CODE"]+ `'`
        );

        const flag_207 =((await resTable).getBlock(0).data[0]["QUALITY_FLAS"]?.toString());
        const flag_209 =((await resTable).getBlock(0).data[0]["BACK_C3"]?.toString());
console.log("20250418", flag_207);
console.log("20250418", flag_209);
if (flag_207 == '1')
        {
    if (eiBlock.data[0]["LOT_NO"] == "") {
        erFormHelper.messageError("该物料的批次号不能为空");
        return;
    }
        }
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

    //选择料仓号
    const layout4_click = async (e: any) => {
      if (e.itemCode == "BTN_QY") {
        //汽运
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM512S2N",
          FORMNAME: "MMSM512S2N",
          rateWidth: "10",
          rateHeight: "50",
        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_HY") {
        //火车
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM513S2N",
          FORMNAME: "MMSM513S2N",
          rateWidth: "4.5",
          rateHeight: "33.5",
        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_DXLC") {
        //废钢料场地下料仓
        // const data = {
        //   MAT_CODE: S_MAT_CODE,
        // };
        // dialogFormName.value = "MMSM81518ADDVS2N"; // 读配置表获取画面名
        // parentInfo.value = data;
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM511S2N",
          FORMNAME: "MMSM511S2N",
          rateWidth: "5.5",
          rateHeight: "33.5",

        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_NBK") {
        //镍板库
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM51RS2N",
          FORMNAME: "MMSM51RS2N",
          rateWidth: "6.6",
          rateHeight: "50",
        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_SX") {
        //丝线
        const mes_res = await erFormHelper.messageConfirm(
          "所有丝线暂存在丝线虚拟库，再进行分发！"
        );
        if (!mes_res) {
          return;
        } else {
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NO",
            "WIRE"
          );
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NAME",
            "丝线虚拟库"
          );
        }
      }
      if (e.itemCode == "BTN_QT") {
        //其他
        const mes_res = await erFormHelper.messageConfirm(
          "所有其他原材料都存放在编号为GEN的虚拟库存中！"
        );
        if (!mes_res) {
          return;
        } else {
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NO",
            "GEN"
          );
          erFormHelper.setControlValue(
            "layoutControlGroup4",
            "BUNKER_NO",
            "虚拟库存"
          );
        }
      }
      if (e.itemCode == "BTN_XNLC") {
        //虚拟料仓
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM515S2N",
          FORMNAME: "MMSM515S2N",
          rateWidth: "10",
          rateHeight: "33.5",
        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
      if (e.itemCode == "BTN_XNLC") {
        //虚拟料仓
        const data = {
          MAT_CODE: S_MAT_CODE,
          WEIGH_NO: "",
          STOCK_WT: "",
          BUNKER_TYPE: "",
          BUCKLE_WT: "",
          BACK_CODE_5: "",
          UNLOAD_POINT_CODE: "",
          BACK_C4: "MMSM515S2N",
          FORMNAME: "MMSM515S2N",
          rateWidth: "10",
          rateHeight: "33.5",
        };
        dialogFormName.value = "MMSM81ADDVS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
    };

    const F2_DO = async (e: any) => {
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
        ],
        "rgb(213 213 213)"
      );
      erFormHelper.setAllControlReadOnly("layoutControlGroup2", true);
      erFormHelper.setAllControlReadOnly("layoutControlGroup3", true);
      erFormHelper.setAllControlReadOnly("layoutControlGroup4", true);
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
      eiBlock.data[0]["MARK_POS_CODE"] = "6"; //原料临时入库
      eiInfo.addBlock(eiBlock, "Table0");
      eiInfo.addBlock(eiBlock1, "Table1");


      erFormHelper
      .callService("mmsm81xz1_ins", eiInfo, true, true,true)
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
      })
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
      GridView1FocusChanged,
      xrEfDialogRef,
      xrEfDialogClose,
      getChildInfo,
      parentInfo,
      dialogFormName,
      RETURN_BUNKER,
      bunker,
      bunker1,
      layout4_click,
    };
  },
});
