import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  toRaw,
  nextTick,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import { Console } from "console";

export default defineComponent({
  name: "MMSM82C1S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service

    const initializeService = "mmsm_form_get";

    // 变量定义
    const upd_hisRecord_flag = ref(true);
    const subGridData = ref<any>([]);
    let i_form_ename = ""; // 低代码配置画面布局名
    const initializeFlag = ref(0);
    let i_proc_div = "";
    const inInfoUP = new EI.EIInfo();
    let gridView1!: any;
    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;

    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: string;
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName;

      Initialize();
    };
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
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

    onMounted(() => {});

    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService("mmsm82c1_inq", eiInfo, true, true, true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
    };
    const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
      eiBlock.addColumn("PROC_DIV");
      eiBlock.data[0]["PROC_DIV"] = i_proc_div;

      inInfo.addBlock(eiBlock, "EDIT");

      inInfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );

      outInfo = await erFormHelper.callService(
        "mmsm82c1_pro",
        inInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.messageSuccess("操作成功");
      }
      queryMainGrid();
    };
    const popFreeEditOkClick1 = async(e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
          eiBlock.addColumn("PROC_DIV");
          eiBlock.data[0]["PROC_DIV"] = i_proc_div;
          inInfo.addBlock(eiBlock, "EDIT");
          inInfo.addBlock(
              erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                  PROC_DIV: "M",
              }),
              "EDITM"
              );

          inInfo.addBlock(
              erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
              "PARA"
              );

          outInfo = await erFormHelper.callService(
              "mmsm82c1_upd_bat",
              inInfo,
              true,
              false,
              true
              );

          if (outInfo.sys.status < 0) {
              erFormHelper.messageError(outInfo.sys.msg);
          } else {
              erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
              erFormHelper.messageSuccess("操作成功");
          }
          queryMainGrid();
    };
    const popFreeEditOkClick2 = async(e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
          eiBlock.addColumn("PROC_DIV");
          eiBlock.data[0]["PROC_DIV"] = i_proc_div;
          inInfo.addBlock(eiBlock, "EDIT");
          inInfo.addBlock(
              erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                  PROC_DIV: "M",
              }),
              "EDITM"
              );

          inInfo.addBlock(
              erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
              "PARA"
              );

          outInfo = await erFormHelper.callService(
              "mmsm82c2_upd_bat",
              inInfo,
              true,
              false,
              true
              );

          if (outInfo.sys.status < 0) {
              erFormHelper.messageError(outInfo.sys.msg);
          } else {
              erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
              erFormHelper.messageSuccess("操作成功");
          }
          queryMainGrid();
    };
const popFreeEditOkClick3 = async(e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
          eiBlock.addColumn("PROC_DIV");
          eiBlock.data[0]["PROC_DIV"] = i_proc_div;
          inInfo.addBlock(eiBlock, "EDIT");
          inInfo.addBlock(
              erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                  PROC_DIV: "M",
              }),
              "EDITM"
              );

          inInfo.addBlock(
              erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
              "PARA"
              );

          outInfo = await erFormHelper.callService(
              "mmsm82c3_upd_bat",
              inInfo,
              true,
              false,
              true
              );

          if (outInfo.sys.status < 0) {
              erFormHelper.messageError(outInfo.sys.msg);
          } else {
              erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
              erFormHelper.messageSuccess("操作成功");
          }
          queryMainGrid();
    };
    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      i_proc_div = "I";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        "MMSM82C1_POP_LAYOUT"
          );
        popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);

      popFreeEdit.setEvent("itemValueChanged", async (e: any) => {});
    };
    const F4_DO = async (e: any) => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
      }
      //加载弹窗配置
      console.log("sw0", "mmsm82c1_pro");
      i_proc_div = "U";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        "MMSM82C1_POP_LAYOUT"
      );
     popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };
    const F5_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再删除");
        return false;
      }
      const mes_res = await erFormHelper.messageConfirm(
        "选中的记录将被永久删除， 是否继续？"
      );
      if (!mes_res) {
        return false;
      }
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", {
          PROC_DIV: "D",
        }),
        "EDIT"
      );
      inInfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm82c1_pro",
        inInfo,
        true,
        true,
        true
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
        //erFormHelper.getGridServerPageData("gridView1");
      }
      queryMainGrid();
    };

    const F6_DO = async(e: any) => {
          if (erFormHelper.getGridCheckedRows("gridView1").length === 0) {
              erFormHelper.messageWarning("请选择一条信息再修改");
              return false;
      }

      const mainGridCheckedRow =
          erFormHelper.getGridCheckedRowsAsBlock("gridView1");

      for (let i = 0; i < mainGridCheckedRow.data.length; i++) {
    if (
        mainGridCheckedRow.data[i]["L2_PROC_NO"] !=
        mainGridCheckedRow.data[0]["L2_PROC_NO"]
        ) {
        erFormHelper.messageWarning(
            "选中记录处理号不同，不允许多条修改操作！"
            );
        return false;
    }
    if (
        mainGridCheckedRow.data[i]["DEV_CODE"] !=
        mainGridCheckedRow.data[0]["DEV_CODE"]
        ) {
        erFormHelper.messageWarning(
            "选中记录工位不同，不允许多条修改操作！"
            );
        return false;
    }
}
// const mes_res = await erFormHelper.messageConfirm(
//   "选中的记录将被修改处理号， 是否继续？"
// );
// if (!mes_res) {
//   return false;
// }
//加载弹窗配置
console.log("sw0", "mmsm82c1_pro");
i_proc_div = "M";
popFreeEdit = new ER.PopFreeHelper(
    formPartition,
    "MMSMUPD_LAYOUT",
    "MMSM82C1_POP_LAYOUT2"
    );

popFreeEdit.ReceiveData(mainGridCheckedRow.data[0], {
    LOT_NO: true,
});
ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick1);
    };
