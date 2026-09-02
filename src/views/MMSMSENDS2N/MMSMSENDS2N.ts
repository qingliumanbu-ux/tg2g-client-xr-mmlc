import {
    computed,
    defineComponent,
    onMounted,
    ref,
    watch,
    toRaw,
    nextTick,
    Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { PopQueryReturnInfo, PopFreeReturnInfo } from "ERX/er-type";
import { Console } from "console";

export default defineComponent({
    name: "MMSMSENDS2N",
    components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    },
    setup: () => {
    // 获取画面的分区信息及设置画面初始化service

    const initializeService = "mmsm_form_get";

    // 变量定义
    const upd_hisRecord_flag = ref(true);
    const subGridData = ref<any>([]);
    let i_form_ename = ""; // 低代码配置画面布局名
    const initializeFlag = ref(0);
    let i_proc_div = "";
    let gridView1!: any;
    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;

    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: string;
    const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName = efFormInfo.value.formName;

            Initialize();
        };
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const erGrid1Ready = () => {
            gridView1 = erFormHelper.getGrid("gridView1");
            erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
        };
    const Initialize = async() => {
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

        onMounted(() => { });

    const queryMainGrid = async() => {
      const eiInfo = new EI.EIInfo();
     //获取查询条件
      const Query: EI.EiBlock =
            erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
            //多条查询
            if (Query.data[0].SERIAL_NUMBER) {
        const new_serial_no = (Query.data[0].SERIAL_NUMBER as string).split('\n').join("','");
Query.data[0].SERIAL_NUMBER = new_serial_no;
      } else {
    Query.addColumn('SERIAL_NUMBER');
}
eiInfo.addBlock(Query, "Table0");

      await erFormHelper
    .callService(
    efFormInfo.value.formParams["service2"],
    eiInfo,
    true,
    true,
    true
    )
    .then((res) => {
          const mainData = res.blocks["Table0"].data;
        nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
        });
        });
    };
    const F2_DO = async(e: any) => {
    queryMainGrid();
};

    const F6_DO = async(e: any) => {
      const inInfo = new EI.EIInfo();
    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1"),
        "TABLE1"
        );
    console.log("inInSSfo", inInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm835d_ret",
        inInfo,
        false,
        false
        );
    if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        erFormHelper.messageSuccess("发送成功");
        queryMainGrid();
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
    }
    };
    const F6_PRE_DO = async(e: any) => {
    if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
        erFormHelper.messageWarning("请选择至少一条信息再操作");
        return false;
    }
      let row_id = 0;
      let mat_code;
      const gridsr = erFormHelper.getGridSelectRowsAsBlock("gridView1"); //勾选行数据
    for (row_id = 0; row_id < gridsr.data.length; row_id++) {
        if ("已冲销" === gridsr.data[row_id]["BACK_CODE_1"]) {
            erFormHelper.messageWarning(
                "实绩号：" +
                gridsr.data[row_id]["SERIAL_NUMBER"]?.toString() +
                " 数据已冲销！"
          );
            return false;
        }
    }
};
    const F6_CANCEL = async(e: any) => {
    erFormHelper.unCheckAllGridRow(gridView1);
    queryMainGrid();
};

    return {
      erFormHelper,
      initializeFlag,
      upd_hisRecord_flag,
      efFormReady,
      erGrid1Ready,
      F2_DO,
      F6_DO,
      F6_PRE_DO,
      F6_CANCEL,
};
  },
});
