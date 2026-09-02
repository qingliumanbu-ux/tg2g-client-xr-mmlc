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
import { validateHeaderName } from "http";

export default defineComponent({
  name: "MMSMJLLSTJS2N",
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
    const subGridData = ref<any>([]);
    let i_form_ename = ""; // 低代码配置画面布局名
    const initializeFlag = ref(0);
    let i_proc_div = "";
    let gridView1!: any;
    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;

    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: "";
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
      getColumn();
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
        "mmsmjllstj_inq"
      );
    };
    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const getColumn = async () => {
      //压条件
      const eiinfo = new EI.EIInfo();
      const eiBlock = eiinfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          VIEW_FLAG: "1",
        },
        true
      );

      await erFormHelper
        .callService("mmsm50_inq", eiinfo, true, true, true)
        .then((res) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            erFormHelper.addGridColumn("gridView1", [
              {
                headerName: res.getBlock(0).data[i]["MAT_CODE"],
                field: res.getBlock(0).data[i]["MAT_NAME"],
                width: "100px",
              },
            ]);
          }
        });
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      erGrid1Ready,
      F2_DO,
    };
  },
});
