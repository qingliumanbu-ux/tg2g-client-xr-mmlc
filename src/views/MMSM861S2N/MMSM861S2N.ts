// import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
// import { EI, EIManager, EP } from 'EIX/ei';
// import { EFGridUtils, EFNotify, EFGridInit, EFFormInfo } from '@baosight/ef';
// import { ErFormHelper } from '@baosight/er';

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
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import xrEfSearchBox from "EFX/xrEfSearchBox";
import xrEfDialog from "EFX/xrEfDialog";
import EFUtility from "EFX/EFUtility";
import eBFR from "EFX/eBFR";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import MMSM81VT from "../MMSM81VT/MMSM81VT.vue";
import { useRoute, useRouter } from "vue-router";
import type { SelectProps } from "ant-design-vue";

export default defineComponent({
  name: "MMSM861S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const initializeService = "";
    const gridToolbar: Ref<any[]> = ref([]);
    const detailTabsRef = ref<any>(null);
    const bunker_g = reactive(new Array());
    const bunker_d = reactive(new Array());
    let box_wt = ref(0);
    let formName: string;
    let formPartition: string;
    // 变量定义
    // const formName = 'MMSM833S2N';
    // const erFormHelper = reactive(new ErFormHelper());
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    // let gridView3!: kendo.ui.Grid;
    // let gridView4!: kendo.ui.Grid;
    // 料仓代码，物料代码，物料名称，重量，物料类型
    const MX_LC_G = ref(new Array());
    const MX_LC_D = ref(new Array());
    const bunker_mat_code = reactive(new Array());
    const bunker_mat_name = reactive(new Array());
    const bunker_mat_type = reactive(new Array());
    const bunker_stock_wt = reactive(new Array());
    const buiker_stock_wt = reactive(new Array());
    const bunker_bunker_no = reactive(new Array());

    const BUNKER_NO = ref<{ [key: string]: any }>({});
    const MAT_CODE = ref<{ [key: string]: any }>({});

    const GL_LC = ref({
      name: "",
    });
    const DL_LC = ref({
      name: "",
    });

    const efFormReady = (e: any) => {
      console.log("11111");
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = "MMSM861S2N";
      console.log(
        "efFormInfo.value.formPartition",
        efFormInfo.value.formPartition
      );
      console.log("efFormInfo.value.formName", efFormInfo.value.formName);
      nextTick(() => {
        initializePage();
        MX_LC_D.value.push(" ", " ", " ", " ", " ");
        MX_LC_G.value.push(" ", " ", " ", " ", " ");
      });
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid("gridView3");
      erFormHelper.setGridEditable("gridView3", false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid("gridView4");
      erFormHelper.setGridEditable("gridView4", false); // 设置grid不可编辑
    };
    const S_BUNKER_NO = ref("");
    const G_BUNKER_NO = ref("");
    const D_MAT_CODE = ref("");
    const G_MAT_CODE = ref("");

    // const options = ref<SelectProps['options']>([
    //   { value: 'jack', label: 'Jack' },
    //   { value: 'lucy', label: 'Lucy' },
    //   { value: 'tom', label: 'Tom' },
    // ]);
    // 查询高位料仓和低位料仓并且返回给下拉框
    const queryLCdata_G = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_TYPE: " ",
        },
        true
      );
      console.log("111222333", inInfo);
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      const outInfo = await erFormHelper.callService(
        "mmsm85_bunker_inqg",
        inInfo,
        true,
        false,
        true
      );
      console.log("98988", outInfo.getBlock(0).data.length);
      console.log("98988", outInfo);
      if (outInfo.sys.status < 0) {
        //维护完成重新查询
        erFormHelper.messageError("查询错误：" + outInfo.sys.msg);
        return false;
      } else {
        for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
          bunker_g.push({
            id: i,
            // name: outInfo.getBlock(0).data[i]['MAT_NAME']
            name: outInfo.getBlock(0).data[i]["BUNKER_NO"],
          });
          G_BUNKER_NO.value = <string>outInfo.getBlock(0).data[i]["BUNKER_NO"];
          G_MAT_CODE.value = <string>outInfo.getBlock(0).data[i]["MAT_CODE"];
          console.log("98988", outInfo.getBlock(0).data.length);
        }
      }
    };
    const queryLCdata_D = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: " ",
        },
        true
      );
      console.log("222211111", inInfo);
      EIManager.callService(formPartition, "mmsm85_bunker_inq1", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_d.push({
              id: i,
              // name: res.getBlock(0).data[i]['MAT_NAME']
              name: res.getBlock(0).data[i]["BUNKER_NO"],
            });
            S_BUNKER_NO.value = <string>res.getBlock(0).data[6]["BUNKER_NO"];
            D_MAT_CODE.value = <string>res.getBlock(0).data[6]["MAT_CODE"];
            console.log("2222", S_BUNKER_NO);
          }
          console.log("99999");
        }
      );
    };
    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView2"); // 清空子表数据
        // erFormHelper.clearGridData('gridView3'); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            BUNKER_NO: e.data.get("BUNKER_NO"),
          });
          queryDetailInfo3({
            MAT_CODE: e.data.get("MAT_CODE"),
          });
        }
      }
      console.log("333");
    };

    // 查询子表1明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
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

    // 查询子表1明细信息
    const queryDetailInfo3 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm861v_inq",
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

    const GridView3FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView4"); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo1({
            BUNKER_NO: e.data.get("BUNKER_NO"),
          });
        }
      }
      console.log("333");
    };

    // 查询子表1明细信息
    const queryDetailInfo1 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
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
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView4);
        // erFormHelper.setControlValue('STOCK_WT', 'STOCK_WT', outInfo1.getBlock(0));
        // console.log('STOCK_WT', 1);
      }
    };

    const queryGridView1 = async () => {
      const eiInfo = new EI.EIInfo();
      const queryCondition = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup2"
      );

      eiInfo.addBlock(queryCondition);
      console.log("LXX1", eiInfo);
      //console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm861v_inq",
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
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        // erFormHelper.mergeDataToGrid(outInfo.getBlock(1), gridView3);
      }
    };

    const butClick = async () => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再退料");
        return false;
      }
      if (box_wt.value === 0) {
        erFormHelper.messageError("请输入重量");
        return;
      }
      const eiInfo = new EI.EIInfo();

      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1"),
        "Tables0"
      );

      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), "Tables1");
      eiBlock.pushData(
        {
          // BUNKER_NO: G_BUNKER_NO.value,
          // BUNKER_NO_ORIGINAL: S_BUNKER_NO.value,
          // BUNKER_NO: GL_LC.value.name,
          // BUNKER_NO_ORIGINAL: DL_LC.value.name,
          STOCK_WT: box_wt.value,
        },
        true
      );
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView3"),
        "Tables2"
      );

      console.log("eiInfo", eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm861v_upd",
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
      box_wt.value = 0;
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        "MMSM861S2N",
        "",
        ""
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          // gridView1 = erFormHelper.getKendoGrid('gridView1');
          // erFormHelper.setGridEditable('gridView1', false);
          // gridView2 = erFormHelper.getKendoGrid('gridView2');
          // erFormHelper.setGridEditable('gridView2', false);
          // gridView3 = erFormHelper.getKendoGrid('gridView3');
          // erFormHelper.setGridEditable('gridView3', false);
          // gridView4 = erFormHelper.getKendoGrid('gridView4');
          // erFormHelper.setGridEditable('gridView4', false);
          queryLCdata_G();
          queryLCdata_D();
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
    //   initializePage();
    //   MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
    //   MX_LC_G.value.push(' ', ' ', ' ', ' ', ' ');
    // });

    const F2_DO = async (e: any) => {
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
        // setToolbarVisible1(false);
        erFormHelper.setGridEditable("gridView1", false);
        queryGridView1();
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridToolbar,
      butClick,
      bunker_g,
      bunker_d,
      efFormReady,
      GridView1FocusChanged,
      GridView3FocusChanged,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      GL_LC,
      DL_LC,
      MX_LC_G,
      box_wt,
      MX_LC_D,
    };
  },
});
