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

export default defineComponent({
  name: 'MMSM832S2N',
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
    // const formParams = EFFormInfo.getFormParams();
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    // const formPartition = formParams.formPartition;
    const initializeService = '';
    const gridToolbar: Ref<any[]> = ref([]);
    const detailTabsRef = ref<any>(null);
    const bunker_g = reactive(new Array);
    const bunker_d = reactive(new Array);
    const box_wt = ref(0);
    // 变量定义
    // const formName = 'MMSM831V';
    // const erFormHelper = reactive(new ErFormHelper());
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    let formName :string;
    let formPartition: string;
    // let gridView1!: kendo.ui.Grid;
    // let gridView2!: kendo.ui.Grid;
    // let gridView3!: kendo.ui.Grid;
    // let gridView4!: kendo.ui.Grid;
    // 料仓代码，物料代码，物料名称，重量，物料类型
    const MX_LC_G = ref(new Array);
    const MX_LC_D = ref(new Array);
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
        MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
        MX_LC_G.value.push(' ', ' ', ' ', ' ', ' ');
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
    // 查询高位料仓和低位料仓并且返回给下拉框
    const queryLC = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_TYPE: '2'
        },
        true
      );

      const outInfo = await erFormHelper.callService('mmsm85_bunker_inq', inInfo, true,false, true);
       if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
      }
    }
    const queryLCdata_D = async () => {

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
         FACTORY_DIV: 'A10'
        },
        true
      );
      EIManager.callService(formPartition, 'pssmd1_inq2', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            bunker_d.push(
              {
                id: i,
                name: res.getBlock(0).data[i]['STATION']
              })
          }
          console.log('1111',bunker_d);
        }
        );
    }



    const butClick = async () => {
      if (DL_LC.value.name === '') {
        erFormHelper.messageError("请选择工位");
        return;
      }
      if (box_wt.value === 0) {
        erFormHelper.messageError("请输入重量");
        return;
      }
      let inInfo = new EI.EIInfo();
      if (erFormHelper.getGridCheckedRows(gridView1).length === 0) {
        erFormHelper.messageWarning('请选择一条信息进行操作');
      } else {
       const bunker_Message = erFormHelper.getGridCheckedRowsAsBlock(gridView1);

        const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          WEIGH_NO: bunker_Message.data[0]['WEIGH_NO'],
          MAT_CODE: bunker_Message.data[0]['WEIGH_NO'],
          STOCK_WT: box_wt.value,
          DEV_CODE: DL_LC.value.name
        },
        true
      );

        const outInfo = await erFormHelper.callService('mmsm832_ins', inInfo, true,false, true);
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError(outInfo.sys.msg);
        }
      }
    }
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(efFormInfo.value.formPartition, 'MMSM832S2N', '', initializeService);
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
          queryLCdata_D();
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    // onMounted(() => {
    //   initializePage();
    //   MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
    // });

    const F2_DO = async (e: any) => { queryLC; };
    const F3_DO = async (e: any) => { };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      efFormReady,
      gridView1,
      gridView2,
      erGrid1Ready,
      erGrid2Ready,
      // gridView3,
      // gridView4,
      gridToolbar,
      butClick,
      bunker_g,
      bunker_d,
      DL_LC,
      // MX_LC_G,
      box_wt,
      MX_LC_D
    };
  }
});
