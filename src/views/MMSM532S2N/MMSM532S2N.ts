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
  name: "",
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
    const formName = "MMSM532S2N";
    const initializeFlag = ref(0);
    let cs_OkClick = "";
    let i_proc_div = "";
    let v_factory_div = ""; //厂别

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

    onMounted(() => {
      Initialize();
    });

    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "");
      const outInfo = await erFormHelper.callService(
        "mmsm58_inq",
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
    const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
      const Query =erFormHelper.getAllControlValueAsEiBlock("gridView1"); 
      eiBlock.addColumn("PROC_DIV");
      eiBlock.data[0]["PROC_DIV"] = i_proc_div;  
      
      
     
      console.log('11', inInfo);
      console.log('22', eiBlock);
      inInfo.addBlock(
        eiBlock,
        "Table0"
      );
      
      /* inInfo.addBlock(
        erFormHelper.convertModelAsBlock(e.dataModel?.get(""), {
          PROC_DIV: i_proc_div,
          FACTORY_DIV: v_factory_div,
        }),
        "PARA"
      ); */
      outInfo = await erFormHelper.callService(
        "mmsm58_pro",
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
    const F2_DO = async (e: any) => {
      queryMainGrid();
    };
    const F3_DO = async (e: any) => {
      cs_OkClick = "F3";
      i_proc_div = "I";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSM_DIALOG",
        "MMSM58_LAYOUT_DIALOG"
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
      cs_OkClick = "F4";
      i_proc_div = "U";
      popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSM_DIALOG",
        "MMSM58_LAYOUT_DIALOG"
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
          FACTORY_DIV: v_factory_div,
        }),
        "PARA"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm58_pro",
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

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
    };
  },
});
