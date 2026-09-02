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
import MMSM82POP from "../MMSM82POP/MMSM82POP.vue";
import EFCallForm from "EFX/EFCallForm";

export default defineComponent({
    name: "MMSM835S2N",
    components: {
    xrEfForm,
    xrEfPanel,
    MMSM82POP,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
    EFCallForm,
    },
    setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const initializeService = "";
    const gridToolbar: Ref <any[]> = ref([]);
    const detailTabsRef = ref<any>(null);
    const dialogFormName = ref("");
    const bunker_g = reactive(new Array());
    const bunker_f = reactive(new Array());
    const bunker_d = reactive(new Array());
    const bunker_h = reactive(new Array());
    const box_wt = ref(0);        //装料量 BUNKER_GROSS_WT
    const box_deduct_wt = ref(0); //废钢扣杂重 BUNKER_DEDUCT_WT
    const parentInfo = ref({});
    const dialogVisible = ref(false);
    let formName: string;
    let BUNKER_NO_QUE: any;
    let formPartition: string;
    let timer;
    // 变量定义
    // const formName = 'MMSM833S2N';
    // const erFormHelper = reactive(new ErFormHelper());
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    let gridView5: any;
    let LN_LC: any;
    let v_bunker_no: any;
    // 料仓代码，物料代码，物料名称，重量，物料类型
    const MX_LC_G = ref(new Array());
    const MX_LC_D = ref(new Array());
    const bunker_mat_code = reactive(new Array());
    const bunker_mat_name = reactive(new Array());
    const bunker_mat_type = reactive(new Array());
    const bunker_stock_wt = reactive(new Array());
    const buiker_stock_wt = reactive(new Array());
    const bunker_bunker_no = reactive(new Array());
    const route = useRoute(); //获取跳转参数
    let str: any;

        if (route.query.FLAG) {
            str = route.query.FLAG; //是跳转
    }

    const GL_LC = ref({
            name: "",
        });
    const DL_LC = ref({
            name: "",
        });
    const DL_DX = ref({
            name: "",
        });
    const DL_HC = ref({
            name: "",
        });

    const MMSM835 = ref({
            STOCK_WT: 0,
            BUNKER_GROSS_WT: 0,
            BUNKER_DEDUCT_WT: 0,
        });

    const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName = efFormInfo.value.formName; // 当前画面名
            formName = "MMSM835S2N";
            nextTick(() => {
                initializePage();
                startTimer();
                MX_LC_D.value.push(" ", " ", " ", " ", " ");
                MX_LC_G.value.push(" ", " ", " ", " ", " ");
            });
        };
    const erGrid1Ready = () => {
            gridView1 = erFormHelper.getGrid("gridView1");
            erFormHelper.setGridEditable("GridView1", false); // 设置grid不可编辑
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
    const erGrid5Ready = () => {
            gridView5 = erFormHelper.getGrid("gridView5");
            erFormHelper.setGridEditable("gridView5", false); // 设置grid不可编辑
            gridView5.gridOptions.getRowStyle = (params: any) => {
                if (params.data.BACK_C1 === "1") {
                    return {
                        color: "#064bff",
                    };
                }
            };
        };

    const S_BUNKER_NO = ref("");
    const G_BUNKER_NO = ref("");
    const D_MAT_CODE = ref("");
    const G_MAT_CODE = ref("");

    //刷新料仓
    const querylc = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
            EIManager.callService(formPartition, "mmsm60lc_inq", inInfo).then(
                (res: EI.EIInfo) => {
                    erFormHelper.mergeEiBlockToGrid(res.getBlock(0), gridView5);
                }
                );
    };
    // 查询高位料仓和低位料仓并且返回给下拉框
    const queryLCdata_G = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
            eiBlock.pushData(
                {
                    BUNKER_TYPE: " ",
                },
                true
                );
      const outInfo = await erFormHelper.callService(
                "mmsm85_bunker_inqg",
                inInfo,
                true,
                false,
                true
                );
            if (outInfo.sys.status < 0) {
                //维护完成重新查询
                erFormHelper.messageError("查询错误：" + outInfo.sys.msg);
                return false;
            } else {
        for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
    bunker_g.push({
        id: i,
        name: outInfo.getBlock(0).data[i]["BUNKER_NO"],
    });
    G_BUNKER_NO.value = <string>outInfo.getBlock(0).data[i]["BUNKER_NO"];
    G_MAT_CODE.value = <string>outInfo.getBlock(0).data[i]["MAT_CODE"];
        }
      }
    };
    const queryLCdata_D = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: " ",
        },
        true
        );
    EIManager.callService(formPartition, "mmsm60lcxl_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        bunker_f.push({
            id: i,
            name: res.getBlock(0).data[i]["BUNKER_NO"],
        });
        S_BUNKER_NO.value = <string>res.getBlock(0).data[0]["BUNKER_NO"];
        D_MAT_CODE.value = <string>res.getBlock(0).data[0]["MAT_CODE"];
    }
          for (let i = 0; i < res.getBlock(1).data.length; i++) {
        bunker_d.push({
            id: i,
            name: res.getBlock(1).data[i]["BUNKER_NO"],
        });
        S_BUNKER_NO.value = <string>res.getBlock(0).data[0]["BUNKER_NO"];
        D_MAT_CODE.value = <string>res.getBlock(0).data[0]["MAT_CODE"];
    }
          for (let i = 0; i < res.getBlock(2).data.length; i++) {
        bunker_h.push({
            id: i,
            name: res.getBlock(2).data[i]["BUNKER_NO"],
        });
        S_BUNKER_NO.value = <string>res.getBlock(0).data[0]["BUNKER_NO"];
        D_MAT_CODE.value = <string>res.getBlock(0).data[0]["MAT_CODE"];
    }
        }
      );
    };
    const GL_Change = async() => {
      const inInfo = new EI.EIInfo();
      const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: GL_LC.value.name,
            MAT_CODE: G_MAT_CODE.value,
        },
        true
        );
    inInfo.addBlock(eiBlock);
    };
    const DL_Change = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: DL_LC.value.name,
            MAT_CODE: D_MAT_CODE.value,
        },
        true
        );
    if (DL_LC.value.name != "") {
        DL_DX.value.name = "";
        DL_HC.value.name = "";
      }

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView3);
        erFormHelper.setControlValueEx(
            "LayoutGroupFilter3",
            outInfo.getBlock(0).data[0]
            );
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }
    EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        MX_LC_D.value.length = 0;
        MX_LC_D.value.push(
            res.getBlock(0).data[i]["BUNKER_NO"],
            res.getBlock(0).data[i]["MAT_CODE"],
            res.getBlock(0).data[i]["MAT_NAME"],
            res.getBlock(0).data[i]["STOCK_WT"],
            res.getBlock(0).data[i]["MAT_TYPE"]
            );
    }
        }
      );
    };
    const DL_Change1 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: DL_DX.value.name,
            MAT_CODE: D_MAT_CODE.value,
        },
        true
        );
    if (DL_DX.value.name != "") {
        DL_LC.value.name = "";
        DL_HC.value.name = "";
      }

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView3);
        erFormHelper.setControlValueEx(
            "LayoutGroupFilter3",
            outInfo.getBlock(0).data[0]
            );
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }
    EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        MX_LC_D.value.length = 0;
        MX_LC_D.value.push(
            res.getBlock(0).data[i]["BUNKER_NO"],
            res.getBlock(0).data[i]["MAT_CODE"],
            res.getBlock(0).data[i]["MAT_NAME"],
            res.getBlock(0).data[i]["STOCK_WT"],
            res.getBlock(0).data[i]["MAT_TYPE"]
            );
    }
        }
      );
    };
    const DL_Change2 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: DL_HC.value.name,
            MAT_CODE: D_MAT_CODE.value,
        },
        true
        );
    if (DL_HC.value.name != "") {
        DL_LC.value.name = "";
        DL_DX.value.name = "";
      }

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView3);
        erFormHelper.setControlValueEx(
            "LayoutGroupFilter3",
            outInfo.getBlock(0).data[0]
            );
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }
    EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        MX_LC_D.value.length = 0;
        MX_LC_D.value.push(
            res.getBlock(0).data[i]["BUNKER_NO"],
            res.getBlock(0).data[i]["MAT_CODE"],
            res.getBlock(0).data[i]["MAT_NAME"],
            res.getBlock(0).data[i]["STOCK_WT"],
            res.getBlock(0).data[i]["MAT_TYPE"]
            );
    }
        }
      );
    };

    const GridView1FocusChanged = async(e: any) => {
    if (e && e.data) {
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        // 子表查询
        erFormHelper.mergeDataToLayoutOrGrid(
            eiBlock,
            true,
            "LayoutGroupFilter2"
            );
    }
    if (!e.data) {
        erFormHelper.clearGridData("gridView2"); //化学成分
        return;
    }
    if (e && e.rowChanged) {
        if (e.data) {
            queryDetailInfo({
                QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
            });
        }
    }
};

    const queryDetailInfo = async(currentRowInfo: any) => {
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

    const GridView3FocusChanged = async(e: any) => {
    if (e && e.data) {
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        // 子表查询
        erFormHelper.mergeDataToLayoutOrGrid(
            eiBlock,
            true,
            "LayoutGroupFilter3"
            );
    }
    if (!e.data) {
        erFormHelper.clearGridData("gridView4"); // 清空子表数据
        return;
    }
    if (e && e.rowChanged) {
        if (e.data) {
            queryDetailInfo1({
                QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO"),
            });
        }
    }
};

    const queryDetailInfo1 = async(currentRowInfo: any) => {
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
        erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, "gridView4");
    }
    };

    const GridView5FocusChanged = async(e: any) => {
    erFormHelper.clearLayoutData("LayoutGroupFilter4");

    if (e && e.rowChanged) {
        if (e.data) {
            queryDetailInfo2({
                BUNKER_NO: e.data.get("BUNKER_NO"),
            });
        }
    }
};

    const queryDetailInfo2 = async(currentRowInfo: any) => {
      // 成分信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
    eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm85sc_inq",
        eiInfo1,
        true,
        false,
        true
        );

    if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
    } else {
        erFormHelper.setControlValueEx(
            "LayoutGroupFilter4",
            outInfo1.getBlock(0).data[0]
            );
    }
    };

    const oncontextmenu_s = async(a: any) => {
    console.log("进来了");
};

    const butClick = async() => {
    if (
        DL_LC.value.name === "" &&
        DL_DX.value.name === "" &&
        DL_HC.value.name === ""
        ) {
        erFormHelper.messageError("请选择低位料仓");
        return;
    }

    if (box_wt.value === 0) {
        erFormHelper.messageError("请输入装料量");
        return;
    }
    //if (box_deduct_wt.value === 0) {
    //    erFormHelper.messageError("请输入废钢扣杂重");
    //    return;
    //  }
      const inInfo = new EI.EIInfo();
      // const eiBlock = inInfo.addBlock(new EI.EiBlock());
      const eiBlock = inInfo.addBlock(new EI.EiBlock(), "Tables0");

    if (LN_LC === undefined) {
        erFormHelper.messageError("请选择料槽料篮");
        return;
    }
    if (DL_LC.value.name != "") {
        eiBlock.pushData(
            {
                BUNKER_NO: LN_LC,
                BUNKER_NO1: DL_LC.value.name,
                STOCK_WT: box_wt.value,
                //====新增====
                BUNKER_GROSS_WT: box_wt.value,
                BUNKER_DEDUCT_WT: box_deduct_wt.value,
            },
            true
            );
    }

    if (DL_DX.value.name != "") {
        eiBlock.pushData(
            {
                BUNKER_NO: LN_LC,
                BUNKER_NO1: DL_DX.value.name,
                STOCK_WT: box_wt.value,
                //====新增====
                BUNKER_GROSS_WT: box_wt.value,
                BUNKER_DEDUCT_WT: box_deduct_wt.value,
            },
            true
            );
    }

    if (DL_HC.value.name != "") {
        eiBlock.pushData(
            {
                BUNKER_NO: LN_LC,
                BUNKER_NO1: DL_HC.value.name,
                STOCK_WT: box_wt.value,
                //====新增====
                BUNKER_GROSS_WT: box_wt.value,
                BUNKER_DEDUCT_WT: box_deduct_wt.value,
            },
            true
            );
    }

    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView3"),
        "Tables1"
        );

      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "上料重量" + box_wt.value + "是否确认上料"
        );
    if (!mes_res) {
    } else {
        const inInfo2 = new EI.EIInfo();
        inInfo2.addBlock(erFormHelper.getGridSelectRowsAsBlock("gridView1"));
        const inInfo3 = new EI.EIInfo();
        inInfo3.addBlock(erFormHelper.getGridSelectRowsAsBlock("gridView3"));
        console.log("1206", inInfo);
        const outInfo = await erFormHelper.callService(
            "mmsm831_upd2",
            inInfo,
            true,
            false,
            true
            );
        if (outInfo.sys.status < 0) {
            erFormHelper.messageError(outInfo.sys.msg);
        }
        if (DL_LC.value.name != "") {
            DL_Change();
        }
        if (DL_DX.value.name != "") {
            DL_Change1();
        }
        if (DL_HC.value.name != "") {
            DL_Change2();
        }
        query_lc1();
        v_bunker_no = BUNKER_NO_QUE;
        console.log("v_bunker_no666", v_bunker_no);
        // nextTick(()=>{
        //   erFormHelper.setGridIndicator('gridView5',{BUNKER_NO:v_bunker_no});
        // });
        nextTick(() => {
            nextTick(() => {
                querylc();
                erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
            });
        });
      }
};

    const grid3rowselected = async(e: any) => {
    // for (let item1 of erFormHelper.getGridSelectRows("gridView3")) {
    //   if (item1.STOCK_WT === "0" || item1.STOCK_WT === 0) {
    //     erFormHelper.messageWarning(
    //       item1.WEIGH_NO + "计量单号为0，不能进行移库操作！"
    //     );
    //     return false;
    //   }
    // }

    console.log("行选择变化");
    if (erFormHelper.getGridCheckedRows(gridView3).length === 0) {
        // wt.value = 0;
        MMSM835.value.STOCK_WT = 0;
    } else {
        MMSM835.value.STOCK_WT = 0;
        for (let item1 of erFormHelper.getGridSelectRows("gridView3")) {
            MMSM835.value.STOCK_WT = MMSM835.value.STOCK_WT + item1.STOCK_WT;
            console.log("3636", MMSM835.value.STOCK_WT);

        }
    }
    erFormHelper.setControlValue('LayoutGroupFilter3', 'STOCK_WT', MMSM835.value.STOCK_WT);
    // wt.value = MMSM86.value.STOCK_WT;

};
    // 画面相关数据初始化
    const initializePage = async() => {
      const initialResult = await erFormHelper.Initialize(
        efFormInfo.value.formPartition,
        "MMSM835S2N",
        "",
        "mmsm_form_get"
        );
    if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
            nextTick(() => {
                if (str) {
                    querylc();
                }
            });
        });
        nextTick(() => {
            // 获取画面上的主要控件信息
            queryLCdata_G();
            queryLCdata_D();
            // GL_Change();
            // DL_Change();
            querylc();
            nextTick(() => {
                erFormHelper.addModelToLayout("LayoutGroupFilter2", true, true);
                erFormHelper.addModelToLayout("LayoutGroupFilter3", true, true);
                erFormHelper.addModelToLayout("LayoutGroupFilter4", true, true);
            });
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

    //刷新低位料仓的值及图
    const query_lc1 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
    eiBlock.pushData(
        {
            BUNKER_NO: BUNKER_NO_QUE,
        },
        true
        );
    inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }

    EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        MX_LC_G.value.length = 0;
        MX_LC_G.value.push(
            res.getBlock(0).data[i]["BUNKER_NO"],
            res.getBlock(0).data[i]["MAT_CODE"],
            res.getBlock(0).data[i]["MAT_NAME"],
            res.getBlock(0).data[i]["STOCK_WT"],
            res.getBlock(0).data[i]["MAT_TYPE"]
            );
    }
        }
      );
    };

    //获取料仓信息
    const query_lc0 = async() => {
      const inInfo = new EI.EIInfo();
    inInfo.addBlock(erFormHelper.getGridSelectRowsAsBlock("gridView5"));
    LN_LC = inInfo.getBlock(0).data[0]["BUNKER_NO"];

      const outInfo = await erFormHelper.callService(
        "mmsm85_inq",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }

    EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
        (res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
        MX_LC_G.value.length = 0;
        MX_LC_G.value.push(
            res.getBlock(0).data[i]["BUNKER_NO"],
            res.getBlock(0).data[i]["MAT_CODE"],
            res.getBlock(0).data[i]["BUNKER_NAME"],
            res.getBlock(0).data[i]["STOCK_WT"],
            res.getBlock(0).data[i]["MAT_TYPE"]
            );
        BUNKER_NO_QUE = res.getBlock(0).data[i]["BUNKER_NO"];
    }
        }
      );
    };

    const query_lc = async() => {
      const inInfo = new EI.EIInfo();
    inInfo.addBlock(erFormHelper.getGridSelectRowsAsBlock("gridView5"));
    LN_LC = inInfo.getBlock(0).data[0]["BUNKER_NO"];
      const mes_res = await erFormHelper.messageConfirm(
        "选择其他料蓝会清空其他料蓝信息,是否确认？"
        );
    if (!mes_res) {
    } else {
        const outInfo = await erFormHelper.callService(
            "mmsm85_inq",
            inInfo,
            true,
            false,
            true
            );
        if (outInfo.sys.status >= 0) {
            // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
            erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        } else {
            erFormHelper.messageError(outInfo.sys.msg);
            return false;
        }

        EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
            (res: EI.EIInfo) => {
            for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_G.value.length = 0;
            MX_LC_G.value.push(
                res.getBlock(0).data[i]["BUNKER_NO"],
                res.getBlock(0).data[i]["MAT_CODE"],
                res.getBlock(0).data[i]["BUNKER_NAME"],
                res.getBlock(0).data[i]["STOCK_WT"],
                res.getBlock(0).data[i]["MAT_TYPE"]
                );
            BUNKER_NO_QUE = res.getBlock(0).data[i]["BUNKER_NO"];
        }
          }
        );
      }
    };
    const update2 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
    eiBlock.pushData(
        {
            BUNKER_NO: BUNKER_NO_QUE,
        },
        true
        );
    inInfo.addBlock(eiBlock, "MMSM835S2N");
    v_bunker_no = inInfo.getBlock("MMSM835S2N").data[0]["BUNKER_NO"];

      const outInfo1 = await erFormHelper.callService(
        "mmsm2a_snd",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo1.sys.status < 0) {
        erFormHelper.messageError(outInfo1.sys.msg);
    } else {
        const outInfo = await erFormHelper.callService(
            "mmsm60lc1_upd",
            inInfo,
            true,
            false,
            true
            );
        if (outInfo.sys.status < 0) {
            erFormHelper.messageError(outInfo.sys.msg);
            return false;
            // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
            // erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, 'gridView4');

            //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        } else {
            querylc();
            nextTick(() => {
                erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
            });
        }
      }
    };
  const update11 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
    eiBlock.pushData(
        {
            BUNKER_NO: BUNKER_NO_QUE,
        },
        true
        );
    inInfo.addBlock(eiBlock, "MMSM835S2N");
    v_bunker_no = inInfo.getBlock("MMSM835S2N").data[0]["BUNKER_NO"];

      const outInfo1 = await erFormHelper.callService(
        "mmsm2a_sndn",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo1.sys.status < 0) {
        erFormHelper.messageError(outInfo1.sys.msg);
    } else {

        querylc();
        nextTick(() => {
            erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
        });
    }
      
    };
    const update3 = async() => {
      const inInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
    eiBlock.pushData(
        {
            BUNKER_NO: BUNKER_NO_QUE,
        },
        true
        );
    inInfo.addBlock(eiBlock, "MMSM835S2N");
    v_bunker_no = inInfo.getBlock("MMSM835S2N").data[0]["BUNKER_NO"];
      const outInfo = await erFormHelper.callService(
        "mmsm82bd1_upd",
        inInfo,
        true,
        false,
        true
        );
    if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        // erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
    } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
    }
    // }

    querylc();
    nextTick(() => {
        erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
    });
    };

    const update4 = async() => {
      const inInfo = new EI.EIInfo();
    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView5"),
        "MMSM835S2N"
        );
    console.log("BUNKER_NO123", BUNKER_NO_QUE);
      const data = {
        BUNKER_NO: BUNKER_NO_QUE,
        BUNKER_NO_ORIGINAL: "",
    };
    if (inInfo.getBlock(0).data[0]["BACK_C3"] === "1") {
        erFormHelper.messageError("炉前状态不允许卸装料槽/料篮");
    } else {
        v_bunker_no = BUNKER_NO_QUE;
        console.log("BUNKER_NO221", v_bunker_no);
        dialogFormName.value = "MMSM82POPS2N"; // 读配置表获取画面名
        dialogVisible.value = true;
        parentInfo.value = data;
        openXrEfDialog();
    }
    };

    const update5 = async() => {
      const inInfo = new EI.EIInfo();
    inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView5"),
        "MMSM835S2N"
        );
    console.log("BUNKER_NO123", BUNKER_NO_QUE);
      const data = {
        BUNKER_NO: BUNKER_NO_QUE,
        BUNKER_NO_ORIGINAL: "1",
    };
    v_bunker_no = BUNKER_NO_QUE;
    console.log("BUNKER_NO221", v_bunker_no);
    dialogFormName.value = "MMSM82POPS2N"; // 读配置表获取画面名
    dialogVisible.value = true;
    parentInfo.value = data;
    openXrEfDialog();
    };

    const update6 = async() => {
    if (BUNKER_NO_QUE === "EL10") {
        const inInfo = new EI.EIInfo();
        inInfo.addBlock(
            erFormHelper.getGridSelectRowsAsBlock("gridView5"),
            "MMSM835S2N"
            );
        console.log("BUNKER_NO123", BUNKER_NO_QUE);
        const data = {
            BUNKER_NO: BUNKER_NO_QUE,
            BUNKER_NO_ORIGINAL: "2",
        };
        v_bunker_no = BUNKER_NO_QUE;
        console.log("BUNKER_NO221", v_bunker_no);
        dialogFormName.value = "MMSM82POPS2N"; // 读配置表获取画面名
        dialogVisible.value = true;
        parentInfo.value = data;
        openXrEfDialog();
      } else {
        erFormHelper.messageError("F10卸装只允许卸装EL10料槽");
    }
};

    const startTimer = async() => {
    timer = setInterval(() => {
        querylc();
        query_lc0();
        erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
    }, 120000);
};

    const F2_DO = async(e: any) => {
    querylc();
    erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
    query_lc0();
};
    const F3_DO = async(e: any) => {
    query_lc();
};
    const F4_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否发送镍板库"
        );
    if (!mes_res) {
    } else {
        //发送
        const inInfo = new EI.EIInfo();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(
            {
                BUNKER_NO: BUNKER_NO_QUE,
            },
            true
            );
        inInfo.addBlock(eiBlock);
        v_bunker_no = BUNKER_NO_QUE;
        const outInfo = await erFormHelper.callService(
            "mmsm60lc_upd",
            inInfo,
            true,
            false,
            true
            );
        if (outInfo.sys.status >= 0) {
            // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
            // erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, 'gridView4');
            //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        } else {
            erFormHelper.messageError(outInfo.sys.msg);
            return false;
        }

        EIManager.callService(formPartition, "mmsm85_bunker_inq", inInfo).then(
            (res: EI.EIInfo) => {
            for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_G.value.length = 0;
            MX_LC_G.value.push(
                res.getBlock(0).data[i]["BUNKER_NO"],
                res.getBlock(0).data[i]["MAT_CODE"],
                res.getBlock(0).data[i]["BUNKER_NAME"],
                res.getBlock(0).data[i]["STOCK_WT"],
                res.getBlock(0).data[i]["MAT_TYPE"]
                );
            BUNKER_NO_QUE = res.getBlock(0).data[i]["BUNKER_NO"];
        }
          }
        );

    nextTick(() => {
        querylc();
        erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
    });
      }
    };
    const F5_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否发送料槽给L2"
        );
    if (!mes_res) {
    } else {
        update2();
    }
    };
   const F11_DO = async(e: any) => {
    if (LN_LC.substring(0, 1) == 'B')
      {
        const mes_res = await erFormHelper.messageConfirm(
            "料槽号" + LN_LC + "是否发送料槽给炉后废钢"
            );
        if (!mes_res) {
        } else {
            update11();
        }
      }
    else{
        const mes_res = await erFormHelper.messageConfirm(
            "料槽号" + LN_LC + "不是BOF废钢料槽，无法操作"
            );
        if (!mes_res) {
            return;
        } 
      }

};
    const F6_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否上传302"
        );
    if (!mes_res) {
    } else {
        update3();
    }
    };
    const F7_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否确认卸载料槽料篮"
        );
    if (!mes_res) {
    } else {
        update4();
    }
    };

    const F9_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否确认卸载料槽料篮"
        );
    if (!mes_res) {
    } else {
        update5();
    }
    };
    const F10_DO = async(e: any) => {
      const mes_res = await erFormHelper.messageConfirm(
        "料槽号" + LN_LC + "是否确认卸载料槽料篮"
        );
    if (!mes_res) {
    } else {
        update6();
    }
    };

    const F8_DO = async(e: any) => {
    EFCallForm("MMSM836S2N");
};

    const xrEfDialogClose = () => {
    // queryMainGrid();
    // dialogVisible.value = true;
    nextTick(() => {
        querylc();
        query_lc0();
        erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
    });
};

    const getChildInfo = (info: any) => {
    console.log("获取弹窗画面传递过来的信息", info);
    if (info.close) {
        console.log("xxxxxxxxxxxxxxxxxx");
        dialogVisible.value = false;
        xrEfDialogClose();
        console.log("yyyyyyyyyyyyyyyyyy");
      }

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
    eiBlock.pushData(
        {
            BUNKER_NO: GL_LC.value.name,
            BUNKER_NO_ORIGINAL: DL_LC.value.name,
            STOCK_WT: box_wt.value,
        },
        true
        );
};

    const openXrEfDialog = () => {
    dialogVisible.value = true;
};
    // 关闭弹框监听

    const dbbutClick = async() => {
    query_lc();
    querylc();
    erFormHelper.setGridIndicator("gridView5", { BUNKER_NO: LN_LC });
};

    return {
      xrEfDialogClose,
      getChildInfo,
      erFormHelper,
      dialogVisible,
      initializeFlag,
      dialogFormName,
      parentInfo,
      openXrEfDialog,
      grid3rowselected,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F8_DO,
      F9_DO,
      F10_DO,
      F11_DO,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridView5,
      gridToolbar,
      butClick,
      bunker_g,
      bunker_d,
      bunker_h,
      bunker_f,
      GL_Change,
      DL_Change,
      DL_Change1,
      DL_Change2,
      efFormReady,
      GridView1FocusChanged,
      GridView3FocusChanged,
      GridView5FocusChanged,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      oncontextmenu_s,
      GL_LC,
      DL_LC,
      DL_DX,
      DL_HC,
      MX_LC_G,
      box_wt,
      box_deduct_wt, //新增
      MX_LC_D,
      dbbutClick,
};
  },
});
