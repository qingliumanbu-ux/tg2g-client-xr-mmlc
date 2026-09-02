import {
  defineComponent,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { useRoute, useRouter } from "vue-router";
import { Console } from "console";

export default defineComponent({
  name: "MMSM865S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    let formPartition: string;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeService = "";

    // 变量定义
    const formName = "MMSM865V";
    const initializeFlag = ref(0);
    const editable = ref(false);
    let wt = ref(0);

    let gridView1!: any;
    let gridView2!: any;
    let gridView3!: any;
    let gridView4!: any;
    const MMSM85 = ref({
      STOCK_WT: 0,
    });
    const MMSM86 = ref({
      STOCK_WT: 0,
    });
    // const MMSM87 = ref({
    //   BUNKER_NO: 0,
    //   MAT_CODE:" "
    // });
    const BUNKER_NO = ref<{ [key: string]: any }>({});
    const MAT_CODE = ref<{ [key: string]: any }>({});

    // const BUNKER_NO = " ";
    // const MAT_CODE = " ";

    const gridToolbar: Ref<any[]> = ref([]);

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      initializePage();
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable(gridView2, false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid("gridView3");
      erFormHelper.setGridEditable(gridView3, false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid("gridView4");
      erFormHelper.setGridEditable(gridView4, false); // 设置grid不可编辑
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        //设置在gridview1中进行分页查询
        //InitialToolbar();
        //设置维护不展示
        //setToolbarVisible1(false);
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

    //查询计量单信息和退货订单信息(根据条件同时查询)
    const queryGridView1 = async () => {
      const eiInfo = new EI.EIInfo();
      const queryCondition = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup2"
      );

      eiInfo.addBlock(queryCondition);
      console.log("LXX1", eiInfo);
      //console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm865v_inq",
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
        //console.log('outInfo', outInfo);
        //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'GridView1');
        // erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
        console.log("sw1", outInfo);
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        // erFormHelper.mergeDataToGrid(outInfo.getBlock(1), gridView3);
      }
    };

    // 查询子表1明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 加料信息
      // const eiInfo1 = new EI.EIInfo();
      // const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      // eiBlock1.pushData({ ...currentRowInfo }, true);

      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      // const outInfo1 = await erFormHelper.callService(
      //   "mmsm861v_inq1",
      //   eiInfo1,
      //   true,
      //   false,
      //   true
      // );

      const outInfo1 = await erFormHelper.callService(
        "mmsm861v_inq1",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView2);
        // erFormHelper.setControlValue('STOCK_WT', 'STOCK_WT', outInfo1.getBlock(0));
        // console.log('STOCK_WT', 1);
      }
    };

    // 主表1焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData(gridView2, gridView3); // 清空子表数据

        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            BUNKER_NO: e.data.get("BUNKER_NO"),
          });
          MMSM85.value.STOCK_WT = e.data.get("STOCK_WT");
          queryDetailInfo3({
            MAT_CODE: e.data.get("MAT_CODE"),
          });
        }
      }
    };
    MMSM86.value.STOCK_WT = 0;

    const grid2rowselected = async (e: any) => {
      for (let item1 of erFormHelper.getGridSelectRows("gridView2")) {
        if (item1.STOCK_WT === "0" || item1.STOCK_WT === 0) {
          erFormHelper.messageWarning(
            item1.WEIGH_NO + "计量单号为0，不能进行移库操作！"
          );
          return false;
        }
      }

      console.log("行选择变化");
      if (erFormHelper.getGridCheckedRows(gridView2).length === 0) {
        // wt.value = 0;
        MMSM86.value.STOCK_WT = 0;
      } else {
        MMSM86.value.STOCK_WT = 0;
        for (let item1 of erFormHelper.getGridSelectRows("gridView2")) {
          MMSM86.value.STOCK_WT = MMSM86.value.STOCK_WT + item1.STOCK_WT;
        }
      }

      wt.value = MMSM86.value.STOCK_WT;
      // if (e && e.rowChanged) {
      //   if (e.data) {

      //     MMSM86.value.STOCK_WT = MMSM86.value.STOCK_WT+e.data.get("STOCK_WT");

      //     // queryDetailInfo1({
      //     //   BUNKER_NO: e.data.get("BUNKER_NO"),
      //     // });
      //   }
      // }
      // if (erFormHelper.getGridDataCount("gridView2") === 0
      //   ) {
      //   wt.value = 0;
      // }else {
      //   wt.value = MMSM86.value.STOCK_WT;

      // }
    };

    const GridView2FocusChanged = async (e: any) => {
      // erFormHelper.checkGridCurrentRow("gridView2");
    };

    // 主表1焦点行事件-查询子表明细信息
    const GridView3FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData(gridView4); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo1({
            BUNKER_NO: e.data.get("BUNKER_NO"),
          });
        }
      }
    };

    // 查询子表2明细信息
    const queryDetailInfo1 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo2 = new EI.EIInfo();
      const eiBlock2 = eiInfo2.addBlock(new EI.EiBlock());
      eiBlock2.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm861v_inq1",
        eiInfo2,
        true,
        false,
        true
      );
      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView4);
      }
    };

    // 查询子表1明细信息
    const queryDetailInfo3 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm865v_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(1), gridView3);
        erFormHelper.setGridIndicator(gridView3, {
          BUNKER_NO: BUNKER_NO.value,
          MAT_CODE: MAT_CODE.value,
        });
        // erFormHelper.setControlValue('STOCK_WT', 'STOCK_WT', outInfo1.getBlock(0));
        // console.log('STOCK_WT', 1);
      }
    };

    //刷新按钮
    const querySX = async () => {
      console.log("wt", wt);
      queryGridView1();
    };

    //退料
    const TLupd = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      //获取增删改行的数据
      // const created = erFormHelper.getGridRowsAsBlock(gridView1, 'add');
      // eiInfo.addBlock(created, 'MMSM85_INS');
      // //获取修改行的数据
      // const modified = erFormHelper.getGridRowsAsBlock(gridView1, 'modify');
      // eiInfo.addBlock(modified, 'MMSM85_UPD');
      // //获取删除行的数据
      // const deleted = erFormHelper.getGridRowsAsBlock(gridView1, 'delete');
      // eiInfo.addBlock(deleted, 'MMSM85_DEL');

      if (erFormHelper.getGridSelectRows("gridView2").length === 0) {
        erFormHelper.messageWarning("请勾选一条源料仓明细信息在修改重量");
        return false;
      }
      for (let item1 of erFormHelper.getGridSelectRows("gridView2")) {
        if (item1.STOCK_WT === "0" || item1.STOCK_WT === 0) {
          erFormHelper.messageWarning(
            item1.WEIGH_NO + "计量单号为0，不能进行移库操作！"
          );
          return false;
        }
      }
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1"),
        "Tables0"
      );

      // inInfo.addBlock(
      //   erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables1');

      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), "Tables1");
      eiBlock.pushData(
        {
          // BUNKER_NO: G_BUNKER_NO.value,
          // BUNKER_NO_ORIGINAL: S_BUNKER_NO.value,
          // BUNKER_NO: GL_LC.value.name,
          // BUNKER_NO_ORIGINAL: DL_LC.value.name,
          STOCK_WT: wt.value,
        },
        true
      );
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView3"),
        "Tables2"
      );
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView2"),
        "Tables3"
      );

      console.log("eiInfo", eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm865v_upd",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("移库失败:" + outInfo.sys.msg);
        return false;
      } else {
        // 隐藏工具栏按钮
        // setToolbarVisible1(false);
        erFormHelper.setGridEditable("gridView1", false);
        queryGridView1();
        erFormHelper.setGridIndicator(gridView1, {
          BUNKER_NO: eiInfo.getBlock(0).data[0]["BUNKER_NO"],
        });
      }
      const mainGridCurrentRow = erFormHelper.getGridCurrentRow(gridView3);
      BUNKER_NO.value = mainGridCurrentRow.BUNKER_NO;
      MAT_CODE.value = mainGridCurrentRow.MAT_CODE;
      console.log("123", BUNKER_NO.value);
      console.log("123", MAT_CODE.value);
      // BUNKER_NO.value = ;
      // MAT_CODE = e.data.get("MAT_CODE");
      // if (erFormHelper.getGridCheckedRows(gridView1).length === 0) {
      //   erFormHelper.messageWarning("请选择上面一条信息再退料");
      //   return;
      // }
      // if (erFormHelper.getGridCheckedRows(gridView3).length === 0) {
      //   erFormHelper.messageWarning("请选择下面一条信息再退料");
      //   return;
      // }
      // const confirm = await erFormHelper.messageConfirm(
      //   "是否将选择的信息进行相关操作？"
      // );
      // if (confirm) {
      //   const eiInfo = new EI.EIInfo();
      //   const mainGridCheckedRow =
      //     erFormHelper.getGridCheckedRowsAsBlock(gridView1); // 获取主表勾选行
      //   console.log("mainGridCheckedRow", mainGridCheckedRow);
      //   eiInfo.addBlock(mainGridCheckedRow);

      //   const eiBlock1 = new EI.EiBlock("ASD");
      //   eiBlock1.pushData({ STOCK_WT: wt.value }, true);
      //   eiInfo.addBlock(eiBlock1);

      //   const mainGridCheckedRow1 =
      //     erFormHelper.getGridCheckedRowsAsBlock(gridView3); // 获取主表勾选行
      //   eiInfo.addBlock(mainGridCheckedRow1, "Grid2");
      //   console.log("eiInfo", eiInfo);
      //   const outInfo = await erFormHelper.callService("mmsm865v_upd", eiInfo);
      //   if (outInfo.sys.status < 0) {
      //     erFormHelper.messageError("移库失败:" + outInfo.sys.msg);
      //   } else {
      //     erFormHelper.messageSuccess("移库成功");
      //   }
      // }
    };

    //自定义工具栏按钮功能
    // const InitialToolbar = () => {
    //   gridToolbar.value = erFormHelper.getGridToolbar([
    //     { name: "addrow", visible: false },
    //     { name: "copyrow", visible: false },
    //     { name: "delete", visible: false },
    //     { name: "cancel", visible: false },
    //     { name: "save", visible: false },
    //     { name: "excel", visible: true },
    //   ]);
    // };

    // //自定义工具栏是否可用
    // const setToolbarVisible1 = (visible: boolean) => {
    //   erFormHelper.setGridToolbarVisible("gridView1", [
    //     { name: "addrow", visible: visible },
    //     { name: "copyrow", visible: visible },
    //     { name: "delete", visible: visible },
    //     { name: "cancel", visible: visible },
    //   ]);
    // };

    const F2_DO = async (e: any) => {
      queryGridView1();
    };
    const F3_PRE_DO = async (e: any) => {
      //setToolbarVisible1(true);
      //设置编辑状态为可编辑
      erFormHelper.setGridEditable("GridView1", true);
    };

    const F3_CANCEL = async (e: any) => {
      editable.value = false;
      //setToolbarVisible1(editable.value);
      erFormHelper.setGridEditable("GridView1", false);
      queryGridView1();
    };
    const F3_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      //获取增删改行的数据
      const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
      eiInfo.addBlock(created, "MMSM85_INS");
      //获取修改行的数据
      const modified = erFormHelper.getGridRowsAsBlock(gridView1, "modify");
      eiInfo.addBlock(modified, "MMSM85_UPD");
      //获取删除行的数据
      const deleted = erFormHelper.getGridRowsAsBlock(gridView1, "delete");
      eiInfo.addBlock(deleted, "MMSM85_DEL");
      console.log("eiInfo", eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm861v_pro",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("保存错误:" + outInfo.sys.msg);
        return false;
      } else {
        // 隐藏工具栏按钮
        //setToolbarVisible1(false);
        erFormHelper.setGridEditable("gridView1", false);
        queryGridView1();
      }
    };
    const butClick = async () => {};
    return {
      erFormHelper,
      initializeFlag,
      //InitialToolbar,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      GridView1FocusChanged,
      GridView2FocusChanged,
      GridView3FocusChanged,
      grid2rowselected,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      gridToolbar,
      MMSM85,
      TLupd,
      querySX,
      butClick,
      wt,
    };
  },
});
