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
  name: "MMSM869S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "";
    const gridToolbar: Ref<any[]> = ref([]);

    // 变量定义
    const formName = "MMSM869S2N";
    const initializeFlag = ref(0);
    let new_lot_no = "";
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;

    const grid_view_1 = ref("");
    const grid_view_2 = ref("");
    const grid_view_3 = ref("");
    const grid_view_4 = ref("");
    // 获取tab页组件的ref和实例
    const LayoutGroupFilter = "LayoutGroupFilter";
    const tabActiveKey = ref("tab1");

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

    //查询调用

    const getSubGrid1 = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm89_rcv_inq",
        eiInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "GridView1");
      }
    };

    const getSubGrid2 = async () => {
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 =
        erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiInfo1.addBlock(eiBlock1);
      const outInfo1 = await erFormHelper.callService(
        "mmsm89_rcv_inq1",
        eiInfo1,
        true,
        false,
        true
      );
      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo1, "GridView2");
      }
    };
    const getSubGrid3 = async () => {
      const eiInfo2 = new EI.EIInfo();
      const eiBlock2 =
        erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiInfo2.addBlock(eiBlock2);
      const outInfo2 = await erFormHelper.callService(
        "mmsm89_rcv_inq2",
        eiInfo2,
        true,
        false,
        true
      );

      if (outInfo2.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo2.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo2, "GridView3");
      }
    };
    const getSubGrid4 = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm89_rcv_inq3",
        eiInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "GridView4");
      }
    };
    const getSubGrid5 = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock(LayoutGroupFilter);
      eiBlock.addColumn("TAB_FLAG", "TDLC");
      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm89_rcv_inq2",
        eiInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
        return;
      } else {
        erFormHelper.mergeDataToGrid(outInfo, "GridView5");
      }
    };

    const F2_DO = async (e: any) => {
      getSubGrid1();
      getSubGrid2();
      getSubGrid3();
      getSubGrid4();
      getSubGrid5();
    };

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("GridView1");
      console.log("gridView1", gridView1);
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("GridView2");
      erFormHelper.setGridToolbarVisible("GridView2", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };

    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid("GridView3");
      erFormHelper.setGridToolbarVisible("GridView3", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid4Ready = () => {
      gridView3 = erFormHelper.getGrid("GridView4");
      erFormHelper.setGridToolbarVisible("GridView4", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid5Ready = () => {
      gridView3 = erFormHelper.getGrid("GridView5");
      erFormHelper.setGridToolbarVisible("GridView5", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const handleTabChange = (activeKey: string) => {
      console.log("tab", tabActiveKey);
      if (activeKey === "tab1") {
        getSubGrid1();
      } else if (activeKey === "tab2") {
        getSubGrid2();
      } else if (activeKey === "tab3") {
        getSubGrid3();
      } else if (activeKey === "tab4") {
        getSubGrid4();
      } else if (activeKey === "tab5") {
        getSubGrid5();
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      tabActiveKey,
      gridToolbar,
      handleTabChange,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      LayoutGroupFilter,
      efFormReady,
    };
  },
});
