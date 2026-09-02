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
  name: "MMSMUPDS2N",
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
    let gridView1!: any;
    let v_tab: any; 
    v_tab ="1";   
    const tabActiveKey = ref('tab1');

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
    const erGrid2Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
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

    const valueChanged = async (e: any) => {
      if(formName==="MMSM57AS2N")
      {
      if (e.itemCode === "WEEK_DAY" || e.itemCode === "CHECK_FLAG" ) {
        const eiInfo = new EI.EIInfo();
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiInfo.addBlock(queryCondition);
        const outInfo = await erFormHelper.callService(
          "mmsmheatno_inq",
          eiInfo,
          true,
          false,
          true
        );
        erFormHelper.setControlValue("LayoutGroupFilter","BOF0_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF0_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF1_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF1_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF2_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF2_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF9_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","BOF9_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD0_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD0_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD1_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD1_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD2_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD2_E"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD6_S"," ")
        erFormHelper.setControlValue("LayoutGroupFilter","AOD6_E"," ")
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("获取炉号出错:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "WEEK_DAY",
              outInfo.getBlock(0).data[0]["WEEK_DAY"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_S",
              outInfo.getBlock(0).data[0]["BOF0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_E",
              outInfo.getBlock(0).data[0]["BOF0_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_S",
              outInfo.getBlock(0).data[0]["BOF1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_E",
              outInfo.getBlock(0).data[0]["BOF1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_S",
              outInfo.getBlock(0).data[0]["BOF2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_E",
              outInfo.getBlock(0).data[0]["BOF2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_S",
              outInfo.getBlock(0).data[0]["BOF9_S"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_E",
              outInfo.getBlock(0).data[0]["BOF9_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_S",
              outInfo.getBlock(0).data[0]["AOD0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_E",
              outInfo.getBlock(0).data[0]["AOD0_E"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_S",
              outInfo.getBlock(0).data[0]["AOD1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_E",
              outInfo.getBlock(0).data[0]["AOD1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_S",
              outInfo.getBlock(0).data[0]["AOD2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_E",
              outInfo.getBlock(0).data[0]["AOD2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_S",
              outInfo.getBlock(0).data[0]["AOD6_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_E",
              outInfo.getBlock(0).data[0]["AOD6_E"]
            );
          });
        }
      }
    }
    };


    const queryMainGrid = async () => {

      erFormHelper.clearGridData("gridView1");
      erFormHelper.clearGridData("gridView2");
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService(
          efFormInfo.value.formParams["service2"],
          eiInfo,
          true,
          true,
          true
        )
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          const mainData2 = res.blocks["Table1"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, "gridView1");
            erFormHelper.mergeDataToGrid(mainData2, "gridView2");
          });
        });
    };

    const handleTabChange = (activeKey: string) => {
      if (activeKey === 'tab1') {
        v_tab = "1";
      } else if (activeKey === 'tab2') {
       v_tab = "2";      
      }       
      queryMainGrid();
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
        efFormInfo.value.formParams["service3"],
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
        efFormInfo.value.formParams["popFree"]
      );
      // ER.popFreeEdit.AllowEidt = true;
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };
    const F4_DO = async (e: any) => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
      }
      //加载弹窗配置
      console.log("sw0", efFormInfo.value.formParams["service3"]);
      i_proc_div = "U";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMUPD_LAYOUT",
        efFormInfo.value.formParams["popFree"]
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
        efFormInfo.value.formParams["service3"],
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

    const F6_DO = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        import: false,
      });
      const eiinfo = new EI.EIInfo();
      const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
      created.addColumn("PROC_DIV");
      created.data[0]["PROC_DIV"] = "I";
      created.addColumn("ITEM_TYPE");
      created.data[0]["ITEM_TYPE"] = "2";
      eiinfo.addBlock(created, "IMPORT");
      eiinfo.addBlock(
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        "PARA"
      );
      const outInfo = await erFormHelper.callService(
        efFormInfo.value.formParams["service3"],
        eiinfo,
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
    const F6_PRE_DO = async (e: any) => {
      erFormHelper.clearGridData("gridView1");
      erFormHelper.setGridToolbarVisible("gridView1", {
        import: true,
      });
    };
    const F6_CANCEL = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        import: false,
      });
      queryMainGrid();
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
        efFormInfo.value.formParams["popFree"]
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
        efFormInfo.value.formParams["service8"],
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
    return {
      erFormHelper,
      initializeFlag,
      upd_hisRecord_flag,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      tabActiveKey,
      valueChanged,
      handleTabChange,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F6_PRE_DO,
      F6_CANCEL,
      F7_DO,
      F8_DO,
    };
  },
});
