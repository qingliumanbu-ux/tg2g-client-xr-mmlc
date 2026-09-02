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
import MMSMJQ_POP from "../MMSMJQ_POP/MMSMJQ_POP.vue";
import xrEfDialog from "EFX/xrEfDialog";

export default defineComponent({
    name: "MMSMRQCF",
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, ErPopQuery, MMSMTLCF_POP, xrEfDialog, MMSMJQ_POP
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
        const Initialize = async() => {
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
                    erFormHelper.setControlValue("LayoutGroupFilter", "C_STATE", "1");
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
        // const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
        //     const inInfo = new EI.EIInfo();
        //     let outInfo: EI.EIInfo = new EI.EIInfo();
        //     const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel);
        //     eiBlock.addColumn("PROC_DIV");
        //     eiBlock.data[0]["PROC_DIV"] = i_proc_div;
        //     inInfo.addBlock(eiBlock, "EDIT");

        //     inInfo.addBlock(
        //         erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter"),
        //         "PARA"
        //     );

        //     outInfo = await erFormHelper.callService(
        //         efFormInfo.value.formParams["service3"],
        //         inInfo,
        //         true,
        //         false,
        //         true
        //     );

        //     if (outInfo.sys.status < 0) {
        //         erFormHelper.messageError(outInfo.sys.msg);
        //     } else {
        //         erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
        //         erFormHelper.messageSuccess("操作成功");
        //     }
        //     queryMainGrid();
        // };
        const F2_DO = async(e: any) => {
            queryMainGrid();
        };
        const F3_DO = async(e: any) => {
            console.log('进');
            parentInfo.value[0] = { FN_NO: 'F3' }
            openXrEfDialog();
        };
        const F3_PRE_DO = async(e: any) => {

        };
        const F3_CANCEL = async(e: any) => {

        };
        const F4_DO = async(e: any) => {
            if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0) {
                erFormHelper.messageWarning("请至少选择一条熔清信息进行加权");
                return false;
            }
            for (let i = 0; i < erFormHelper.getGridCheckedRowsAsBlock(gridView1).data.length; i++) {
    if (erFormHelper.getGridCheckedRowsAsBlock(gridView1).data[i].RES_TYPE !== '2') {
        // erFormHelper.messageWarning("请选择熔清信息进行加权");
        // return false;
    }
}
parentInfo_JQ.value[0] = { FN_NO: 'F3', p_Info: erFormHelper.getGridCheckedRowsAsBlock("gridView1").data }
            openXrEfDialog_JQ();
        };
        const F4_PRE_DO = async(e: any) => {

};
        const F4_CANCEL = async(e: any) => {

};
        const F5_DO = async(e: any) => {
    console.log('进');
    parentInfo.value[0] = { FN_NO: 'F5' }
            openXrEfDialog();
};
        const F5_PRE_DO = async(e: any) => {

};
        const F5_CANCEL = async(e: any) => {

};
        const F6_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0) {
        erFormHelper.messageWarning("请至少选择一条仲裁信息进行加权");
        return false;
    }
            for (let i = 0; i < erFormHelper.getGridCheckedRowsAsBlock(gridView1).data.length; i++) {
        if (erFormHelper.getGridCheckedRowsAsBlock(gridView1).data[i].RES_TYPE !== '4') {
            erFormHelper.messageWarning("请选择仲裁信息进行加权");
            return false;
        }
        if (erFormHelper.getGridCheckedRowsAsBlock(gridView1).data[i].COM_FLAG !== '1') {
            erFormHelper.messageWarning("请选择参与计算的信息进行加权");
            return false;
        }
    }
    parentInfo_JQ.value[0] = { FN_NO: 'F5', p_Info: erFormHelper.getGridCheckedRowsAsBlock("gridView1").data[0] }
            console.log('iujhgvc', parentInfo_JQ.value[0])
            openXrEfDialog_JQ();
};
        const F6_PRE_DO = async(e: any) => {

};
        const F6_CANCEL = async(e: any) => {

};
        const F7_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
            }
            const inInfo = new EI.EIInfo();
    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", {
            PROC_DIV: "U",
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
        erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    }
    queryMainGrid();
};
        const F7_PRE_DO = async(e: any) => {
    tab1ActiveKey.value = 'tab1';
    handleTabChange(tab1ActiveKey.value);
    erFormHelper.setGridEditable(gridView1, true); // 设置grid不可编辑
};
        const F7_CANCEL = async(e: any) => {
    erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
};
        const F8_DO = async(e: any) => {
            const inInfo = new EI.EIInfo();
    if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0) {
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
        const popFreeEditOkClick = async(e: PopFreeReturnInfo) => {

    console.log('kijuhygfx', e)
            if (!await erFormHelper.checkRequiredInput('Layout1')) {
        erFormHelper.messageWarning("请补全必要信息！");
        return false;
            }

            const inInfo = new EI.EIInfo();

            const eiBlock = erFormHelper.convertModelAsBlock(popFreeEdit.DataModel, { PROC_DIV: 'IZ' });
    inInfo.addBlock(eiBlock);



            const outInfo = await erFormHelper.callService('mmsmrqtl_pro', inInfo, true, false, true);

    if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
    } else {
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.messageSuccess("操作成功");
    }
    queryMainGrid();
};
        const F9_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length !== 1
        || erFormHelper.getGridCheckedRowsAsBlock(gridView1).data[0].RES_TYPE !== '2') {
        erFormHelper.messageWarning("请至少选择一条熔清信息进行复制");
        return false;
    }
            let rq_info = erFormHelper.getGridCheckedRowsAsBlock("gridView1").data[0] as { [key: string]: string; };


    popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSMJQ_POPS2N",
        'Layout1'
        );


    popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"))
            ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    popFreeEdit.setEvent('open', async(e: any) => {
        popFreeEdit.setValue({ EAF_HEAT_NO: rq_info.EAF_HEAT_NO + '_1' });
        popFreeEdit.setValue({ RES_TYPE: '4' });
        popFreeEdit.setValue({ PROC_TYPE: '1' });
    })


        };
        const F9_PRE_DO = async(e: any) => {

};
        const F9_CANCEL = async(e: any) => {

};
        const F10_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRowsAsBlock("gridView1").data.length === 0) {
        erFormHelper.messageWarning("请选择要提交的记录");
        return false;
            }
            const inInfo = new EI.EIInfo();
    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1", {
            PROC_DIV: "T",
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
        erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    }
    queryMainGrid();

};
        const F10_PRE_DO = async(e: any) => {

};
        const F10_CANCEL = async(e: any) => {

};
        const F11_DO = async(e: any) => {

};
        const F11_PRE_DO = async(e: any) => {

};
        const F11_CANCEL = async(e: any) => {

};
        const valueChanged = async(e: any) => {
    // 质检批查询
    if (e.itemCode === "UPD_HIS_RECORD") {
        erFormHelper.showGridColumn("gridView1", "EVENT_DESC");
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        queryMainGrid();
    }
};

        const handleTabChange = async(activeKey: string) => {

    console.log('转换', activeKey);
    tab1ActiveKey.value = activeKey;
    if (activeKey === 'tab2') {
        erFormHelper.setControlValue("LayoutGroupFilter", "C_STATE", "2");
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
        erFormHelper.setControlValue("LayoutGroupFilter", "C_STATE", "1");
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
            return true
        };
        const getChildInfo = (info: any) => {
    if (info.close) {
        dialogVisible.value = false; // 关闭弹框
        xrEfDialogClose();

        queryMainGrid();
    }
};

        const dialogFormName_JQ = ref("MMSMJQ_POPS2N"); // 读配置表获取画面名
        const parentInfo_JQ = ref([]) as any;
        const dialogVisible_JQ = ref<boolean>(false);
        const openXrEfDialog_JQ = () => {
    dialogVisible_JQ.value = true; //弹窗设置为显示
};
        const xrEfDialogClose_JQ = () => {
    dialogVisible_JQ.value = false;
};
        const getChildInfo_JQ = (info: any) => {
    console.log('uygfgyuiujh')
            if (info.close) {
        dialogVisible_JQ.value = false; // 关闭弹框
        xrEfDialogClose_JQ();

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
            getChildInfo,
            dialogFormName,
            parentInfo,
            dialogVisible,
            xrEfDialogClose,
            dialogFormName_JQ,
            parentInfo_JQ,
            getChildInfo_JQ,
            dialogVisible_JQ,
            xrEfDialogClose_JQ
        };
    },
});
