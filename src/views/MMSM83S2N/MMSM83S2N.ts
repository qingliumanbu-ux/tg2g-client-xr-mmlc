
import { computed, defineComponent, onMounted, reactive, ref, watch, toRaw, nextTick, Ref } from 'vue';
import { EI, EIManager } from 'EIX/ei';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import ErPopFree from "ERX/ErPopFree";
import { useRoute, useRouter } from 'vue-router';
import MMSM81POP from '../MMSM81POP/MMSM81POP.vue';
// import EFCallForm from 'EFX/EFCallForm';
import EFDialogForm, { EFDialogFormMessage } from "EFX/EFDialogForm";
import xrEfDialog from "EFX/xrEfDialog";
export default defineComponent({
  name: 'MMSM83S2N',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree,
    // EFCallForm,
    MMSM81POP
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});

    const route = useRoute(); //获取跳转参数

    let gridView1: any;
    const initializeService = '';
    // 获取tab页组件的ref和实例
    const detailTabsRef = ref<any>(null);
    // 变量定义
    // const formName = 'MMSM81VT';
    let formPartition: string;
    let formName: string;
    const i_func_id_q = ref('');
    let s_BUNKER_TYPE: any;


    const $router = useRouter();
    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);

    const efFormReady = (e: any) => {

      console.log('145551111', 1111);
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      console.log('eformPartition', formPartition);
      console.log('formName', formName);
      dialogVisible.value = false;
      initializePage();
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

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable("gridView1", false); // 设置grid不可编辑
    };

    let GL_LC: string;
    let GL_LC1: string;
    let DL_LC: string;
    let S_FLAG1: string;
    let SEQ_CODE: string;
    const box_wt = ref(0);
    S_FLAG1 = "0";
    const C_ORDERID = ref('');
    const C_X_ITEM = ref('');
    let FN_NO = ' ';
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {

      console.log("获取弹窗画面传递过来的信息", info);
      if (info.close) {
        dialogVisible.value = false;
        xrEfDialogClose();
      }
      C_ORDERID.value = info.C_ORDERID;
      C_X_ITEM.value = info.C_X_ITEM;

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: GL_LC,
          BUNKER_NO1: GL_LC1,
          BUNKER_NO_ORIGINAL: DL_LC,
          STOCK_WT: box_wt.value,
          C_ORDERID: C_ORDERID.value,
          C_X_ITEM: C_X_ITEM.value,
          SEQ_CODE: SEQ_CODE
        },
        true
      );
      FN_NO=' ';
      // console.log("inInfo",inInfo);
      EIManager.callService(formPartition, 'mmsm831_upd_zd', inInfo)
        .then((res: EI.EIInfo) => {
          if (res.status >= 0) {
            erFormHelper.messageSuccess("上料成功!!");

            nextTick(() => {
              // queryLCdata_G();
              // querygrid();
              // // GL_Change();
              // DL_Change();
              // GL_Change2();
              // GL_Change3();
              // GL_Change4(); 
              // querycf();
              query();
            });
          } else {
            erFormHelper.messageError("上料失败!!，失败原因:" + res.sys.msg);
          }
          S_FLAG1 = "0";
        }
        );
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        'MMSM83S2N',
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
            erFormHelper.setControlValueEx('LayoutGroupFilter', route.query);
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

    const popFreeAdd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSM83VT",
      "LayoutGroupFilter"
    );

    popFreeAdd.setEvent("itemButtonClick", async (a: any) => {
      if (a.itemCode === "BOTTON_MAT_CODE") {
        const data = {};
        console.log("SWWWWWW111", data);
        dialogFormName.value = "MMSM50ADDS2N"; // 读配置表获取画面名
        parentInfo.value = data;
        openXrEfDialog();
      }
    });

    const GridView1FocusChanged = async (e: any) => {
      erFormHelper.checkGridCurrentRow("gridView1");

      // if (!e.data) {

      // }
      // if (e && e.rowChanged) {
      //   if (e.data) {
      //   }
      // }
      // console.log("333");
    };

    // grid工具栏按钮点击事件自定义
    const toolbarClick = (event: any, configId: string) => {
      if (event.name === 'addrow') {
        const gridData = erFormHelper.getGridAllRows(configId);
        const currentRow = gridData[gridData.length - 1];
        //currentRow.set('MAT_CODE', parentInfo.value?.MAT_CODE);
        //currentRow.set('QUALITY_BATCH_NO', parentInfo.value?.QUALITY_BATCH_NO);

        const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
        currentRow.set('MAT_CODE', eiBlock.data[0]['MAT_CODE']?.toString());
        currentRow.set('QUALITY_BATCH_NO', eiBlock.data[0]['QUALITY_BATCH_NO']?.toString());
      }
    };
    const queryMainGrid = async (currentRowInfo: any) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
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
    const query = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock());
      const LayoutGroupFilter = erFormHelper.getAllControlValue('LayoutGroupFilter');
      const obj: any = {
        ...LayoutGroupFilter,
        PROC_DIV: 'I'
      };
      eiBlock.pushData(obj, true);
      const outInfo = await erFormHelper.callService('mmsm831_inq_t83', eiInfo, true, false, true);

      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询失败:' + outInfo.sys.msg);
      } else {
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
        erFormHelper.messageSuccess('查询成功');
        //同时录成分 不关闭弹窗
        //closeEfDialog();
      }
    };

    const F2_DO = async (e: any) => {
      const qmBatch = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      if (qmBatch.data[0]['QUALITY_BATCH_NO'] === '') {
        erFormHelper.messageWarning('质检批号为空，请录入！');
        return;
      }
      query();

    };

    const dialogFormName = ref(''); // 弹出画面的画面名

    const dbbutClick = async () => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
      );
      console.log("111", inInfo);

      outInfo = await erFormHelper.callService(
        "mmsm831_upd_t83",
        inInfo,
        true,
        false,
        true
      );
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
      } else {
        erFormHelper.messageError('上料失败:' + outInfo.sys.msg);
      }
      popFreeAdd.CloseDialog();
    };

    const F3_DO = async (e: any) => {
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
      console.log("F4", selectedRows);
      popFreeAdd.ReceiveData(selectedRows);
      SEQ_CODE = selectedRows.SEQ_CODE;
      console.log("SEQ_CODE", selectedRows.SEQ_CODE);

      if (selectedRows.BUNKER_NO_ORIGINAL === "H01" || selectedRows.BUNKER_NO_ORIGINAL === "H02") {
        //   const mes_res = await erFormHelper.messageConfirm('料仓号'+selectedRows.BUNKER_NO_ORIGINAL.value.name+'上料重量'+selectedRows.REAL_WEIGHT.value+'是否确认上料，上料粉率位3%');
        // if (!mes_res) 
        // {}else{ 
        GL_LC = selectedRows.BUNKER_NO;
        GL_LC1 = selectedRows.BUNKER_NO_ORIGINAL;
        DL_LC = selectedRows.BUNKER_NO_ORIGINAL;
        box_wt.value = selectedRows.REAL_WEIGHT;

        console.log("GL_LC", GL_LC);
        console.log("GL_LC1", GL_LC1);
        console.log("DL_LC", DL_LC);
        console.log("box_wt", box_wt);

        if (S_FLAG1 != "1") {


          ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
            let S_FLAG: string;
            if (popFreeAdd.getEvent("ok")) {
              const data = {
                PROC_DIV: "U",
                MAT_CODE: selectedRows.MAT_CODE
              };

              dialogFormName.value = "MMSM81POPS2N"; // 读配置表获取画面名
              dialogVisible.value = true;
              parentInfo.value = data;
              S_FLAG1 = "0";
              openXrEfDialog();

              // dbbutClick();
              // popFreeAdd.FormHelper.resetLayout("LayoutGroupFilter");
              // S_FLAG = "1";

            }
          });


          // }
        }
      } else {
        if (S_FLAG1 != "1") {
          ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
            let S_FLAG: string;
            if (popFreeAdd.getEvent("ok")) {
              dbbutClick();
              popFreeAdd.FormHelper.resetLayout("LayoutGroupFilter");
              // query();
              // erFormHelper.setGridIndicator(gridView1,{SEQ_CODE:selectedRows.SEQ_CODE});
            }

            // if(S_FLAG==="1")
            // {
            //   const selectedRows = erFormHelper.getGridCurrentRow("gridView2", false);
            //   popFreeAdd.ReceiveData(selectedRows);

            // }
          });
          popFreeAdd.setEvent("cancel", async (a: any) => {

            const inInfo = new EI.EIInfo();
            let outInfo: EI.EIInfo = new EI.EIInfo();
            inInfo.addBlock(
              erFormHelper.convertModelAsBlock(popFreeAdd.DataModel)
            );
            console.log("111", inInfo);

            outInfo = await erFormHelper.callService(
              "mmsm831_upd1_t83",
              inInfo,
              true,
              false,
              true
            );
            if (outInfo?.sys.status >= 0) {
              query();
            }
            popFreeAdd.CloseDialog();

            // console.log('取消按钮');

          });
        }

      }
      // ER.PopUtils.showErPopFree(ErPopFree, popFreeAdd, (e: any) => {
      //   let S_FLAG: string;
      //   if (popFreeAdd.getEvent("ok")) {
      //     dbbutClick();
      //     popFreeAdd.FormHelper.resetLayout("LayoutGroupFilter");
      //     S_FLAG = "1";
      //     query();
      //     erFormHelper.setGridIndicator(gridView1,{SEQ_CODE:selectedRows.SEQ_CODE});
      //   }
      //   // if(S_FLAG==="1")
      //   // {
      //   //   const selectedRows = erFormHelper.getGridCurrentRow("gridView2", false);
      //   //   popFreeAdd.ReceiveData(selectedRows);

      //   // }
      // });

      // erFormHelper.setGridIndicator(gridView1,{SEQ_CODE:eiInfo.getBlock(0).data[0]["BUNKER_NO"]});

    };

    const F4_DO = async (e: any) => {

      let bunker_Message = new EI.EIInfo();
      const eiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      bunker_Message.addBlock(eiBlock);
      console.log("111", bunker_Message);
      const mes_res = await erFormHelper.messageConfirm('是否确认选择料仓收货？');
      if (!mes_res) { } else {
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
    const popFreeupd = new ER.PopFreeHelper(
      efFormInfo.value.formPartition,
      "MMSM83VT",
      "LayoutGroupFilter1"
    );
    const F5_DO = () => {
      const selectedRows = erFormHelper.getGridCurrentRow("gridView1", false);
      console.log("F5", selectedRows);
      popFreeupd.ReceiveData(selectedRows);
      SEQ_CODE = selectedRows.SEQ_CODE;
      console.log("SEQ_CODE", selectedRows.SEQ_CODE);

      if (selectedRows.BUNKER_NO_ORIGINAL === "H01" || selectedRows.BUNKER_NO_ORIGINAL === "H02") {


        ER.PopUtils.showErPopFree(ErPopFree, popFreeupd, async (e: any) => {

          if (popFreeupd.getEvent("ok")) {
            const layout = e.dataModel;

            GL_LC = layout.BUNKER_NO;
            GL_LC1 = layout.BUNKER_NO_ORIGINAL;
            DL_LC = layout.BUNKER_NO_ORIGINAL;
            box_wt.value = layout.REAL_WEIGHT;

            console.log("GL_LC", GL_LC);
            console.log("GL_LC1", GL_LC1);
            console.log("DL_LC", DL_LC);
            console.log("box_wt", box_wt);

            const data = {
                PROC_DIV: "U",
                MAT_CODE: selectedRows.MAT_CODE
              };

              dialogFormName.value = "MMSM81POPS2N"; // 读配置表获取画面名
              dialogVisible.value = true;
              parentInfo.value = data;
              S_FLAG1 = "0";
              FN_NO='F5';
              openXrEfDialog();
          }
        });


        // }

      }
      else {
        erFormHelper.messageInfo('目前只针对低位料仓H01/H02可以修正上传！');
        return false;
      }
    }
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
      GridView1FocusChanged,
      F2_DO,
      F3_DO,
      F4_DO, F5_DO,
      gridView1,
      erGrid1Ready,
      xrEfDialogClose,
      openXrEfDialog
    };
  }
});
