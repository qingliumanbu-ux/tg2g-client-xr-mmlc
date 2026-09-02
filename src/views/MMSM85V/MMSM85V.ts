/*
 * @Description:
 * @Author: Edward
 * @Date: 2022-06-02 17:21:37
 * @LastEditors: zhangTing
 * @LastEditTime: 2023-07-19 15:13:06
 */
// import { EI, EIManager } from "EIX/ei";
// import { ER } from "ERX/Er";
// import { SiUtils } from "ERX/SiUtils";
// import { FiUtils } from "ERX/FiUtils";
// import xrEfForm from "EFX/xrEfForm";
// import xrEfPanel from "EFX/xrEfPanel";
// import erLayout from "ERX/ErLayout";
// import erGrid from "ERX/ErGrid";

// import { useRoute } from "vue-router";

// import { EI, EIManager } from "EIX/ei";
// import { ER } from "ERX/Er";
// import { SiUtils } from "ERX/SiUtils";
// import { FiUtils } from "ERX/FiUtils";
// import xrEfForm from "EFX/xrEfForm";
// import xrEfPanel from "EFX/xrEfPanel";
// import erLayout from "ERX/ErLayout";
// import erGrid from "ERX/ErGrid";
// import xrEfDialog from "EFX/xrEfDialog";
// import ErPopFree from'ERX/ErPopFree'
// import ErPopQuery from 'ERX/ErPopQuery'
// import { useRoute } from "vue-router";
// import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";

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


