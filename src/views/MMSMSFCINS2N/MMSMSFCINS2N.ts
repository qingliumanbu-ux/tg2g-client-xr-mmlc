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
  name: "MMSMSFCINS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "";
    let tabFlag = 0;
    let editFlag = 0;
    const gridToolbar: Ref<any[]> = ref([]);

    // 变量定义
    const subGridData = ref<any>([]);
    const editable = ref(false);
    const formName = "MMSMSFCINS2N";
    const initializeFlag = ref(0);
    let new_lot_no = "";
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    let gridView5: any;
    let gridView6: any;

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
      eiBlock.addColumn("tabFlag");
      eiBlock.data[0]["tabFlag"] = tabFlag;
      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsmws_inq",
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
        erFormHelper.mergeDataToGrid(outInfo, "GridView2");
        erFormHelper.mergeDataToGrid(outInfo, "GridView3");
        erFormHelper.mergeDataToGrid(outInfo, "GridView4");
        erFormHelper.mergeDataToGrid(outInfo, "GridView5");
        erFormHelper.mergeDataToGrid(outInfo, "GridView6");
        erFormHelper.mergeDataToGrid(outInfo, "GridView7");
      }
    };

    const F2_DO = async (e: any) => {
      if (tabFlag === 1) getSubGrid1();
      else if (tabFlag === 2) getSubGrid1();
      else if (tabFlag === 3) getSubGrid1();
      else if (tabFlag === 4) getSubGrid1();
      else if (tabFlag === 5) getSubGrid1();
      else if (tabFlag === 6) getSubGrid1();
      else if (tabFlag === 7) getSubGrid1();
    };

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("GridView1");
      erFormHelper.setGridToolbarVisible("GridView1", {
        excel: true,
        import: false,
      });
      tabFlag = 1;
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("GridView2");
      erFormHelper.setGridToolbarVisible("GridView2", {
        excel: true,
        import: false,
      });
      tabFlag = 2;
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid("GridView3");
      erFormHelper.setGridToolbarVisible("GridView3", {
        excel: true,
        import: false,
      });
      tabFlag = 3;
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid("GridView4");
      erFormHelper.setGridToolbarVisible("GridView4", {
        excel: true,
        import: false,
      });
      tabFlag = 4;
    };
    const erGrid5Ready = () => {
      gridView5 = erFormHelper.getGrid("GridView5");
      erFormHelper.setGridToolbarVisible("GridView5", {
        excel: true,
        import: false,
      });
      tabFlag = 5;
    };
    const erGrid6Ready = () => {
      gridView5 = erFormHelper.getGrid("GridView6");
      erFormHelper.setGridToolbarVisible("GridView6", {
        excel: true,
        import: false,
      });
      tabFlag = 6;
    };
    const erGrid7Ready = () => {
      gridView5 = erFormHelper.getGrid("GridView7");
      erFormHelper.setGridToolbarVisible("GridView7", {
        excel: true,
        import: false,
      });
      tabFlag = 7;
    };

    const handleTabChange = (activeKey: string) => {
      console.log("tab", tabActiveKey);
      if (activeKey === "tab1") {
        tabFlag = 1;
      } else if (activeKey === "tab2") {
        tabFlag = 2;
      } else if (activeKey === "tab3") {
        tabFlag = 3;
      } else if (activeKey === "tab4") {
        tabFlag = 4;
      } else if (activeKey === "tab5") {
        tabFlag = 5;
      } else if (activeKey === "tab6") {
        tabFlag = 6;
      }else if (activeKey === "tab7") {
        tabFlag = 7;
      }
      getSubGrid1();
    };
    const F3_DO = async (e: any) => {
      if  (tabFlag === 5) {
        erFormHelper.setGridToolbarVisible("GridView5", {
          import: false,
        });
        return await saveMainGridData()
          .then((res: any) => {
            erFormHelper.messageSuccess("操作成功");
          })
          .catch((error) => {
            erFormHelper.messageError(error);
            return false;
          });
      } else if (tabFlag === 6) {
        erFormHelper.setGridToolbarVisible("GridView6", {
          import: false,
        });
        return await saveMainGridData()
          .then((res: any) => {
            erFormHelper.messageSuccess("操作成功");
          })
          .catch((error) => {
            erFormHelper.messageError(error);
            return false;
          });
      }
    };
    const saveMainGridData = async () => {
      if (tabFlag === 1) {
        if (erFormHelper.hasDataChange("GridView1")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
          eiinfo.addBlock(created, "WE1_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } else if (tabFlag === 2) {
        console.log("sw4");
        if (erFormHelper.hasDataChange("GridView2")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView2, "add");
          eiinfo.addBlock(created, "WE2_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } else if (tabFlag === 3) {
        if (erFormHelper.hasDataChange("GridView3")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView3, "add");
          eiinfo.addBlock(created, "WE3_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } else if (tabFlag === 4) {
        if (erFormHelper.hasDataChange("GridView4")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView4, "add");
          eiinfo.addBlock(created, "WE4_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } else if (tabFlag === 5) {
        if (erFormHelper.hasDataChange("GridView5")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView5, "add");
          eiinfo.addBlock(created, "WE5_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } else if (tabFlag === 6) {
        if (erFormHelper.hasDataChange("GridView6")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView6, "add");
          eiinfo.addBlock(created, "WE6_ADD");
          erFormHelper
            .callService("mmsmws_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
        getSubGrid1();
      } 
    };
    const F3_PRE_DO = async (e: any) => {      

      erFormHelper.clearGridData("GridView5");
      erFormHelper.setGridToolbarVisible("GridView5", {
        import: true,
      });

      erFormHelper.clearGridData("GridView6");
      erFormHelper.setGridToolbarVisible("GridView6", {
        import: true,
      });
    };
    const F3_CANCEL = async (e: any) => {     
      erFormHelper.setGridToolbarVisible("GridView5", {
        import: false,
      });
      erFormHelper.setGridToolbarVisible("GridView6", {
        import: false,
      });
      getSubGrid1();
    };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      tabActiveKey,
      gridToolbar,
      handleTabChange,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      erGrid6Ready,
      erGrid7Ready,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridView5,
      LayoutGroupFilter,
      efFormReady,
    };
  },
});
