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
  name: "MMSM535S2N",
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
    const formName = "MMSM535S2N";
    const initializeFlag = ref(0);

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
    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "");
      console.log(eiInfo);

      const outInfo = await erFormHelper.callService(
        "mmsm81_inq",
        eiInfo,
        true,
        false,
        true
      );
      console.log(outInfo);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        console.log("111");
        console.log(outInfo);
        erFormHelper.mergeDataToGrid(outInfo, "gridView1");
      }
    };
    // 主表焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async(e: any) => {
          if (!e.data) {
              erFormHelper.clearGridData("gridView2"); // 清空子表数据
              erFormHelper.clearGridData("gridView3"); // 清空子表数据
              return;
          }
          if (e && e.rowChanged) {
              if (e.data) {
                  queryDetailInfo({
                      QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
                  });
                  queryDetailInfo2({
                      LOT_NO: e.data.get("LOT_NO"),
                  });
              }
          }
      };
    // 查询子表明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 成分信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm81al_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView2");
      }
    };
     // 查询子表明细信息
    const queryDetailInfo2 = async(currentRowInfo: any) => {
      // 成分信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
          eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo1 = await erFormHelper.callService(
              "mmsm81al_inq",
              eiInfo1,
              true,
              false,
              true
              );

          if (outInfo1.sys.status < 0) {
              erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
          } else {
              erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView3");
          }
    };
    onMounted(() => {
      Initialize();
    });

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      GridView1FocusChanged,
      F2_DO,
    };
  },
});
