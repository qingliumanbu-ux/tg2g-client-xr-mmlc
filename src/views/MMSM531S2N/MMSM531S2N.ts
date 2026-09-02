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
  name: "MMSM531S2N",
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
    const formName = "MMSM531S2N";
    const initializeFlag = ref(0);
    let new_lot_no = "";

    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;
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
        "mmsm81_inq",
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
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
      }

      //加载弹窗配置
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSM_DIALOG",
        "MMSM81_LAYOUT_DIALOG"
      );
      popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
     
      
      ER.PopUtils.showErPopFree(
        ErPopFree,
        popFreeEdit,
        async (event: PopFreeReturnInfo) => {
          //确定按钮回调
          const recMsg = event as PopFreeReturnInfo; //XrErPopFree弹窗组件返回数据
          console.log("1212");
          console.log(recMsg);
          shijiSave(recMsg.dataModel, "U");
        }
      );
    };
    const shijiSave = async (dataModel: any, PROC_DIV: string) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeEdit.DataModel),
        "Table0"
      );
      // inInfo.addBlock(
      //   erFormHelper.convertModelAsBlock(dataModel?.get(""), {}),
      //   "PARA"
      // );
      console.log("1111");
      console.log(inInfo);
      outInfo = await erFormHelper.callService(
        "mmsm81lot_upd",
        inInfo,
        true,
        true,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      }
      queryMainGrid();
    };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      efFormReady,
    };
  },
});
