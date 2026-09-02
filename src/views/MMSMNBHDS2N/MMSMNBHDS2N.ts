import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  toRaw,
  nextTick,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import xrEfDialog from "EFX/xrEfDialog";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import ErPopQuery from "ERX/ErPopQuery";
import { Popconfirm } from "ant-design-vue";
import { table } from "console";
import { EndOfLineState } from "typescript";
import MMSM50ADDS2N from "../MMSM50ADDS2N/MMSM50ADDS2N.vue";
import MMSM81ADDV from "../MMSM81ADDV/MMSM81ADDV.vue";
import MMSM81FG from "../MMSM81FG/MMSM81FG.vue";
import MMSM81518ADDV from "../MMSM81518ADDV/MMSM81518ADDV.vue";
export default defineComponent({
  name: "",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
    MMSM50ADDS2N,
    MMSM81FG,
    MMSM81518ADDV,
    MMSM81ADDV,
    xrEfDialog,
  },
  setup: () => {
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let formPartition: string;
    let formName: string;
    let PROGRAM_NAME: string;
    let flag: any;
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "";
    // 变量定义
    formName = "MMSMNBHDS2N";
    const dialogFormName = ref(""); // 弹出画面的画面名
    const dialogVisible = ref(false);

    const parentInfo = ref({});
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    const PURCHASEDOCID = ref("");
    const grid_view_2 = ref("GridView1");
    let formNamePara = ref("");
    let rateWidth = "";
    let rateHeight = "";

    //let popFreeEdit: ErPopFreeHelper;
    let cs_OkClick = "";
    let i_proc_div = "";
    let MAT_CODE: any;
    let SEQ_NO: any;
    const openXrEfDialog = () => {
      nextTick(() => {
        dialogVisible.value = true;
      });
    };
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition;
      // 初始化低代码工具类
      initializePage();
    };

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

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          // gridView1 = erFormHelper.getKendoGrid('GridView1');
          // erFormHelper.setGridEditable('GridView1', true);
        });
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

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("GridView1");
      erFormHelper.setGridToolbarVisible("GridView1", {
        addrow: false,
        copyrow: false,
        excel: true,
      });
    };
    // 自定义工具栏按钮功能
    // const InitialToolbar = () => {
    //   gridToolbar.value = erFormHelper.getGridToolbar([
    //     { name: 'excel', visible: true },
    //     { name: 'addrow', visible: false },
    //     { name: 'copyrow', visible: false },
    //     { name: 'delete', visible: false },
    //     { name: 'save', visible: false, caption: 'save', event: SaveMainGrid },
    //     { name: 'cancel', visible: false },
    //     // { name: 'print', visible: true, caption: '查询' },
    //     { name: 'import', visible: true, caption: 'imp' },
    //   ]);
    // };
    // 关闭弹框监听
    let LayoutGroupFilter_NO: string;
    const bunker_NO = reactive(new Array());
    const xrEfDialogClose = () => {
      // erFormHelper.setControlValue("LayoutGroupFilter", 'BUNKER_NO', 'A02');
      // erFormHelper.setControlValue("LayoutGroupFilter", "BUNKER_NO", bunker_NO);
      erFormHelper.setControlValue(
        "MMSM65_POP_LAYOUT",
        "BUNKER_NO",
        LayoutGroupFilter_NO
      );
    };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);
      bunker_NO.length = 0;
      if (info.close) {
        // info.
        dialogVisible.value = false; // 关闭弹框
        if (flag == "1") {
          popFreeAdd.setValue({ MAT_CODE: info.MAT_CODE });
          popFreeAdd.setValue({ MAT_CODE_NAME: info.MAT_NAME });
          popFreeAdd1.setValue({ MAT_CODE: info.MAT_CODE });
          popFreeAdd1.setValue({ MAT_CODE_NAME: info.MAT_NAME });
          flag = "";
        }
        bunker_NO.push(info.BUNKER_NO);
        xrEfDialogClose();
      }
      LayoutGroupFilter_NO =info.BUNKER_NO.toString();
      console.log("353535",LayoutGroupFilter_NO);
      popFreeAdd.setValue({ BUNKER_NO: info.BUNKER_NO });
    };
    const queryMainGrid = async () => {
      if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
        return false;
      }
      //清空grid数据
      erFormHelper.clearGridData(["GridView1"]);

      const inInfo = new EI.EIInfo();
      //获取查询条件dt
      const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

      inInfo.addBlock(Query);
      //let ss = inInfo.blocks.Table1.data[0].START_TIME;
      //let ss = inInfo.blocks.Table1;
      let ss = inInfo.getBlock(0).data[0]["START_TIME"];
      console.log(ss);
      const outInfo = await erFormHelper.callService(
        "mmsmnb01_inq",
        inInfo,
        true,
        false,
        true
      );
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);

        erFormHelper.setGridEditable("GridView1", false);
        // erFormHelper.messageInfo('SUCCESS');
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };

    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSMNB01POP",
      "MMSM65_POP_LAYOUT",
      ""
    );

    const popFreeAdd1 = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSMNB01POP1",
      "MMSM65_POP_LAYOUT",
      ""
    );

    const SaveMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      erFormHelper.getGridChangedRowsAsEiInfo(gridView1, eiInfo, "MMSM11CV");

      if (
        !eiInfo.contains("MMSM11CV_DELETE") &&
        !eiInfo.contains("MMSM11CV_MODIFY") &&
        !eiInfo.contains("MMSM11CV_ADD")
      ) {
        erFormHelper.messageInfo("没有变更记录需要保存");

        // erFormHelper.unCheckAllGridRow(gridView1);
        // setToolbarVisible("MMSM11ListGridview", false);
        // erFormHelper.setGridEditable("MMSM11ListGridview",false);
        return false;
      }

      const outInfo = await erFormHelper.callService(
        "mmsm11cv_iud",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("保存错误:" + outInfo.sys.msg);
        return false;
      } else {
        erFormHelper.messageSuccess("保存成功:" + outInfo.sys.msg);
        queryMainGrid();
      }
    };


    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    const F4_DO = async (e: any) => {
      if (erFormHelper.getGridCurrentRow("GridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再修改");
        return false;
      }

      for (let item1 of erFormHelper.getGridSelectRows("GridView1")) {
        if (item1.STATUS === "1" || item1.STATUS === "2") {
          erFormHelper.messageWarning(
            item1.PURCHASEDOCID + "该信息已经发送资源系统，不能修改！"
          );
          return false;
        }
      }

      //加载弹窗配置
      cs_OkClick = "F4";
      i_proc_div = "U";
      const selectedRows = erFormHelper.getGridCurrentRow("GridView1", false);
      console.log("F4", selectedRows);
      popFreeAdd1.ReceiveData(selectedRows);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd1, (e: any) => {
        if (popFreeAdd1.getEvent("ok")) {
          popFreeEditOkClick1(i_proc_div);
          // popFreeAdd1.ReceiveData({ a: "" });
          // popFreeAdd1.DataSet.clear("TMMSM65");
          console.log("1221", popFreeAdd1.DataSet);
        }
      });
    };

    const popFreeEditOkClick1 = async (a: any) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      let blockname = "";
      if (a == "I") blockname = "MMSM65_ADD";
      if (a == "U") blockname = "MMSM65_MODIFY";
      // if( a == 'I'){
      //   const inInfo2 = new EI.EIInfo();
      //   popFreeAdd1.ReceiveData(inInfo2);
      //   console.log('2322',inInfo2);
      //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel), blockname);
      // }
      // else{
      //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd.DataModel), blockname);
      // }
      // inInfo.addBlock(
      //   erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel),
      //   blockname
      // );

      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd1.DataModel),
        blockname
      );

      console.log("22222", inInfo);
      outInfo = await erFormHelper.callService(
        "mmsmnb01_pro",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      }
      // if(popFreeAdd1.getEvent('ok'))
      popFreeAdd1.CloseDialog();
      queryMainGrid();

    //  {
    //       console.log("1");
    //       popFreeAdd1.CloseDialog();
    //       console.log("2");
    //       queryMainGrid();
    //       console.log("3");
    //   }
    };

    const popFreeEditOkClick = async (a: any) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      let blockname = "";
      if (a == "I") blockname = "MMSM65_ADD";
      if (a == "U") blockname = "MMSM65_MODIFY";
      // if( a == 'I'){
      //   const inInfo2 = new EI.EIInfo();
      //   popFreeAdd.ReceiveData(inInfo2);
      //   console.log('2322',inInfo2);
      //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd.DataModel), blockname);
      // }
      // else{
      //   inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd.DataModel), blockname);
      // }
      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel),
        blockname
      );

      console.log("22222", inInfo);
      outInfo = await erFormHelper.callService(
        "mmsmnb01_pro",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      }
      // if(popFreeAdd.getEvent('ok'))
      popFreeAdd.CloseDialog();
      queryMainGrid();

    };

    const F3_DO = async (e: any) => {
      cs_OkClick = "F3";
      i_proc_div = "I";
      const inInfo1 = new EI.EIInfo();
      const inInfo = new EI.EIInfo();
      const eiBlock = new EI.EiBlock();
      const selectedRows = erFormHelper.getGridCurrentRow("GridView1", false);

      console.log("1221", selectedRows);

      

      // popFreeAdd.ReceiveData(eiBlock);
      // popFreeAdd.Initialize(formPartition, 'MMSM65POP', '','')
      // popFreeAdd.ReceiveData({a:''});
      // popFreeAdd.DataSet.clear("TMMSM65");

      // popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
      //   if (a.itemCode === "BOTTON_MAT_CODE") {
      //     const data = {};
      //     console.log("SWWWWWW111", data);
      //     dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名
      //     parentInfo.value = data;
      //     flag = "1";
      //     openXrEfDialog();
      //   }
      // });

      // popFreeAdd.setEvent("itemValueChanged", async (a: any) => {
      //   if (a.itemCode === "DG_UNIT_CODE") {
      //     if (a.value === "6000") {
      //       popFreeAdd.FormHelper.setControlReadOnly(
      //         "MMSM65_POP_LAYOUT",
      //         true,
      //         "LOAD_CODE"
      //       );
      //       popFreeAdd.setValue({ LOAD_CODE: " " });
      //       popFreeAdd.FormHelper.setLayoutItemContentBackColor(
      //         "MMSM65_POP_LAYOUT",
      //         "LOAD_CODE",
      //         "rgb(213 213 213)"
      //       );
      //     } else {
      //       popFreeAdd.FormHelper.setControlReadOnly(
      //         "MMSM65_POP_LAYOUT",
      //         a.value == "07",
      //         "LOAD_CODE"
      //       );
      //       popFreeAdd.FormHelper.setLayoutItemContentBackColor(
      //         "MMSM65_POP_LAYOUT",
      //         "LOAD_CODE",
      //         "rgb(255 255 255)"
      //       );
      //     }
      //   }
      // });

      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
        let S_FLAG: string;
        if (popFreeAdd.getEvent("ok")) {
          // const inInfo = new EI.EIInfo();
          // inInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd.DataModel));

          popFreeEditOkClick(i_proc_div);
          popFreeAdd.FormHelper.resetLayout("MMSM65_POP_LAYOUT");
          // popFreeAdd.setValue({a:''});
          // popFreeAdd.ReceiveData({a:''});
          // popFreeAdd.DataSet.clear("TMMSM65");
          // console.log("1221",popFreeAdd.DataSet);
          S_FLAG = "1";
        }
        // if(S_FLAG==="1")
        // {
        //   const selectedRows = erFormHelper.getGridCurrentRow("gridView2", false);
        //   popFreeAdd.ReceiveData(selectedRows);

        // }
      });
      popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
        
        if ((a.itemCode === "DJ1")) {
          
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
      );
      console.log("SWWWWWW111", inInfo.getBlock(0).data[0]["MAT_CODE"]);
      if(inInfo.getBlock(0).data[0]["MAT_CODE"]===""){
        erFormHelper.messageWarning(
           "选中料仓需要先填写物料代码！！！"
        );
        return false;
      }
          const data1 = {
            MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
            // WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
            // STOCK_WT: inInfo.getBlock(0).data[0]["STOCK_WT"],
            FORMNAME: "MMSM512S2N",
            rateWidth: "10",
            rateHeight: "50",
          };
          console.log("2122", data1);
          formNamePara.value = "MMSM512S2N";
          dialogFormName.value = "MMSM81ADDVS2N";
          parentInfo.value = data1;
          openXrEfDialog();
        
        }
        if ((a.itemCode == "DJ2")) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
          );
          // const selectedRows_BLOCK =
          // erFormHelper.getGridCurrentRowAsBlock("gridView1");

          if(inInfo.getBlock(0).data[0]["MAT_CODE"]===""){
            erFormHelper.messageWarning(
               "选中料仓需要先填写物料代码！！！"
            );
            return false;
          }
        const data2 = {
          MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
          WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
          STOCK_WT: inInfo.getBlock(0).data[0]["STOCK_WT"],
          FORMNAME: "MMSM513S2N",
          rateWidth: "4.5",
          rateHeight: "33.5",
        };
        formNamePara.value = "MMSM513S2N";
        dialogFormName.value = "MMSM81ADDVS2N";
        parentInfo.value = data2;
        openXrEfDialog();
        }
        if ((a.itemCode == "DJ3")) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
          );
          // const selectedRows_BLOCK =
          // erFormHelper.getGridCurrentRowAsBlock("gridView1");

          if(inInfo.getBlock(0).data[0]["MAT_CODE"]===""){
            erFormHelper.messageWarning(
               "选中料仓需要先填写物料代码！！！"
            );
            return false;
          }
        const data3 = {
          MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
          WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
          STOCK_WT: inInfo.getBlock(0).data[0]["STOCK_WT"],
          FORMNAME: "MMSM515S2N",
          rateWidth: "10",
          rateHeight: "33.5",
        };
        formNamePara.value = "MMSM515S2N";
        dialogFormName.value = "MMSM81ADDVS2N";
        parentInfo.value = data3;
        openXrEfDialog();
        }
        if ((a.itemCode == "DJ4")) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
          );
          // const selectedRows_BLOCK =
          // erFormHelper.getGridCurrentRowAsBlock("gridView1");

          if(inInfo.getBlock(0).data[0]["MAT_CODE"]===""){
            erFormHelper.messageWarning(
               "选中料仓需要先填写物料代码！！！"
            );
            return false;
          }
        const data4 = {
          MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
          WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
          STOCK_WT: inInfo.getBlock(0).data[0]["STOCK_WT"],
          FORMNAME: "MMSM81FG",
          rateWidth: "10",
          rateHeight: "33.5",
        };
        formNamePara.value = "MMSM81518ADDV";
        dialogFormName.value = "MMSM81FG";
        parentInfo.value = data4;
        openXrEfDialog();
        }
        if ((a.itemCode == "DJ5")) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
          );
          // const selectedRows_BLOCK =
          // erFormHelper.getGridCurrentRowAsBlock("gridView1");

          if(inInfo.getBlock(0).data[0]["MAT_CODE"]===""){
            erFormHelper.messageWarning(
               "选中料仓需要先填写物料代码！！！"
            );
            return false;
          }
        const data5 = {
          MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
          WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
          STOCK_WT: inInfo.getBlock(0).data[0]["STOCK_WT"],
          FORMNAME: "MMSM511S2N",
          rateWidth: "5.5",
          rateHeight: "33.5",
        };
        formNamePara.value = "MMSM511S2N";
        dialogFormName.value = "MMSM81ADDVS2N";
        parentInfo.value = data5;
        openXrEfDialog();
        }
        if ((a.itemCode == "DJ6")) {
          
          const mes_res = await erFormHelper.messageConfirm(
            "所有其他原材料都存放在编号为GEN的虚拟库存中"
          );
          if (!mes_res) {
            return;
          } else {
            erFormHelper.setControlValue("LayoutGroupFilter", "BUNKER_NO", "GEN");
          }
        }
      })
      // erFormHelper.setGridIndicator('GridView1',{MAT_CODE:'',SEQ_NO:''});
    };

    const F5_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("GridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再删除");
        return false;
      }

      const alldata = erFormHelper.getGridSelectRows("GridView1");

      // for (let i = 0; i < alldata.length; i++)
      // {
      //   const currdata = alldata[i];
      //   if (currdata.PURCHASEDOCID == '21PS6240202312070031')
      //   {
      //     erFormHelper.messageWarning(currdata.PURCHASEDOCID.trim().substr(0,6)+'THIS IS A TEST');
      //     return false;
      //       }

      // }

      for (let item1 of erFormHelper.getGridSelectRows("GridView1")) {
        if (item1.STATUS === "1" || item1.STATUS === "2") {
          erFormHelper.messageWarning(
            item1.PURCHASEDOCID + "该信息已经发送资源系统，不能删除！"
          );
          return false;
        }
      }

      const mes_res = await erFormHelper.messageConfirm(
        "选中的记录将被永久删除， 是否继续？"
      );
      if (!mes_res) {
        return false;
      }

      // let inblock = erFormHelper.getGridSelectRowsAsBlock('gridView1');

      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1"),
        "MMSM65_DELETE"
      );
      const outInfo = await erFormHelper.callService(
        "mmsmnb01_pro",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        queryMainGrid();
      }
    };
    const F7_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("GridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再操作");
        return false;
      }

      const alldata = erFormHelper.getGridSelectRows("GridView1");

      for (let item1 of erFormHelper.getGridSelectRows("GridView1")) {
        if (item1.PURCHASEDOCID === "" || item1.PURCHASEDOCID === " ") {
          erFormHelper.messageWarning("发送资源需先生成要料单号");
          return false;
        }
        if (item1.STATUS === "1" || item1.STATUS === "2") {
          erFormHelper.messageWarning(
            item1.PURCHASEDOCID + "该信息已经发送资源系统！"
          );
          return false;
        }
      }

      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1", { DEAL_FLAG: "I" }),
        "MMSM65_SND"
      );
      const outInfo = await erFormHelper.callService(
        "mmsmnb01_snd",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        erFormHelper.messageSuccess("发送成功");
        // erFormHelper.mergeDataToGrid();
        queryMainGrid();
        // console.log('111111');
        console.log("0613", outInfo);
        for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
          erFormHelper.setGridFocusedCell(gridView1, i);
          erFormHelper.checkGridCurrentRow("GridView1");
          erFormHelper.setGridIndicator("GridView1", {
            PURCHASEDOCID: outInfo
              .getBlock(0)
              .data[i]["PURCHASEDOCID"]?.toString(),
          });
        }
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        erFormHelper;
      }
    };
    const F7_PRE_DO = async (e: any) => {
      for (let item of erFormHelper.getGridAllRows("GridView1")) {
        if (item.PURCHASEDOCID.search("121PS6240202312") >= 0) {
          erFormHelper.checkGridRow("GridView1", item);
          // break;
        }
      }
    };
    const F7_CANCEL = async (e: any) => {
      erFormHelper.unCheckAllGridRow(gridView1);
    };
    const F8_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("GridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再操作");
        return false;
      }

      const alldata = erFormHelper.getGridSelectRows("GridView1");

      for (let item1 of erFormHelper.getGridSelectRows("GridView1")) {
        if (item1.STATUS === "0" || item1.STATUS === "") {
          erFormHelper.messageWarning(
            item1.PURCHASEDOCID + "该信息没有发送，不需要撤消！"
          );
          return false;
        }
        if (item1.STATUS === "2") {
          erFormHelper.messageWarning(item1.PURCHASEDOCID + "该信息已经撤消！");
          return false;
        }
      }

      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1", { DEAL_FLAG: "D" }),
        "MMSM65_SND"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm65_snd",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        erFormHelper.messageSuccess("撤消成功");
      }
      queryMainGrid();
    };
    const F8_PRE_DO = async (e: any) => {};
    const F8_CANCEL = async (e: any) => {
      erFormHelper.unCheckAllGridRow(gridView1);
    };

    const F6_DO = async (e: any) => {
      updPURCHASEDOCID();
    };

    const focusChange = (e: any) => {
      if (e && e.data) {
        //   erFormHelper.setGridIndicator('GridView1', {
        // PURCHASEDOCID: PURCHASEDOCID.value});
        // gridView1 = erFormHelper.getGridCurrentRow(grid_view_2.value);

        // erFormHelper.checkGridRow('GridView1', gridView1,true);
        // erFormHelper.checkAllGridRow("GridView1");
        erFormHelper.checkGridCurrentRow("GridView1");
      }
    };

    const LayoutGroupFilterQueryClick = (e: any) => {
      queryMainGrid();
    };

    const updPURCHASEDOCID = async () => {
      const inInfo = new EI.EIInfo();
      if (erFormHelper.getGridSelectRows("GridView1").length === 0) {
        erFormHelper.messageWarning("请选择一条信息再生成计量单号");
        return false;
      }

      const alldata = erFormHelper.getGridSelectRows("GridView1");

      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("GridView1", { DEAL_FLAG: "U" }),
        "MMSM65_SQH"
      );

      //获取查询条件dt
      const Query =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");

      inInfo.addBlock(Query);
      // const outInfo = await erFormHelper.callService(i_service_f2, inInfo, false, true);

      const outInfo = await erFormHelper.callService(
        "mmsm65_pro",
        inInfo,
        true,
        false,
        true
      );

      if (outInfo.sys.status >= 0) {
        // erFormHelper.getGridServerPageData('gridView1');
        erFormHelper.messageSuccess("要料单号生成成功");
        // erFormHelper.mergeDataToGrid();
        queryMainGrid();
        // console.log('111111');getGridSelectRows  FullrowSelect CurrentRow
        // gridView1.FullrowSelect

        PURCHASEDOCID.value = <string>(
          outInfo.getBlock(0).data[0]["PURCHASEDOCID"]
        );

        for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
          erFormHelper.setGridFocusedCell(gridView1, i);
          erFormHelper.checkGridCurrentRow("GridView1");
          erFormHelper.setGridIndicator("GridView1", {
            PURCHASEDOCID: outInfo
              .getBlock(0)
              .data[i]["PURCHASEDOCID"]?.toString(),
          });
        }

        // gridView1 = erFormHelper.getGridCurrentRow(grid_view_2.value);

        erFormHelper.checkGridCurrentRow("GridView1");
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        erFormHelper;
      }
    };

    const layout4_click = async (e: any) => {
      let currentDate = "";
      currentDate = getGurrentTime(); // 创建一个新的Date对象表示当前日期和时间
      console.log("时间", currentDate);
      // erFormHelper.setAllControlDefalutValue("","","");
      // erFormHelper.setControlValue("LayoutGroupFilter", "APTIME", currentDate);

      // updPURCHASEDOCID();
    };

    const getGurrentTime = () => {
      var day = new Date();
      let seconds = day.getSeconds();
      let strSeconds = " ";
      if (seconds < 10) {
        // 如果月份值小于10，则在前面加上0
        strSeconds = "0" + seconds.toString();
      } else {
        strSeconds = seconds.toString();
      }
      let minutes = day.getMinutes();
      let strMinutes = " ";
      if (minutes < 10) {
        strMinutes = "0" + minutes.toString();
      } else {
        strMinutes = minutes.toString();
      }
      let hours = day.getHours();
      let strHours = " ";
      if (hours < 10) {
        strHours = "0" + hours.toString();
      } else {
        strHours = hours.toString();
      }
      let month = day.getMonth() + 1;
      let strMonth = " ";
      if (month < 10) {
        strMonth = "0" + month.toString();
      } else {
        strMonth = month.toString();
      }
      let time =
        day.getFullYear().toString() +
        strMonth +
        day.getDate().toString() +
        strHours +
        strMinutes +
        strSeconds;
      return time;
    };

    return {
      erFormHelper,
      initializeFlag,
      erGrid1Ready,
      focusChange,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F7_PRE_DO,
      F7_CANCEL,
      formNamePara,
      F8_DO,
      F8_PRE_DO,
      F8_CANCEL,
      LayoutGroupFilterQueryClick,
      gridView1,
      efFormReady,
      getChildInfo,
      xrEfDialogClose,
      dialogFormName,
      parentInfo,
      dialogVisible,
      layout4_click,
      updPURCHASEDOCID,
    };
  },
});
