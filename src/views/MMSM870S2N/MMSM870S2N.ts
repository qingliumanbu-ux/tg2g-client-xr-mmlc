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
  name: 'MMSM870S2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup() {
    const dropdownlistValue = ref('0');
    const dataSourceArray = [
      { text: '在线数据', value: '0' },
      { text: '历史数据', value: '1' }
    ];

    let selectedDataItems: any[] = [];

    // 画面相关数据初始化定义
    const erFormHelper: ER.FormHelper = new ER.FormHelper()
    const initializeService = '';
    const mainGridData = ref<any>([]);
    const subGridData = ref<any>([]);
    let gridView1!: any;
    let gridView2: any;
    const initializeFlag = ref(false);
    let selectedMainGridRow: any = []; //焦点行数据
    // 画面相关数据初始化定义
    const efFormInfo = ref<{ [key: string]: any }>({});
    const gridToolbar: Ref<any[]> = ref([]);
    // const efFormIsReady = ref(false);
    let formPartition: string;
    let formName  = 'MMSM870S2N';
    let PROGRAM_NAME: string;
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid('gridView1');
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
     
    };
   
    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      Initialize();
    };
    const editable = ref(false);
    
    // 自定义工具栏按钮功能
 
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid('gridView2');
      erFormHelper.setGridEditable('gridView2', false); // 设置grid不可编辑
    };
     
   
    
  
    // 画面相关数据初始化
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        ""
      );

      if (initialResult.flag > 0) {
        initializeFlag.value = true;
        // 初始化工具栏
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };
    onMounted(() => {
      // Initialize();
    });
    

    //查询
    const getData = async () => {
      //压条件
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('layoutControlGroup1');
      eiInfo.addBlock(eiBlock, 'Table0');
      
    
      await erFormHelper.callService('mmsm870s2n_inq', eiInfo, true, true,true).then((res) => {
        const mainData = res.blocks['Table0'].data;
        nextTick(() => {
          erFormHelper.mergeDataToGrid(mainData, gridView1);
        });
      });
    };

    // 查询
    const f2Do = () => {
      getData();
    };

    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData('gridView2'); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          
          queryDetailInfo({
            HEAT_NO: e.data.get('HEAT_NO'),
          });
        }
      }
       console.log("HEAT_NO333",e.data.get('HEAT_NO'));
    };
    const queryDetailInfo = async (currentRowInfo: any) => {
    erFormHelper.checkGridCurrentRow("gridView1");
    const eiInfo1 = new EI.EIInfo();
    const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
    eiInfo1.addBlock(eiBlock1, 'Tables0');

    

    eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: 'TMMSM2A_YL' }, true);
    eiInfo1.addBlock(
      erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables1');
    const outInfo1 = await erFormHelper.callService('mmsm870s2n_inq1', eiInfo1, true, false, true);
    
    console.log("111222333",eiInfo1);
    console.log("666888",outInfo1);

    if (outInfo1.sys.status < 0) {
       erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
    } else {
      
       erFormHelper.mergeEiBlockToGrid(outInfo1.getBlock(0), gridView2);
    }
    };

    
    
    return {
      erFormHelper,
      initializeFlag,
      editable,
     
      dropdownlistValue,
      dataSourceArray,
      gridToolbar,
      Initialize,
      f2Do,
      
      getData,
      
      gridView1,
      GridView1FocusChanged,
      gridView2,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready
    };
  }
});
