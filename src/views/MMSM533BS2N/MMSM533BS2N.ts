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
  name: "MMSM533BS2N",
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
    const formName = "MMSM533BS2N";
    const initializeFlag = ref(0);
    let gridView1!: any;
    let gridView2!: any;

    const gridToolbar: Ref<any[]> = ref([]);
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
    // 自定义工具栏按钮功能
    const InitialToolbar = () => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
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

        // InitialToolbar();

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          gridView1 = erFormHelper.getGrid("gridView1");
          gridView2 = erFormHelper.getGrid("GridView2");
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
      const queryConditionEiBlock: EI.EiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(queryConditionEiBlock);
      console.log("eiInfo", eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm533bv_inq",
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
        //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'GridView1');
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.mergeDataToGrid(outInfo.getBlock(1), gridView2);
      }
    };

    onMounted(() => {
      Initialize();
    });

    const F2_DO = async (e: any) => {
      queryGridView1();
    };
    const F3_DO = async (e: any) => {
      if (erFormHelper.getGridCheckedRows(gridView1).length === 0) {
        erFormHelper.messageWarning("请选择一条信息进行操作");
      } else {
        const mainGridCheckedRow = erFormHelper.getGridCheckedRows(
          gridView1,
          true
        )[0];
        const confirm = await erFormHelper.messageConfirm(
          "是否将选择的计量单号为" +
            mainGridCheckedRow["WEIGH_NO"] +
            "的信息进行相关操作？"
        );
        if (confirm) {
          const eiInfo = new EI.EIInfo();
          const checkedRowEiBlock =
            erFormHelper.getGridCheckedRowsAsBlock(gridView1);
          eiInfo.addBlock(checkedRowEiBlock);
          console.log("123413", eiInfo);
          const outInfo = await erFormHelper.callService(
            "mmsm533bvf3_pro",
            eiInfo,
            true,
            false,
            true
          );
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
          } else {
            erFormHelper.messageSuccess("处理成功");
            queryGridView1();
          }
        } else {
          return 0;
        }
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      efFormReady,
      gridToolbar,
    };
  },
});
