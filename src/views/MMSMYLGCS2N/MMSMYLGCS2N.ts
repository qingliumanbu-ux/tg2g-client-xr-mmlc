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

export default defineComponent({
  name: "MMSMYLGCS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    // 获取画面的分区信息及设置画面初始化service
    const subGridData = ref<any>([]);
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    const editable = ref(false);
    let formPartition: string;
    let formName: "";
    let PROGRAM_NAME: string;
    let i_form_ename = ""; // 低代码配置画面布局名
    let grid_main!: any;
    let popFreeEdit: ER.PopFreeHelper;
    let gridView1!: any;

    const initializeService = "mmsm_form_get";
    console.log("11");

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log("formName1", formName);
      if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams["PROGRAM_NAME"];
      }
      console.log("formName", formName);
      initializePage();
    };
    const erFormHelper: ER.FormHelper = new ER.FormHelper();

    // 变量定义
    const initializeFlag = ref(0);
    let dt_key = new EI.EiBlock();
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        i_form_ename,
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {});
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };

    onMounted(() => {});
    //grid实例
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };

    const F2_DO = async () => {
      query();
    };
    const query = async () => {
      const serverPageFilter = new EI.EIInfo();
      const allControlValues =
        erFormHelper.getAllControlValue("LayoutGroupFilter");
      const allControlValuesAsFilter =
        erFormHelper.getAllControlValueAsFilter("LayoutGroupFilter");
      serverPageFilter.addBlock(ER.Core.buildEiBlock([allControlValues]));
      serverPageFilter.addBlock(allControlValuesAsFilter, "QUERY_FILTER");
      console.log("serverPageFilter", serverPageFilter);
      erFormHelper.setGridServerPagingService(
        "gridView1",
        serverPageFilter,
        efFormInfo.value.formParams["service2"]
      );
    };
    // 维护
    const f3PreDo = (e: any) => {
      editable.value = true;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });

      erFormHelper.setGridEditable("gridView1", true);
    };
    // 维护确认
    const f3Do = async (e: any) => {
      erFormHelper.stopGridEditing("GridView1", async () => {
        erFormHelper.setGridToolbarVisible("gridView1", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        return await saveMainGridData()
          .then((res: any) => {
            editable.value = false;
            erFormHelper.setGridEditable("gridView1", false);
          })
          .catch((error) => {
            erFormHelper.messageError(error);
            return false;
          });
        query();
      });
    };

    // 维护取消
    const f3Cancel = async () => {
      editable.value = false;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("gridView1", false);
    };
    // 主表保存
    const saveMainGridData = async () => {
      if (erFormHelper.hasDataChange("gridView1")) {
        const eiinfo = new EI.EIInfo();
        const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
        eiinfo.addBlock(created, "ADD");

        const updated = erFormHelper.getGridRowsAsBlock(gridView1, "modify");
        eiinfo.addBlock(updated, "UPD");

        const deleted = erFormHelper.getGridRowsAsBlock(gridView1, "delete");
        eiinfo.addBlock(deleted, "DEL");

        const para =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiinfo.addBlock(para, "PARA");
        erFormHelper
          .callService(
            efFormInfo.value.formParams["service3"],
            eiinfo,
            true,
            true,
            true
          )
          .then((res) => {
            subGridData.value = res.getBlock("Table0").data;
          });
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      f3Do,
      f3PreDo,
      f3Cancel,
      erGrid1Ready,
      gridView1,
    };
  },
});
