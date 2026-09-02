import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
import { EI, EIManager } from 'EIX/ei';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import ErPopFree from 'ERX/ErPopFree';
import ErPopQuery from 'ERX/ErPopQuery';
import { PopQueryReturnInfo, PopFreeReturnInfo } from 'ERX/er-type';
import { Logger } from '@ag-grid-community/core';

export default defineComponent({
  name: 'MMSMACSHS2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    ErPopFree,
    ErPopQuery
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    let i_form_ename = ''; // 低代码配置画面布局名
    let formPartition: string;
    let formName: '';
    let PROGRAM_NAME: string;
    const initializeService = '';

    // 变量定义
    const initializeFlag = ref(0);
    let popFreeEdit: ER.PopFreeHelper;
    let gridView1: any;
    const grid_view_1 = ref('GridView1');
    let gridView2: any;
    const grid_view_2 = ref('GridView2');
    const gridToolbar: Ref<any[]> = ref([]);
    let cs_OkClick = '';
    const i_service_f4 = 'mmsmacshf4_pro';

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log('efFormInfo', formName);
      if (efFormInfo.value.formParams?.PROGRAM_NAME) {
        PROGRAM_NAME = efFormInfo.value.formParams['PROGRAM_NAME'];
      }
      initializePage();
    };

    const erFormHelper: ER.FormHelper = new ER.FormHelper();

    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(formPartition, formName, i_form_ename, initializeService);
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        InitialToolbar();

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
          //设置grid不可编辑
          erFormHelper.setGridEditable('GridView1', false);
          erFormHelper.setGridEditable('GridView2', false);
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    // 自定义工具栏按钮功能
    const InitialToolbar = () => {
      /* gridToolbar.value = erFormHelper.getGridToolbar([
        { name: 'excel', visible: true },
        {
          name: 'addrow',
          visible: false
        },
        { name: 'copyrow', visible: false },
        { name: 'delete', visible: false }
        // { name: 'save', visible: false },
        // { name: 'cancel', visible: false }
      ]); */
    };

    const setToolbarVisible = (configId: string, visible: boolean) => {
      erFormHelper.setGridToolbarVisible(configId, {
        addrow: visible,
        copyrow: visible,
        delete: visible
      });
    };

    //自定义模板参数
    const popFreeEdit_pars = async (Click_name: string) => {
      popFreeEdit = new ER.PopFreeHelper(formPartition, 'MMSM_DIALOG', 'MMSMAOD_LAYOUT_DIALOG');
    };
    //弹出界面OK按钮点击事件
    const popFreeEditOkClick = async (e: PopFreeReturnInfo) => {
      let i_service: any;
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();

      if (cs_OkClick === 'F4') {
        i_service = i_service_f4;
      }

      inInfo.addBlock(erFormHelper.convertModelAsBlock(e.dataModel));
      console.log('111111', inInfo);
      outInfo = await erFormHelper.callService(i_service, inInfo, true, true, true);

      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess('操作成功！');
      }
      queryMainGrid();
    };

    //grid实例
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid(grid_view_1.value);
      gridView1.gridOptions.getRowStyle = (params: any) => {
        if (params.data.RCV_MAT_FLAG.toString().trim() === '1') {
          return {
            fontweight: 'bold',
            background: 'orange'
          };
        }
      };
      erFormHelper.setGridEditable(grid_view_1.value, false);
      erFormHelper.setGridToolbarVisible(grid_view_1.value, {
        addrow: false,
        copyrow: false,
        excel: true
      });
    };

    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid(grid_view_2.value);
      gridView2.gridOptions.getRowStyle = (params: any) => {
        /*  if (params.data.RCV_MAT_FLAG.toString().trim() === '1') {
          return {
            fontweight: 'bold',
            background: 'orange'
          };
        } */
      };
      erFormHelper.setGridEditable(grid_view_2.value, false);
      erFormHelper.setGridToolbarVisible(grid_view_2.value, {
        addrow: false,
        copyrow: false,
        excel: true
      });
    };

    // 查询主表炉次信息
    const queryMainGrid = async () => {
      const eiInfo = new EI.EIInfo();
      const queryConditionEiBlock: EI.EiBlock = erFormHelper.getAllControlValueAsEiBlock('layoutControlGroup1', {
        // FACTORY_DIV: pagePara.factory_div,
        FACTORY_DIV: ' ',
        TABLE_TYPE: 'TMMSM01'
      });
      eiInfo.addBlock(queryConditionEiBlock);
      const outInfo = await erFormHelper.callService('mmsmacshf2_inq', eiInfo, true, false, true);
      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, 'GridView1', true);
        queryZDSHGL();
      }
    };

    const queryZDSHGL = async () => {
      const eiInfo = new EI.EIInfo();
      const outInfo = await erFormHelper.callService('mmsmacshf2_inq1', eiInfo, true, false, true);
      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
      } else {
        erFormHelper.mergeDataToGrid(outInfo, 'GridView2', true);
      }
    };

    const GridView1FocusChanged = (e: any) => {
      console.log('e.dataModel11111', e.field);
      if (erFormHelper.isGridRowChecked('GridView1', e.rowIndex)) {
        console.log('e.dataModel', e.dataModel);
      }

      if (e.field == 'RCV_MAT_FLAG') {
        console.log('e.field', e.data[0]['RCV_MAT_FLAG']);
      }
      //erFormHelper.unCheckAllGridRow('GridView1');
    };

    const GridView1dblclick = (e: any) => {
      gridView1 = erFormHelper.getGridCurrentRow(grid_view_1.value);
      erFormHelper.checkGridRow('GridView1', gridView1);
    };
    const GridView2dblclick = (e: any) => {
      gridView2 = erFormHelper.getGridCurrentRow(grid_view_2.value);
      erFormHelper.checkGridRow('GridView2', gridView2);
    };

    onMounted(() => {});

    const F2_DO = async (e: any) => {
      queryMainGrid();
    };

    //关闭自动收货
    const F3_DO = async (e: any) => {
      const confirm = await erFormHelper.messageConfirm('是否关闭自动收货功能？');
      if (confirm) {
        const eiInfo = new EI.EIInfo();
        const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock('GridView1', {});
        const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
        const outInfo = await erFormHelper.callService('mmsmacshf3_pro', eiInfo, true, false, true);
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError('处理失败:' + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess('处理成功');
          queryMainGrid();
        }
      }
    };
    const F3_PRE_DO = async (e: any) => {};
    const F3_CANCEL = async (e: any) => {};

    //收货确认
    const F4_DO = async (e: any) => {
      if (erFormHelper.getGridCheckedRows('GridView1').length === 0) {
        erFormHelper.messageWarning('请先选择一条数据进行操作！');
        //queryMainGrid();
        return false;
      }
      erFormHelper.stopGridEditing('GridView1', async () => {
        const mainGridCheckedRow = erFormHelper.getGridCheckedRowsAsBlock('GridView1');
        //获取选中行信息
        //const mainGridCheckedRow = erFormHelper.getGridCheckedRows('GridView1', true);
        console.log('mainGridCheckedRow', mainGridCheckedRow, mainGridCheckedRow.data.length);
        for (let i = 0; i < mainGridCheckedRow.data.length; i++) {
          if (mainGridCheckedRow.data[i]['RCV_MAT_FLAG'] == '1') {
            erFormHelper.messageWarning('选中记录已收货确认，不允许修改收货操作！');
            return;
          }
        }
        console.log('for循环结束');

        const eiInfo = new EI.EIInfo();
        eiInfo.addBlock(mainGridCheckedRow);

        const outInfo = await erFormHelper.callService(i_service_f4, eiInfo, true, false, true);
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
          return false;
        } else {
          // 隐藏工具栏按钮
          setToolbarVisible('GridView1', false);

          //设置grid不可编辑
          erFormHelper.setGridEditable(grid_view_1.value, false);
          queryMainGrid();
        }
      });

      /*  cs_OkClick = 'F4';
      popFreeEdit_pars(cs_OkClick);
      popFreeEdit.ReceiveData(mainGridCheckedRow);
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick); */
    };

    const F4_PRE_DO = async (e: any) => {
      queryMainGrid();
      erFormHelper.setGridEditable(grid_view_1.value, true);
      //setToolbarVisible('GridView1', true);
    };
    const F4_CANCEL = async (e: any) => {
      erFormHelper.setGridEditable(grid_view_1.value, false);
      //setToolbarVisible('GridView1', false);
      queryMainGrid();
    };

    //收货取消
    const F5_DO = async (e: any) => {
      if (erFormHelper.getGridCheckedRows('GridView1').length === 0) {
        erFormHelper.messageWarning('请先选择一条数据进行操作！');
        return false;
      } else {
        // 删除提示
        const confirm = await erFormHelper.messageConfirm('是否将选择的信息进行相关操作？');
        if (confirm) {
          const eiInfo = new EI.EIInfo();
          const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock('GridView1', {});
          const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
          const outInfo = await erFormHelper.callService('mmsmacshf5_pro', eiInfo, true, false, true);
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError('处理失败:' + outInfo.sys.msg);
          } else {
            erFormHelper.messageSuccess('处理成功');
            erFormHelper.setGridEditable(grid_view_1.value, false);
            queryMainGrid();
          }
        }
      }
    };

    const F5_PRE_DO = async (e: any) => {};
    const F5_CANCEL = async (e: any) => {};

    //发送板坯数据  ---- 暂时更改为 自动收货开关管理
    const F6_DO = async (e: any) => {
      /*  if (erFormHelper.getGridCheckedRows('GridView1').length === 0) {
        erFormHelper.messageWarning('请先选择一条数据进行操作！');
        return false;
      } else {
        // 删除提示
        const confirm = await erFormHelper.messageConfirm('是否将选择的信息进行相关操作？');
        if (confirm) {
          const eiInfo = new EI.EIInfo();
          const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock('GridView1', {});
          const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
          const outInfo = await erFormHelper.callService('mmsmacshf6_pro', eiInfo, true, false, true);
          if (outInfo.sys.status < 0) {
            erFormHelper.messageError('处理失败:' + outInfo.sys.msg);
          } else {
            erFormHelper.messageSuccess('处理成功');
            queryMainGrid();
          }
        }
      } */
      if (erFormHelper.getGridCheckedRows('GridView2').length === 0) {
        erFormHelper.messageWarning('请先选择一条数据进行操作！');
        return false;
      } else {
        // 删除提示
        const eiInfo = new EI.EIInfo();
        const checkedRowEiBlock = erFormHelper.getGridCheckedRowsAsBlock('GridView2', {});
        const eiBlock = eiInfo.addBlock(checkedRowEiBlock);
        console.log('checkedRowEiBlock', checkedRowEiBlock);
        const outInfo = await erFormHelper.callService('mmsmacshf6_pro', eiInfo, true, false, true);
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError('处理失败:' + outInfo.sys.msg);
        } else {
          erFormHelper.messageSuccess('处理成功');
          erFormHelper.setGridEditable(grid_view_2.value, false);
          queryMainGrid();
        }
      }
    };

    const F6_PRE_DO = async (e: any) => {
      queryMainGrid();
      erFormHelper.setLayoutCaption;
      erFormHelper.setGridEditable(grid_view_2.value, true);
    };
    const F6_CANCEL = async (e: any) => {
      erFormHelper.setGridEditable(grid_view_2.value, false);
      queryMainGrid();
    };

    return {
      erGrid2Ready,
      GridView2dblclick,
      GridView1dblclick,
      erFormHelper,
      initializeFlag,
      gridToolbar,
      efFormReady,
      erGrid1Ready,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      F4_DO,
      F4_PRE_DO,
      F4_CANCEL,
      F5_DO,
      F5_PRE_DO,
      F5_CANCEL,
      GridView1FocusChanged,
      F6_DO,
      F6_PRE_DO,
      F6_CANCEL
    };
  }
});