const F10_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
  }

  const mainGridCheckedRow =
    erFormHelper.getGridCheckedRowsAsBlock("gridView1");

  for (let i = 0; i < mainGridCheckedRow.data.length; i++) {
        if (
            mainGridCheckedRow.data[i]["MAT_CODE"] !=
            mainGridCheckedRow.data[0]["MAT_CODE"]
            ) {
            erFormHelper.messageWarning(
                "选中记录物料代码不同，不允许多条修改操作！"
                );
            return false;
        }
    }
    //加载弹窗配置
    console.log("sw0", "mmsm82c1_pro");
    i_proc_div = "M";
    popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        "MMSM82C1_POP_LAYOUT4"
        );

    ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick3);
};
    const F9_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
      }

      const mainGridCheckedRow =
    erFormHelper.getGridCheckedRowsAsBlock("gridView1");

      for (let i = 0; i < mainGridCheckedRow.data.length; i++) {
        if (
            mainGridCheckedRow.data[i]["MAT_CODE"] !=
            mainGridCheckedRow.data[0]["MAT_CODE"]
            ) {
            erFormHelper.messageWarning(
                "选中记录批次号不同，不允许多条修改操作！"
                );
            return false;
        }

    }

    console.log("sw0", "mmsm82c1_pro");
    i_proc_div = "M";
    popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        "MMSM82C1_POP_LAYOUT3"
        );


    ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick2);
};
    const F7_DO = async (e: any) => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再新增");
        return false;
      }
      //加载弹窗配置
      i_proc_div = "I";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        "MMSM82C1_POP_LAYOUT"
      );
      popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };
    const F8_DO = async (e: any) => {
      /*if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择至少一条信息");
        return false;
      }*/
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getGridSelectRowsAsBlock("gridView1");
      inInfo.addBlock(eiBlock, "EDIT");

      inInfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );

      outInfo = await erFormHelper.callService(
        "mmsm82c1_ret",
        inInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.messageSuccess("操作成功");
      }
      erFormHelper.hideGridColumn("gridView1", "EVENT_DESC");
      erFormHelper.setControlValue("LayoutGroupFilter", "UPD_HIS_RECORD", "0");
      erFormHelper.setGridIndicator(gridView1, {
        SEQ_NO_2A: eiBlock.data[0]["SEQ_NO_2A"],
      });
      queryMainGrid();
    };

    const valueChanged = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "UPD_HIS_RECORD") {
        erFormHelper.showGridColumn("gridView1", "EVENT_DESC");
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        queryMainGrid();
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      upd_hisRecord_flag,
      efFormReady,
      erGrid1Ready,
      valueChanged,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F8_DO,
      F9_DO,
      F10_DO,
    };
  },
});
