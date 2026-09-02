import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
import { EI, EIManager } from 'EIX/ei';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import { useRoute, useRouter } from 'vue-router';
import MMSM81ADDV from '../MMSM81ADDV/MMSM81ADDV.vue';
// import EFCallForm from 'EFX/EFCallForm';
import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";
import xrEfDialog from "EFX/xrEfDialog";
export default defineComponent({
    name: 'MMSM81VT',
    components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    // EFCallForm,
    MMSM81ADDV
  },
    setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const route = useRoute(); //获取跳转参数


    const initializeService = '';
    // 获取tab页组件的ref和实例
    const detailTabsRef = ref<any>(null);
    // 变量定义
    // const formName = 'MMSM81VT';
    let formPartition: string;
    let formName: string;
    const i_func_id_q = ref('');
    let s_BUNKER_TYPE: any;

    //20250417bywcm
    const unit_weight = ref(new Array);


    const $router = useRouter();
    const initializeFlag = ref(0);
    const gridToolbar: Ref <any[]> = ref([]);
//20250417bywcm
const initPage = async() => {
  let resTable = erFormHelper.querySql(
    '',
    ` SELECT CODE FROM TWMSMZD02 WHERE REC_CREATE_TIME =(SELECT MAX(REC_CREATE_TIME) REC_CREATE_TIME FROM TWMSMZD02 t WHERE CODE_CLASS = 'LCSHDZ') `
  );
console.log("1111",(await resTable).getBlock(0).data);
unit_weight.value.push((await resTable).getBlock(0).data[0]["CODE"]?.toString());
}
    const efFormReady = (e: any) => {

    console.log('145551111', 1111);
    efFormInfo.value = e.formInfo;
    formPartition = efFormInfo.value.formPartition; // 分区
    formName = efFormInfo.value.formName; // 当前画面名
    console.log('eformPartition', formPartition);
    console.log('formName', formName);
    dialogVisible.value = false;
    initializePage();
    //20250417bywcm
    initPage();
};
    const valueChanged = async(e: any) => {
    // 质检批查询
    if (e.itemCode === "I_BILLTYPE" || e.itemCode === "UNIT_WEIGHT") {
        const X_1 = erFormHelper.getControlValue('LayoutGroupFilter1', 'I_BILLTYPE');
        const X_2 = erFormHelper.getControlValue('LayoutGroupFilter1', 'UNIT_WEIGHT');
        erFormHelper.setControlValue("LayoutGroupFilter1", "DEDUCT_WGT", X_1 * X_2); 
      }
};
    // 获取画面相关配置信息
    const efFormInitialized = (formInfo: any) => {
    console.log('efFormInitialized', formInfo);
    nextTick(() => {
        // initializePage();
    });
};
    // 自定义工具栏按钮功能

    const parentInfo = ref({});
    const xrEfDialogRef = ref<any>(null);
    // const parentInfo = ref(props.parentInfo); // 获取父画面传入参数
    //物料代码
    // const MAT_CODE = parentInfo.value?.MAT_CODE;
    // const MAT_NAME = parentInfo.value?.MAT_NAME;
    // const QUALITY_BATCH_NO = parentInfo.value?.QUALITY_BATCH_NO;
    // const WEIGH_NO = parentInfo.value?.WEIGH_NO;

    const dialogVisible = ref(false);
    const openXrEfDialog = () => {
    dialogVisible.value = true;
};
    // 关闭弹框监听
    const xrEfDialogClose = () => {
    queryMainGrid(true); // 关闭弹框后查询主表
};
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {

    if (info.close) {
        console.log('获取弹窗画面传递过来的信息', info);
        console.log('获取弹窗画面传递过来的信息', info.BUNKER_NO);
        console.log('获取弹窗画面传递过来的信息', info.MAT_CODE);
        console.log('获取弹窗画面传递过来的信息', info.WEIGH_NO);
        console.log('获取弹窗画面传递过来的信息', info.info.AUART);
        erFormHelper.setControlValue('LayoutGroupFilter1', 'BUNKER_NO', info.BUNKER_NO);

        // if(info.AUART==''||info.AUART==' ')
        // {
        //   if(info.AUART =="配送" )
        //   {
        //     i_func_id_q.value = "LayoutGroupFilter2";
        //   } 
        //   if(info.AUART =="直供" )
        //   {
        //     i_func_id_q.value = "LayoutGroupFilter1";
        //   }
        // }else{
        //   i_func_id_q.value = "LayoutGroupFilter1";
        // }
        // i_func_id_q.value = "LayoutGroupFilter1";

        // if(info.getBlock(0).data.length>0)
        // {
        // console.log('获取弹窗画面传递过来的信息11111', info.blocks(0).data[0]['BUNKER_NO']); 
        // erFormHelper.setControlValueEx('LayoutGroupFilter1','BUNKER_NO',info.data[0]['BUNKER_NO'])
        // }  
        dialogVisible.value = false; // 关闭弹框
    }
};
    // 画面相关数据初始化
    const initializePage = async() => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        'MMSM81VT',
        '',
        ''
        );

    if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        console.log('1123');
        //初始化工具栏
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
            // 获取画面上的主要控件信息
            //handleEfDialogMessage();
            // queryMainGrid();
            console.log('跳转参数', route.query);
            // console.log('q1', route.query.BUNKER_TYPE);
            s_BUNKER_TYPE = route.query.BUNKER_TYPE;
            if (route.query.MAT_CODE) {
                erFormHelper.setControlValueEx('LayoutGroupFilter1', route.query);
            }
        });
    } else {
        erFormHelper.messageError(
            'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
            );
    }
    };
    const handleEfDialogMessage = () => {
    console.log('进来了');
};

    // grid工具栏按钮点击事件自定义
    const toolbarClick = (event: any, configId: string) => {
    if (event.name === 'addrow') {
        const gridData = erFormHelper.getGridAllRows(configId);
        const currentRow = gridData[gridData.length - 1];
        //currentRow.set('MAT_CODE', parentInfo.value?.MAT_CODE);
        //currentRow.set('QUALITY_BATCH_NO', parentInfo.value?.QUALITY_BATCH_NO);

        const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter1');
        currentRow.set('MAT_CODE', eiBlock.data[0]['MAT_CODE']?.toString());
        currentRow.set('QUALITY_BATCH_NO', eiBlock.data[0]['QUALITY_BATCH_NO']?.toString());
      }
};
    const queryMainGrid = async(currentRowInfo: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter1');
    eiInfo.addBlock(eiBlock, '');

    if (
        eiBlock.data[0]['MAT_CODE']?.toString() === '' &&
        eiBlock.data[0]['QUALITY_BATCH_NO']?.toString() === ''
      )
        return;
      const outInfo = await erFormHelper.callService('mmsm81al_inq', eiInfo, true, false, true);
    if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
    } else {
        erFormHelper.mergeDataToGrid(outInfo, 'gridView1', true);
    }
    };
