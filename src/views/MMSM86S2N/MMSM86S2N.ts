import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick } from 'vue';
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";

export default defineComponent({
  name: 'MMSM86S2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 变量定义
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let i_form_ename = ""; // 低代码配置画面布局名
    let formPartition: string;
    let formName: "";
    let PROGRAM_NAME: string;
    let LayoutGroupFilter = 'LayoutGroupFilter';
    let LayoutGroupFilter1 = 'LayoutGroupFilter1';
    let LayoutGroupFilter2 = 'LayoutGroupFilter2';
    let LayoutGroupFilter3 = 'LayoutGroupFilter3';
    const gridView_line1 = ref('gridView1');
    const gridView_line2 = ref('gridView2');
    const gridView_line3 = ref('gridView3');

    let gridView1!: any;
    let gridView2!: any;
    let gridView3!: any;
    let gridView4!: any;

    //定位使用
    let v_bunker_no:any;
    let v_mat_code:any;
    let v_weigh_no:any;
    let v_seq_no:any;
   
    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
    efFormInfo.value = e.formInfo;
    efFormIsReady.value = true;
    formPartition = efFormInfo.value.formPartition; // 分区
    formName = efFormInfo.value.formName; // 当前画面名
    console.log('efFormInfo', formName);
    if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams["PROGRAM_NAME"];
      }
      initializePage();
    };

    // 变量定义
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const initializeService = '';

      // 自定义工具栏按钮功能
      const InitialToolbar = () => {       
      }
    

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        i_form_ename,
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
       //初始化工具栏
       InitialToolbar();
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          nextTick(() => {
            erFormHelper.addModelToLayout("LayoutGroupFilter2",true,false);
            
            erFormHelper.setAllControlReadOnly("LayoutGroupFilter2", true);
           
           
          });
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };

    onMounted(() => {
    });
     //grid实例
     const erGrid1Ready = () => {
      erFormHelper.setGridEditable('gridView1', false); // 设置grid不可编辑
        erFormHelper.setGridToolbarVisible(gridView_line1.value, {
          addrow: false,
          copyrow: false,
          excel: true
        });
      };

      const erGrid2Ready = () => {
        erFormHelper.setGridEditable('gridView2', false); // 设置grid不可编辑
        erFormHelper.setGridToolbarVisible(gridView_line2.value, {
          addrow: false,
          copyrow: false,
          excel: true
        });
      };
      const erGrid3Ready = () => {
        erFormHelper.setGridEditable('gridView3', false); // 设置grid不可编辑
        erFormHelper.setGridToolbarVisible(gridView_line3.value, {
          addrow: false,
          copyrow: false,
          excel: true
        });
      };
   
