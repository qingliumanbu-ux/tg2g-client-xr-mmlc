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
  name: "MMSM82DS2N",
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
    const formName = "MMSM82DS2N";
    const initializeFlag = ref(0);
   

    // 自定义工具栏按钮功能
    const InitialToolbar = () => {};
    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      Initialize();
    };
    // 画面相关数据初始化
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );
      if (initialResult.flag >= 0) {
        initializeFlag.value = 1;
        InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {        
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };

    //查询所有GridView信息(根据条件同时查询)
    const queryGridViewAll = async () => {
      const eiInfo = new EI.EIInfo();
      const queryConditionEiBlock: EI.EiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(queryConditionEiBlock);
      console.log("eiInfo", eiInfo);
      const outInfo = await erFormHelper.callService(
        'mmsm82d_inq',
        eiInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'gridView2');
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), 'gridView3');
        //erFormHelper.messageSuccess("查询成功");
      }     

    };
   

    const erGrid2Ready = () => {
      erFormHelper.setGridEditable('gridView2', false); // 设置grid不可编辑
    };

    const erGrid3Ready = () => {
      erFormHelper.setGridEditable('gridView3', false); // 设置grid不可编辑
    };  

    onMounted(() => {
      Initialize();
    });

    const F2_DO = async (e: any) => {
      queryGridViewAll();
    };   

    const F4_PRE_DO = (e: any) => {
      erFormHelper.setGridToolbarVisible('gridView2', {
        excel: true,
        import: true
      });
      erFormHelper.clearGridData("gridView2");
      erFormHelper.setGridEditable('gridView2', true);
    };
    // 维护确认
    const F4_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const created = erFormHelper.getGridRowsAsBlock("gridView2", 'add');
      eiInfo.addBlock(created, 'ADD');
     
      // const created = erFormHelper.getGridRowsAsBlock("gridView2", 'add');
      // const created = erFormHelper.getGridRowsAsBlock("gridView2", 'add');
      // eiInfo.addBlock(created, 'add');
      // const updated = erFormHelper.getGridRowsAsBlock("gridView2", 'modify');
      // eiInfo.addBlock(updated, 'upd');
      // const deleted = erFormHelper.getGridRowsAsBlock("gridView2", 'delete');
      // eiInfo.addBlock(deleted, 'del');
      const outInfo = await erFormHelper.callService(
        "mmsm82d_save",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
      } else {
        erFormHelper.messageSuccess("消耗项导入成功!");
      }
        erFormHelper.setGridToolbarVisible('gridView2', {
          excel: false,
          import: false,
        });
    };

    // 维护取消
    const F4_CANCEL = async () => {      
      erFormHelper.setGridToolbarVisible('gridView2', {
        excel: false,
        import: false,
      });
      queryGridViewAll();
      erFormHelper.setGridEditable('gridView2', false);
    };

    const F5_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock: EI.EiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        'mmsm82d_ft',
        eiInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("分摊错误:" + outInfo.sys.msg);
      } else {
        queryGridViewAll();
        erFormHelper.messageSuccess("分摊成功");
        
      }

    };
   
    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      'MMSM82D_POP',
      'MMSM81POP_LAYOUT',
      ''
    )


    const F6_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      const queryConditionEiBlock: EI.EiBlock =
      erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter",{DEAL_FLAG: "I"});
      inInfo.addBlock(queryConditionEiBlock);

      const outInfo = await erFormHelper.callService(
        "mmsm82d_snd",
        inInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("发送错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.messageSuccess("发送成功");
      }

    };

    const F7_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      const queryConditionEiBlock: EI.EiBlock =
      erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter",{DEAL_FLAG: "D"});
      inInfo.addBlock(queryConditionEiBlock);
           
      const outInfo = await erFormHelper.callService(
        "mmsm82d_snd",
        inInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("发送错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.messageSuccess("发送成功");
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F4_DO,
      F4_PRE_DO,
      F4_CANCEL,
      F5_DO,
      F6_DO,
      F7_DO,
      erGrid2Ready,
      erGrid3Ready,
      efFormReady
    };
  },
});
