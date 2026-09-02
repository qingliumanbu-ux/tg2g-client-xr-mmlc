import { GridOptions } from '@ag-grid-community/core';
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
  name: "MMSM82HS2N",
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
    const formName = "MMSM82HS2N";
    const initializeFlag = ref(0);

    let gridView1!: any;
    let gridView2!: any;
    let gridView3!: any;
    let gridView4!: any;

    const gridToolbar: Ref<any[]> = ref([]);

    // 自定义工具栏按钮功能
    const InitialToolbar = () => {};
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
    // 画面相关数据初始化
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

        InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          gridView1 = erFormHelper.getGrid("gridView1");
          gridView2 = erFormHelper.getGrid("GridView2");
          gridView4 = erFormHelper.getGrid("GridView4");
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
        "mmsm82h_inq",
        eiInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        // erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView1');
        console.log("outInfo", outInfo);
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
      }
    };

    const GridView1FocusChanged = async (e: any) => {      //如果改变状态则不触发    
      if (e && e.data) {       
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        query_sub(eiBlock);  
      }   
    };

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑 getRowStyle      
    };

    const erGrid2Ready = () => {
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      erFormHelper.setGridEditable("gridView4", false); // 设置grid不可编辑
    };
    const erGrid5Ready = () => {
      erFormHelper.setGridEditable("gridView5", false); // 设置grid不可编辑
    };

    const query_sub = async (eiBlock:any) => {
      const inInfo = new EI.EIInfo();      
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm82h_inq2",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView2");
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), "gridView4");
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(2), "gridView5");
      }
    };

  
    onMounted(() => {
      Initialize();
    });

    const F2_DO = async (e: any) => {
      queryGridViewAll();
    };
  
     //发送电文
      const fasong = async () => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再操作");
        return false;
      }
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", { DEAL_FLAG: "I" }),
        "Tables0"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm82h_snd",
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

     //撤销电文
     const chexiao = async () => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再操作");
        return false;
      }
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", { DEAL_FLAG: "D" }),
        "Tables0"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm82h_snd",
        inInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("撤销失败:" + outInfo.sys.msg);
      } else {
        erFormHelper.messageSuccess("撤销成功");
      }
    };

    const F4_DO = async (e: any) => {
      fasong();
      queryGridViewAll();
    };

    const F5_DO = async (e: any) => {
      chexiao();
      queryGridViewAll();
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F4_DO,
      F5_DO,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      erGrid4Ready,
      erGrid5Ready,
      GridView1FocusChanged,
    };
  },
});
