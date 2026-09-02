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
import xrEfDialog from "EFX/xrEfDialog";

export default defineComponent({
    name: "MMSMRQSHS2N",
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, ErPopQuery, xrEfDialog
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
        let tab1ActiveKey = ref('tab1');

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
        const Initialize = async () => {
            console.log('进')
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

        const queryMainGrid = async () => {
            if (tab1ActiveKey.value === 'tab2') {
                const eiInfo = new EI.EIInfo();
                eiInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter'))
                const outInfo = await erFormHelper.callService('mmsmtlcf_inq1', eiInfo, true, false, true);
                console.log(outInfo)
                if (outInfo.sys.status < 0) {
                    return false;
                } else {
                    erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0), true, 'gridView2')
                    return true;
                }
            }
            else {
                const eiInfo = new EI.EIInfo();
                const eiBlock =
                    erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
                eiInfo.addBlock(eiBlock, "Table0");

                await erFormHelper
                    .callService(
                        'mmsmrqsh_inq',
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
            }

        };

        const F2_DO = async (e: any) => {
            queryMainGrid();
        };
        const F3_DO = async (e: any) => {
            if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0
                || erFormHelper.getGridCheckedRowsAsBlock("gridView1").data[0].C_STATE === '3') {
                erFormHelper.messageWarning("请选择一条未审核的信息进行审核发送");
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                    PROC_DIV: "SH",
                }),
                "EDIT"
            );
            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                'mmsmrqtl_pro',
                inInfo,
                true,
                true,
                true
            );
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess("操作成功");

                erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
            }
            queryMainGrid();
        };
        const F3_PRE_DO = async (e: any) => {

        };
        const F3_CANCEL = async (e: any) => {

        };
        const F4_DO = async (e: any) => {
            if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0
                || erFormHelper.getGridCheckedRowsAsBlock("gridView1").data[0].C_STATE === '3') {
                erFormHelper.messageWarning("请选择一条未审核的信息进行驳回");
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                    PROC_DIV: "BH",
                }),
                "EDIT"
            );
            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                'mmsmrqtl_pro',
                inInfo,
                true,
                true,
                true
            );
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess("操作成功");

                erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
            }
            queryMainGrid();
        };
        const F4_PRE_DO = async (e: any) => {

        };
        const F4_CANCEL = async (e: any) => {

        };
        const F5_DO = async (e: any) => {
  if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0
                || erFormHelper.getGridCheckedRowsAsBlock("gridView1").data[0].C_STATE === '2') {
                erFormHelper.messageWarning("请选择一条已审核的信息进行撤回");
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                    PROC_DIV: "CH",
                }),
                "EDIT"
            );
            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                'mmsmrqtl_pro',
                inInfo,
                true,
                true,
                true
            );
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess("操作成功");

                erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
            }
            queryMainGrid();
        };
        const F5_PRE_DO = async (e: any) => {

        };
        const F5_CANCEL = async (e: any) => {

        };
        const F6_DO = async (e: any) => {

        };
        const F6_PRE_DO = async (e: any) => {

        };
        const F6_CANCEL = async (e: any) => {

        };
        const F7_DO = async (e: any) => {

        };
        const F7_PRE_DO = async (e: any) => {

        };
        const F7_CANCEL = async (e: any) => {
            erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
        };
        const F8_DO = async (e: any) => {

        };
        const F9_DO = async (e: any) => {

        };
        const F9_PRE_DO = async (e: any) => {

        };
        const F9_CANCEL = async (e: any) => {

        };
        const F10_DO = async (e: any) => {

        };
        const F10_PRE_DO = async (e: any) => {

        };
        const F10_CANCEL = async (e: any) => {

        };
        const F11_DO = async (e: any) => {

        };
        const F11_PRE_DO = async (e: any) => {

        };
        const F11_CANCEL = async (e: any) => {

        };
        const valueChanged = async (e: any) => {
            // 质检批查询
            if (e.itemCode === "UPD_HIS_RECORD") {
                erFormHelper.showGridColumn("gridView1", "EVENT_DESC");
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
                queryMainGrid();
            }
        };

        const handleTabChange = async (activeKey: string) => {
            console.log('转换', activeKey);
            tab1ActiveKey.value = activeKey;
            if (activeKey === 'tab2') {
                const eiInfo = new EI.EIInfo();


                eiInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter'))

                const outInfo = await erFormHelper.callService('mmsmtlcf_inq1', eiInfo, true, false, true);
                console.log(outInfo)
                if (outInfo.sys.status < 0) {

                    return false;
                } else {

                    erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0), true, 'gridView2')

                    return true;
                }
            }
            else {
                const eiInfo = new EI.EIInfo();
                const eiBlock =
                    erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
                eiInfo.addBlock(eiBlock, "Table0");

                await erFormHelper
                    .callService(
                        'mmsmrqsh_inq',
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
            }
        }


        return {
            erFormHelper,
            initializeFlag,
            upd_hisRecord_flag,
            efFormReady,
            erGrid1Ready,
            valueChanged,
            F2_DO,
            F3_DO,
            F3_PRE_DO,
            F3_CANCEL,
            F4_DO,
            F4_PRE_DO,
            F4_CANCEL,
            F5_DO,
            F5_PRE_DO,
            F5_CANCEL,
            F6_DO,
            F6_PRE_DO,
            F6_CANCEL,
            F7_DO,
            F7_PRE_DO,
            F7_CANCEL,
            F8_DO,
            F9_DO,
            F9_PRE_DO,
            F9_CANCEL,
            F10_DO,
            F10_PRE_DO,
            F10_CANCEL,
            F11_DO,
            F11_PRE_DO,
            F11_CANCEL,
            handleTabChange,
            tab1ActiveKey,

        };
    },
});
