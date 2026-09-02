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
import xrEfDialog from "EFX/xrEfDialog";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { useRoute, useRouter } from "vue-router";
import { Console } from "console";

export default defineComponent({
  name: "MMSMYLGXHZS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
    xrEfDialog,
  },
  //components: { MMSMUPD862V },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    let proc_div = ""; // 'I'新增，'U'修改
    let formPartition: string;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeService = "";

    // 变量定义
    const formName = "MMSMYLGXHZS2N";
    const initializeFlag = ref(0);
    const editable = ref(false);
    let gridView1!: any;
    let gridView2!: any;

    let bunker_DW: any;
    const dialogVisible = ref(false);
    const dialogFormName = ref(""); // 弹出画面的画面名
    const parentInfo = ref({});
    const MMSM85 = ref({
      STOCK_WT: 0,
    });

    const gridToolbar: Ref<any[]> = ref([]);
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      initializePage();
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable(gridView2, false); // 设置grid不可编辑
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

    const queryGridView1 = async () => {
      const eiInfo = new EI.EIInfo();
      const queryCondition = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup2"
      );
      eiInfo.addBlock(queryCondition);
      console.log("LXX1", eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsmylgxhz_inq",
        eiInfo,
        true,
        false,
        true
      );

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), gridView2);
      }
    };

    const F2_DO = async (e: any) => {
      queryGridView1();
    };
    const valueChanged = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "WEEK_DAY" ||e.itemCode === "CHECK_FLAG") {
        const eiInfo = new EI.EIInfo();
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup2");
        eiInfo.addBlock(queryCondition);
        // console.log("LXX1", eiInfo);
        const outInfo = await erFormHelper.callService(
          "mmsmheatno1_inq",
          eiInfo,
          true,
          false,
          true
        );
        // erFormHelper.clearLayoutOrGridData("LayoutGroupFilter"); // 清空子表数据
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B0_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B0_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B1_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B1_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B2_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B2_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B9_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_B9_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A0_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A0_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A1_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A1_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A2_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A2_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A6_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_A6_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_E1_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_E1_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_E2_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_E2_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F1_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F1_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F2_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F2_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F3_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F3_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F4_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F4_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F5_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F5_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F6_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F6_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F7_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F7_F", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F8_S", " ");
        erFormHelper.setControlValue("layoutControlGroup2", "HEAT_NO_F8_F", " ");
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("获取炉号出错:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
           
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B0_S",
              outInfo.getBlock(0).data[0]["BOF0_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B0_F",
              outInfo.getBlock(0).data[0]["BOF0_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B1_S",
              outInfo.getBlock(0).data[0]["BOF1_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B1_F",
              outInfo.getBlock(0).data[0]["BOF1_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B2_S",
              outInfo.getBlock(0).data[0]["BOF2_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B2_F",
              outInfo.getBlock(0).data[0]["BOF2_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B9_S",
              outInfo.getBlock(0).data[0]["BOF9_S"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B9_F",
              outInfo.getBlock(0).data[0]["BOF9_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A0_S",
              outInfo.getBlock(0).data[0]["AOD0_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A0_F",
              outInfo.getBlock(0).data[0]["AOD0_E"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A1_S",
              outInfo.getBlock(0).data[0]["AOD1_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A1_F",
              outInfo.getBlock(0).data[0]["AOD1_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A2_S",
              outInfo.getBlock(0).data[0]["AOD2_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A2_F",
              outInfo.getBlock(0).data[0]["AOD2_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A6_S",
              outInfo.getBlock(0).data[0]["AOD6_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A6_F",
              outInfo.getBlock(0).data[0]["AOD6_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E1_S",
              outInfo.getBlock(0).data[0]["EAF1_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E1_F",
              outInfo.getBlock(0).data[0]["EAF1_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E2_S",
              outInfo.getBlock(0).data[0]["EAF2_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E2_F",
              outInfo.getBlock(0).data[0]["EAF2_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F1_S",
              outInfo.getBlock(0).data[0]["IF1_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F1_F",
              outInfo.getBlock(0).data[0]["IF1_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F2_S",
              outInfo.getBlock(0).data[0]["IF2_S"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F2_F",
              outInfo.getBlock(0).data[0]["IF2_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F3_S",
              outInfo.getBlock(0).data[0]["IF3_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F3_F",
              outInfo.getBlock(0).data[0]["IF3_E"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F4_S",
              outInfo.getBlock(0).data[0]["IF4_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F4_F",
              outInfo.getBlock(0).data[0]["IF4_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F5_S",
              outInfo.getBlock(0).data[0]["IF5_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F5_F",
              outInfo.getBlock(0).data[0]["IF5_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F6_S",
              outInfo.getBlock(0).data[0]["IF6_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F6_F",
              outInfo.getBlock(0).data[0]["IF6_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F7_S",
              outInfo.getBlock(0).data[0]["IF7_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F7_F",
              outInfo.getBlock(0).data[0]["IF7_E"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F8_S",
              outInfo.getBlock(0).data[0]["IF8_S"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F8_F",
              outInfo.getBlock(0).data[0]["IF8_E"]
            );
          });
        }
      }
    };
    const layout2_Changed = async (e: any) => {
      if (e.itemCode == "HEAT_NO_GET") {
        const eiInfo = new EI.EIInfo();
        const outInfo = await erFormHelper.callService(
          "mmsmylgxhz_get",
          eiInfo,
          true,
          false,
          true
        );

        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("开始炉号错误:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A1_S",
              outInfo.getBlock(0).data[0]["HEAT_NO1"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A2_S",
              outInfo.getBlock(0).data[0]["HEAT_NO2"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A0_S",
              outInfo.getBlock(0).data[0]["HEAT_NO3"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_A6_S",
              outInfo.getBlock(0).data[0]["HEAT_NO4"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B1_S",
              outInfo.getBlock(0).data[0]["BACK_CODE_1"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B2_S",
              outInfo.getBlock(0).data[0]["BACK_CODE_2"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_B0_S",
              outInfo.getBlock(0).data[0]["BACK_CODE_3"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E1_S",
              outInfo.getBlock(0).data[0]["BACK_COL_1"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_E2_S",
              outInfo.getBlock(0).data[0]["BACK_COL_2"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F1_S",
              outInfo.getBlock(0).data[0]["BACK_C1"]
            );

            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F2_S",
              outInfo.getBlock(0).data[0]["BACK_C2"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F3_S",
              outInfo.getBlock(0).data[0]["BACK_C3"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F4_S",
              outInfo.getBlock(0).data[0]["BACK_C4"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F5_S",
              outInfo.getBlock(0).data[0]["BACK_C5"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F6_S",
              outInfo.getBlock(0).data[0]["BACK_C6"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F7_S",
              outInfo.getBlock(0).data[0]["BACK_C7"]
            );
            erFormHelper.setControlValue(
              "layoutControlGroup2",
              "HEAT_NO_F8_S",
              outInfo.getBlock(0).data[0]["BACK_C8"]
            );
          });
        }
      }

      if (e.itemCode == "HEAT_NO_SAVE") {
        const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
          "layoutControlGroup2"
        );
        const eiInfo = new EI.EIInfo();
        eiInfo.addBlock(eiBlock, "Table0");
        const outInfo = await erFormHelper.callService(
          "mmsmylgxhz_save",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("保存炉号错误:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("保存炉号成功");
          nextTick(() => {});
        }
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      F2_DO,
      gridToolbar,
      layout2_Changed,
      valueChanged,
    };
  },
});