export default defineComponent({
  name: 'MMSM85V',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree
    // xrEfForm,
    // xrEfPanel,
    // erLayout,
    // erGrid,
    // ErPopFree


    
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    // const { openEfDialog, closeEfDialog } = EFDialogForm();

    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
      const efFormInfo = ref<{ [key: string]: any }>({});
    // const formPartition = efFormInfo.value.formPartition; // 分区
    const initializeService = '';
    const bunker = reactive(new Array);
    //  const bunker = new Map<String,String>()
    // const erFormHelper = reactive(new ErFormHelper());
    const dialogFormName = ref(''); // 弹出画面的画面名
    const detailTabsRef = ref<any>(null);
    // const detailTabsInstance = computed(() => {
    //   return detailTabsRef.value?.kendoWidget() as kendo.ui.TabStrip;
    // });

    // let i_form_ename = formParams.formName; //画面英文名
     let i_form_ename; // 当前画面名
    const i_func_id_q = ref('');
    const i_func_id_p = ref('');

    const table0 = {};

    // let i_func_id_p;
    let i_func_id;
    let i_service_f2: any;
    let i_service_f22: any;
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
    let i_station_id: any;
    let cs_OkClick = '';
    let i_proc_div = '';
    let formName :string;
    let formPartition: string;
    // let popFreeEdit: ErPopFreeHelper;
    const formlayout: Ref<any[]> = ref([]);
    const bunker_mat_code = reactive(new Array);
    const bunker_mat_name = reactive(new Array);
    const bunker_mat_type = reactive(new Array);
    const bunker_stock_wt = reactive(new Array);
    const buiker_stock_wt = reactive(new Array);
    const bunker_bunker_no = reactive(new Array);
    const bunker_rate = reactive(new Array);
    const initializeFlag = ref(0);

   
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    let gridView1: any;
    let gridView2: any;

    
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log('efFormInfo.value.formPartition',efFormInfo.value.formPartition);
      console.log('efFormInfo.value.formName',efFormInfo.value.formName);
      QueryPara();
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid('gridView1');
      erFormHelper.setGridEditable('GridView1', false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid('gridView2');
      erFormHelper.setGridEditable('gridView2', false); // 设置grid不可编辑
    };
    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      'MMSM85VT',
      'LayoutGroupFilter',
      ''
    )
    //通过炼钢配置表，进行模板画面参数查询
    const QueryPara = async () => {
      // const inInfo = new EI.EIInfo();
      // inInfo.addBlock(
      //   ErUtils.buildEiBlock([
      //     {
      //       PROGRAM_NAME:  efFormInfo.value.formName
      //     }
      //   ])
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          PROGRAM_NAME: efFormInfo.value.formName
          // PROGRAM_NAME: programName
        },
        true
      );
      console.log( "323",efFormInfo.value.formName);

     
      // EIManager.callService(formPartition, "mmsmpara_inq", eiInfo)
      // const outInfo = await erFormHelper.callService('mmsmpara_inq', inInfo, false, true, true);
      const outInfo = await erFormHelper.callService('mmsmpara_inq', inInfo, false, true);
      console.log("111222333",outInfo);
      for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'func_id_q') {
          i_func_id_q.value = <string>outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'func_id_p') {
          i_func_id_p.value = <string>outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'func_id') {
          i_func_id = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f2') {
          i_service_f2 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f22') {
          i_service_f22 = outInfo.getBlock(0).data[i]['PARA'];
          console.log('产线sql_mat_kind', i_service_f22);
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f3') {
          i_service_f3 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f4') {
          i_service_f4 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f5') {
          i_service_f5 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f6') {
          i_service_f6 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f7') {
          i_service_f7 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'service_f12') {
          i_service_f12 = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'formlayout') {
          i_formlayout = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'pop_flag') {
          i_pop_flag = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'factory_div') {
          i_factory_div = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'station_id') {
          i_station_id = outInfo.getBlock(0).data[i]['PARA'];
          console.log('i_station_id', i_station_id);
        }
        let i_mat: any;
        i_mat = outInfo.getBlock(0).data[i]['PARA_NAME'];
        if (i_mat.indexOf('mat_kind') > -1) {
          i_mat_kind = outInfo.getBlock(0).data[i]['PARA']?.toString().trim();
          if (sql_mat_kind != '') {
            sql_mat_kind += "'" + i_mat_kind + "',";
          }
          console.log('产线sql_mat_kind123', sql_mat_kind);
        }
        if (outInfo.getBlock(0).data[i]['PARA_NAME'] === 'handle_div') {
          i_handle_div = outInfo.getBlock(0).data[i]['PARA'];
        }
        if (i_formlayout != '' && i_formlayout != null) {
          formlayout.value = i_formlayout.split(',');
          i_formwidth = formlayout.value[0];
          i_formheight = formlayout.value[1];
          i_colcount = formlayout.value[2];
        }
      }
      nextTick(() => {
        // 获取画面上的主要控件信息
        initializePage();
      });

    };

    
    const showContextMenu = async (item: any) => {

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item
        },

        true
      );
      console.log('dfujgvfh', eiBlock);
      // const outInfo = await erFormHelper.callService(i_service_f2, inInfo, false, true);
      // // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      // console.log(outInfo.getBlock(0).data.length);
      // if (outInfo.sys.status >= 0) {
      //   // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
      //   erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      // } else {
      //   erFormHelper.messageError(outInfo.sys.msg);
      // }
    }
    // 变量定义

    const butClick = async (item: any) => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: item
        },
        true
      );

      const outInfo = await erFormHelper.callService(i_service_f2, inInfo, true,false, true);
      // const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, false, true);
      console.log(outInfo.getBlock(0).data.length);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    }

    const dbbutClick= async (index: any) => {
    /*   console.log('1233');
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      console.log('dfujgvfh221', eiBlock);
      eiBlock.pushData(
        {
          BUNKER_NO:bunker_bunker_no[index],
          MAT_CODE:bunker_mat_code[index],
          MAT_NAME:bunker_mat_name[index]
        },
        true
      );
      console.log('dfujgvfh111', eiBlock); */
      // const data:any[] = [];
      // data.push(
      //   {
      //     BUNKER_NO:bunker_bunker_no[index],
      //     MAT_CODE:bunker_mat_code[index],
      //     MAT_NAME:bunker_mat_name[index]

      //   },false

      // )

       popFreeAdd.ReceiveData({
        BUNKER_NO:bunker_bunker_no[index],
        MAT_CODE:bunker_mat_code[index],
        MAT_NAME:bunker_mat_name[index]
      } );
        // console.log('dfujgvfh333', data);
        ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
          //console.log('dfujgvfh444', eiBlock);
          if(popFreeAdd.getEvent('ok'))
          {
            queryData(e);
          }
        })
    }
    const queryData = async (e :any) => {
      //1.压入查询条件
      const eiInfo = new EI.EIInfo();
      eiInfo.addBlock(erFormHelper.convertModelAsBlock(popFreeAdd.DataModel), 'Table1');
      console.log('rxm',eiInfo);
      //控制台日志
      await erFormHelper.callService('mmsm60_upd', eiInfo, true, false,true).then((res) => {

        console.log('调用结果', res);
          if (res.status >= 0)
          {
            erFormHelper.messageSuccess('修改成功!!');
          }
          else{
            erFormHelper. messageError('修改失败!!，失败原因:'+res.sys.msg);
          }
      }); 
      nextTick(() => {
        window.location.reload();
        // QueryBunker();
      });
    };
    // const erFormHelper = reactive(new ErFormHelper());
  
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(efFormInfo.value.formPartition, efFormInfo.value.formName, '', '');
      console.log('产线sql_mat_kind');
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          QueryBunker();
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };
    const QueryBunker = async () => {
      bunker.length = 0;
      const inInfo = new EI.EIInfo();
      const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_CODE: ' ',
          BUNKER_TYPE:i_station_id
        },
        true
      );

   
      inInfo.addBlock(eiBlock);

      // bunker = reactive(new Array);
        console.log("1112223334", i_service_f22);
      EIManager.callService(efFormInfo.value.formPartition, i_service_f22, inInfo)
        // EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            // console.log('dfujgvfh', bunker);

            bunker.push(res.getBlock(0).data[i]['BUNKER_NO']);
            bunker_bunker_no.push(res.getBlock(0).data[i]['BUNKER_NO']);
            bunker_mat_code.push(res.getBlock(0).data[i]['MAT_CODE']);
            bunker_mat_name.push(res.getBlock(0).data[i]['MAT_NAME']);
            bunker_mat_type.push(res.getBlock(0).data[i]['MAT_TYPE']);
            bunker_stock_wt.push(res.getBlock(0).data[i]['STOCK_WT']);
            buiker_stock_wt.push(res.getBlock(0).data[i]['STOCK_WT']);
            bunker_rate.push(res.getBlock(0).data[i]['RATE']);
            // bunker.push(res.getBlock(0).data[i]['BUNKER_NO']);
            // bunker[i].push(res.getBlock(0).data[i]['BUNKER_NO']);
            // bunker[i].push(res.getBlock(0).data[i]['MAT_CODE']);
            // bunker.push(res.getBlock(0).data[i]['BUNKER_NO']);
            // bunker.push({
            //   BUNKER_NO: res.getBlock(0).data[i]['BUNKER_NO'],
            //   MAT_CODE: res.getBlock(0).data[i]['MAT_CODE'],
            //   MAT_NAME: res.getBlock(0).data[i]['MAT_NAME'],
            //   STOCK_WT: res.getBlock(0).data[i]['STOCK_WT']
            // });
            if (res.getBlock(0).data[i]['BUNKER_NO'] == 'N29')
            {
              console.log("n29", res.getBlock(0).data[i]['STOCK_WT']);
            }

          }
        }
        );

    }
    onMounted(() => {
    });

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

    const F2_DO = async (e: any) => { 
      // QueryBunker();
      window.location.reload();
     };
    const F3_DO = async (e: any) => { 
      const selectedRows = erFormHelper.getGridCurrentRow('gridView1',false);
      // popFreeAdd.ReceiveData(selectedRows);
      // ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
      //   if(popFreeAdd.getEvent('ok'))
      //   {
      //     // queryData(e);
      //   }
      // })
    };
    return {
      erFormHelper,
      initializeFlag,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      F2_DO,
      F3_DO,
      gridView1,
      gridView2,
      GridView1FocusChanged,
      bunker,
      bunker_rate,
      bunker_mat_code,
      bunker_mat_name,
      bunker_mat_type,
      bunker_stock_wt,
      buiker_stock_wt,
      bunker_bunker_no,
      butClick,
      dbbutClick,
      showContextMenu
    };
  }
});
