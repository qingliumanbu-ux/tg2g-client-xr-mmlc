// import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
// import { EI, EIManager, EP } from 'EIX/ei';
// import { EFGridUtils, EFNotify, EFGridInit, EFFormInfo } from '@baosight/ef';
// import { ErFormHelper } from '@baosight/er';

import { defineComponent, onMounted, ref, reactive, computed, nextTick, toRaw, Ref } from 'vue';
import { EI, EIManager } from 'EIX/ei';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import xrEfSearchBox from 'EFX/xrEfSearchBox';
import xrEfDialog from 'EFX/xrEfDialog';
import EFUtility from 'EFX/EFUtility';
import eBFR from 'EFX/eBFR';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import ErPopFree from 'ERX/ErPopFree';
import ErPopQuery from 'ERX/ErPopQuery';
import { PopQueryReturnInfo, PopFreeReturnInfo } from 'ERX/er-type';
import MMSM81VT from '../MMSM81VT/MMSM81VT.vue';
import { useRoute,useRouter } from 'vue-router';
import type { SelectProps } from 'ant-design-vue';

export default defineComponent({
  name: 'MMSM838S2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const initializeService = '';
    const gridToolbar: Ref<any[]> = ref([]);
    const detailTabsRef = ref<any>(null);
    const bunker_g = reactive(new Array);
    const bunker_d = reactive(new Array);
    const box_wt = ref(0);
    const box_namme = ref('');
    const bunker_d1 = reactive(new Array);
    const bunker_d2 = reactive(new Array);

    bunker_d1.push('0');
    bunker_d2.push('0');
    let formName :string;
    let formPartition: string;
    // 变量定义
    // const formName = 'MMSM833S2N';
    // const erFormHelper = reactive(new ErFormHelper());
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    // let gridView3!: kendo.ui.Grid;
    // let gridView4!: kendo.ui.Grid;
    // 料仓代码，物料代码，物料名称，重量，物料类型
    const MX_LC_G = ref(new Array);
    const MX_LC_D = ref(new Array);
    const bunker_mat_code = reactive(new Array);
    const bunker_mat_name = reactive(new Array);
    const bunker_mat_type = reactive(new Array);
    const bunker_stock_wt = reactive(new Array);
    const buiker_stock_wt = reactive(new Array);
    const bunker_bunker_no = reactive(new Array);

    const GL_LC = ref({
      name: ''
    });
    const DL_LC = ref({
      name: ''
    });

    const efFormReady = (e: any) => {
      console.log("11111");
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = 'MMSM832S2N';
      console.log('efFormInfo.value.formPartition',efFormInfo.value.formPartition);
      console.log('efFormInfo.value.formName',efFormInfo.value.formName);
      nextTick(() => {
        initializePage();
        MX_LC_D.value.push('BW-ALLOY', 'N/A', 'BOF丝线', ' ', ' ');
        MX_LC_G.value.push('FW-ALLOY', 'N/A', 'LF丝线', ' ', ' ');
      });
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid('gridView1');
      erFormHelper.setGridEditable('GridView1', false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid('gridView2');
      erFormHelper.setGridEditable('gridView2', false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid('gridView3');
      erFormHelper.setGridEditable('gridView3', false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid('gridView4');
      erFormHelper.setGridEditable('gridView4', false); // 设置grid不可编辑
    };
    const S_BUNKER_NO = ref('');
    const G_BUNKER_NO = ref('');
    const D_MAT_CODE = ref('');
    const G_MAT_CODE = ref('');
   
    

    // const options = ref<SelectProps['options']>([
    //   { value: 'jack', label: 'Jack' },
    //   { value: 'lucy', label: 'Lucy' },
    //   { value: 'tom', label: 'Tom' },
    // ]);
    // 查询高位料仓和低位料仓并且返回给下拉框
    const queryLCdata_G = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_TYPE: ' '
        },
        true
      );
      console.log("111222333", inInfo);
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      // const outInfo = await erFormHelper.callService('mmsm85_bunker_inqg', inInfo, false, true);
      // console.log("98988", outInfo.getBlock(0).data.length);
      // console.log("98988", outInfo);
      // if (outInfo.sys.status < 0)
      //    {
      //   //维护完成重新查询
      //     erFormHelper.messageError('查询错误：' + outInfo.sys.msg);
      //     return false;
      // } else {
      //     for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
      //       bunker_g.push(
      //         {
      //           id: i,
      //           // name: outInfo.getBlock(0).data[i]['MAT_NAME']
      //           name: outInfo.getBlock(0).data[i]['BUNKER_NO']
      //         })
      //       G_BUNKER_NO.value = <string>outInfo.getBlock(0).data[i]['BUNKER_NO'];
      //       G_MAT_CODE.value = <string>outInfo.getBlock(0).data[i]['MAT_CODE'];
      //       console.log("98988", outInfo.getBlock(0).data.length);
      //     }
      //   }
      
      // EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
        // .then((res: EI.EIInfo) => {
        //   console.log("98988", res.getBlock(0).data.length);
        //     //  for (let i = 0; i < res.getBlock(0).data.length; i++)
        //   for (let i = 0; i < res.getBlock(0).data.length; i++) {
        //     bunker_g.push(
        //       {
        //         id: i,
        //         name: res.getBlock(0).data[i]['BUNKER_NO']
        //       })

        //   }

        // console.log("9898",bunker_g);
        // }
        // );
    }
    const queryLCdata_D = async () => {

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: ' '
        },
        true
      );
      console.log("222211111",inInfo);
      EIManager.callService(formPartition, 'mmsm85_bunker_inq1', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_d.push(
              {
                id: i,
                // name: res.getBlock(0).data[i]['MAT_NAME']
                name: res.getBlock(0).data[i]['BUNKER_NO']
              })
            S_BUNKER_NO.value = <string>res.getBlock(0).data[6]['BUNKER_NO'];
            D_MAT_CODE.value = <string>res.getBlock(0).data[6]['MAT_CODE'];
            console.log("2222",S_BUNKER_NO);
          }
          console.log("99999");
        }
        );
    }
    const GL_Change = async () => {
      const inInfo = new EI.EIInfo();
       const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
      console.log("GL_LC.value.name",GL_LC.value.name);
      console.log("G_BUNKER_NO.value",G_BUNKER_NO.value);
      console.log("G_MAT_CODE.value",G_MAT_CODE.value);
       eiBlock.pushData(
        {
          // MAT_NAME: GL_LC.value.name,
          BUNKER_NO:GL_LC.value.name,
          MAT_CODE:G_MAT_CODE.value
          // BUNKER_NO_ORIGINAL: DL_LC.value.name,
          // STOCK_WT: box_wt.value
        },
        true
      );
      inInfo.addBlock(eiBlock);
      // eiBlock.pushData(
      //   {
      //     BUNKER_NO: GL_LC.value.name
      //   },
      //   true
      // );
        // console.log("112211",S_BUNKER_NO);
        console.log("高位",eiBlock);
      const outInfo = await erFormHelper.callService('mmsm85_inqsx', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        console.log("111222333",outInfo.getBlock(0));
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      // EIManager.callService(formPartition, 'mmsm85_bunker_inqg', inInfo)
      //   .then((res: EI.EIInfo) => {
      //     for (let i = 0; i < res.getBlock(0).data.length; i++) {
      //       MX_LC_G.value.length = 0;
      //       // MX_LC_G.value.
      //       MX_LC_G.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
      //       // MX_LC_G.value.push(res.getBlock(0).data[i]["MAT_NAME"],
      //         res.getBlock(0).data[i]["MAT_CODE"],
      //         res.getBlock(0).data[i]["MAT_NAME"],
      //         res.getBlock(0).data[i]["STOCK_WT"],
      //         res.getBlock(0).data[i]["MAT_TYPE"]);
      //     }
      //   }
      //   );
    }
    const DL_Change = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          // MAT_NAME: DL_LC.value.name,
          BUNKER_NO:DL_LC.value.name,
          MAT_CODE:D_MAT_CODE.value
        },
        true
      );
      const outInfo = await erFormHelper.callService('mmsm85_inq1', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView3);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      // EIManager.callService(formPartition, 'mmsm85_bunker_inq1', inInfo)
      //   .then((res: EI.EIInfo) => {
      //     for (let i = 0; i < res.getBlock(0).data.length; i++) {
      //       MX_LC_D.value.length = 0;
      //       MX_LC_D.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
      //       // MX_LC_D.value.push(res.getBlock(0).data[i]["MAT_NAME"],
      //         res.getBlock(0).data[i]["MAT_CODE"],
      //         res.getBlock(0).data[i]["MAT_NAME"],
      //         res.getBlock(0).data[i]["STOCK_WT"],
      //         res.getBlock(0).data[i]["MAT_TYPE"]);

      //     }
      //   }
      //   );
    }

    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData('gridView2'); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            QUALITY_BATCH_NO: e.data.get('QUALITY_BATCH_NO')
          });
        }
      }
       console.log("333");
    };

      const queryDetailInfo = async (currentRowInfo: any) => {
          // 成分信息
          console.log("4444");
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: 'TMMSM81AL' }, true);
      const outInfo1 = await erFormHelper.callService('mmsm81al_inq', eiInfo1, true, false, true);
      console.log("333");
      console.log("111222333",eiInfo1);

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, 'gridView2');
      }
    };

    const GridView3FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData('gridView4'); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo1({
            QUALITY_BATCH_NO: e.data.get('QUALITY_BATCH_NO')
          });
        }
      }
      console.log("333");
    };

    const queryDetailInfo1 = async (currentRowInfo: any) => {
      // 成分信息
      console.log("4444");
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo, TABLE_TYPE: 'TMMSM81AL' }, true);
      const outInfo1 = await erFormHelper.callService('mmsm81al_inq', eiInfo1, true, false, true);
      console.log("333");
      console.log("111222333",eiInfo1);

      if (outInfo1.sys.status < 0) {
      erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
      } else {
      erFormHelper.mergeDataToLayoutOrGrid(outInfo1, true, 'gridView4');
      }
    };


    const butClick = async () => {
      if (DL_LC.value.name === '') {
        erFormHelper.messageError("请选择工位");
        return;
      }
      if (box_namme.value === '') {
        erFormHelper.messageError("请输入领料人名字");
        return;
      }
      if (box_wt.value === 0) {
        erFormHelper.messageError("请输入重量");
        return;
      }
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock(),'Tables0');
      eiBlock.pushData(
        {
          // BUNKER_NO: G_BUNKER_NO.value,
          // BUNKER_NO_ORIGINAL: S_BUNKER_NO.value,
          BUNKER_NO: DL_LC.value.name,
          // BUNKER_NO_ORIGINAL: DL_LC.value.name,
          STOCK_WT: box_wt.value
        },
        true
      );
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock('gridView1'),'Tables1');
      // erFormHelper. messageError('确认低位料仓上料');
      console.log("111222333111",inInfo);
      const mes_res = await erFormHelper.messageConfirm('料仓号'+'WIRE'+'上料重量'+box_wt.value+'是否确认上料');
      if (!mes_res)
      {}else{
          const outInfo = await erFormHelper.callService('mmsm831_updsx', inInfo, true,false, true);
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError(outInfo.sys.msg);
          }else{
            const mes_res = await erFormHelper.messageConfirm('上料完成'+'上料重量'+box_wt.value);
            box_wt.value=0;
          }
          GL_Change();
          DL_Change();
          erFormHelper.setGridIndicator(gridView1,{BUNKER_NO:inInfo.getBlock(1).data[0]["BUNKER_NO"],MAT_CODE:inInfo.getBlock(1).data[0]["MAT_CODE"],SEQ_NO:inInfo.getBlock(1).data[0]["SEQ_NO"]});

      }
    }

    const butClick1 = async () => {
      bunker_d1.length = 0;
      bunker_d2.length = 0;
      bunker_d1.push('1');
      bunker_d2.push('0');
      bunker_g.length = 0;
      bunker_g.push
      (
        {
          id: 0,
          name: 'BX-转炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 1,
          name: 'B0-#0号转炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 2,
          name: 'B1-#1号转炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 3,
          name: 'B2-#2号转炉工序'
        }
      )
      console.log("111222333");
    }
    const butClick2 = async () => {
      bunker_d1.length = 0;
      bunker_d2.length = 0;
      bunker_d1.push('0');
      bunker_d2.push('1');

      bunker_g.length = 0;
      bunker_g.push
      (
        {
          id: 0,
          name: 'FX-LF炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 1,
          name: 'F0-#0号LF炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 2,
          name: 'F1-#1号LF炉工序'
        }
      )
      bunker_g.push
      (
        {
          id: 3,
          name: 'F2-#2号LF炉工序'
        }
      )
      console.log("33333");
    }
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(efFormInfo.value.formPartition, 'MMSM838S2N', '', '');
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          // gridView1 = erFormHelper.getKendoGrid('gridView1');
          // erFormHelper.setGridEditable('gridView1', false);
          // gridView2 = erFormHelper.getKendoGrid('gridView2');
          // erFormHelper.setGridEditable('gridView2', false);
          // gridView3 = erFormHelper.getKendoGrid('gridView3');
          // erFormHelper.setGridEditable('gridView3', false);
          // gridView4 = erFormHelper.getKendoGrid('gridView4');
          // erFormHelper.setGridEditable('gridView4', false);
          queryLCdata_G();
          queryLCdata_D();
          GL_Change();
          DL_Change();
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    // onMounted(() => {
    //   initializePage();
    //   MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
    //   MX_LC_G.value.push(' ', ' ', ' ', ' ', ' ');
    // });

    const F2_DO = async (e: any) => { 
      queryLCdata_G();
      queryLCdata_D();
      GL_Change();
      DL_Change();
     
    };
    const F3_DO = async (e: any) => { };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridToolbar,
      butClick,
      butClick1,
      butClick2,
      bunker_g,
      bunker_d,
      GL_Change,
      DL_Change,
      efFormReady,
      GridView1FocusChanged,
      GridView3FocusChanged,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      bunker_d1,
      bunker_d2,
      GL_LC,
      DL_LC,
      MX_LC_G,
      box_wt,
      box_namme,
      MX_LC_D
    };
  }
});
