import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  toRaw,
  nextTick,
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
import { useRoute, useRouter } from "vue-router";
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
// import EFCallForm from 'EFX/EFCallForm';
import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";
import xrEfDialog from "EFX/xrEfDialog";

export default defineComponent({
  name: "MMSMUPD868V",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
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
  setup: (props, { emit }) => {
    // 获取画面的分区信息及设置画面初始化service
    const formName = "MMSMUPD868V";
    const initializeFlag = ref(0);
    let formPartition: string;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeService = "";
    let wtigh_no = 0;
    let bunker_no = 0;
    let stock_wt = "";
    let stock_wt_1 = 0;
    let back_code_1 = 0;
    const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    const WEIGH_NO = parentInfo.value?.WEIGH_NO;
    const BUNKER_NO = parentInfo.value?.BUNKER_NO;
    const MAT_CODE = parentInfo.value?.MAT_CODE;
    const STOCK_WT = parentInfo.value?.STOCK_WT;
    const SEQ_NO = parentInfo.value?.SEQ_NO;

    // 变量定义

    //const { postMessageToParent, listenerMessageEvent } = EFDialogFormMessage();
    // 引入EFDialogForm弹出框的相关方法
    //const { openEfDialog, closeEfDialog } = EFDialogForm();

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      initializePage();
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        setTimeout(() => {
          // 获取画面上的主要控件信息
          handleEfDialogMessage();
        }, 5);
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
    const handleEfDialogMessage = () => {
      erFormHelper.setControlValue("layoutControlGroup1", "MAT_CODE", MAT_CODE);
      erFormHelper.setControlValue("layoutControlGroup1", "WEIGH_NO", WEIGH_NO);
      erFormHelper.setControlValue("layoutControlGroup1", "STOCK_WT", STOCK_WT);
      erFormHelper.setControlValue("layoutControlGroup1", "STOCK_WT_1", STOCK_WT);
      erFormHelper.setControlValue("layoutControlGroup1", "SEQ_NO", SEQ_NO);
    };

    const closeClick = () => {
      const data = {
        // name: formName,
        closeEfDialog: true,
      };
      // 向母画面传输数据
      //postMessageToParent(data);
    };

    const F2_DO = async (e: any) => {
     

      const eiInfo = new EI.EIInfo();

      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup1");

        eiInfo.addBlock(queryCondition,'Tables0');
        // inInfo.addBlock(
        //   erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables1');

      console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService('mmsm868v_upd', eiInfo, true, false, true);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('退料错误:' + outInfo.sys.msg);
        return false;
      } else {
        erFormHelper.messageSuccess("退料成功");
        closeEfDialog();
        // 隐藏工具栏按钮
        // setToolbarVisible1(false);
        // erFormHelper.setGridEditable('gridView1', false);
        // queryGridView1();
      }

    };
    // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名
    const closeEfDialog = () => {
      const data = {
        close: true,
      };
      emit("getChildInfo", data);
    };
    onMounted(() => {
      initializePage();
      handleEfDialogMessage();
    });

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      closeClick,
      efFormReady,
      closeEfDialog,
    };
  },
});
