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
import { useRoute, useRouter } from "vue-router";
import type { SelectProps } from "ant-design-vue";

export default defineComponent({
  name: "MMSMLC99S2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
  },
  setup: () => {
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeService = "mmsm_form_get";

    const initializeFlag = ref(0);
    const layoutControlGroup1 = ref("");
    let formName: string;
    let formPartition: string;
    let v_tab: any; 
    v_tab ="2";   
    const tabActiveKey = ref('tab2');

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = "MMSMLC99S2N";

      nextTick(() => {
        initializePage();
      });
    };

    const erGrid1Ready = () => {
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      erFormHelper.setGridEditable("gridView3", false); // 设置grid不可编辑
    };

    const erGridjlReady = () => {
      erFormHelper.setGridEditable("gridViewjl", false); // 设置grid不可编辑
    };


    const queryMainGrid = async () => {
      if (!erFormHelper.checkRequiredInput("layoutControlGroup1")) {
      }
      //清空grid数据
      erFormHelper.clearGridData("gridView1");
      erFormHelper.clearLayoutData("layoutControlGroup2");
      erFormHelper.clearLayoutData("layoutControlGroup3");
      erFormHelper.clearLayoutData("layoutControlGroup4");
      erFormHelper.clearLayoutData("layoutControlGroup5");
      erFormHelper.clearLayoutData("layoutControlGroupjl");
      erFormHelper.clearGridData("gridView2");
      erFormHelper.clearGridData("gridView3");
      erFormHelper.clearGridData("gridViewjl");
      //分页查询
      const serverPageFilter = new EI.EIInfo();
      const allControlValues = erFormHelper.getAllControlValue('layoutControlGroup1');
      const allControlValuesAsFilter = erFormHelper.getAllControlValueAsFilter('layoutControlGroup1');
      serverPageFilter.addBlock(ER.Core.buildEiBlock([allControlValues]));
      serverPageFilter.addBlock(allControlValuesAsFilter, 'QUERY_FILTER');
      console.log('serverPageFilter',serverPageFilter);
      erFormHelper.setGridServerPagingService('gridView1',serverPageFilter,'mmsmlc99_inq');
      /* const inInfo = new EI.EIInfo();
      //获取查询条件dt
      const Query = erFormHelper.getAllControlValueAsEiBlock(
        "layoutControlGroup1"
      );

      inInfo.addBlock(Query);
      const outInfo = await erFormHelper.callService(
        "mmsmlc99_inq",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      } */
    };

    // 画面相关数据初始化
    const initializePage = async () => {
      //  console.log('dfghjkl');
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
          nextTick(() => { 
            erFormHelper.setAllControlReadOnly("layoutControlGroup2",true);
            erFormHelper.setAllControlReadOnly("layoutControlGroup3",true);
            erFormHelper.setAllControlReadOnly("layoutControlGroup4",true);
            erFormHelper.setAllControlReadOnly("layoutControlGroup5",true);
            
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
    // });

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    const GridView1FocusChanged = async (e: any) => {
      if (e && e.data) {
        if(v_tab ==="1")
        {
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        querylv(eiBlock);       
      }
      if(v_tab ==="2")
        {
          queryJL(e.data.get("WEIGH_NO"));
        }
      }
      if(v_tab ==="3")
      {
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        erFormHelper.clearLayoutData("layoutControlGroupjl");
        erFormHelper.clearGridData("gridViewjl");        
        if(e.data.get("EVENT_CODE")==="CHARGE" || e.data.get("EVENT_CODE")==="EXTRA")
        {
        query_jl(eiBlock);
        }
      }
    };

    const GridView2FocusChanged = async (e: any) => { 
      if (e && e.rowChanged) {
        if (e.data) {
          const inInfo = new EI.EIInfo();
          const eiBlock = new EI.EiBlock();
           eiBlock.pushData(
            {
              QUALITY_BATCH_NO: e.data.get("QUALITY_BATCH_NO")
            },
            true
          );
          inInfo.addBlock(eiBlock);
          const outInfo = await erFormHelper.callService(
            "mmsmlc99_cf",
            inInfo,
            true,
            false,
            true
          );
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError("成分查询错误:" + outInfo.sys.msg);
          } else {            
            erFormHelper.mergeDataToGrid(outInfo, "gridView3");
          }

        }
      }
      
    };

    const querylv = async (eiBlock:any) => {
      erFormHelper.mergeDataToLayoutOrGrid(
        eiBlock,
        true,
        "layoutControlGroup2"
      );
      erFormHelper.mergeDataToLayoutOrGrid(
        eiBlock,
        true,
        "layoutControlGroup3"
      );
    }

    const queryJL = async (weigh_no:any) => {
      if (weigh_no!=" ") {
        const inInfo = new EI.EIInfo();
          const eiBlock = new EI.EiBlock();
           eiBlock.pushData(
            {
              WEIGH_NO:weigh_no
            },
            true
          );
          inInfo.addBlock(eiBlock);
          const outInfo = await erFormHelper.callService(
            "mmsmlc99_kc",
            inInfo,
            true,
            false,
            true
          );
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError("计量信息查询错误:" + outInfo.sys.msg);
          } else {  
            //console.log('outInfo11111', outInfo); 
            erFormHelper.mergeDataToLayoutOrGrid(
              outInfo.getBlock(0),
              true,
              "layoutControlGroup4"
            );  //计量信息 
            erFormHelper.mergeDataToLayoutOrGrid(
              outInfo.getBlock(1),
              true,
              "layoutControlGroup5"
            );    //库存     
         
            erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(2), "gridView2");
          }
       }
    };

    
    const query_jl = async (eiBlock:any) => {
      erFormHelper.mergeDataToLayoutOrGrid(
        eiBlock,
        true,
        "layoutControlGroupjl"
      );
      //根据信息查询加料信息
      const inInfo = new EI.EIInfo();      
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsmlc99_jl",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("加料信息查询错误:" + outInfo.sys.msg);
      } else {  
        erFormHelper.mergeDataToGrid(outInfo, "gridViewjl");
      }
    }

    const handleTabChange = (activeKey: string) => {
      if (activeKey === 'tab1') {
        v_tab = "1";
      } else if (activeKey === 'tab2') {
       v_tab = "2";
       if (erFormHelper.getGridCheckedRows("gridView1").length != 0){
       const selectedRows_BLOCK =
        erFormHelper.getGridCurrentRowAsBlock("gridView1");
        queryJL(selectedRows_BLOCK.data[0]["WEIGH_NO"]);    
       } 
      } 
      else if (activeKey === 'tab3') {
        v_tab = "3";
        if (erFormHelper.getGridCheckedRows("gridView1").length != 0){
          const selectedRows_BLOCK =
          erFormHelper.getGridCurrentRowAsBlock("gridView1");
          query_jl(selectedRows_BLOCK);     
        }
      
       } 
    };

    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGridjlReady,
      GridView1FocusChanged,
      GridView2FocusChanged,
      queryJL,
      querylv,
      query_jl,
      tabActiveKey,
      handleTabChange,
      F2_DO,
    };
  },
});
