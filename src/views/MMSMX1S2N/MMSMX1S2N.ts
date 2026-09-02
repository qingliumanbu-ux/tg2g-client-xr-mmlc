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
import Select from "ant-design-vue/es/vc-select";
import { SELECTION_COLUMN } from "ant-design-vue/es/table/hooks/useSelection";
import { selectProps } from "ant-design-vue/es/select";

export default defineComponent({
  name: "MMSMX1S2N",
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
    let GridView1!: any;
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
      GridView1 = erFormHelper.getGrid("GridView1");
      erFormHelper.setGridColumnEditable(GridView1, false, "YEAR_MON");
      erFormHelper.setGridColumnEditable(GridView1, false, "MEMO_DETAIL");
      erFormHelper.setGridColumnEditable(GridView1, false, "FINISH_TIME");
      erFormHelper.setGridColumnEditable(GridView1, true, "FIN_CONFM_FLAG");
      GridView1.gridOptions.getRowStyle = (params: any) => {
        if (params.data.FIN_CONFM_FLAG === true) {
          //完成状态颜色为蓝色
          erFormHelper.checkGridRow("GridView1", params.data.uid, true);
          return {
            fontweight: "blod",
            background: "#7FBFF5",
          };
        }
        if (params.data.FIN_CONFM_FLAG === false) {
          //完成状态颜色为蓝色
          erFormHelper.checkGridRow("GridView1", params.data.uid, false);
        }
      };
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
        .callService("mmsmx1_inq", eiInfo, true, true, true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, GridView1);
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
        "mmsmx1_pro",
        inInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), GridView1);
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
        "MMSMX1POP",
        "MMSMX1_POP_LAYOUT"
      );
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };
    const F4_DO = async (e: any) => {
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock(GridView1);
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo("请勾选数据行！");
        return;
      }
      //加载弹窗配置
      console.log("sw0", efFormInfo.value.formParams["service3"]);
      i_proc_div = "U";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMX1POP",
        "MMSMX1_POP_LAYOUT"
      );
      popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("GridView1"));
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };
    const F5_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock(GridView1);
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo("请勾选数据行！");
        return;
      }
      const mes_res = await erFormHelper.messageConfirm(
        "选中的记录将被永久删除， 是否继续？"
      );
      if (!mes_res) {
        return false;
      }
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1", {
          PROC_DIV: "D",
        }),
        "EDIT"
      );
      inInfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );
      const outInfo = await erFormHelper.callService(
        "mmsmx1_pro",
        inInfo,
        true,
        true,
        true
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
        //erFormHelper.getGridServerPageData("GridView1");
      }
      queryMainGrid();
    };
    const F6_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock(GridView1);
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo("请勾选数据行！");
        return;
      }
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1", {
          PROC_DIV: "F",
        }),
        "EDIT"
      );
      eiInfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );
      const outInfo = await erFormHelper.callService("mmsmx1_pro", eiInfo);
      if (outInfo.sys.status < 0) {
        //维护完成重新查询
        erFormHelper.messageError("查询错误：" + outInfo.sys.msg);
        return false;
      } else {
        erFormHelper.messageSuccess("操作成功");
        queryMainGrid();
      }
    };
    const F7_DO = async (e: any) => {
      erFormHelper.setGridToolbarVisible("GridView1", {
        import: false,
      });
      const eiinfo = new EI.EIInfo();
      const created = erFormHelper.getGridRowsAsBlock(GridView1, "add");
      created.addColumn("PROC_DIV");
      created.data[0]["PROC_DIV"] = "I";
      eiinfo.addBlock(created, "IMPORT");
      eiinfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );
      const outInfo = await erFormHelper.callService(
        "mmsmx1_pro",
        eiinfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), GridView1);
        erFormHelper.messageSuccess("操作成功");
      }
      queryMainGrid();
    };
    const F7_PRE_DO = async (e: any) => {
      erFormHelper.clearGridData("GridView1");
      erFormHelper.setGridToolbarVisible("GridView1", {
        import: true,
      });
    };
    const F7_CANCEL = async (e: any) => {
      erFormHelper.setGridToolbarVisible("GridView1", {
        import: false,
      });
      queryMainGrid();
    };
    return {
      erFormHelper,
      initializeFlag,
      upd_hisRecord_flag,
      efFormReady,
      erGrid1Ready,

      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F7_PRE_DO,
      F7_CANCEL,
    };
  },
});
