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
import MMSM81POP from '../MMSM81POP/MMSM81POP.vue';
import { useRoute,useRouter } from 'vue-router';

export default defineComponent({
  name: 'MMSM831S2N',
  components: {
    xrEfForm,
    xrEfPanel,
    MMSM81POP,
    erLayout,
    erGrid,
    xrEfDialog,
    ErPopFree
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    // const formParams = EFFormInfo.getFormParams();
    // const formPartition = formParams.formPartition;
    const initializeService = '';
    const gridToolbar: Ref<any[]> = ref([]);
    const dialogVisible = ref(false);
    const detailTabsRef = ref<any>(null);
    const bunker_g = reactive(new Array);
    const bunker_g1 = reactive(new Array);
    const bunker_d = reactive(new Array);
    const bunker_d1 = reactive(new Array);
    const box_wt = ref(0);
    const box_wtD = ref(0);
    const C_ORDERID = ref('');
    const C_X_ITEM = ref('');

    // 变量定义    
    let idx = 0;
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    const initializeFlag = ref(0);
    let gridView1: any;
    let gridView2: any;
    let gridView3: any;
    let gridView4: any;
    let gridView5: any;
    let formName :string;
    let formPartition: string;

    let cs_mat_code= ref("") ;
    const fenlv_code=ref(new Array);
    // 料仓代码，物料代码，物料名称，重量，物料类型
    const MX_LC_G = ref(new Array);
    const MX_LC_G1 = ref(new Array);
    const MX_LC_G2 = ref(new Array);
    const MX_LC_G3 = ref(new Array);
    const MX_LC_D = ref(new Array);
    const dialogFormName = ref("");
    const parentInfo = ref({});
    const initPage = async () => {
      let resTable = erFormHelper.querySql(
        '',
        ` SELECT CODE FROM TWMSMZD02 WHERE REC_CREATE_TIME =(SELECT MAX(REC_CREATE_TIME) REC_CREATE_TIME FROM TWMSMZD02 t WHERE CODE_CLASS ='MMLC03') `
      );
      console.log("1111",(await resTable).getBlock(0).data);
      fenlv_code.value.push((await resTable).getBlock(0).data[0]["CODE"]?.toString());
    }
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName = efFormInfo.value.formName; // 当前画面名
      formName = 'MMSM831S2N';
      console.log('efFormInfo.value.formPartition',efFormInfo.value.formPartition);
      console.log('efFormInfo.value.formName',efFormInfo.value.formName);
      nextTick(() => {
        initializePage();
        initPage();
        MX_LC_D.value.push(' ', ' ', ' ', ' ', ' ');
        MX_LC_G.value.push(' ', ' ', ' ', ' ', ' ');
        MX_LC_G1.value.push(' ', ' ', ' ', ' ', ' ');
        MX_LC_G2.value.push(' ', ' ', ' ', ' ', ' ');
        MX_LC_G3.value.push(' ', ' ', ' ', ' ', ' ');
        bunker_g.push(
          {
            id: 0,
            name: ' '
          })
        bunker_g.push(
            {
              id: 1,
              name: 'XLG1#PD'
            })
        bunker_g.push(
              {
                id: 2,
                name: 'XLG2#PD'
              })
        bunker_d.push(
                {
                  id: 0,
                  name: ' '
                })
        bunker_d.push(
                  {
                    id: 1,
                    name: 'H01'
                  })
        bunker_d.push(
                    {
                      id: 2,
                      name: 'H02'
                    })
      });
     
      // QueryPara();
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
      erFormHelper.setGridEditable('GridView3', false); // 设置grid不可编辑
    };
    const erGrid4Ready = () => {
      gridView4 = erFormHelper.getGrid('gridView4');
      erFormHelper.setGridEditable('gridView4', false); // 设置grid不可编辑
    };
    const erGrid5Ready = () => {
      gridView5 = erFormHelper.getGrid('gridView5');
      erFormHelper.setGridEditable('gridView5', false); // 设置grid不可编辑
    };

    const GL_LC = ref({
      name: ''
    });
    const GL_LC1 = ref({
      name: ''
    });
    const DL_LC = ref({
      name: ''
    });
    const S_BUNKER_NO = ref('');
    // 查询高位料仓和低位料仓并且返回给下拉框
    const queryLCdata_G = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      bunker_g1.length=0;
      eiBlock.pushData(
        {
          BUNKER_TYPE: ' '
        },
        true
      );                
   
      const outInfo = await erFormHelper.callService('mmsm85_bunker_sh_inq', inInfo, true,false, true);    
      if (outInfo.sys.status < 0)
         {
        //维护完成重新查询
          erFormHelper.messageError('查询错误：' + outInfo.sys.msg);
          return false;
      } else {
          for (let i = 0; i < outInfo.getBlock(0).data.length; i++) {
            bunker_g1.push(
              {
                id: i,
                name: outInfo.getBlock(0).data[i]['BUNKER_NO']
              })
          }


      }
    }

    const querygrid = async () => {
      const inInfo = new EI.EIInfo();
       const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
       eiBlock.pushData(
        {
          BUNKER_NO: GL_LC.value.name
        },
        true
      );
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
     
    }

    const queryLCdata_D = async () => {

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          MAT_CODE: cs_mat_code.value
        },
        true
      );      
    }
    const GL_Change = async () => {
      const inInfo = new EI.EIInfo();
       const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
       eiBlock.pushData(
        {
          BUNKER_NO: GL_LC.value.name,
        },
        true
      );
      inInfo.addBlock(eiBlock);     
      const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_G.value.length = 0;
            MX_LC_G.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
              res.getBlock(0).data[i]["MAT_CODE"],
              res.getBlock(0).data[i]["MAT_NAME"],
              res.getBlock(0).data[i]["STOCK_WT"],
              res.getBlock(0).data[i]["MAT_TYPE"]);
          }
        }
      );
      nextTick(() => {
          // 获取画面上的主要控件信息
          queryLCdata_D();
        });
    }

    const GL_Change1 = async () => {
      const inInfo = new EI.EIInfo();
       const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
       eiBlock.pushData(
        {
          BUNKER_NO: GL_LC.value.name,
        },
        true
      );
      inInfo.addBlock(eiBlock);
      const outInfo = await erFormHelper.callService('mmsm85_inq', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView1);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      EIManager.callService(formPartition, 'mmsm85_bunker_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_G.value.length = 0;
            MX_LC_G.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
              res.getBlock(0).data[i]["MAT_CODE"],
              res.getBlock(0).data[i]["MAT_NAME"],
              res.getBlock(0).data[i]["STOCK_WT"],
              res.getBlock(0).data[i]["MAT_TYPE"]);
          }
        }
      );
      nextTick(() => {
          // 获取画面上的主要控件信息
          queryLCdata_D();
          queryLCdata_G();
          // DL_Change();
        });
    }

         ///H01  AT000174 石灰查询
         const GL_Change3 = async () => {
          const inInfo = new EI.EIInfo();
           const inInfo1 = new EI.EIInfo();
          const eiBlock = inInfo1.addBlock(new EI.EiBlock());
           eiBlock.pushData(
            {
              BUNKER_NO: GL_LC.value.name,
            },
            true
          );
          inInfo.addBlock(eiBlock);
          EIManager.callService(formPartition, 'mmsm85_bunker_sh3_inq', inInfo)
            .then((res: EI.EIInfo) => {
              for (let i = 0; i < res.getBlock(0).data.length; i++) {
                MX_LC_G1.value.length = 0;
                MX_LC_G1.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
                  res.getBlock(0).data[i]["MAT_CODE"],
                  res.getBlock(0).data[i]["MAT_NAME"],
                  res.getBlock(0).data[i]["STOCK_WT"],
                  res.getBlock(0).data[i]["MAT_TYPE"]);
                // cs_mat_code.value = res.getBlock(0).data[i]["MAT_CODE"];
              }
            }
          );
          nextTick(() => {
              // 获取画面上的主要控件信息
              queryLCdata_D();
              // DL_Change();
            });
        }

       
      ///H02  AT000173 石灰查询
         const GL_Change4 = async () => {
          const inInfo = new EI.EIInfo();
           const inInfo1 = new EI.EIInfo();
          const eiBlock = inInfo1.addBlock(new EI.EiBlock());
           eiBlock.pushData(
            {
              BUNKER_NO: GL_LC.value.name,
            },
            true
          );
          inInfo.addBlock(eiBlock);
          EIManager.callService(formPartition, 'mmsm85_bunker_sh4_inq', inInfo)
            .then((res: EI.EIInfo) => {
              for (let i = 0; i < res.getBlock(0).data.length; i++) {
                MX_LC_G2.value.length = 0;
                MX_LC_G2.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
                  res.getBlock(0).data[i]["MAT_CODE"],
                  res.getBlock(0).data[i]["MAT_NAME"],
                  res.getBlock(0).data[i]["STOCK_WT"],
                  res.getBlock(0).data[i]["MAT_TYPE"]);
                // cs_mat_code.value = res.getBlock(0).data[i]["MAT_CODE"];
              }
            }
          );
          nextTick(() => {
              // 获取画面上的主要控件信息
              queryLCdata_D();
              // DL_Change();
            });
        }
                
     ///G01  AT000173 石灰查询
    const GL_Change2 = async () => {
      const inInfo = new EI.EIInfo();
       const inInfo1 = new EI.EIInfo();
      const eiBlock = inInfo1.addBlock(new EI.EiBlock());
       eiBlock.pushData(
        {
          BUNKER_NO: GL_LC.value.name,
        },
        true
      );
      inInfo.addBlock(eiBlock);
      EIManager.callService(formPartition, 'mmsm85_bunker_sh2_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_G3.value.length = 0;
            MX_LC_G3.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
              res.getBlock(0).data[i]["MAT_CODE"],
              res.getBlock(0).data[i]["MAT_NAME"],
              res.getBlock(0).data[i]["STOCK_WT"],
              res.getBlock(0).data[i]["MAT_TYPE"]);
            // cs_mat_code.value = res.getBlock(0).data[i]["MAT_CODE"];
          }
        }
      );
      nextTick(() => {
          // 获取画面上的主要控件信息
          queryLCdata_D();
          // DL_Change();
        });
    }

    ///G02  AT000173 石灰查询
    const DL_Change = async () => {
     
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: DL_LC.value.name
        },
        true
      );
      bunker_d1.length=0;
      bunker_d1.push(GL_LC1.value.name);
      const outInfo = await erFormHelper.callService('mmsm85sh_inq', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView3);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
      EIManager.callService(formPartition, 'mmsm85_bunker_sh1_inq', inInfo)
        .then((res: EI.EIInfo) => {
          for (let i = 0; i < res.getBlock(0).data.length; i++) {
            MX_LC_D.value.length = 0;
            MX_LC_D.value.push(res.getBlock(0).data[i]["BUNKER_NO"],
              res.getBlock(0).data[i]["MAT_CODE"],
              res.getBlock(0).data[i]["MAT_NAME"],
              res.getBlock(0).data[i]["STOCK_WT"],
              res.getBlock(0).data[i]["MAT_TYPE"]);

          }
        }
        );
    }

    const butClick = async () => {      
      if (GL_LC.value.name === '') {
        erFormHelper.messageError("请选择高位料仓");
        return;
      }
      if (DL_LC.value.name === '') {
        erFormHelper.messageError("请选择皮带");
        return;
      }
      if (GL_LC1.value.name === '') {
        erFormHelper.messageError("请选择石灰料槽");
        return;
      }
      if (box_wt.value === 0) {
        erFormHelper.messageError("请输入重量");
        return;
      }

      if(GL_LC1.value.name == 'H01')
      {
        cs_mat_code.value= "AT000174";
        if(MX_LC_G.value[0]=='H01')
        {
          erFormHelper.messageError("不能在同一个料仓进行上料操作");
          return;
        }
        if(MX_LC_G1.value[1] != MX_LC_G.value[1])
        {
          erFormHelper.messageError("物料代码不一致不能上料");
          return;
        }
      }
      else if(GL_LC1.value.name == 'H02')
      {
        cs_mat_code.value= "AT000173";

        if(MX_LC_G2.value[1]!=MX_LC_G.value[1])
        {
          erFormHelper.messageError("物料代码不一致不能上料");
          return;
        }
        if(MX_LC_G.value[0]=='H02')
        {
          erFormHelper.messageError("不能在同一个料仓进行上料操作");
          return;
        }
      }     

      console.log("mat_code",cs_mat_code.value);

      const mes_res = await erFormHelper.messageConfirm('料仓号'+GL_LC1.value.name+'上料重量'+box_wt.value+'是否确认上料，上料粉率位'+fenlv_code.value+'%');
      if (!mes_res) 
      {}else{ 
       
        
          const data = {
            PROC_DIV: "U",
            MAT_CODE:cs_mat_code.value
          };

          dialogFormName.value = "MMSM81POPS2N"; // 读配置表获取画面名
          dialogVisible.value = true;
          parentInfo.value = data;
          openXrEfDialog();
        
    }

      nextTick(() => {
        // 获取画面上的主要控件信息
        querygrid();
        // GL_Change();
        DL_Change();
        GL_Change1();
        GL_Change2();
        GL_Change3();
        GL_Change4();
        querycf();
        
      });
    }

    const butClick1 = async () => {
      if(1==1)
      {
        // erFormHelper.messageError("G02");
        return;
      }
      if (DL_LC.value.name === '') {
        erFormHelper.messageError("请选择低位料仓");
        return;
      }
      if (GL_LC.value.name === '') {
        erFormHelper.messageError("请选择高位料仓");
        return;
      }
      
      if (box_wt.value === 0) {
        erFormHelper.messageError("请输入重量");
        return;
      }

      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_NO: GL_LC.value.name,
          BUNKER_NO_ORIGINAL: DL_LC.value.name,
          STOCK_WT: box_wt.value
        },
        true
      );
      const mes_res = await erFormHelper.messageConfirm('确认上料粉率位3%');
      if (!mes_res)  
      // {closeEfDialog(bunker_Message1);console.log('1',bunker_Message1);
      // }else{ closeEfDialog(bunker_Message);console.log('0',bunker_Message);}
      {}else{ 
        const outInfo = await erFormHelper.callService('mmsm831_upd', inInfo, true,false, true);
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError(outInfo.sys.msg);
      }
      }
      
    }
    // 点击按钮打开弹框
    const openXrEfDialog = () => {
      dialogVisible.value = true;
    };
     // 关闭弹框监听
     const xrEfDialogClose = () => {
      // queryMainGrid();
    };
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
          BUNKER_NO: GL_LC.value.name,
          BUNKER_NO1: GL_LC1.value.name,
          BUNKER_NO_ORIGINAL: DL_LC.value.name,
          STOCK_WT: box_wt.value,
          C_ORDERID:C_ORDERID.value,
          C_X_ITEM:C_X_ITEM.value
        },
        true
      );
     // console.log("inInfo",inInfo);
      EIManager.callService(formPartition, 'mmsm831_upd1', inInfo)
        .then((res: EI.EIInfo) => {
          if (res.status >= 0) {
            erFormHelper.messageSuccess("上料成功!!");
            nextTick(() => {
              queryLCdata_G();
              querygrid();
              // GL_Change();
              DL_Change();
              GL_Change2();
              GL_Change3();
              GL_Change4(); 
              querycf();
             
            });
          } else {
            erFormHelper.messageError("上料成功!!，失败原因:" + res.sys.msg);
          }
        }
      );
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(efFormInfo.value.formPartition, 'MMSM831V', '', '');
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;
        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          // 获取画面上的主要控件信息
         
          queryLCdata_G();
          // GL_Change();
          DL_Change();
          GL_Change2();
          GL_Change3();
          GL_Change4();
          querycf();
        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    // onMounted(() => {
      
    // });

    const querycf = async () => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock());
      eiBlock.pushData(
        {
          BUNKER_TYPE: ' '
        },
        true
      );
      const outInfo = await erFormHelper.callService('mmsm81cf_inq', inInfo, true,false, true);
      if (outInfo.sys.status >= 0) {
        // 根据返回数据加载页面显示数据//需要和si配置的数据集的表一致
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(0), gridView2);
        erFormHelper.mergeEiBlockToGrid(outInfo.getBlock(1), gridView5);
      } else {
        erFormHelper.messageError(outInfo.sys.msg);
        return false;
      }
    }

    const F2_DO = async (e: any) => { 
      queryLCdata_G();
        querygrid();
        // GL_Change();
        DL_Change();
        GL_Change2();
        GL_Change3();
        GL_Change4(); 
        querycf();
    };
    
    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      efFormReady,
      dialogVisible,
      dialogFormName,
      parentInfo,
      getChildInfo,
      openXrEfDialog,
      xrEfDialogClose,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      erGrid4Ready,
      erGrid5Ready,
      gridView1,
      gridView2,
      gridView3,
      gridView4,
      gridView5,
      gridToolbar,
      butClick,
      butClick1,
      queryLCdata_G,
      bunker_g,
      bunker_g1,
      bunker_d,
      bunker_d1,
      GL_Change,
      GL_Change1,
      DL_Change,
      GL_LC,
      GL_LC1,
      DL_LC,
      MX_LC_G,
      MX_LC_G1,
      MX_LC_G2,
      MX_LC_G3,
      box_wt,
      box_wtD,
      MX_LC_D
    };
  }
});
