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
  name: "MMSMCRNIS2N",
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup() {
    const initializeService = "mmsm_form_get";
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const efFormInfo = ref<{ [key: string]: any }>({});
    let gridView1!: any;
    const initializeFlag = ref(false);
    let formPartition: string;
    let formName: string;
    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid("gridView1");
      erFormHelper.setGridEditable(gridView1, false);
    };

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      formPartition = efFormInfo.value.formPartition;
      formName = efFormInfo.value.formName;
      Initialize();
    };

    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        "",
        initializeService
      );
      if (initialResult.flag > 0) {
        initializeFlag.value = true;
      } else {
        erFormHelper.messageError(
          "ErFormHelper initialize faild, error msg is [" +
            initialResult.msg +
            "]!"
        );
      }
    };
    onMounted(() => {});

    const getData = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock =
        erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
      eiBlock.addColumn("USER_ID");
      eiBlock.addColumn("TIME_STAMPS");
      if (eiBlock.data[0]["CX_FLAG"]?.toString()) {
        eiBlock.data[0]["USER_ID"] = eiBlock.data[0]["CX_FLAG"]
          ?.toString()
          .slice(15, eiBlock.data[0]["CX_FLAG"]?.toString().length);
        eiBlock.data[0]["TIME_STAMPS"] = eiBlock.data[0]["CX_FLAG"]
          ?.toString()
          .slice(0, 14);
      }
      console.log("length", eiBlock.data[0]["CX_FLAG"]?.toString().length);
      console.log("1127", eiInfo);
      eiInfo.addBlock(eiBlock, "Table0");
      await erFormHelper
        .callService(
          efFormInfo.value.formParams["service"],
          eiInfo,
          true,
          true,
          true
        )
        .then((res) => {
          const mainData = res.blocks["Table0"].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(mainData, gridView1);
          });
        });
    };

    const f2Do = () => {
      getData();
    };

    const valueChanged = async (e: any) => {
      // 质检批查询
      if (e.itemCode === "TIME_STAMPS" || e.itemCode === "TIME_STAMPS_1") {
        const eiInfo = new EI.EIInfo();
        const queryCondition =
          erFormHelper.getAllControlValueAsEiBlock("LayoutGroupFilter");
        eiInfo.addBlock(queryCondition);
        console.log("1108", eiInfo);
        const outInfo = await erFormHelper.callService(
          "mmsmtimeid_inq",
          eiInfo,
          true,
          false,
          true
        );
        erFormHelper.setControlValue("LayoutGroupFilter", "CX_FLAG", " ");

        if (outInfo.sys.status < 0) {
          erFormHelper.messageError("获取时间范围出错:" + outInfo.sys.msg);
        } else {
          nextTick(() => {
            erFormHelper.reloadDropDownDataSource(
              "LayoutGroupFilter",
              "CX_FLAG",
              outInfo.getBlock(0).data
            );
          });
        }
      }
    };
    return {
      erFormHelper,
      initializeFlag,
      gridView1,
      Initialize,
      f2Do,
      getData,
      efFormReady,
      erGrid1Ready,
      valueChanged,
    };
  },
});