//查询物料信息
const getSubGridLine = async () => {
  if (!erFormHelper.checkRequiredInput("LayoutGroupFilter")) {
    return false;
  }
  //清空grid数据
  erFormHelper.clearGridData(["gridView1"]);
  const inInfo = new EI.EIInfo();
  //获取查询条件dt
  const Query =
    erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");   
    Query.addColumn("TYPE_CODE");
    Query.data[0]["TYPE_CODE"] = "1";
  inInfo.addBlock(Query);
  const outInfo = await erFormHelper.callService(
    "mmsm84v_inq",
    inInfo,
    true,
    false,
    true
  );
  //console.log("xxxxxxxxxxxxxxxxxx", outInfo);
  if (outInfo.sys.status >= 0) {
    // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
    erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'gridView1');
    //console.log("xxxxxxxxxxxxxxxxxx1111",outInfo);
  } else {
    erFormHelper.messageError(outInfo.sys.msg);
  }
  };
 //查询计量单信息
 
  //物料信息焦点行查询计量单
  const gridView1FocusChanged = (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView2");
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            MAT_CODE: e.data.get("MAT_CODE"),
            TYPE_CODE:"2"
          });
        }
      }
  };
  //计量单焦点行查询详细库存
  const gridView2FocusChanged = (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData("gridView3"); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo1({
            MAT_CODE: e.data.get("MAT_CODE"),
            WEIGH_NO: e.data.get("WEIGH_NO"),
            TYPE_CODE: "3",
          });
        }
      }
  };

  const gridView3FocusChanged = (e: any) => {
    if (!e.data) {
      erFormHelper.clearLayoutOrGridData("LayoutGroupFilter1"); // 清空子表数据
      erFormHelper.clearLayoutOrGridData("LayoutGroupFilter2"); // 清空子表数据
      return;
    }
    if (e && e.rowChanged) {
      if (e.data) {
        queryDetailInfo2({
          MAT_CODE: e.data.get("MAT_CODE"),
          WEIGH_NO: e.data.get("WEIGH_NO"),
          BUNKER_NO: e.data.get("BUNKER_NO"),
          SEQ_NO: e.data.get("SEQ_NO"),
          TYPE_CODE: "4",
        });
      }
    }
};


  //查询计量单
  const getSubGridM = async (e: any) => {    
    const inInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock('gridView1'));  
    const Query =erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter3"); 
    Query.addColumn("TYPE_CODE");
    Query.data[0]["TYPE_CODE"] = "5";  
    Query.addColumn("MAT_CODE");
    Query.data[0]["MAT_CODE"] = inInfo.getBlock(0).data[0]["MAT_CODE"]; 

    const eiInfo1 = new EI.EIInfo();
    eiInfo1.addBlock(Query);
      const outInfo = await erFormHelper.callService(
        "mmsm84v_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'gridView2');
      }
   
  };

   // 查询子表明细信息
   const queryDetailInfo = async (currentRowInfo: any) => {
    // 计量信息
    erFormHelper.clearGridData("gridView2"); // 清空子表数据
    const eiInfo1 = new EI.EIInfo();

    const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
    eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);

    if (eiBlock1.data[0]["MAT_CODE"] !== "") {
      const outInfo = await erFormHelper.callService(
        "mmsm84v_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'gridView2');        

      }

      if(v_weigh_no!="")
        {
          nextTick(()=>{
            erFormHelper.setGridIndicator('gridView2',{WEIGH_NO:v_weigh_no});
          });
        }
    }
  };

  // 查询子表明细信息 
  const queryDetailInfo1 = async (currentRowInfo: any) => {
    // 计量信息
    erFormHelper.clearGridData("gridView3"); // 清空子表数据
    const eiInfo1 = new EI.EIInfo();

    const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
    eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo = await erFormHelper.callService(
        "mmsm84v_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'gridView3');       
      }
      if(v_bunker_no!=""&&v_seq_no!="")
      {
        nextTick(()=>{
          erFormHelper.setGridIndicator('gridView3',{BUNKER_NO:v_bunker_no,SEQ_NO:v_seq_no});
        });
      }
    
  };

   // 查询子表明细信息 
   const queryDetailInfo2 = async (currentRowInfo: any) => {
    // 计量信息
    const eiInfo1 = new EI.EIInfo();

    const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
    eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: "TMMSM81AL" }, true);
      const outInfo = await erFormHelper.callService(
        "mmsm84v_inq",
        eiInfo1,
        true,
        false,
        true
      );

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("查询错误:" + outInfo.sys.msg);
      } else {        
        erFormHelper.setControlValueEx('LayoutGroupFilter1', outInfo.getBlock(0).data[0]);
        erFormHelper.setControlValueEx('LayoutGroupFilter2', outInfo.getBlock(0).data[0]);
        erFormHelper.setControlValue('LayoutGroupFilter2', 'NET_WT',outInfo.getBlock(0).data[0]["STOCK_WT"]);
        
      }
    
  };


  //查询物料信息
  const query_zx=async(e:any)=>{
    if(e.itemCode="XC")
    {
    getSubGridLine();
    v_mat_code ="";
    v_bunker_no = "";
    v_weigh_no = "";
    v_seq_no = "";
    }
  };
  //F2刷新
  const F2_DO = () => {
    getSubGridLine();
    v_mat_code ="";
      v_bunker_no = "";
      v_weigh_no = "";
      v_seq_no = "";
  };

    //查询计量单
  const query_jl_zx=async(e:any)=>{
    if(e.itemCode="QC")
    {
    erFormHelper.clearGridData("gridView2"); // 清空子表数据
    getSubGridM(e.data);
    }
  };
     
    const F3_DO = async (e: any) => {
      const remark: string = erFormHelper.getControlValue('LayoutGroupFilter2', 'ADJUST_REASON');
      console.log(remark);
      if (remark.trim() === '') {
        erFormHelper.messageError('请输入修正原因');
        return false;
      }
      const eiInfo = new EI.EIInfo();
      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter2");
        eiInfo.addBlock(queryCondition,'Tables0');
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock('gridView3'),'Tables1');
      //console.log('eiInfo', eiInfo);
      v_mat_code = eiInfo.getBlock("Tables1").data[0]["MAT_CODE"];
      v_bunker_no = eiInfo.getBlock("Tables1").data[0]["BUNKER_NO"];
      v_weigh_no = eiInfo.getBlock("Tables1").data[0]["WEIGH_NO"];
      v_seq_no = eiInfo.getBlock("Tables1").data[0]["SEQ_NO"];
      const outInfo = await erFormHelper.callService('mmsm86s2n_upd', eiInfo, true, false, true);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
        return false;
      } else {
        // 隐藏工具栏按钮
        erFormHelper.setGridEditable('gridView1', false);
        //刷新库存及定位
        getSubGridLine();
      nextTick(()=>{
        erFormHelper.setGridIndicator('gridView1',{MAT_CODE:v_mat_code});
      });
      
     
      }

      
     
    };
    const F3_PRE_DO = async (e: any) => {
     
      erFormHelper.setAllControlReadOnly("LayoutGroupFilter2", false);
   
    };
    const F3_CANCEL = async (e: any) => {
      erFormHelper.messageInfo('操作取消。');
    };
    return {
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      erFormHelper,
      initializeFlag,
      LayoutGroupFilter,
      LayoutGroupFilter1,
      LayoutGroupFilter2,
      LayoutGroupFilter3,
      gridView_line1,
      gridView_line2,
      gridView_line3,
      query_zx,
      query_jl_zx,
      gridView1FocusChanged,
      gridView2FocusChanged,
      gridView3FocusChanged,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      efFormReady
    };
  }
});
