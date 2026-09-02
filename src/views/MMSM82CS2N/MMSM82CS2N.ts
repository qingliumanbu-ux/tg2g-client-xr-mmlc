

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
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import ErPopFree from "ERX/ErPopFree";
import { useRoute } from "vue-router";
let heat_no: any;
let do_flag: string;

export default defineComponent({
  name: "MMSM82CS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    do_flag = "0";
    // 获取画面的分区信息及设置画面初始化service
    const initializeService = "mmsm_form_get";
    const initializeFlag = ref(0);

    // 画面相关数据初始化
    let popFreeEdit: ER.PopFreeHelper;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    
    let formName: string;
    let formPartition: string;

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = "MMSM82CS2N";

      nextTick(() => {
        initializePage();
      });
    };

    let v_tab: any;   
    v_tab = "1"; 
    const tabActiveKey = ref('tab1');
    const handleTabChange = (activeKey: string) => {
      if (activeKey === 'tab1') {
        v_tab = "1";        
      } else if (activeKey === 'tab2') {
       v_tab = "2";
      
       } 
       else if (activeKey === 'tab3') {
        v_tab = "3";       
        } 
        else if (activeKey === 'tab4') {
          v_tab = "4";         
          } 
          else if (activeKey === 'tab5') {
            v_tab = "5";         
            } 
            else if (activeKey === 'tab6') {
              v_tab = "6";         
              } 
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
    
            // 回调函数获取控件信息及设置定义事件等操作
            nextTick(() => {
            
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
          // Initialize();
         });

    const erGrid1Ready = () => {
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      erFormHelper.setGridEditable("gridView2", false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      erFormHelper.setGridEditable("gridView3", false); // 设置grid不可编辑
    };

    const erGrid4Ready = () => {
      erFormHelper.setGridEditable("gridView4", false); // 设置grid不可编辑
    };
    const erGrid5Ready = () => {
      erFormHelper.setGridEditable("gridView5", false); // 设置grid不可编辑
    };
    const erGrid6Ready = () => {
      erFormHelper.setGridEditable("gridView6", false); // 设置grid不可编辑
    };

    const erGridthReady = () => {
      erFormHelper.setGridEditable("gridView_th", false); // 设置grid不可编辑
    };
    const erGridlzReady = () => {
      erFormHelper.setGridEditable("gridView_lz", false); // 设置grid不可编辑
    };   
    const erGridth2Ready = () => {
      erFormHelper.setGridEditable("gridView_th2", false); // 设置grid不可编辑
    };
    const erGridwxhReady = () => {
      erFormHelper.setGridEditable("gridView_wxh", false); // 设置grid不可编辑
    };

    const query = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
        "LayoutGroupFilter"
      );
      
      inInfo.addBlock(eiBlock);
      const eiBlock1 = EI.EiBlock.build('Table0', [
        {
          TAB: v_tab
        }
      ]);
      inInfo.addBlock(eiBlock1,"tab");
      const outInfo = await erFormHelper.callService(
        "mmsm82c_inq",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        if(v_tab==="1")
          { 
            erFormHelper.clearGridData("gridView1");
            erFormHelper.clearGridData("gridView2");
            erFormHelper.clearGridData("gridView3");
            erFormHelper.clearGridData("gridView4");
            erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
          }
        if(v_tab==="2")
          { erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView5");}
        if(v_tab==="3")
          { erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView_th");}   
        if(v_tab==="4")
          { erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView_lz");}    
        if(v_tab==="5")
          { erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView_th2");}        
        if(v_tab==="6")
          { erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView_wxh");}      
       
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    };

    const query_gy = async (eiBlock:any) => {     
      erFormHelper.clearGridData("gridView2");
      erFormHelper.clearGridData("gridView3");
      erFormHelper.clearGridData("gridView4");

      const inInfo = new EI.EIInfo();      
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm82c_gy",
        inInfo,
        true,
        false,
        true
      );
      
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("工艺信息查询错误:" + outInfo.sys.msg);
      } else {  
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView2");
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), "gridView3");
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(2), "gridView4");
      }
    } ;

    const GridView1FocusChanged = async (e: any) => {
      //如果改变状态则不触发
      if(do_flag!="1"&&v_tab==="1")
        {
      if (e && e.data) {       
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        heat_no = eiBlock.data[0]["HEAT_NO"]?.toString();
        query_gy(eiBlock);  
      }   
    }
    };

    const query_yry = async (HEATNO_PREMELT1:any) => {     
      erFormHelper.clearGridData("gridView6");      
      const inInfo = new EI.EIInfo();      
      const eiBlock = EI.EiBlock.build('Table0', [
        {
          HEATNO_PREMELT1: HEATNO_PREMELT1
        }
      ]);
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService(
        "mmsm82c_yry",
        inInfo,
        true,
        false,
        true
      );
      
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("预熔液查询错误:" + outInfo.sys.msg);
      } else {  
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView6");
      }
    } ;
    const GridView5FocusChanged = async (e: any) => {     
      if (e && e.data) {       
        let selectedMainGridRow: any = [];
        selectedMainGridRow = e.data.toJSON();
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(selectedMainGridRow, true);
        query_yry(eiBlock.data[0]["HEATNO_PREMELT1"]?.toString());  
    }
    };

    const F2_DO = async (e: any) => {
      query();
    };

    const F3_PRE_DO = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView2", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      //设置grid可编辑
      erFormHelper.setGridEditable("gridView2", true);
      do_flag = "1";
    };
    const F3_CANCEL = async (e: any) => {    
      erFormHelper.setGridToolbarVisible("gridView2", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      //设置grid不可编辑
      erFormHelper.setGridEditable("gridView2", false);
      // 判断调后台是否失败
      erFormHelper.messageSuccess("操作取消");
      do_flag = "0";
    };
    const F3_DO = async (e: any) => {   
        if (erFormHelper.getGridDataCount("gridView2") === 0) {
          erFormHelper.messageWarning("工艺路径信息为空，请维护！");
          return;
        }
        const eiInfo = new EI.EIInfo();
        const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
        eiInfo.addBlock(selectedRows,"gy"); 

        const created = erFormHelper.getGridRowsAsBlock("gridView2", 'add');
        eiInfo.addBlock(created, 'add');

        const updated = erFormHelper.getGridRowsAsBlock("gridView2", 'modify');
        eiInfo.addBlock(updated, 'upd');

        const deleted = erFormHelper.getGridRowsAsBlock("gridView2", 'delete');
        eiInfo.addBlock(deleted, 'del');

        //console.log("lxxxxx", eiInfo);
        const outInfo = await erFormHelper.callService(
          "mmsm82c_save",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("工艺路径维护成功!");
        }
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(
          {
            HEAT_NO: heat_no
          },
          true
        );
        query_gy(eiBlock);  
        do_flag = "0";
        erFormHelper.setGridToolbarVisible("gridView2", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        //设置grid不可编辑
        erFormHelper.setGridEditable("gridView2", false);
    };

    const F8_DO = async (e: any) => {   
      
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
      //console.log("1111",selectedRows);
      popFreeAdd_Peisong.ReceiveData(selectedRows);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd_Peisong, (e: any) => {       
        if (popFreeAdd_Peisong.getEvent("ok")) {
          popFreeEditOkClick();          
        }
        
      });
     
  };

  const popFreeEditOkClick = async () => {
    const inInfo = new EI.EIInfo();
    let outInfo: EI.EIInfo = new EI.EIInfo();
    let blockname = "yry";
   
    inInfo.addBlock(
      erFormHelper.convertModelAsBlock(popFreeAdd_Peisong.DataModel),
      blockname
    );
         outInfo = await erFormHelper.callService(
          "mmsm82c_save",
          inInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
        } else {
          query();
          erFormHelper.setGridIndicator('gridView1',{SM_PLAN_NOL2:inInfo.getBlock(0).data[0]["SM_PLAN_NOL2"]});
          erFormHelper.messageSuccess("预熔液维护成功!");
        }  
  };

    const F6_PRE_DO = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView3", {
        addrow: true,
        copyrow: true,
        delete: true,
      });
      //设置grid可编辑
      erFormHelper.setGridEditable("gridView3", true);
      do_flag = "1";
    };
    const F6_CANCEL = async (e: any) => {    
      erFormHelper.setGridToolbarVisible("gridView3", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      //设置grid不可编辑
      erFormHelper.setGridEditable("gridView3", false);    
      const eiBlock = new EI.EiBlock();
        eiBlock.pushData(
          {
            HEAT_NO: heat_no
          },
          true
        );
        query_gy(eiBlock);  
        do_flag = "0";
        erFormHelper.messageSuccess("操作取消");
    };
    const F6_DO = async (e: any) => {   
        if (erFormHelper.getGridDataCount("gridView3") === 0) {
          erFormHelper.messageWarning("消耗信息为空，请维护！");
          return;
        }
        const eiInfo = new EI.EIInfo();
        const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
        eiInfo.addBlock(selectedRows,"xh"); 

        const created = erFormHelper.getGridRowsAsBlock("gridView3", 'add');
        eiInfo.addBlock(created, 'add');

        const updated = erFormHelper.getGridRowsAsBlock("gridView3", 'modify');
        eiInfo.addBlock(updated, 'upd');

        const deleted = erFormHelper.getGridRowsAsBlock("gridView3", 'delete');
        eiInfo.addBlock(deleted, 'del');

        const outInfo = await erFormHelper.callService(
          "mmsm82c_save",
          eiInfo,
          true,
          false,
          true
        );
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess("消耗维护成功!");
        }
        const eiBlock = new EI.EiBlock();
        eiBlock.pushData(
          {
            HEAT_NO: heat_no
          },
          true
        );
        query_gy(eiBlock);  
        do_flag = "0";
        erFormHelper.setGridToolbarVisible("gridView3", {
          addrow: false,
          copyrow: false,
          delete: false,
        });
        //设置grid不可编辑
        erFormHelper.setGridEditable("gridView3", false);    
    };

    const F7_DO = async (e: any) => {   

      if(erFormHelper.getGridSelectRows("gridView1").length === 0)
        {
            erFormHelper.messageWarning("工艺路径信息为空，请维护！");
            return;
        }
      // if (erFormHelper.getGridDataCount("gridView1") === 0) {
      //   erFormHelper.messageWarning("工艺路径信息为空，请维护！");
      //   return;
      // }
      const eiInfo = new EI.EIInfo();
      // const para = erFormHelper.getGridSelectRows("gridView1");
      // eiInfo.addBlock(para);
      eiInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1"),
        "heat_no"
      );
      const outInfo = await erFormHelper.callService(
        "mmsm82c_comm",
        eiInfo,
        true,
        false,
        true
      );
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("处理失败:" + outInfo.sys.msg);
      } else {
        query();
        erFormHelper.messageSuccess("工艺路径确认成功!");
        
      }
  };

  //修改预熔液
  const popFreeAdd_Peisong = new ER.PopFreeHelper(
    efFormInfo.value.formPartition,
    "MMSM82CS2N_POP",
    "LayoutGroupFilter1"
  ); 

  const F12_DO = async (e: any) => {  

    const inInfo = new EI.EIInfo();
    const eiBlock = erFormHelper.getAllControlValueAsEiBlock(
      "LayoutGroupFilter"
    );
    
    inInfo.addBlock(eiBlock,"gyadd");
    const outInfo = await erFormHelper.callService(
      "mmsm82c_inq",
      inInfo,
      true,
      false,
      true
    );
    if (outInfo.sys.status >= 0) {
      // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
      erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), "gridView1");
      erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), "gridView5");
    } else {
      erFormHelper.messageError(outInfo.sys.msg);
    }

  };

    return {
      erFormHelper,
      initializeFlag,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      erGrid6Ready,
      erGridthReady,
      erGridlzReady,
      erGridth2Ready,
      erGridwxhReady,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,      
      F6_DO,
      F6_PRE_DO,
      F6_CANCEL,
      efFormReady,
      GridView1FocusChanged,
      GridView5FocusChanged,
      F7_DO,
      F8_DO,
      F12_DO,
      handleTabChange,
      tabActiveKey
    };
  },
});
