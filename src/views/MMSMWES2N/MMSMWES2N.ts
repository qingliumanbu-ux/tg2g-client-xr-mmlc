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
  name: "MMSMWES2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "";
    let tabFlag = 1;
    let editFlag = 0;
    const gridToolbar: Ref<any[]> = ref([]);

    // 变量定义
    const subGridData = ref<any>([]);
    const editable = ref(false);
    const formName = "MMSMWES2N";
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

    const getSubGrid1 = async (tabName: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        LayoutGroupFilter,
        {
          TABLE_TYPE: tabName,
        }
      );

      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsmwx_inq",
        eiInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
        return;
      } else {
        if (tabName === "ZJ_MAT_ELEMENT")
          erFormHelper.mergeDataToGrid(outInfo, "GridView1");
        else if (tabName === "ZJ_SCRAP_ELEMENT")
          erFormHelper.mergeDataToGrid(outInfo, "GridView2");
        else if (tabName === "ZJ_JISHUKE_MAT")
          erFormHelper.mergeDataToGrid(outInfo, "GridView3");
      }
    };

    const F2_DO = async (e: any) => {
      if (tabFlag === 1) getSubGrid1("ZJ_MAT_ELEMENT");
      else if (tabFlag === 2) getSubGrid1("ZJ_SCRAP_ELEMENT");
      else if (tabFlag === 3) getSubGrid1("ZJ_JISHUKE_MAT");
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

    const handleTabChange = (activeKey: string) => {
      console.log("tab", tabActiveKey);
      if (activeKey === "tab1") {
        tabFlag = 1;
        getSubGrid1("ZJ_MAT_ELEMENT");
      } else if (activeKey === "tab2") {
        tabFlag = 2;
        getSubGrid1("ZJ_SCRAP_ELEMENT");
      } else if (activeKey === "tab3") {
        tabFlag = 3;
        getSubGrid1("ZJ_JISHUKE_MAT");
      }
    };
    const F3_DO = async (e: any) => {
      if (tabFlag === 1) {
        erFormHelper.stopGridEditing("GridView1", async () => {
          erFormHelper.setGridToolbarVisible("GridView1", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          return await saveMainGridData()
            .then((res: any) => {
              editable.value = false;
              erFormHelper.setGridEditable("GridView1", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          getSubGrid1("ZJ_MAT_ELEMENT");
        });
      } else if (tabFlag === 2) {
        erFormHelper.stopGridEditing("GridView2", async () => {
          erFormHelper.setGridToolbarVisible("GridView2", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          return await saveMainGridData()
            .then((res: any) => {
              editable.value = false;
              erFormHelper.setGridEditable("GridView2", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          getSubGrid1("ZJ_SCRAP_ELEMENT");
        });
      } else if (tabFlag === 3) {
        erFormHelper.stopGridEditing("GridView3", async () => {
          erFormHelper.setGridToolbarVisible("GridView3", {
            addrow: false,
            copyrow: false,
            delete: false,
          });
          return await saveMainGridData()
            .then((res: any) => {
              editable.value = false;
              erFormHelper.setGridEditable("GridView3", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          getSubGrid1("ZJ_JISHUKE_MAT");
        });
      }
    };
    const saveMainGridData = async () => {
      if (tabFlag === 1) {
        if (erFormHelper.hasDataChange("GridView1")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
          eiinfo.addBlock(created, "WE1_ADD");

          const updated = erFormHelper.getGridRowsAsBlock(gridView1, "modify");
          eiinfo.addBlock(updated, "WE1_UPD");

          const deleted = erFormHelper.getGridRowsAsBlock(gridView1, "delete");
          eiinfo.addBlock(deleted, "WE1_DEL");

          const para = erFormHelper.getAllControlValueAsEiBlock(
            "LayoutGroupFilter",
            {
              TABLE_NAME: "ZJ_MAT_ELEMENT",
            }
          );
          eiinfo.addBlock(para, "PARA");
          erFormHelper
            .callService("mmsmwx_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
      } else if (tabFlag === 2) {
        if (erFormHelper.hasDataChange("GridView2")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView2, "add");
          eiinfo.addBlock(created, "WE2_ADD");

          const updated = erFormHelper.getGridRowsAsBlock(gridView2, "modify");
          eiinfo.addBlock(updated, "WE2_UPD");

          const deleted = erFormHelper.getGridRowsAsBlock(gridView2, "delete");
          eiinfo.addBlock(deleted, "WE2_DEL");

          const para = erFormHelper.getAllControlValueAsEiBlock(
            "LayoutGroupFilter",
            {
              TABLE_NAME: "ZJ_SCRAP_ELEMENT",
            }
          );
          eiinfo.addBlock(para, "PARA");
          erFormHelper
            .callService("mmsmwx_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
      } else if (tabFlag === 3) {
        if (erFormHelper.hasDataChange("GridView3")) {
          const eiinfo = new EI.EIInfo();
          const created = erFormHelper.getGridRowsAsBlock(gridView3, "add");
          eiinfo.addBlock(created, "WE3_ADD");

          const updated = erFormHelper.getGridRowsAsBlock(gridView3, "modify");
          eiinfo.addBlock(updated, "WE3_UPD");

          const deleted = erFormHelper.getGridRowsAsBlock(gridView3, "delete");
          eiinfo.addBlock(deleted, "WE3_DEL");

          const para = erFormHelper.getAllControlValueAsEiBlock(
            "LayoutGroupFilter",
            {
              TABLE_NAME: "ZJ_JISHUKE_MAT",
            }
          );
          eiinfo.addBlock(para, "PARA");
          erFormHelper
            .callService("mmsmwx_pro", eiinfo, true, true, true)
            .then((res) => {
              subGridData.value = res.getBlock("Table0").data;
            });
        }
      }
      editFlag = 0;
    };
    const F3_PRE_DO = async (e: any) => {
      editFlag = 1;
      editable.value = true;
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      erFormHelper.setGridEditable("GridView1", true);

      editable.value = true;
      erFormHelper.setGridToolbarVisible("GridView2", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      erFormHelper.setGridEditable("GridView2", true);

      editable.value = true;
      erFormHelper.setGridToolbarVisible("GridView3", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      erFormHelper.setGridEditable("GridView3", true);
    };
    const F3_CANCEL = async (e: any) => {
      editable.value = false;
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("GridView1", false);
      getSubGrid1("ZJ_MAT_ELEMENT");

      editable.value = false;
      erFormHelper.setGridToolbarVisible("GridView2", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("GridView2", false);
      getSubGrid1("ZJ_SCRAP_ELEMENT");

      editable.value = false;
      erFormHelper.setGridToolbarVisible("GridView3", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("GridView3", false);
      getSubGrid1("ZJ_JISHUKE_MAT");

      editFlag = 0;
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
      gridView1,
      gridView2,
      gridView3,
      LayoutGroupFilter,
      efFormReady,
    };
  },
});
