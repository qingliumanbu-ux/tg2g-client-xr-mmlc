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
import { Console } from "console";

export default defineComponent({
  name: "MMSMXHHDS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "mmsm_form_get";
    let tabFlag = 1;
    let editFlag = 0;
    const gridToolbar: Ref<any[]> = ref([]);

    // 变量定义
    const subGridData = ref<any>([]);
    const editable = ref(false);
    const formName = "MMSMXHHDS2N";
    const initializeFlag = ref(0);
    // 获取tab页组件的ref和实例
    const tabActiveKey = ref("tab1");
    const LayoutGroupFilter = "LayoutGroupFilter";

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
    const valueChanged = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "WEEK_DAY" || e.itemCode === "CHECK_FLAG") {
        const eiInfo = new EI.EIInfo();
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiInfo.addBlock(queryCondition);
        // console.log("LXX1", eiInfo);
        const outInfo = await erFormHelper.callService(
          "mmsmheatno_inq",
          eiInfo,
          true,
          false,
          true
        );
        // erFormHelper.clearLayoutOrGridData("LayoutGroupFilter"); // 清空子表数据
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF0_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF0_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF1_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF1_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF2_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF2_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF9_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF9_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD0_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD0_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD1_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD1_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD2_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD2_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD6_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD6_E", " ");
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("获取炉号出错:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "WEEK_DAY",
              outInfo.getBlock(0).data[0]["WEEK_DAY"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_S",
              outInfo.getBlock(0).data[0]["BOF0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_E",
              outInfo.getBlock(0).data[0]["BOF0_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_S",
              outInfo.getBlock(0).data[0]["BOF1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_E",
              outInfo.getBlock(0).data[0]["BOF1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_S",
              outInfo.getBlock(0).data[0]["BOF2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_E",
              outInfo.getBlock(0).data[0]["BOF2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_S",
              outInfo.getBlock(0).data[0]["BOF9_S"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_E",
              outInfo.getBlock(0).data[0]["BOF9_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_S",
              outInfo.getBlock(0).data[0]["AOD0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_E",
              outInfo.getBlock(0).data[0]["AOD0_E"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_S",
              outInfo.getBlock(0).data[0]["AOD1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_E",
              outInfo.getBlock(0).data[0]["AOD1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_S",
              outInfo.getBlock(0).data[0]["AOD2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_E",
              outInfo.getBlock(0).data[0]["AOD2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_S",
              outInfo.getBlock(0).data[0]["AOD6_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_E",
              outInfo.getBlock(0).data[0]["AOD6_E"]
            );
          });
        }
      }
    };

    //查询调用
    const getSubGrid1 = async (tabFlag: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        LayoutGroupFilter,
        {
          TABFLAG: tabFlag,
        }
      );

      eiInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsmxhhd_inq",
        eiInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
        return;
      } else {
        if (tabFlag === "1") erFormHelper.mergeDataToGrid(outInfo, "GridView1");
        else if (tabFlag === "2")
          erFormHelper.mergeDataToGrid(outInfo, "GridView2");
        else if (tabFlag === "3")
          erFormHelper.mergeDataToGrid(outInfo, "GridView3");
        else if (tabFlag === "4") {
          erFormHelper.mergeDataToGrid(outInfo, "GridView4");
        }
      }
    };

    const F2_DO = async (e: any) => {
      if (tabFlag === 1) getSubGrid1("1");
      else if (tabFlag === 2) getSubGrid1("2");
      else if (tabFlag === 3) getSubGrid1("3");
      else if (tabFlag === 4) getSubGrid1("4");
    };

    const erGrid1Ready = () => {
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid2Ready = () => {
      erFormHelper.setGridToolbarVisible("GridView2", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid3Ready = () => {
      erFormHelper.setGridToolbarVisible("GridView3", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid4Ready = () => {
      erFormHelper.setGridToolbarVisible("GridView4", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };

    const handleTabChange = (activeKey: string) => {
      // console.log("tab", tabActiveKey);
      if (activeKey === "tab1") {
        tabFlag = 1;
        getSubGrid1("1");
      } else if (activeKey === "tab2") {
        tabFlag = 2;
        getSubGrid1("2");
      } else if (activeKey === "tab3") {
        tabFlag = 3;
        getSubGrid1("3");
      } else if (activeKey === "tab4") {
        tabFlag = 4;
        getSubGrid1("4");
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
      LayoutGroupFilter,
      efFormReady,
      valueChanged,
    };
  },
});
