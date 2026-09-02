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
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import * as XLSX from "xlsx";

export default defineComponent({
  name: "MMSMYLS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
    ErPopQuery,
    XLSX,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: "";
    let PROGRAM_NAME: string;
    let f3_service: "";
    let f4_service: "";
    let f4_title = "";
    let i_form_ename = ""; // 低代码配置画面布局名
    let grid_main!: any;
    let popFreeEdit: ER.PopFreeHelper;
    const gridView1 = ref("gridView1");

    f4_title = "导出数据.xlsx";

    const initializeService = "mmsm_form_get";

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名

      if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams["PROGRAM_NAME"];
      }
      if (efFormInfo.value.formParams?.f3_service) {
        f3_service = efFormInfo.value.formParams["f3_service"];
      }
      if (efFormInfo.value.formParams?.f4_service) {
        f4_service = efFormInfo.value.formParams["f4_service"];
      }
      if (efFormInfo.value.formParams?.f4_title) {
        f4_title = efFormInfo.value.formParams["f4_title"];
      }

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
      grid_main = erFormHelper.getGrid(gridView1.value);
      erFormHelper.setGridToolbarVisible(gridView1.value, {
        addrow: false,
        copyrow: false,
        excel: true,
      });
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
      //console.log('serverPageFilter',serverPageFilter);
      erFormHelper.clearGridData("gridView1");
      erFormHelper.setGridServerPagingService(
        "gridView1",
        serverPageFilter,
        efFormInfo.value.formParams["service"]
      );
      erFormHelper.setGridEditable("gridView1", false);
    };

    // 维护
    const F3_PreDo = (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        excel: true,
        import: true,
        addrow: true,
        copyrow: true,
        delete: true,
      });
      //erFormHelper.setGridColumnEditable("gridView1", false, "CODE");
      // erFormHelper.clearGridData("gridView1");
      erFormHelper.setGridEditable("gridView1", true);
    };
    // 维护确认
    const F3_DO = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        excel: false,
        import: false,
        addrow: false,
        copyrow: false,
        delete: false,
      });
      if (erFormHelper.hasDataChange("gridView1")) {
        const eiinfo = new EI.EIInfo();
        const created = erFormHelper.getGridRowsAsBlock("gridView1", "add");
        eiinfo.addBlock(created, "ADD");

        const updated = erFormHelper.getGridRowsAsBlock("gridView1", "modify");
        eiinfo.addBlock(updated, "UPD");

        const deleted = erFormHelper.getGridRowsAsBlock("gridView1", "delete");
        eiinfo.addBlock(deleted, "DEL");

        const para =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

        eiinfo.addBlock(para, "PARA");
        console.log("1111", eiinfo);

        const outInfo = await erFormHelper.callService(
          f3_service,
          eiinfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
        } else {
          query();
          erFormHelper.messageSuccess("处理成功!");
        }
      }
    };

    // 维护取消
    const F3_Cancel = async () => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        excel: false,
        import: false,
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("gridView1", false);
      query();
    };

    const F4_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const queryConditionEiBlock: EI.EiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(queryConditionEiBlock);
      // console.log("eiInfo", eiInfo);

      EIManager.callService("", f4_service, eiInfo).then((res: EI.EIInfo) => {
        // 创建一个工作薄对象
        const workbook = XLSX.utils.book_new();
        // 创建一个工作表对象
        const worksheet = XLSX.utils.json_to_sheet(res.getBlock(0).data);
        //将工作表添加到工作簿
        XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
        XLSX.writeFile(workbook, f4_title); //导出表格
      });
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F3_Cancel,
      F3_PreDo,
      erGrid1Ready,
      gridView1,
    };
  },
});
