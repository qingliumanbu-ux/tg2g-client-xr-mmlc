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
  name: "MMSMJCCFS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup() {
    const dropdownlistValue = ref("0");
    // 画面相关数据初始化定义
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const subGridData = ref<any>([]);
    let gridView1!: any;
    const initializeFlag = ref(false);

    // 画面相关数据初始化定义
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    let formName = "MMSMJCCFS2N";
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      Initialize();
    };

    const editable = ref(false);
    const hiddenButton: Ref<any[]> = ref(["F5"]);
    // 自定义工具栏按钮功能
    // 主表保存
    const saveMainGridData = async () => {
      if (erFormHelper.hasDataChange("gridView1")) {
        const eiinfo = new EI.EIInfo();
        const created = erFormHelper.getGridRowsAsBlock(gridView1, "add");
        eiinfo.addBlock(created, "ADD");

        const updated = erFormHelper.getGridRowsAsBlock(gridView1, "modify");
        eiinfo.addBlock(updated, "UPD");

        const deleted = erFormHelper.getGridRowsAsBlock(gridView1, "delete");
        eiinfo.addBlock(deleted, "DEL");

        const para =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiinfo.addBlock(para, "PARA");
        erFormHelper
          .callService("mmsm60_pro", eiinfo, true, true,true)
          .then((res) => {
            subGridData.value = res.getBlock("Table0").data;
          });
      }
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
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    onMounted(() => {
      Initialize();
    });
    // 下拉切换触发

    //查询
    const getData = async () => {
      //压条件
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService("mmsmylcf_inq", eiInfo, true, true,true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
    };

    // 查询
    const f2Do = () => {
      getData();
    };

    // 维护
    const f3PreDo = (e: any) => {
      editable.value = true;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: true,
        copyrow: true,
        delete: true,
      });

      erFormHelper.setGridEditable("gridView1", true);
    };
    // 维护确认
    const f3Do = async (e: any) => {
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      return await saveMainGridData()
        .then((res: any) => {
          getData();
          editable.value = false;
          erFormHelper.setGridEditable("gridView1", false);
        })
        .catch((error) => {
          erFormHelper.messageError(error);
          return false;
        });
    };

    // 维护取消
    const f3Cancel = async () => {
      editable.value = false;
      erFormHelper.setGridToolbarVisible("gridView1", {
        addrow: false,
        copyrow: false,
        delete: false,
      });
      erFormHelper.setGridEditable("gridView1", false);
    };

    return {
      erFormHelper,
      initializeFlag,
      editable,
      hiddenButton,
      dropdownlistValue,
      gridView1,
      Initialize,
      f2Do,
      f3Do,
      f3PreDo,
      f3Cancel,
      getData,
      efFormReady,
      erGrid1Ready,
    };
  },
});
