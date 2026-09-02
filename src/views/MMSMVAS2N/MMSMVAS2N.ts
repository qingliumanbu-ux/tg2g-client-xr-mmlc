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
  name: "MMSMVAS2N",
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
      setInterval(() => {
        queryMainGrid();
      }, 60000);
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
        .callService("mmsmva_inq", eiInfo, true, true, true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
          const msg = new SpeechSynthesisUtterance();
          msg.text = res.blocks["TableVA"].data[0]["REMARK"] as string;
          window.speechSynthesis.speak(msg);
        });
    };
    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    return {
      erFormHelper,
      initializeFlag,
      upd_hisRecord_flag,
      efFormReady,
      erGrid1Ready,
      F2_DO,
    };
  },
});
