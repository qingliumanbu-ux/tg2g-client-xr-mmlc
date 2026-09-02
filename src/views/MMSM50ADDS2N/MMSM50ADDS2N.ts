
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
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import xrEfDialog from "EFX/xrEfDialog";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { useRoute } from "vue-router";
import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";

export default defineComponent({
  name: "MMSM50ADDVS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
  },
  props: {
    openInDialog: {
      type: Boolean,
      default: false,
    },
    dialogFormName: {
      type: String,
      default: "",
    },
    parentInfo: {
      type: Object,
    },
  },
  // 向父画面传递数据-注册emit监听事件
  emits: ["getChildInfo"],
  // setup中添加props和emit
  setup: (props, { emit }) => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const ARRAY_MAT_CODE = reactive(new Array());
    let formParams: string;
    let formPartition: string;
    let bunker_Message2 = new EI.EIInfo();

    // 变量定义
    const initializeFlag = ref(false);
    let gridView1: any;
    let formName = "MMSM50ADDS2N";
    const parentInfo = ref(props.parentInfo);
    const initializeService = "";
    const LayoutGroupFilter = ref("");
    const rateWidth = ref("");
    const rateHeight = ref("");
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      initializePage();
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };
    let bunker_Message = new EI.EIInfo();

    const closeEfDialog = () => {
      const data = {
        close: true,
        MAT_CODE: ARRAY_MAT_CODE[0],
        MAT_NAME: ARRAY_MAT_CODE[1],
        MAT_SIMPLE_ENAME: ARRAY_MAT_CODE[2],
      };
      emit("getChildInfo", data);
    };
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = true;

        // 回调函数获取控件信息及设置定义事件等操作
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
          initialResult.msg +
          "]!"
        );
      }
    };
    const butClick = async (e: any) => {
      if (e.itemCode == "BUTTON") {
        const eiInfo = new EI.EIInfo();
        const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
        eiInfo.addBlock(eiBlock, "Table0");
        erFormHelper.callService("mmsm50_inq", eiInfo, true, true, true).then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
      }
    };
    const GridView1FocusChanged = async (e: any) => {
      if (e && e.data) {
        ARRAY_MAT_CODE.length = 0;
        ARRAY_MAT_CODE.push(e.data["MAT_CODE"]);
        ARRAY_MAT_CODE.push(e.data["MAT_NAME"]);
        ARRAY_MAT_CODE.push(e.data["MAT_SIMPLE_ENAME"]);
      }
    };
    onMounted(() => { });
    const F2_DO = async (_e: any) => {
      closeEfDialog();
    };
    const gridView1_dblclick = async (e: any) => {
      closeEfDialog();
    };

    return {
      efFormReady,
      erFormHelper,
      initializeFlag,
      erGrid1Ready,
      initializePage,
      F2_DO,
      gridView1,
      ARRAY_MAT_CODE,
      closeEfDialog,
      butClick,
      GridView1FocusChanged,
      gridView1_dblclick
    };
  },
});
