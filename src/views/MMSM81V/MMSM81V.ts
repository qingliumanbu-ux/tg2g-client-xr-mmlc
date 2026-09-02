/*
 * @Description:
 * @Author: Edward
 * @Date: 2022-06-02 17:21:37
 * @LastEditors: zhangTing
 * @LastEditTime: 2023-07-19 15:13:06
 */

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
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
import MMSM81518ADDV from "../MMSM81518ADDV/MMSM81518ADDV.vue";
import MMSM8151LADDV from "../MMSM8151LADDV/MMSM8151LADDV.vue";
import MMSM8151CADDV from "../MMSM8151CADDV/MMSM8151CADDV.vue";
import { useRoute, useRouter } from "vue-router";
import { Console } from "console";

export default defineComponent({
    name: "MMSM81V",
    components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    MMSM81ADDV,
    MMSM81518ADDV,
    MMSM8151LADDV,
    MMSM8151CADDV,
    erGrid,
    erLayout,
    ErPopFree,
    ErPopQuery,
    },
    setup: () => {
    const dialogFormName = ref(""); // 弹出画面的画面名
    const initializeService = "";
    const $router = useRouter();
    const gridToolbar: Ref <any[]> = ref([]);
    const detailTabsRef = ref<any>(null);

    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const initializeFlag = ref(0);
    // let gridView1!: kendo.ui.Grid;
    let gridView1: any;
    const editable = ref(false);
    const LayoutGroupFilter = ref("");
    const xrEfDialogRef = ref<any>(null);

    const i_func_id_q = ref("");
    const i_func_id_p = ref("");
    // let i_func_id_p;
    let i_func_id;
    let i_service_f2: any;
    let i_service_f3: any;
    let i_service_f4: any;
    let i_service_f5: any;
    let i_service_f6: any;
    let i_service_f7: any;
    let i_service_f12: any;
    let i_formlayout: any;
    let i_pop_flag: any;
    let i_factory_div: any;
    let i_handle_div: any;
    let i_mat_kind: any;
    let sql_mat_kind: any;
    let i_formwidth: any;
    let i_formheight: any;
    let i_colcount: any;
    let cs_OkClick = "";
    let i_proc_div = "";
    let NOIN_NET_WT = "";
    let formPartition: string;
    let formName: string;
    let formNamePara = ref("");
    let i_form_ename = ""; //画面英文名
    let rateWidth = "";
    let rateHeight = "";
    let BUSI_TYPE: any;
    const RETURN_BUNKER = ref("");
    // console.log("111",efFormInfo.value.formName);
    const parentInfo = ref({});
    let popFreeEdit: ER.PopFreeHelper;
    const formlayout: Ref <any[]> = ref([]);
    const popFreeAdd = new ER.PopFreeHelper(
            efFormInfo.value.formPartition,
            "MMSM81VT",
            "LayoutGroupFilter1"
            );
    const popFreeAdd_Peisong = new ER.PopFreeHelper(
            efFormInfo.value.formPartition,
            "MMSM81VT_PS",
            "LayoutGroupFilter1"
            );
    const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName = efFormInfo.value.formName; // 当前画面名
            formNamePara.value = "COMMON";
            console.log("333", e);
            console.log("efFormInfo.value.formPartition", formPartition);
            console.log("efFormInfo.value.formName", formName);
            QueryPara();
            if (formName === "MMSM511S2N") {
                //废钢料场-废钢合金收货
                rateWidth = "5.5";
                rateHeight = "33.5";
                formNamePara.value = "MMSM511S2N";
            } else if (formName === "MMSM512S2N") {
                //原材料库-汽车收货
                rateWidth = "10";
                rateHeight = "50";
                formNamePara.value = "MMSM512S2N";
            } else if (formName === "MMSM513S2N") {
                //原材料库-火车收货
                rateWidth = "4.5";
                rateHeight = "33.5";
                formNamePara.value = "MMSM513S2N";
            } else if (formName === "MMSM51YS2N") {
                //原材料库-火车收货
                rateWidth = "4.5";
                rateHeight = "33.5";
                formNamePara.value = "MMSM51YS2N";
            } else if (formName === "MMSM51RS2N") {
                //镍板库收货
                rateWidth = "6.6";
                rateHeight = "50";
                formNamePara.value = "MMSM51RS2N";
            } else if (formName === "MMSM515S2N") {
                //虚拟料仓收货
                rateWidth = "10";
                rateHeight = "33.5";
                formNamePara.value = "MMSM515S2N";
            } else if (formName === "MMSM51CS2N") {
                //DES料仓收货
                rateWidth = "50";
                rateHeight = "33.5";
                formNamePara.value = "MMSM8151CADDVS2N";
            } else if (formName === "MMSM51KS2N") {
                //DES料仓收货
                rateWidth = "12.5";
                rateHeight = "50";
                formNamePara.value = "MMSM51KS2N";
            } else if (formName === "MMSM51NS2N") {
                //3#LF料仓收货
                rateWidth = "11.1";
                rateHeight = "50";
                formNamePara.value = "MMSM51NS2N";
            } else if (formName === "MMSM51HS2N") {
                //VOD收货
                rateWidth = "14.2";
                rateHeight = "50";
                formNamePara.value = "MMSM51HS2N";
            } else if (formName === "MMSM51PS2N") {
                //RH收货
                rateWidth = "9";
                rateHeight = "50";
                formNamePara.value = "MMSM51PS2N";
            } else if (formName === "MMSM51TS2N") {
                //IF虚拟收货
                rateWidth = "6.6";
                rateHeight = "25";
                formNamePara.value = "MMSM51TS2N";
            } else if (formName === "MMSM51MS2N") {
                //LTS收货
                rateWidth = "12.5";
                rateHeight = "50";
                formNamePara.value = "MMSM51MS2N";
            } else if (formName === "MMSM518S2N") {
                //废钢料场收货-排列方式不规律
                formNamePara.value = "MMSM81518ADDVS2N";
            } else if (formName === "MMSM51LS2N") {
                //废钢料仓降温料区-排列方式不规律
                formNamePara.value = "MMSM8151LADDVS2N";
            } else if (formName === "MMSM518_1S2N") {
                //RH收货
                rateWidth = "6.6";
                rateHeight = "25";
                formNamePara.value = "MMSM518_1S2N";
            }
        };

    const erGrid1Ready = () => {
            gridView1 = erFormHelper.getGrid("gridView1");
            erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
        };

    //通过炼钢配置表，进行模板画面参数查询
    const QueryPara = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
            eiBlock.pushData(
                {
                    PROGRAM_NAME: efFormInfo.value.formName,
                    // PROGRAM_NAME: programName
                },
                true
                );
      const outInfo = await erFormHelper.callService(
                "mmsmpara_inq",
                inInfo,
                false,
                true
                );
      for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id_q") {
        i_func_id_q.value = <string>outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id_p") {
        i_func_id_p.value = <string>outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "func_id") {
        i_func_id = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f2") {
        i_service_f2 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f3") {
        i_service_f3 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f4") {
        i_service_f4 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f5") {
        i_service_f5 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f6") {
        i_service_f6 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f7") {
        i_service_f7 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "service_f12") {
        i_service_f12 = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "formlayout") {
        i_formlayout = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "pop_flag") {
        i_pop_flag = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "factory_div") {
        i_factory_div = outInfo.getBlock(0).data[i]["PARA"];
    }
        let i_mat: any;
    i_mat = outInfo.getBlock(0).data[i]["PARA_NAME"];
    if (i_mat.indexOf("mat_kind") > -1) {
        i_mat_kind = outInfo.getBlock(0).data[i]["PARA"]?.toString().trim();

        if (sql_mat_kind != "") {
            sql_mat_kind += "'" + i_mat_kind + "',";
        }
        console.log("产线sql_mat_kind21", sql_mat_kind);
    }
    if (outInfo.getBlock(0).data[i]["PARA_NAME"] === "handle_div") {
        i_handle_div = outInfo.getBlock(0).data[i]["PARA"];
    }
    if (i_formlayout != "" && i_formlayout != null) {
        formlayout.value = i_formlayout.split(",");
        i_formwidth = formlayout.value[0];
        i_formheight = formlayout.value[1];
        i_colcount = formlayout.value[2];
    }
}
nextTick(() => {
    initializePage();
});
    };

    const queryMainGrid = async() => {
    if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
        return false;
    }
    //清空grid数据
    erFormHelper.clearLayoutOrGridData("gridView1");

      const inInfo = new EI.EIInfo();

      //获取查询条件dt
      const queryCondition =
    erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

    inInfo.addBlock(queryCondition);
    console.log("LXX1", inInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm81_inq",
        inInfo,
        true,
        false,
        true
        );
      for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
        outInfo.getBlock(0).data[i]["BUNKER_TYPE"] = "SCRAPALLOY";
    }

    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
    }
};
    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
    nextTick(() => {
        dialogVisible.value = true;
    });
};

    // 关闭弹框监听
    const xrEfDialogClose = () => { };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
    console.log("获取弹窗画面传递过来的信息", info);
    if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        RETURN_BUNKER.value = info.BUNKER_NO;
        if (BUSI_TYPE === "配送" || BUSI_TYPE === "调拨") {
            popFreeAdd_Peisong.setValue({ BUNKER_NO: info.BUNKER_NO });
        } else {
            popFreeAdd.setValue({ BUNKER_NO: info.BUNKER_NO });
        }

        xrEfDialogClose();
    }
};

    const initializePage = async() => {
      // i_form_ename = EFFormInfo.getFormParams().formName;
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        efFormInfo.value.formName,
        "",
        ""
        );

    if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => { });
    } else {
        erFormHelper.messageError(
            "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
            );
    }
    };