onMounted(() => {
    // initializePage();
});

    const F2_DO = async(e: any) => {
      const qmBatch = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter1');
    if (qmBatch.data[0]['QUALITY_BATCH_NO'] === '') {
        erFormHelper.messageWarning('质检批号为空，请录入！');
        return;
    }
    if (qmBatch.data[0]['MAT_CODE'] === '') {
        erFormHelper.messageWarning('物料代码为空，请录入！');
        return;
      }
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      const LayoutGroupFilter1 = erFormHelper.getAllControlValue('LayoutGroupFilter1');
      const obj: any = {
        ...LayoutGroupFilter1,
        PROC_DIV: 'I'
      };
    eiBlock.pushData(obj, true);
      const outInfo = await erFormHelper.callService('mmsm81ah_upd', eiInfo, true, false, true);

    // 判断调后台是否失败
    if (outInfo.sys.status < 0) {
        erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
    } else {
        erFormHelper.messageSuccess('保存成功');
        //同时录成分 不关闭弹窗
        //closeEfDialog();
    }
    };

    const dialogFormName = ref(''); // 弹出画面的画面名
    const F3_DO = async(e: any) => {
    console.log('进来了1', s_BUNKER_TYPE);
      //   EFCallForm('MMSM81ADDV',{});
      let mat_wt;
      const bunker_Message = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter1');
    console.log("111", bunker_Message);
    if (bunker_Message.data[0]['NET_WT'] != 0) {
        mat_wt = bunker_Message.data[0]['NET_WT'];
    }
    else {
        // mat_wt= bunker_Message.data[0]['STOCK_WT'],
        mat_wt = bunker_Message.data[0]['STOCK_WT'];
    }

    // const Query = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');

    // inInfo.addBlock(Query);
    // //let ss = inInfo.blocks.Table1.data[0].START_TIME;
    // //let ss = inInfo.blocks.Table1;
    // let ss = inInfo.getBlock(0).data[0]['START_TIME'];

    console.log('进来了2', mat_wt);
      const data = {
        MAT_CODE: bunker_Message.data[0]['MAT_CODE'],
        WEIGH_NO: bunker_Message.data[0]['WEIGH_NO'],
        STOCK_WT: mat_wt,
        BUNKER_TYPE: s_BUNKER_TYPE,
        BUCKLE_WT: bunker_Message.data[0]['BUCKLE_WT'],
        BACK_CODE_5: bunker_Message.data[0]['BACK_CODE_5'],
        UNLOAD_POINT_CODE: bunker_Message.data[0]['UNLOAD_POINT_CODE']
    };
    console.log("111", data);
    dialogFormName.value = 'MMSM81ADDV'; // 读配置表获取画面名

    parentInfo.value = data;

    // 打开新增弹出画面
    // openEfDialog(dialogFormName, data, {
    //   height: 800,
    //   width: 1200
    // });
    openXrEfDialog();
};

    const F4_DO = async(e: any) => {

      let bunker_Message = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter1');
    bunker_Message.addBlock(eiBlock);
    console.log("111", bunker_Message);
      const mes_res = await erFormHelper.messageConfirm('是否确认选择料仓收货？');
    if (!mes_res)
    { } else {
        bunker_Message.addBlock(eiBlock);
        // EIManager.callService(formParams, 'mmsm81f3_ins', bunker_Message);
        const outInfo = await erFormHelper.callService('mmsm81f3_ins', bunker_Message, true, false, true);
        if (outInfo.sys.status < 0) {
            erFormHelper.messageError('收货有误:' + outInfo.sys.msg);
        }
    }

    // (formName, 'mmsm81f3_ins', bunker_Message);
    // ('mmsm81ah_upd', eiInfo, false, false, true);
    // $router.getRoutes();
    // $router.back();
    // $router.go(-1);
};
    // 点击关闭按钮，绑定事件closeEfDialog
    // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名 
    // const closeEfDialog = () => {
    //   const data = {
    //     // name: formName,
    //     close: true
    //   };
    //   emit('getChildInfo', data);
    // };
    return {
      detailTabsRef,
      dialogVisible,
      i_func_id_q,
      efFormReady,
      erFormHelper,
      initializeFlag,
      xrEfDialogRef,
      dialogFormName,
      parentInfo,
      getChildInfo,
      toolbarClick,
      F2_DO,
      F3_DO,
      F4_DO,
      xrEfDialogClose,
      valueChanged,
      openXrEfDialog
    };
  }
});