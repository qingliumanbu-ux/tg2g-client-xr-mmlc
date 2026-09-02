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
  name: "MMSM82AS2N",
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
    const formName = "MMSM82B";
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
          gridView3 = erFormHelper.getGrid("GridView3");
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
        "mmsm533cv_inq",
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
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "GridView1");
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), gridView2);
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(2), gridView3);
      }
    };

    const queryChildGridView = async (currentRowInfo: any) => {
      console.log("currentRowInfo", currentRowInfo);
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm533cv2_inq",
        eiInfo1,
        true,
        false,
        true
      );
      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        //erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, 'gridView4');
        erFormHelper.mergeEiBlockToGrid(outInfo1.getBlock(0), "GridView4");
      }
    };

    // 主表焦点行事件-查询子表明细信息
    const GridView3FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData(gridView4); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryChildGridView({
            PLATE_NUMBER: e.data.get("PLATE_NUMBER"),
          });
        }
      }
    };

    onMounted(() => {
      Initialize();
    });

    const F2_DO = async (e: any) => {
      queryGridViewAll();
    };
    const F3_DO = async (e: any) => {
      const grid1value = erFormHelper.getGridCheckedRows(gridView1);
      const grid2value = erFormHelper.getGridCheckedRows(gridView2);
      console.log(grid1value.length, grid2value.length);
      if (grid1value.length === 0 || grid2value.length === 0) {
        erFormHelper.messageWarning(
          "请确认已经勾选退货计划和进厂车辆信息！！！"
        );
        return 0;
      } else {
        if (grid1value[0].PLAN_NO_Y !== grid1value[0].PLAN_NO_Y) {
          erFormHelper.messageWarning(
            "选择的退货计划和进厂车辆中的退货计划号不一致！！！"
          );
          return 0;
          /* const comfirm = erFormHelper.messageConfirm(
            '选择的退货计划和进厂车辆中的退货计划号不一致，是否继续装车确认？'
          );
          if (!comfirm) {
            return 0;
          } */
        }

        const eiInfo = new EI.EIInfo();
        const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock(
          gridView1,
          {},
          true
        );
        const checkedRowEiBlock2 = erFormHelper.getGridCheckedRowsAsBlock(
          gridView2,
          {},
          true
        );

        eiInfo.addBlock(checkedRowEiBlock, "Grid1");
        eiInfo.addBlock(checkedRowEiBlock2, "Grid2");
        console.log("eiInfo", eiInfo);

        const outInfo = await erFormHelper.callService(
          "mmsm533cvf3_pro",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("装车确认成功!");
          queryGridViewAll();
        }
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      gridToolbar,
      efFormReady,
      GridView3FocusChanged,
    };
  },
});
