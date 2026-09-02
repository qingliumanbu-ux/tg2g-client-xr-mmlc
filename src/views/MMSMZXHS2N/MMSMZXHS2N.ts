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
  name: "MMSMZXHS2N",
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
    const initializeService = "mmsm_form_get";
    const initializeFlag = ref(0);

    // 画面相关数据初始化定义
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    let formName = "MMSMZXHS2N";
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false); // 设置grid不可编辑
    };

    // xr-ef-form提供了ready事件, 在这里获取画面配置信息
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition; // 分区
      initializePage();
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
          .callService("mmsm60_pro", eiinfo, true, true, true)
          .then((res) => {
            subGridData.value = res.getBlock("Table0").data;
          });
      }
    };
    // 画面相关数据初始化
    const initializePage = async () => {
      // console.log("1111111", 1111);
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );

      if (initialResult.flag >= 0) {
        initializeFlag.value = 1;
        nextTick(() => {});
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };

    //查询
    const getData = async () => {
      //压条件
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService("mmsmzxh_inq", eiInfo, true, true, true)
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
    };

    //输入炉号查询
    const getData1 = async () => {
      //压条件
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(eiBlock, "Table0");

      await erFormHelper
        .callService("mmsmzxhf4_inq", eiInfo, true, true, true)
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

    // F4查询
    const f4Do = async (e: any) => {
      if (erFormHelper.getGridDataCount("gridView1") === 0) {
        erFormHelper.messageWarning("请选择一条信息转历史档信息");
        return false;
      }
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(
        erFormHelper.getGridSelectRowsAsBlock("gridView1"),
        "Tables0"
      );
      const outInfo = await erFormHelper.callService(
        "mmsmzxhf4_inq",
        inInfo,
        true,
        true,
        true
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess("操作成功");
        //erFormHelper.getGridServerPageData("gridView1");
      }
      getData();
    };

    // 维护确认
    const f3Do = async (e: any) => {
      const eiInfo = new EI.EIInfo();

      const queryCondition =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiInfo.addBlock(queryCondition, "Table0");
      const outInfo = await erFormHelper.callService(
        "mmsmzxhlh_ins",
        eiInfo,
        true,
        false,
        true
      );
      // 判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError("插入炉号失败:" + outInfo.sys.msg);
      } else {
        getData();
      }
    };

    const valueChanged = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "WEEK_DAY" || e.itemCode === "CHECK_FLAG") {
        const eiInfo = new EI.EIInfo();
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiInfo.addBlock(queryCondition);
        const outInfo = await erFormHelper.callService(
          "mmsmheatno_inq",
          eiInfo,
          true,
          false,
          true
        );
        // erFormHelper.clearLayoutOrGridData("LayoutGroupFilter"); // 清空子表数据
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF0_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF0_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF1_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF1_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF2_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF2_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF9_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "BOF9_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD0_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD0_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD1_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD1_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD2_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD2_E", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD6_S", " ");
        erFormHelper.setControlValue("LayoutGroupFilter", "AOD6_E", " ");
        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("获取炉号出错:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "WEEK_DAY",
              outInfo.getBlock(0).data[0]["WEEK_DAY"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_S",
              outInfo.getBlock(0).data[0]["BOF0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF0_E",
              outInfo.getBlock(0).data[0]["BOF0_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_S",
              outInfo.getBlock(0).data[0]["BOF1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF1_E",
              outInfo.getBlock(0).data[0]["BOF1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_S",
              outInfo.getBlock(0).data[0]["BOF2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF2_E",
              outInfo.getBlock(0).data[0]["BOF2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_S",
              outInfo.getBlock(0).data[0]["BOF9_S"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "BOF9_E",
              outInfo.getBlock(0).data[0]["BOF9_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_S",
              outInfo.getBlock(0).data[0]["AOD0_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD0_E",
              outInfo.getBlock(0).data[0]["AOD0_E"]
            );

            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_S",
              outInfo.getBlock(0).data[0]["AOD1_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD1_E",
              outInfo.getBlock(0).data[0]["AOD1_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_S",
              outInfo.getBlock(0).data[0]["AOD2_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD2_E",
              outInfo.getBlock(0).data[0]["AOD2_E"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_S",
              outInfo.getBlock(0).data[0]["AOD6_S"]
            );
            erFormHelper.setControlValue(
              "LayoutGroupFilter",
              "AOD6_E",
              outInfo.getBlock(0).data[0]["AOD6_E"]
            );
          });
        }
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      editable,
      hiddenButton,
      dropdownlistValue,
      gridView1,
      initializePage,
      f2Do,
      f3Do,
      f4Do,
      getData,
      efFormReady,
      erGrid1Ready,
      valueChanged,
    };
  },
});
