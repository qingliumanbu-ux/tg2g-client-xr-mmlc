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
  name: 'MMSM54BVS2N',
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
    // const formPartition = formParams.formPartition;
    const initializeService = '';

    // 变量定义
    // const formName = 'MMSM54BVS2N';
    // const erFormHelper = reactive(new ErFormHelper());
    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);

    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    let gridView5: any;
    let formName :string;
    let formPartition: string;

    const efFormReady = (e: any) => {
      console.log("11111");
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = 'MMSM54BVS2N';
      console.log('efFormInfo.value.formPartition',efFormInfo.value.formPartition);
      console.log('efFormInfo.value.formName',efFormInfo.value.formName);
      nextTick(() => {
        initializePage();
        // MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
        // MX_LC_G.value.push(' ', ' ', ' ', ' ', ' ');
      });
    };
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid('gridView1');
      erFormHelper.setGridEditable('GridView1', false); // 设置grid不可编辑
    };
    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid('gridView2');
      erFormHelper.setGridEditable('GridView2', false); // 设置grid不可编辑
    };
    const erGrid3Ready = () => {
      gridView3 = erFormHelper.getGrid('gridView3');
      erFormHelper.setGridEditable('GridView3', false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid('gridView4');
      erFormHelper.setGridEditable('GridView4', false); // 设置grid不可编辑
    };
    const erGrid5Ready = () => {
      gridView5 = erFormHelper.getGrid('gridView5');
      erFormHelper.setGridEditable('GridView5', false); // 设置grid不可编辑
    };

    // const setToolbarVisible1 = (visible: boolean) => {
    //   erFormHelper.setGridToolbarVisible('gridView5', [{ name: 'addrow', visible: visible },
    //   { name: 'copyrow', visible: visible },
    //   { name: 'delete', visible: visible }]);
    // };

// const InitialToolbar = () => {
//       gridToolbar.value = erFormHelper.getGridToolbar([
//         { name: 'excel', visible: true },
//         { name: 'addrow', visible: true },
//         { name: 'copyrow', visible: true },
//         { name: 'delete', visible: true }
//       ]);
// };

    const query = async () => {
      const inInfo = new EI.EIInfo();
      const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());

      const Query = erFormHelper.getAllControlValueAsEiBlock('layoutControlGroup1');
      inInfo.addBlock(Query, 'Table1');
      //  eiBlock.pushData(
      //   {
      //     // BUNKER_NO: GL_LC.value.name,
      //     // BUNKER_NO_ORIGINAL: DL_LC.value.name,
      //     // STOCK_WT: box_wt.value
      //   },
      //   true
      // );
      // inInfo.addBlock(eiBlock);

        console.log("11111",inInfo);
      const outInfo = await erFormHelper.callService('mmsm54_inq', inInfo,true, false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        console.log("111222333",outInfo.getBlock(0));
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      // EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
      //   .then((res: EI.EIInfo) => {
      //     for (let i = 0; i < res.getBlock(0).data.length; i++) {
      //       MX_LC_G.value.length = 0;
      //       MX_LC_G.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
      //         res.getBlock(0).data[i]["MAT_CODE"],
      //         res.getBlock(0).data[i]["MAT_NAME"],
      //         res.getBlock(0).data[i]["STOCK_WT"],
      //         res.getBlock(0).data[i]["MAT_TYPE"]);
      //     }
      //   }
      //   );
    }
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(formPartition, formName, '', initializeService);
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // InitialToolbar();
        // setToolbarVisible1(false);
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
            // gridView5 = erFormHelper.getKendoGrid('gridView5');
          erFormHelper.setGridEditable('gridView5', false);

          // 获取画面上的主要控件信息
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    // onMounted(() =>   {
    //   initializePage();
    // });
    const F2_DO = async (e: any) => {  query();};
    const F3_DO = async (e: any) => { };
        const F3_PRE_DO = async (e: any) => {
      //设置编辑状态为可编辑
      erFormHelper.setGridEditable('gridView5', true);
    };

    const F3_CANCEL = async (e: any) => {
      // editable.value = false;
       erFormHelper.setGridEditable('gridView5', false);
      // queryMainGrid();
    };
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      F3_CANCEL,
      F3_PRE_DO,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridView5,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      efFormReady,
      gridToolbar
      // butClick,
      // bunker_g,
      // bunker_d,
      // GL_Change,
      // DL_Change,
      // GL_LC,
      // DL_LC,
      // MX_LC_G,
      // box_wt,
      // MX_LC_D
    };
  }
});
