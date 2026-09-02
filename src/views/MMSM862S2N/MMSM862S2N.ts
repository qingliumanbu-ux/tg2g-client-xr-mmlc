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
import MMSMUPD862V from "../MMSMUPD862V/MMSMUPD862V.vue";

export default defineComponent({
  name: "MMSM862S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
    MMSMUPD862V,
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
    const formName = "MMSM862V";
    const initializeFlag = ref(0);
    const editable = ref(false);
    let gridView1!: any;
    let gridView2!: any;
    
    let bunker_DW:any;
    const dialogVisible = ref(false);
    const dialogFormName = ref(""); // 弹出画面的画面名
    const parentInfo = ref({});
    let do_flag: string;
    const MMSM85 = ref({
      STOCK_WT: 0,
    });

    do_flag = "0";
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

    //查询计量单信息和退货订单信息(根据条件同时查询)
    const queryGridView1 = async () => {
      const eiInfo = new EI.EIInfo();
      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("layoutControlGroup2");

      eiInfo.addBlock(queryCondition);
      console.log("LXX1", eiInfo);
      //console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService(
        "mmsm862v_inq",
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
        //console.log('outInfo', outInfo);
        //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'GridView1');
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      }
    };

    // 主表1焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      if(do_flag!="1")
      {
        erFormHelper.checkGridCurrentRow("gridView1");
      
        if (!e.data) {
          erFormHelper.clearGridData(gridView2); // 清空子表数据

          return;
        }
        if (e && e.rowChanged) {
          if (e.data) {
            // erFormHelper.clearGridData(gridView2); // 清空子表数据
            queryDetailInfo({
              BUNKER_NO: e.data.get("BUNKER_NO"),
            });
            MMSM85.value.STOCK_WT = e.data.get("STOCK_WT");
          }
        }
      }
    };

    const GridView2FocusChanged = async (e: any) => {
      // erFormHelper.checkGridCurrentRow("gridView2");
      // if (!e.data) {
      //   // erFormHelper.clearGridData(gridView2); // 清空子表数据
      //   erFormHelper.clearLayoutOrGridData("layoutControlGroup1"); // 清空子表数据

      //   return;
      // }
      // if (e && e.rowChanged) {
      //   if (e.data) {
      //     const inInfo = new EI.EIInfo();
      //     inInfo.addBlock(erFormHelper.getGridSelectRowsAsBlock('gridView2'));  
      //     if(inInfo.getBlock(0).data.length>0){
      //       console.log('12332111111');
            
      //       erFormHelper.setControlValue('layoutControlGroup1', 'WEIGH_NO', inInfo.getBlock(0).data[0]["WEIGH_NO"]);
      //       erFormHelper.setControlValue('layoutControlGroup1', 'STOCK_WT_1', inInfo.getBlock(0).data[0]["STOCK_WT"]);
      //       erFormHelper.setControlValue('layoutControlGroup1', 'STOCK_WT', inInfo.getBlock(0).data[0]["STOCK_WT"]);
          
      //     }
      //     // erFormHelper.setControlValueEx('layoutControlGroup1',inInfo.getBlock(0).data[0]);
       
      //     // erFormHelper.setControlValueEx("layoutControlGroup1",inInfo.getBlock(0).data[0]);
      //     // erFormHelper.mergeEiBlockToGrid(inInfo.getBlock(0), "layoutControlGroup1");
      //     console.log('123321',inInfo);
      //   }
      // }
    };
    const grid2rowselected = async (e: any) => {

     
        // erFormHelper.clearGridData(gridView2); // 清空子表数据
        erFormHelper.clearLayoutOrGridData("layoutControlGroup1"); // 清空子表数据

     
      
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(erFormHelper.getGridSelectRowsAsBlock('gridView2'));  
          if(inInfo.getBlock(0).data.length>0){
            console.log('12332111111');
            
            erFormHelper.setControlValue('layoutControlGroup1', 'WEIGH_NO', inInfo.getBlock(0).data[0]["WEIGH_NO"]);
            erFormHelper.setControlValue('layoutControlGroup1', 'STOCK_WT_1', inInfo.getBlock(0).data[0]["STOCK_WT"]);
            erFormHelper.setControlValue('layoutControlGroup1', 'STOCK_WT', inInfo.getBlock(0).data[0]["STOCK_WT"]);
          
          }
          // erFormHelper.setControlValueEx('layoutControlGroup1',inInfo.getBlock(0).data[0]);
       
          // erFormHelper.setControlValueEx("layoutControlGroup1",inInfo.getBlock(0).data[0]);
          // erFormHelper.mergeEiBlockToGrid(inInfo.getBlock(0), "layoutControlGroup1");
          console.log('123321',inInfo);
      
    };

    // 查询子表1明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService(
        "mmsm861v_inq1",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView2);
        // erFormHelper.setControlValue('STOCK_WT', 'STOCK_WT', outInfo1.getBlock(0));
        // console.log('STOCK_WT', 1);
       
      }
    };

    //刷新按钮
    const querySX = async () => {
      queryGridView1();
    };

    const F4_DO = async (e: any) => {

      // console.log("行",erFormHelper.getGridCheckedRows(gridView2).length);
      if (erFormHelper.getGridCheckedRows(gridView2).length === 0) {
        erFormHelper.messageWarning("请选择右边记录的一条信息在进行修正");
      } else {
        const inInfo = new EI.EIInfo();
        // const mainGridCheckedRow = erFormHelper.getGridCheckedRows(
        //   gridView2,
        //   true
        // )[0];
        // openADDUDialog(mainGridCheckedRow);
        // 获取主表勾选行
        // console.log("mainGridCheckedRow", mainGridCheckedRow);

        const para1 = erFormHelper.getGridCheckedRowsAsBlock("gridView2");
        inInfo.addBlock(para1);

        const eiInfo = new EI.EIInfo();
        const eiBlock = eiInfo.addBlock(new EI.EiBlock());
        const layoutControlGroup1 = erFormHelper.getAllControlValue(
          "layoutControlGroup1"
        );
        const obj: any = {
          ...layoutControlGroup1,
          WEIGH_NO: inInfo.getBlock(0).data[0]["WEIGH_NO"],
          BUNKER_NO: inInfo.getBlock(0).data[0]["BUNKER_NO"],
          MAT_CODE: inInfo.getBlock(0).data[0]["MAT_CODE"],
          SEQ_NO:inInfo.getBlock(0).data[0]["SEQ_NO"],
        };
        console.log(layoutControlGroup1);
        eiBlock.pushData(obj, true);
        console.log("eiInfo11111", eiInfo);

        const outInfo = await erFormHelper.callService("mmsm862v_upd", eiInfo,true,false,true);
        // 判断调后台是否失败
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("保存错误:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("保存成功");
          queryGridView1();
          do_flag = "0";
          nextTick(()=>{
          
            const eiInfo1 = new EI.EIInfo();
          eiInfo1.addBlock(
          erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables0');
            erFormHelper.setGridIndicator(gridView1,{BUNKER_NO:eiInfo1.getBlock(0).data[0]["BUNKER_NO"]});
            // queryDetailInfo({
            //   BUNKER_NO: e.data.get(inInfo.getBlock(0).data[0]["BUNKER_NO"]),
            // });
          });
         

        }
      }
    };

    const openADDUDialog = (currentRow: any) => {
      const WEIGH_NO = currentRow.WEIGH_NO;
      const BUNKER_NO = currentRow.BUNKER_NO;
      const MAT_CODE = currentRow.MAT_CODE;
      const STOCK_WT = currentRow.STOCK_WT;
      const SEQ_NO = currentRow.SEQ_NO;
      bunker_DW= currentRow.BUNKER_NO;
      const data = {
        PROC_DIV: "U",
        WEIGH_NO: WEIGH_NO,
        BUNKER_NO: BUNKER_NO,
        MAT_CODE: MAT_CODE,
        STOCK_WT: STOCK_WT,
        SEQ_NO: SEQ_NO,
      };
      dialogFormName.value = "MMSMUPD862V"; // 读配置表获取画面名
      dialogVisible.value = true;
      parentInfo.value = data;
      // 打开新增弹出画面
      // openEfDialog(dialogFormName, data, {
      //   height: 800,
      //   width: 1200
      // });
      openXrEfDialog("U");
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => {
      queryGridView1();
      nextTick(()=>{
        erFormHelper.setGridIndicator(gridView1,{BUNKER_NO:bunker_DW});
      });
    };
    // 获取弹窗画面传递过来的数据 新增
    const getChildInfo = (info: any) => {
      if (info.close) {
        dialogVisible.value = false;
        xrEfDialogClose();
      }
    };

    const xrEfDialogRef = ref<any>(null);
    // 打开弹框事件
    // 点击按钮打开弹框
    const openXrEfDialog = (PROC_DIV: string) => {
      dialogVisible.value = true;
      proc_div = PROC_DIV;
    };
    const F2_DO = async (e: any) => {
      queryGridView1();
    };
    const F4_PRE_DO = async (e: any) => {
      do_flag = "1";
      //setToolbarVisible1(true);
      //设置编辑状态为可编辑
      // erFormHelper.setGridEditable("GridView1", true);
    };

    const F4_CANCEL = async (e: any) => {
      editable.value = false;
      do_flag = "0";
      //setToolbarVisible1(editable.value);
    
    };
    return {
      erFormHelper,
      initializeFlag,
      //InitialToolbar,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      GridView1FocusChanged,
      GridView2FocusChanged,
      grid2rowselected,
      F2_DO,
      F4_PRE_DO,
      F4_CANCEL,
      gridToolbar,
      MMSM85,
      dialogFormName,
      dialogVisible,
      xrEfDialogRef,
      xrEfDialogClose,
      openXrEfDialog,
      querySX,
      F4_DO,
      //handleEfDialogMessage,
      parentInfo,
      getChildInfo,
    };
  },
});