onMounted(() => {
    // initializePage();
});

    const F2_DO = async(e: any) => {
    queryMainGrid();
};
    const queryData = async(e: any) => {
      let bunker_Message = new EI.EIInfo();
    bunker_Message.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel),
        "Table0"
        );
    console.log("sw1118", RETURN_BUNKER.value);
        console.log("sw1119", bunker_Message.getBlock(0).data[0]["BACK_CODE_5"]);
        if (RETURN_BUNKER.value != null) {
    if (RETURN_BUNKER.value == "") {
        if (
            bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "" ||
            bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "0" ||
            bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "1"
            ) {
            erFormHelper.messageWarning("请选择料仓号后入库");
            return;
        }
      }
        }
        else{

            erFormHelper.messageWarning("请选择料仓号后入库11");
            return;
                
            }
      const mes_res = await erFormHelper.messageConfirm(
        "是否确认选择料仓收货？ 料仓号：" + RETURN_BUNKER.value
        );
    if (!mes_res) {
        return;
    } else {
    }
    console.log("进来了嘛0", bunker_Message);
    // if(bunker_Message.getBlock(0).data[0]['SURE2']==="true"){
    //   console.log("进来了嘛");

    //   bunker_Message.getBlock(0).data[0]['SURE2'] = '1'
    // }else{
    //   bunker_Message.getBlock(0).data[0]['SURE2'] = '0'
    // }
    console.log("进来了嘛1", bunker_Message);
    if (bunker_Message.getBlock(0).data[0]["SURE2"] === "1") {
    } else {
        if (bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "1") {
            if (bunker_Message.getBlock(0).data[0]["NET_WT"] === 0) {
                erFormHelper.messageWarning("净重为0不能入库");
                return;
            }
        }
      }

      const outInfo = await erFormHelper.callService(
        "mmsm81f3_ins",
        bunker_Message,
        true,
        false,
        true
        );
    if (outInfo.sys.status < 0) {
        erFormHelper.messageError("收货有误:" + outInfo.sys.msg);
    }
    queryMainGrid();
};
    const queryData1 = async(e: any) => {
      let bunker_Message = new EI.EIInfo();

    bunker_Message.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd_Peisong.DataModel),
        "Table0"
        );
        console.log("333", bunker_Message);
        if (RETURN_BUNKER.value != null) {
    if (RETURN_BUNKER.value == "") {
        if (
            bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "1" ||
            bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === ""
            ) {
            erFormHelper.messageWarning("请选择料仓号后入库");
            return;
        }
    }
        }
        else{

            erFormHelper.messageWarning("请选择料仓号后入库22");
            return;
                
            }
      const mes_res = await erFormHelper.messageConfirm(
        "是否确认选择料仓收货？ 料仓号：" + RETURN_BUNKER.value
        );
    if (!mes_res) {
        return;
    } else {
    }

    // 确认是否需要添加这一段判断代码
    console.log("进来了嘛1", bunker_Message);
    if (bunker_Message.getBlock(0).data[0]["SURE2"] === "1") {
    } else {
        if (bunker_Message.getBlock(0).data[0]["BACK_CODE_5"] === "1") {
            if (bunker_Message.getBlock(0).data[0]["NET_WT"] === 0) {
                erFormHelper.messageWarning("净重为0不能入库");
                return;
            }
        }
      }

      const outInfo = await erFormHelper.callService(
        "mmsm81f3_ins",
        bunker_Message,
        true,
        false,
        true
        );
    if (outInfo.sys.status < 0) {
        erFormHelper.messageError("收货有误:" + outInfo.sys.msg);
    }
    queryMainGrid();
};
    const F3_DO = async(e: any) => {
    if (erFormHelper.getGridCheckedRows(gridView1).length === 0) {
        erFormHelper.messageWarning("请选择一条信息进行操作");
    } else {
        for (let item1 of erFormHelper.getGridSelectRows("gridView1")) {
            if (
                item1.RECEIVING_STATUS === "7" ||
                item1.RECEIVING_STATUS === "8" ||
                item1.RECEIVING_STATUS === "9" ||
                item1.RECEIVING_STATUS === "J"
                ) {
                erFormHelper.messageWarning("该物料已经收货！");
                return false;
            }
        }
        RETURN_BUNKER.value = "";
        const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
        const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
        // 根据传入值判断是否为配送还是其他
        console.log("111", selectedRows_BLOCK.data[0]["BUSI_TYPE"]);
        BUSI_TYPE = selectedRows_BLOCK.data[0]["BUSI_TYPE"];
        if (
            selectedRows_BLOCK.data[0]["BUSI_TYPE"] === "配送" ||
            selectedRows_BLOCK.data[0]["BUSI_TYPE"] === "调拨"
            ) {
            popFreeAdd_Peisong.ReceiveData(selectedRows);

            popFreeAdd_Peisong.setEvent("itemValueChanged", async(a: any) => {
                if (a.itemCode === "SURE2") {
                    if (a.value === false) {
                        popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            true,
                            "CHOOSE_BUNKER"
                            );
                        popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            true,
                            "DEDUCT_WGT"
                            );
                        popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                            "LayoutGroupFilter1",
                            "DEDUCT_WGT",
                            "#E4E5EA"
                            );
                        // popFreeAdd_Peisong.setValue({LOAD_CODE:" "});
                        // popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor('MMSM65_POP_LAYOUT','LOAD_CODE',"rgb(213 213 213)")
                    } else {
                        popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            false,
                            "CHOOSE_BUNKER"
                            );
                        popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            false,
                            "DEDUCT_WGT"
                            );
                        popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                            "LayoutGroupFilter1",
                            "DEDUCT_WGT",
                            "rgb(255 255 255)"
                            );
                    }
                }
            });

            popFreeAdd_Peisong.setEvent("open", async(a: any) => {
                // popFreeAdd_Peisong.FormHelper.setAllControlReadOnly('LayoutGroupFilter1',false);

                if (selectedRows.NET_WT > "0") {
                    console.log("rxm", selectedRows);

                    popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                        "LayoutGroupFilter1",
                        "SURE2",
                        "#E4E5EA"
                        );
                    popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                        "LayoutGroupFilter1",
                        true,
                        "SURE2"
                        );
                } else {
                    popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                        "LayoutGroupFilter1",
                        true,
                        "CHOOSE_BUNKER"
                        );

                    popFreeAdd_Peisong.FormHelper.setControlReadOnly(
                        "LayoutGroupFilter1",
                        false,
                        "SURE2"
                        );
                }

                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "WEIGH_NO",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "VOUCHER_ID",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "MAT_CODE",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "MAT_NAME",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "LOT_NO",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "SHIP_NAME",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "VEHICLE_NO",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "QUALITY_BATCH_NO",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "FAC_CODE",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "BUCKLE_WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "TARE_TIME",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "GROSS_TIME",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "STOCK_WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "GROSS_WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "TARE_WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "NET_WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "BUCKLE_2WT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "DEDUCT_WGT",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "BUNKER_NO",
                    "#E4E5EA"
                    );
                popFreeAdd_Peisong.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "PURCH_NO",
                    "#E4E5EA"
                    );
            });
            popFreeAdd_Peisong.setEvent("itemButtonClick", async(a: any) => {
                if (a.itemCode === "CHOOSE_BUNKER") {
              const selectedRows_BLOCK =
                    erFormHelper.getGridCurrentRowAsBlock("gridView1");
              const data = {
                        MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
                        WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
                        STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
                        BUNKER_TYPE: selectedRows_BLOCK.data[0]["BUNKER_TYPE"],
                        BUCKLE_WT: selectedRows_BLOCK.data[0]["BUCKLE_WT"],
                        BACK_CODE_5: selectedRows_BLOCK.data[0]["BACK_CODE_5"],
                        UNLOAD_POINT_CODE:
                        selectedRows_BLOCK.data[0]["UNLOAD_POINT_CODE"],
                        FORMNAME: formName,
                        rateWidth: rateWidth,
                        rateHeight: rateHeight,
                    };
                    console.log("111", data);
                    if (formName === "MMSM514S2N") {
                //204镍板收货 单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                            "所有镍板都存放在编号为NI的虚拟库存中！"
                            );
                        if (!mes_res) {
                            return;
                        } else {
                            popFreeAdd_Peisong.setValue({ BUNKER_NO: "NI" });
                            RETURN_BUNKER.value = "NI";
                        }
              } else if (formName === "MMSM516S2N") {
                //206原材料库-手投收货 单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                            "所有其他原材料都存放在编号为GEN的虚拟库存中!"
                            );
                        if (!mes_res) {
                            return;
                        } else {
                            popFreeAdd_Peisong.setValue({ BUNKER_NO: "GEN" });
                            RETURN_BUNKER.value = "GEN";
                        }
              } else if (formName === "MMSM51BS2N") {
                //211丝线 进厂  单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                            "所有丝线暂存在丝线虚拟库，再进行分发！"
                            );
                        if (!mes_res) {
                            return;
                        } else {
                            popFreeAdd_Peisong.setValue({ BUNKER_NO: "WIRE" });
                            RETURN_BUNKER.value = "WIRE";
                        }
              } else {
                        //多个料仓，料仓排列显示
                        if (formName === "MMSM518S2N") {
                            dialogFormName.value = "MMSM81518ADDVS2N";
                        } else if (formName === "MMSM51LS2N") {
                            dialogFormName.value = "MMSM8151LADDVS2N";
                        } else {
                            dialogFormName.value = "MMSM81ADDVS2N";
                        }
                        parentInfo.value = data;
                        openXrEfDialog();
                    }
            }
                if (a.itemCode === "SURE") {
              const mes_res = await erFormHelper.messageConfirm(
                        "是否确认选择料仓收货？ 料仓号：" +
                        popFreeAdd_Peisong.getValue("BUNKER_NO")
                        );
                    if (!mes_res) {
                        return;
                    } else {
                    }

              let bunker_Message = new EI.EIInfo();
              const eiBlock = new EI.EiBlock();
                    eiBlock.pushData(
                        {
                            MAT_CODE: popFreeAdd_Peisong.getValue("MAT_CODE"),
                            MAT_NAME: popFreeAdd_Peisong.getValue("MAT_NAME"),
                            STOCK_WT: popFreeAdd_Peisong.getValue("STOCK_WT"),
                            TRUST_ID: popFreeAdd_Peisong.getValue("TRUST_ID"),
                            WEIGH_NO: popFreeAdd_Peisong.getValue("WEIGH_NO"),
                            GROSS_WT: popFreeAdd_Peisong.getValue("GROSS_WT"),
                            TARE_WT: popFreeAdd_Peisong.getValue("TARE_WT"),
                            NET_WT: popFreeAdd_Peisong.getValue("NET_WT"),
                            GROSS_TIME: popFreeAdd_Peisong.getValue("GROSS_TIME"),
                            TARE_TIME: popFreeAdd_Peisong.getValue("TARE_TIME"),
                            BUCKLE_WT: popFreeAdd_Peisong.getValue("BUCKLE_WT"),
                            BUCKLE_REMARK: popFreeAdd_Peisong.getValue("BUCKLE_REMARK"),
                            BUCKLE_2WT: popFreeAdd_Peisong.getValue("BUCKLE_2WT"),
                            SETTLEMENT_WT: popFreeAdd_Peisong.getValue("SETTLEMENT_WT"),
                            BUNKER_NO: popFreeAdd_Peisong.getValue("BUNKER_NO"),
                            PURCH_NO: popFreeAdd_Peisong.getValue("PURCH_NO"),
                            BACK_CODE_5: popFreeAdd_Peisong.getValue("BACK_CODE_5"),
                            UNLOAD_POINT_CODE:
                            popFreeAdd_Peisong.getValue("UNLOAD_POINT_CODE"),
                        },
                        true
                        );

                    bunker_Message.addBlock(eiBlock);
              const outInfo = await erFormHelper.callService(
                        "mmsm81f3_ins",
                        bunker_Message,
                        true,
                        false,
                        true
                        );
                    if (outInfo.sys.status < 0) {
                        erFormHelper.messageError("收货有误:" + outInfo.sys.msg);
                    }
                    popFreeAdd_Peisong.CloseDialog();
                    queryMainGrid();
            }
            });

            ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd_Peisong, (e: any) => {
                if (popFreeAdd_Peisong.getEvent("ok")) {
                    queryData1(e);
                }
            });
        } else {
            popFreeAdd.setEvent("itemValueChanged", async(a: any) => {
                if (a.itemCode === "SURE2") {
                    if (a.value === false) {
                        popFreeAdd.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            true,
                            "CHOOSE_BUNKER"
                            );
                        popFreeAdd.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            true,
                            "DEDUCT_WGT"
                            );
                        popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                            "LayoutGroupFilter1",
                            "DEDUCT_WGT",
                            "#E4E5EA"
                            );
                        // popFreeAdd.setValue({LOAD_CODE:" "});
                        // popFreeAdd.FormHelper.setLayoutItemContentBackColor('MMSM65_POP_LAYOUT','LOAD_CODE',"rgb(213 213 213)")
                    } else {
                        popFreeAdd.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            false,
                            "CHOOSE_BUNKER"
                            );
                        popFreeAdd.FormHelper.setControlReadOnly(
                            "LayoutGroupFilter1",
                            false,
                            "DEDUCT_WGT"
                            );
                        popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                            "LayoutGroupFilter1",
                            "DEDUCT_WGT",
                            "rgb(255 255 255)"
                            );
                    }
                }
                if (a.itemCode === "I_BILLTYPE") {

              const X_1 = popFreeAdd.FormHelper.getControlValue('LayoutGroupFilter1', 'I_BILLTYPE');
              const X_2 = popFreeAdd.FormHelper.getControlValue('LayoutGroupFilter1', 'UNIT_WEIGHT');
                    console.log("1111", X_2);
                    popFreeAdd.FormHelper.setControlValue("LayoutGroupFilter1", "DEDUCT_WGT", X_1 * X_2); 
            }
            });

            popFreeAdd.ReceiveData(selectedRows);
            popFreeAdd.setEvent("open", async(a: any) => {
             //20250417bywcm
          
             let resTable = erFormHelper.querySql(
              '',
              ` SELECT CODE FROM TWMSMZD02 WHERE REC_CREATE_TIME =(SELECT MAX(REC_CREATE_TIME) REC_CREATE_TIME FROM TWMSMZD02 t WHERE CODE_CLASS = 'LCSHDZ') `
            );

            const unit_weight =((await resTable).getBlock(0).data[0]["CODE"]?.toString());
            console.log("20250418", unit_weight);
            popFreeAdd.FormHelper.setControlValue('LayoutGroupFilter1', 'UNIT_WEIGHT', unit_weight);
            if (selectedRows.NET_WT > "0") {
                console.log("rxm", selectedRows);

                popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                    "LayoutGroupFilter1",
                    "SURE2",
                    "#E4E5EA"
                    );
                popFreeAdd.FormHelper.setControlReadOnly(
                    "LayoutGroupFilter1",
                    true,
                    "SURE2"
                    );
            } else {
                popFreeAdd.FormHelper.setControlReadOnly(
                    "LayoutGroupFilter1",
                    true,
                    "CHOOSE_BUNKER"
                    );

                popFreeAdd.FormHelper.setControlReadOnly(
                    "LayoutGroupFilter1",
                    false,
                    "SURE2"
                    );
            }
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "WEIGH_NO",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "VOUCHER_ID",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "MAT_CODE",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "MAT_NAME",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "LOT_NO",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "SHIP_NAME",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "VEHICLE_NO",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "QUALITY_BATCH_NO",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "FAC_CODE",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "BUCKLE_WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "TARE_TIME",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "GROSS_TIME",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "STOCK_WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "GROSS_WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "TARE_WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "NET_WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "BUCKLE_2WT",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "BUNKER_NO",
                "#E4E5EA"
                );
            popFreeAdd.FormHelper.setLayoutItemContentBackColor(
                "LayoutGroupFilter1",
                "PURCH_NO",
                "#E4E5EA"
                );
          });

        popFreeAdd.setEvent("itemButtonClick", async(a: any) => {
            if (a.itemCode === "CHOOSE_BUNKER") {
              const selectedRows_BLOCK =
                erFormHelper.getGridCurrentRowAsBlock("gridView1");
              const data = {
                    MAT_CODE: selectedRows_BLOCK.data[0]["MAT_CODE"],
                    WEIGH_NO: selectedRows_BLOCK.data[0]["WEIGH_NO"],
                    STOCK_WT: selectedRows_BLOCK.data[0]["STOCK_WT"],
                    BUNKER_TYPE: selectedRows_BLOCK.data[0]["BUNKER_TYPE"],
                    BUCKLE_WT: selectedRows_BLOCK.data[0]["BUCKLE_WT"],
                    BACK_CODE_5: selectedRows_BLOCK.data[0]["BACK_CODE_5"],
                    UNLOAD_POINT_CODE:
                    selectedRows_BLOCK.data[0]["UNLOAD_POINT_CODE"],
                    FORMNAME: formName,
                    rateWidth: rateWidth,
                    rateHeight: rateHeight,
                };
                if (formName === "MMSM514S2N") {
                //204镍板收货 单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                        "所有镍板都存放在编号为NI的虚拟库存中！"
                        );
                    if (!mes_res) {
                        return;
                    } else {
                        popFreeAdd.setValue({ BUNKER_NO: "NI" });
                        RETURN_BUNKER.value = "NI";
                    }
              } else if (formName === "MMSM516S2N") {
                //206原材料库-手投收货 单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                        "所有其他原材料都存放在编号为GEN的虚拟库存中!"
                        );
                    if (!mes_res) {
                        return;
                    } else {
                        popFreeAdd.setValue({ BUNKER_NO: "GEN" });
                        RETURN_BUNKER.value = "GEN";
                    }
              } else if (formName === "MMSM51BS2N") {
                //211丝线 进厂  单个料仓，弹框提示框
                const mes_res = await erFormHelper.messageConfirm(
                        "所有丝线暂存在丝线虚拟库，再进行分发！"
                        );
                    if (!mes_res) {
                        return;
                    } else {
                        popFreeAdd.setValue({ BUNKER_NO: "WIRE" });
                        RETURN_BUNKER.value = "WIRE";
                    }
              } else {
                    //多个料仓，料仓排列显示
                    if (formName === "MMSM518S2N") {
                        dialogFormName.value = "MMSM81518ADDVS2N";
                    } else if (formName === "MMSM51LS2N") {
                        dialogFormName.value = "MMSM8151LADDVS2N";
                    } else {
                        dialogFormName.value = "MMSM81ADDVS2N";
                    }
                    parentInfo.value = data;
                    openXrEfDialog();
                }
            }
            if (a.itemCode === "SURE") {
              const mes_res = await erFormHelper.messageConfirm(
                    "是否确认选择料仓收货？ 料仓号：" +
                    popFreeAdd.getValue("BUNKER_NO")
                    );
                if (!mes_res) {
                    return;
                } else {
                }

              let bunker_Message = new EI.EIInfo();
              const eiBlock = new EI.EiBlock();

                eiBlock.pushData(
                    {
                        MAT_CODE: popFreeAdd.getValue("MAT_CODE"),
                        MAT_NAME: popFreeAdd.getValue("MAT_NAME"),
                        STOCK_WT: popFreeAdd.getValue("STOCK_WT"),
                        TRUST_ID: popFreeAdd.getValue("TRUST_ID"),
                        WEIGH_NO: popFreeAdd.getValue("WEIGH_NO"),
                        GROSS_WT: popFreeAdd.getValue("GROSS_WT"),
                        TARE_WT: popFreeAdd.getValue("TARE_WT"),
                        NET_WT: popFreeAdd.getValue("NET_WT"),
                        GROSS_TIME: popFreeAdd.getValue("GROSS_TIME"),
                        TARE_TIME: popFreeAdd.getValue("TARE_TIME"),
                        BUCKLE_WT: popFreeAdd.getValue("BUCKLE_WT"),
                        BUCKLE_REMARK: popFreeAdd.getValue("BUCKLE_REMARK"),
                        BUCKLE_2WT: popFreeAdd.getValue("BUCKLE_2WT"),
                        SETTLEMENT_WT: popFreeAdd.getValue("SETTLEMENT_WT"),
                        BUNKER_NO: popFreeAdd.getValue("BUNKER_NO"),
                        PURCH_NO: popFreeAdd.getValue("PURCH_NO"),
                        BACK_CODE_5: popFreeAdd.getValue("BACK_CODE_5"),
                        UNLOAD_POINT_CODE: popFreeAdd.getValue("UNLOAD_POINT_CODE"),
                        NOIN_NET_WT: NOIN_NET_WT,
                    },
                    true
                    );

                bunker_Message.addBlock(eiBlock);
              const outInfo = await erFormHelper.callService(
                    "mmsm81f3_ins",
                    bunker_Message,
                    true,
                    false,
                    true
                    );
                if (outInfo.sys.status < 0) {
                    erFormHelper.messageError("收货有误:" + outInfo.sys.msg);
                }
                popFreeAdd.CloseDialog();
                queryMainGrid();
            }
        });

        ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
            if (popFreeAdd.getEvent("ok")) {
                queryData(e);
            }
        });
    }
      }
    };

    const F4_PRE_DO = async(e: any) => {
    // setToolbarVisible1(true);
    //设置编辑状态为可编辑
    erFormHelper.setGridEditable("gridView1", true);
};

    const F4_CANCEL = async(e: any) => {
    editable.value = false;
    // setToolbarVisible1(editable.value);
    erFormHelper.setGridEditable("gridView1", false);
    queryMainGrid();
};
    const F4_DO = async(e: any) => {
      const eiInfo = new EI.EIInfo();
      //获取增删改行的数据
      const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
    eiInfo.addBlock(created, "MMSM81_INS");
    console.log("eiInfo", eiInfo);
      // const outInfo = await erFormHelper.callService(i_service_f4, eiInfo, false, false, true);
      const outInfo = await erFormHelper.callService(
        "mmsm81_ins",
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
        queryMainGrid();
    }
    };
    const dbbutClick = async() => {
    if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
    }
    //加载弹窗配置
    cs_OkClick = "F4";
    i_proc_div = "U";
    popFreeEdit = new ER.PopFreeHelper(
        formPartition,
        "MMSM81VX_DIALOG",
        "MMSM81VX_DIALOG"
        );
    popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow("gridView1"));
    ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
};
    const popFreeEditOkClick = async(e: PopFreeReturnInfo) => { };

    // 主表1焦点行事件
    const GridView1FocusChanged = async(e: any) => {
    erFormHelper.checkGridCurrentRow("gridView1");
};
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      F2_DO,
      F3_DO,
      F4_DO,
      F4_CANCEL,
      F4_PRE_DO,
      erGrid1Ready,
      dialogVisible,
      gridView1,
      LayoutGroupFilter,
      xrEfDialogRef,
      xrEfDialogClose,
      getChildInfo,
      dbbutClick,
      parentInfo,
      gridToolbar,
      i_func_id_q,
      dialogFormName,
      i_func_id_p,
      formNamePara,
      GridView1FocusChanged,
};
  },
});
