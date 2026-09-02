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
  name: 'MMSM861V',
  components: {},
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const initializeService = '';

    // 变量定义
    const formName = 'MMSM861V';
    // let formName :string;
    let formPartition: string;
    // const erFormHelper = reactive(new ErFormHelper());
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const editable = ref(false);
    let wt = ref(0);
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    const MMSM85 = ref({
      STOCK_WT: 0
    });

    const gridToolbar: Ref<any[]> = ref([]);

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        '',
        initializeService
      );
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        //设置在gridview1中进行分页查询
        // InitialToolbar();
        // //设置维护不展示
        // setToolbarVisible1(false);
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          // gridView1 = erFormHelper.getKendoGrid('gridView1');
          // gridView2 = erFormHelper.getKendoGrid('gridView2');
          // gridView3 = erFormHelper.getKendoGrid('gridView3');
          // gridView4 = erFormHelper.getKendoGrid('gridView4');
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };

    //查询计量单信息和退货订单信息(根据条件同时查询)
    const queryGridView1 = async () => {
      const eiInfo = new EI.EIInfo();
      //console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService('mmsm861v_inq', eiInfo, true, false, true);

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
      } else {
        // erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView1');
        //console.log('outInfo', outInfo);
        //erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), 'GridView1');
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        // erFormHelper.mergeDataToGrid(outInfo.getBlock(1), gridView3);
      }
    };

    // 主表1焦点行事件-查询子表明细信息
    const GridView1FocusChanged = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData(gridView2); // 清空子表数据

        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo({
            BUNKER_NO: e.data.get('BUNKER_NO')
          });
          MMSM85.value.STOCK_WT = e.data.get('STOCK_WT');
        }
      }
    };

    // 查询子表1明细信息
    const queryDetailInfo = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo1 = new EI.EIInfo();
      const eiBlock1 = eiInfo1.addBlock(new EI.EiBlock());
      eiBlock1.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService('mmsm861v_inq1', eiInfo1, true, false, true);

      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView2);
        // erFormHelper.setControlValue('STOCK_WT', 'STOCK_WT', outInfo1.getBlock(0));
        // console.log('STOCK_WT', 1);
      }
    };

    // 主表2焦点行事件-查询子表明细信息
    const GridView1FocusChanged1 = async (e: any) => {
      if (!e.data) {
        erFormHelper.clearGridData(gridView4); // 清空子表数据
        return;
      }
      if (e && e.rowChanged) {
        if (e.data) {
          queryDetailInfo1({
            BUNKER_NO: e.data.get('BUNKER_NO')
          });
          queryDetailInfo3({
            MAT_CODE: e.data.get('MAT_CODE')
          });
        }
      }
    };

    const closeClick = () => {
      const data = {
        // name: formName,
        closeEfDialog: true
      };
    };

    // 查询子表2明细信息
    const queryDetailInfo1 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo2 = new EI.EIInfo();
      const eiBlock2 = eiInfo2.addBlock(new EI.EiBlock());
      eiBlock2.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService('mmsm861v_inq2', eiInfo2, true, false, true);
      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView4);
      }
    };

    const queryDetailInfo3 = async (currentRowInfo: any) => {
      // 加料信息
      const eiInfo2 = new EI.EIInfo();
      const eiBlock2 = eiInfo2.addBlock(new EI.EiBlock());
      eiBlock2.pushData({ ...currentRowInfo }, true);
      const outInfo1 = await erFormHelper.callService('mmsm861v_inq', eiInfo2, true, false, true);
      if (outInfo1.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo1.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo1.getBlock(0), gridView3);
      }
    };

    //刷新按钮
    const querySX = async () => {
      console.log('wt', wt);
      queryGridView1();
    };

    //退料
    const TLupd = async (e: any) => {
      if (erFormHelper.getGridCheckedRows(gridView1).length === 0) {
        erFormHelper.messageWarning('请选择一条信息再退料');
      } else {
        const confirm = await erFormHelper.messageConfirm('是否将选择的信息进行相关操作？');
        if (confirm) {
          const eiInfo = new EI.EIInfo();
          const mainGridCheckedRow = erFormHelper.getGridCheckedRowsAsBlock(gridView2); // 获取主表勾选行
          console.log('mainGridCheckedRow', mainGridCheckedRow);
          eiInfo.addBlock(mainGridCheckedRow);

          const eiBlock1 = new EI.EiBlock('ASD');
          eiBlock1.pushData({ STOCK_WT: wt.value }, true);
          eiInfo.addBlock(eiBlock1);

          const mainGridCheckedRow1 = erFormHelper.getGridCheckedRowsAsBlock(gridView4); // 获取主表勾选行
          eiInfo.addBlock(mainGridCheckedRow1, 'Grid2');
          console.log('eiInfo', eiInfo);
          const outInfo = await erFormHelper.callService('mmsm861v_upd', eiInfo,true,false,true);
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError('退料失败:' + outInfo.sys.msg);
          } else {
            erFormHelper.messageSuccess('退料成功');
          }
        }
      }
    };

    // //自定义工具栏按钮功能
    // const InitialToolbar = () => {
    //   gridToolbar.value = erFormHelper.getGridToolbar([
    //     { name: 'addrow', visible: false },
    //     { name: 'copyrow', visible: false },
    //     { name: 'delete', visible: false },
    //     { name: 'cancel', visible: false },
    //     { name: 'save', visible: false },
    //     { name: 'excel', visible: true }
    //   ]);
    // };

    // //自定义工具栏是否可用
    // const setToolbarVisible1 = (visible: boolean) => {
    //   erFormHelper.setGridToolbarVisible('gridView1', [
    //     { name: 'addrow', visible: visible },
    //     { name: 'copyrow', visible: visible },
    //     { name: 'delete', visible: visible },
    //     { name: 'cancel', visible: visible }
    //   ]);
    // };

    onMounted(() => {
      initializePage();
    });

    const F2_DO = async (e: any) => {
      queryGridView1();
    };
    const F3_PRE_DO = async (e: any) => {
      // setToolbarVisible1(true);
      //设置编辑状态为可编辑
      erFormHelper.setGridEditable('GridView1', true);
    };

    const F3_CANCEL = async (e: any) => {
      editable.value = false;
      // setToolbarVisible1(editable.value);
      erFormHelper.setGridEditable('GridView1', false);
      queryGridView1();
    };
    const F3_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      //获取增删改行的数据
      const created = erFormHelper.getGridRowsAsBlock(gridView1, 'add');
      eiInfo.addBlock(created, 'MMSM85_INS');
      //获取修改行的数据
      const modified = erFormHelper.getGridRowsAsBlock(gridView1, 'modify');
      eiInfo.addBlock(modified, 'MMSM85_UPD');
      //获取删除行的数据
      const deleted = erFormHelper.getGridRowsAsBlock(gridView1, 'delete');
      eiInfo.addBlock(deleted, 'MMSM85_DEL');
      console.log('eiInfo', eiInfo);
      const outInfo = await erFormHelper.callService('mmsm861v_pro', eiInfo, true, false, true);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
        return false;
      } else {
        // 隐藏工具栏按钮
        // setToolbarVisible1(false);
        erFormHelper.setGridEditable('gridView1', false);
        queryGridView1();
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      // InitialToolbar,
      GridView1FocusChanged,
      GridView1FocusChanged1,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      gridToolbar,
      MMSM85,
      TLupd,
      querySX,
      wt,
      closeClick
    };
  }
});
