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
import xrEfDialog from "EFX/xrEfDialog";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";

import { useRoute } from "vue-router";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";

export default defineComponent({
  name: "MMSM81RCVS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "";

    // 变量定义
    const formName = "MMSM81RCVS2N";
    const initializeFlag = ref(0);
    let new_lot_no = "";

    // 画面相关数据初始化
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      Initialize();
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

    // onMounted(() => {
    //   Initialize();
    // });
    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "");
      const outInfo = await erFormHelper.callService(
        "mmsm81_rcv_inq",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "gridView1");
      }
    };

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    const F3_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再操作");
        return false;
      }
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", { DEAL_FLAG: "I" }),
        "ZCHO_JLBD_RFC"
      );
      console.log("inInfo");
      console.log(inInfo);
      const outInfo = await erFormHelper.callService(
        "cm_ewt801_rcv",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        erFormHelper.messageSuccess("发送成功");
        // erFormHelper.mergeDataToGrid();
        queryMainGrid();
        // console.log('111111');
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        erFormHelper;
      }
    };
    const F3_PRE_DO = async (e: any) => {};
    const F3_CANCEL = async (e: any) => {
      erFormHelper.unCheckAllGridRow("gridView1");
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      efFormReady,
    };
  },
});
