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
import MMSMTLCF_POP from "../MMSMTLCF_POP/MMSMTLCF_POP.vue";
import xrEfDialog from "EFX/xrEfDialog";

export default defineComponent({
    name: "MMSMTLCF",
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, ErPopQuery, MMSMTLCF_POP, xrEfDialog
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
            }

        };
        const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
            const inInfo = new EI.EIInfo();
            let outInfo: EI.EIInfo = new EI.EIInfo();
            const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
            eiBlock.addColumn("PROC_DIV");
            eiBlock.data[0]["PROC_DIV"] = i_proc_div;
            inInfo.addBlock(eiBlock, "EDIT");

            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );

            outInfo = await erFormHelper.callService(
                efFormInfo.value.formParams["service3"],
                inInfo,
                true,
                false,
                true
            );

            if (outInfo.sys.status < 0) {
                erFormHelper.messageError(outInfo.sys.msg);
            } else {
                erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
                erFormHelper.messageSuccess("操作成功");
            }
            queryMainGrid();
        };
        const F2_DO = async (e: any) => {
            queryMainGrid();
        };
        const F3_DO = async (e: any) => {
            i_proc_div = "I";
            popFreeEdit = new ER.PopFreeHelper(
                formPartition,
                "MMSMUPD_LAYOUT",
                efFormInfo.value.formParams["popFree"]
            );
            ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);

            popFreeEdit.setEvent("itemValueChanged", async (e: any) => {

            });
        };
        const F4_DO = async (e: any) => {
            if (erFormHelper.getGridDataCount("gridView1") === 0) {
                erFormHelper.messageWarning("请选择一条信息再修改");
                return false;
            }
            //加载弹窗配置
            console.log("sw0", efFormInfo.value.formParams["service3"]);
            i_proc_div = "U";
            popFreeEdit = new ER.PopFreeHelper(
                formPartition,
                "MMSMUPD_LAYOUT",
                efFormInfo.value.formParams["popFree"]
            );

            popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"), {
                LOT_NO: true,
            });
            ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
        };
        const F5_DO = async (e: any) => {
            const inInfo = new EI.EIInfo();
            if (erFormHelper.getGridDataCount("gridView1") === 0) {
                erFormHelper.messageWarning("请选择一条信息再删除");
                return false;
            }
            const mes_res = await erFormHelper.messageConfirm(
                "选中的记录将被永久删除， 是否继续？"
            );
            if (!mes_res) {
                return false;
            }
            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                    PROC_DIV: "D",
                }),
                "EDIT"
            );
            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                efFormInfo.value.formParams["service3"],
                inInfo,
                true,
                true,
                true
            );
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess("操作成功");
                //erFormHelper.getGridServerPageData("gridView1");
            }
            queryMainGrid();
        };

        const F6_DO = async (e: any) => {
            erFormHelper.setGridToolbarVisible("gridView1", {
                import: false,
            });
            const eiinfo = new EI.EIInfo();
            const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
            created.addColumn("PROC_DIV");
            created.data[0]["PROC_DIV"] = "I";
            created.addColumn("ITEM_TYPE");
            created.data[0]["ITEM_TYPE"] = "2";
            eiinfo.addBlock(created, "IMPORT");
            eiinfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                efFormInfo.value.formParams["service3"],
                eiinfo,
                true,
                false,
                true
            );
            if (outInfo.sys.status < 0) {
                erFormHelper.messageError(outInfo.sys.msg);
            } else {
                erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
                erFormHelper.messageSuccess("操作成功");
            }
            queryMainGrid();
        };
        const F6_PRE_DO = async (e: any) => {
            erFormHelper.clearGridData("gridView1");
            erFormHelper.setGridToolbarVisible("gridView1", {
                import: true,
            });
        };
        const F6_CANCEL = async (e: any) => {
            erFormHelper.setGridToolbarVisible("gridView1", {
                import: false,
            });
            queryMainGrid();
        };
        const F7_DO = async (e: any) => {
            if (erFormHelper.getGridDataCount("gridView1") === 0) {
                erFormHelper.messageWarning("请选择一条信息再新增");
                return false;
            }
            //加载弹窗配置
            i_proc_div = "I";
            popFreeEdit = new ER.PopFreeHelper(
                formPartition,
                "MMSMUPD_LAYOUT",
                efFormInfo.value.formParams["popFree"]
            );
            popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
            ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
        };
        const F8_DO = async (e: any) => {
            /*if (erFormHelper.getGridDataCount("gridView1") === 0) {
              erFormHelper.messageWarning("请选择至少一条信息");
              return false;
            }*/
            const inInfo = new EI.EIInfo();
            let outInfo: EI.EIInfo = new EI.EIInfo();
            const eiBlock = erFormHelper.getGridSelectRowsAsBlock("gridView1");
            inInfo.addBlock(eiBlock, "EDIT");

            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );

            outInfo = await erFormHelper.callService(
                efFormInfo.value.formParams["service8"],
                inInfo,
                true,
                false,
                true
            );

            if (outInfo.sys.status < 0) {
                erFormHelper.messageError(outInfo.sys.msg);
            } else {
                erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
                erFormHelper.messageSuccess("操作成功");
            }
            erFormHelper.hideGridColumn("gridView1", "EVENT_DESC");
            erFormHelper.setControlValue("LayoutGroupFilter", "UPD_HIS_RECORD", "0");
            erFormHelper.setGridIndicator(gridView1, {
                SEQ_NO_2A: eiBlock.data[0]["SEQ_NO_2A"],
            });
            queryMainGrid();
        };
        const F9_DO = async (e: any) => {
            const inInfo = new EI.EIInfo();
            if (erFormHelper.getGridSelectRows("gridView1").length === 0) {
                erFormHelper.messageWarning("请选择一条信息再操作");
                return false;
            }

            const alldata = erFormHelper.getGridSelectRows("gridView1");

            for (let item1 of erFormHelper.getGridSelectRows("gridView1")) {
                if (item1.SEND_FLAG === "1") {
                    erFormHelper.messageWarning(
                        item1.LOT_NO + "该成分信息已经发送资源系统！"
                    );
                    return false;
                }
            }

            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", { PROC_DIV: "S" }),
                "MMSMWQ_SND"
            );
            inInfo.addBlock(
                erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
                "PARA"
            );
            const outInfo = await erFormHelper.callService(
                "mmsmyl_pro",
                inInfo,
                false,
                false
            );
            if (outInfo.sys.status >= 0) {
                // erFormHelper.getGridServerPageData('gridView1');
                erFormHelper.messageSuccess("发送成功");
                queryMainGrid();
                // console.log('111111');
            } else {
                erFormHelper.messageError(outInfo.sys.msg);
            }
        };
        const F9_PRE_DO = async (e: any) => {
            for (let item of erFormHelper.getGridAllRows("gridView1")) {
                if (item.SEND_FLAG.search("0") >= 0) {
                    erFormHelper.checkGridRow("gridView1", item);
                    // break;
                }
            }
        };
        const F9_CANCEL = async (e: any) => {
            erFormHelper.unCheckAllGridRow(gridView1);
            queryMainGrid();
        };
        const F10_DO = async (e: any) => {
            console.log('进');
            openXrEfDialog();
        };
        const F10_PRE_DO = async (e: any) => {

        };
        const F10_CANCEL = async (e: any) => {

        };
        const F11_DO = async (e: any) => {
            const inInfo = new EI.EIInfo();
            if (erFormHelper.getGridSelectRowsAsBlock("gridView1").data.length !== 1) {
                erFormHelper.messageWarning("请选择一条炉次信息发送加权成分");
                return false;
            }

            inInfo.addBlock(
                erFormHelper.getGridSelectRowsAsBlock("gridView1", {
                    PROC_DIV: "ISD",
                }),
                "EDIT"
            );

            const outInfo = await erFormHelper.callService(
                'mmsmtlcf_f10',
                inInfo,
                true,
                true,
                true
            );
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess("操作成功");
                //erFormHelper.getGridServerPageData("gridView1");
            }
            queryMainGrid();
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
            }
        }

        const dialogFormName = ref("MMSMTLCF_POP"); // 读配置表获取画面名
        const parentInfo = ref([]) as any;
        const dialogVisible = ref<boolean>(false);
        const openXrEfDialog = () => {
            dialogVisible.value = true; //弹窗设置为显示
        };
        const xrEfDialogClose = () => {
            dialogVisible.value = false;
        };
        const getChildInfo = (info: any) => {
            if (info.close) {
                dialogVisible.value = false; // 关闭弹框
                xrEfDialogClose();

                queryMainGrid();
            }
        };

        return {
            erFormHelper,
            initializeFlag,
            upd_hisRecord_flag,
            efFormReady,
            erGrid1Ready,
            valueChanged,
            F2_DO,
            F3_DO,
            F4_DO,
            F5_DO,
            F6_DO,
            F6_PRE_DO,
            F6_CANCEL,
            F7_DO,
            F8_DO,
            F9_DO,
            F9_PRE_DO,
            F9_CANCEL,
            F10_DO,
            F10_PRE_DO,
            F10_CANCEL,
            F11_DO,
            F11_PRE_DO,
            F11_CANCEL, handleTabChange, tab1ActiveKey, getChildInfo, dialogFormName, parentInfo, dialogVisible, xrEfDialogClose
        };
    },
});
