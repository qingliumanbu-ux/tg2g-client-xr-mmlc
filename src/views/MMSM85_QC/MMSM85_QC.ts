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
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";

import { useRoute } from "vue-router";

export default defineComponent({
  name: 'MMSM85_QC',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup() {    
    // 画面相关数据初始化定义
    const erFormHelper: ER.FormHelper = new ER.FormHelper()
    const initializeService = '';
    const mainGridData = ref<any>([]);
    const subGridData = ref<any>([]);
    let gridView1!: any;
    let gridView2!: any;
    let gridView!: any;
    const initializeFlag = ref(0);
    let selectedMainGridRow: any = []; //焦点行数据
    // 画面相关数据初始化定义
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    let formName  = 'MMSM85_QC';
    let PROGRAM_NAME: string;
    const tabActiveKey = ref('tab1');
    let v_tab: any;    
  

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };

    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid("gridView2");
      erFormHelper.setGridEditable(gridView2, false); // 设置grid不可编辑
    };

    const erGrid3Ready = () => {
      erFormHelper.setGridEditable("gridView3", false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      erFormHelper.setGridEditable("gridView4", false); // 设置grid不可编辑
    };
   
    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = "MMSM85_QC";
      nextTick(() => {
        initializePage();
      });
    };
  
    // 主表保存
    const saveMainGridData = async () => {
      if (v_tab === '1') {
        if (erFormHelper.hasDataChange("gridView1")) {
          const eiinfo = new EI.EIInfo();
          
          const created = erFormHelper.getGridRowsAsBlock("gridView1", 'add');
         eiinfo.addBlock(created, 'ADD');
          
          
          const para = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
          eiinfo.addBlock(para, 'PARA');
          const eiBlock = new EI.EiBlock();
          eiBlock.pushData(
           {
             tab_flag:v_tab
           },
           true
         );
         eiinfo.addBlock(eiBlock,"TAB");
          erFormHelper.callService('mmsm85_save', eiinfo, true, true,true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
       
        
      }
      else if(v_tab === '2')
      {
        if (erFormHelper.hasDataChange("gridView3")) {
          const eiinfo = new EI.EIInfo();
          
          const created = erFormHelper.getGridRowsAsBlock("gridView3", 'add');
         eiinfo.addBlock(created, 'ADD');
          
          console.log("v_tab222",v_tab)
          const para = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
          eiinfo.addBlock(para, 'PARA');
          const eiBlock = new EI.EiBlock();
          eiBlock.pushData(
           {
             tab_flag:v_tab
           },
           true
         );
         eiinfo.addBlock(eiBlock,"TAB");
          erFormHelper.callService('mmsm85_save', eiinfo, true, true,true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      }
      else if(v_tab === '3')
      {
        if (erFormHelper.hasDataChange("gridView4")) {
          const eiinfo = new EI.EIInfo();
          
          const created = erFormHelper.getGridRowsAsBlock("gridView4", 'add');
         eiinfo.addBlock(created, 'ADD');
          
          
          const para = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
          eiinfo.addBlock(para, 'PARA');
          const eiBlock = new EI.EiBlock();
          eiBlock.pushData(
           {
             tab_flag:v_tab
           },
           true
         );
         eiinfo.addBlock(eiBlock,"TAB");
          erFormHelper.callService('mmsm85_save', eiinfo, true, true,true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
        }
      }
     
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
         
        });
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    

    //查询
    const getData = async () => {
      //压条件
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      eiInfo.addBlock(eiBlock, 'Table0');
      

      await erFormHelper.callService('mmsm85_inq', eiInfo, true, true,true).then((res) => {
        const mainData = res.blocks['Table0'].data;
        nextTick(() => {
          erFormHelper.mergeDataToGrid(mainData, "gridView1");
        });
      });
    };

    // 查询
    const f2Do = () => {
      getData();
    };

    // 维护
    const f3PreDo = (e: any) => {
      if (v_tab === '1') {
      erFormHelper.setGridToolbarVisible('gridView1', {
        excel: true,
        import: true
      });
      erFormHelper.clearGridData("gridView1");
      erFormHelper.setGridEditable('gridView1', true);
    }
    else if(v_tab === '2')
    {
      erFormHelper.setGridToolbarVisible("gridView3", {
        excel: true,
        import: true
      });
      erFormHelper.clearGridData("gridView3");
      erFormHelper.setGridEditable("gridView3", true);
    }
    else if(v_tab === '3')
    {
      erFormHelper.setGridToolbarVisible("gridView4", {
        excel: true,
        import: true
      });
      erFormHelper.clearGridData("gridView4");
      erFormHelper.setGridEditable("gridView4", true);
    }
    };
    // 维护确认
    const f3Do = async (e: any) => {
      console.log("F3TAB",v_tab);
      if (v_tab === '1') {
     
      erFormHelper.setGridToolbarVisible("gridView1", {
        excel: false,
        import: false,
      });
      console.log("113")
      return await saveMainGridData()
        .then((res: any) => {
          console.log("116")
          getData();
          erFormHelper.setGridEditable("gridView1", false);

        })
        .catch((error) => {
          erFormHelper.messageError(error);
          return false;
        });
      
      }
      else if (v_tab === '2') {
        gridView = erFormHelper.getGrid("gridView3");
        erFormHelper.setGridToolbarVisible("gridView3", {
          excel: false,
          import: false,
        });
        console.log("113")
        return await saveMainGridData()
          .then((res: any) => {
            console.log("116")
            //getData();
            erFormHelper.setGridEditable("gridView3", false);
          })
          .catch((error) => {
            erFormHelper.messageError(error);
            return false;
          });
       
        console.log("gridView",e.data);
        }
       else if (v_tab === '3') {
         
          erFormHelper.setGridToolbarVisible("gridView4", {
            excel: false,
            import: false,
          });
          console.log("113")
          return await saveMainGridData()
            .then((res: any) => {
              console.log("116")
              getData();
              erFormHelper.setGridEditable("gridView4", false);
            })
            .catch((error) => {
              erFormHelper.messageError(error);
              return false;
            });
          
          }




      console.log("112")
     
    };

    // 维护取消
    const f3Cancel = async () => {
      if (v_tab === '1') {
      erFormHelper.setGridToolbarVisible('gridView1', {
        excel: false,
        import: false,
      });
      erFormHelper.setGridEditable('gridView1', false);
    }
    else if (v_tab === '2') {
      
      erFormHelper.setGridToolbarVisible('gridView3', {
        excel: false,
        import: false,
      });
      erFormHelper.setGridEditable('gridView3', false);
    }
    else if (v_tab === '3') {
      erFormHelper.setGridToolbarVisible('gridView4', {
        excel: false,
        import: false,
      });
      erFormHelper.setGridEditable('gridView4', false);
    }
    };

    // 审核前判断
    const f4PreDo = (e: any) => {
     
    };

    // 确认审核
    const f4Do = async () => {
      if (erFormHelper.hasDataChange('gridView_mat')) {
        const eiinfo = new EI.EIInfo();
        const created = erFormHelper.getGridRowsAsBlock('gridView_mat', 'add');
        eiinfo.addBlock(created, 'ADD');
        const para = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
        eiinfo.addBlock(para, 'PARA');
       
        erFormHelper.callService('mmsm85_save', eiinfo, true, true,true).then((res) => {
          subGridData.value = res.getBlock('Table0').data;
        });
      }
    };


    const f6Do = async () => {
      const eiInfo = new EI.EIInfo();      
      erFormHelper.callService('mmsm60db_inq', eiInfo, true,true, true).then((res) => {
        const platonicResData = res.blocks['Table0'].data;
        nextTick(() => {
          erFormHelper.mergeDataToGrid(platonicResData, gridView2);
        });
        // getData();
      });
    };
    const handleTabChange = (activeKey: string) => {
      if (activeKey === 'tab1') {
        v_tab = "1";
      } else if (activeKey === 'tab2') {
       v_tab = "2";
      } else if (activeKey === 'tab3') {
        v_tab = "3";
       } 
       else if (activeKey === 'tab4') {
        v_tab = "4";
       } 
       else if (activeKey === 'tab5') {
        v_tab = "5";
       } 
    };

    const f7Do = async () => {
      const eiInfo = new EI.EIInfo();      
      const para = erFormHelper.getAllControlValueAsEiBlock('layoutControlGroup1');
      eiInfo.addBlock(para, 'ADD');
          const eiBlock = new EI.EiBlock();
          eiBlock.pushData(
           {
             tab_flag:v_tab
           },
           true
         );
         eiInfo.addBlock(eiBlock,"TAB");
          erFormHelper.callService('mmsm85_save', eiInfo, true,true, true).then((res) => {
            subGridData.value = res.getBlock('Table0').data;
          });
    };

    return {
      erFormHelper,
      initializeFlag,
      initializePage,
      f2Do,
      f3Do,
      f3PreDo,
      f3Cancel,
      f6Do,
      f7Do,
      tabActiveKey,
      handleTabChange,
      getData,
      gridView1,
      gridView2,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready
    };
  }
});
