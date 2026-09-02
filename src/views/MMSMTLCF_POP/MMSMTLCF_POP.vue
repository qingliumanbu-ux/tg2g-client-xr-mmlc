<template>
    <div style="height: 100%;">
        <xr-ef-form :f2-do="F2_DO" :f3-do="F3_DO" :in-dialog-form-name="openInDialog ? dialogFormName : null"
            @closeDialog="closeEfDialog" @ready="efFormReady">
            <div>
                <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'Layout1'"
                    :style="{ width: 100 + '%', }"></er-layout>

                <er-layout v-if="initializeFlag === 1" v-show="LAYVIS" :er-form-helper-prop="erFormHelper"
                    :config-id="'Layout2'" :style="{ width: 100 + '%' }"></er-layout>
                <er-layout v-if="initializeFlag === 1" v-show="!LAYVIS" :er-form-helper-prop="erFormHelper"
                    :config-id="'Layout3'" :style="{ width: 100 + '%' }"></er-layout>
            </div>

            <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                    <xr-ef-panel title="成分" padding="5px" style="height: 100%;">
                        <template #customButtonSlot>
                        </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'gridview1'" @erGridReady="erGrid1Ready">
                            </er-grid>
                        </template>
                    </xr-ef-panel></v-splitter-pane>
                <v-splitter-pane size="50">
                    <xr-ef-panel title="质检坯" padding="5px" style="height: 100%;">
                        <template #customButtonSlot>
                        </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'gridview2'" @erGridReady="erGrid1Ready">
                            </er-grid>
                        </template>
                    </xr-ef-panel>
                </v-splitter-pane>
            </v-splitter>


        </xr-ef-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed, nextTick, toRaw, Ref } from 'vue';
import { EI, EIManager } from 'EIX/ei';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';


import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import { ER } from 'ERX/Er';


export default defineComponent({
    name: 'MMSMTLCF_POP',
    components: { xrEfForm, xrEfPanel, erLayout, erGrid },
    props: {
        openInDialog: {
            type: Boolean,
            default: false
        },
        dialogFormName: {
            type: String,
            default: ''
        },
        parentInfo: {
            type: Array, default: reactive(new EI.EIInfo())
        }
    },
    // 向父画面传递数据-注册emit监听事件
    emits: ['getChildInfo'],
    setup: (props, { emit }) => {
        // 变量定义
        let formParams: any = '';
        let formPartition: any = '';

        const initializeService = '';
        let formName = ''; // 当前画面名
        let now = new Date();
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const efFormInfo = ref<{ [key: string]: any }>({});
        const efFormIsReady = ref(false);
        const initializeFlag = ref(0);
        const LAYVIS = ref(false);



        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition;
            formName = efFormInfo.value.formName; // 当前画面名
            // 初始化低代码工具类
            initializePage();

        };

        const parentInfo = ref(props.parentInfo); // 获取父画面传入参数


        // 画面相关数据初始化
        const initializePage = async () => {
            const initialResult = await erFormHelper.Initialize(formPartition, formName, '', initializeService);
            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                if (Object(props.parentInfo[0]).FN_NO === 'F3') {
                    LAYVIS.value = true;
                    erFormHelper.setControlValueEx('Layout2', { PROC_TYPE: '1' })
                }
                else {
                     LAYVIS.value = false;
                    erFormHelper.setControlValueEx('Layout3', { PROC_TYPE: '1' })
                }
                nextTick(() => {
                    console.log('kjuhygfd', erFormHelper.getAllControlValueAsEiBlock(['Layout1', 'Layout2', 'Layout3']))

                });

            } else {
                erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
            }
        };

        const erGrid1Ready = () => {


        };

        onMounted(() => {

        });


        let v_metal_yield_rate = 0;
        const F2_DO = async (e: any) => {
            const eiInfo = new EI.EIInfo();
            if (!await erFormHelper.checkRequiredInput('Layout1')) {

                return false;
            }

            eiInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('Layout1'))

            const outInfo = await erFormHelper.callService('mmsmtlcf_inq', eiInfo, true, false, true);

            if (outInfo.sys.status < 0) {
                erFormHelper.messageError('处理错误:' + outInfo.sys.msg);
                return false;
            } else {
                erFormHelper.messageSuccess('处理成功');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0), true, 'gridview1')
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(1), true, 'gridview2')
                v_metal_yield_rate = Number(outInfo.getBlock(2).data[0].METAL_YIELD_RATE);
                erFormHelper.checkGridCurrentRow('gridview1');
                erFormHelper.checkGridCurrentRow('gridview2')
                return true;
            }
        };
        const F3_DO = async (e: any) => {
            let v_res_type = erFormHelper.getAllControlValueAsEiBlock('Layout2').data[0].RES_TYPE;
            let v_com_flag = erFormHelper.getAllControlValueAsEiBlock('Layout3').data[0].COM_FLAG;

            if (LAYVIS.value && v_res_type?.toString().trim() === '') {
                erFormHelper.messageError('请输入记录类型！');
                return false;
            }
            if (!LAYVIS.value && v_com_flag?.toString().trim() === '') {
                erFormHelper.messageError('请输入是否参与计算！');
                return false;
            }
            if (!LAYVIS.value) {
                v_res_type = '4'
            }
            const eiblock1 = erFormHelper.getGridCheckedRowsAsBlock('gridview1', {}, true);
            const eiblock2 = erFormHelper.getGridCheckedRowsAsBlock('gridview2', {}, true);
            const eiblock3 = erFormHelper.getAllControlValueAsEiBlock('Layout2');
            const eiblock4 = erFormHelper.getAllControlValueAsEiBlock('Layout3');
            const eiblock = erFormHelper.getAllControlValueAsEiBlock('Layout1', { PROC_DIV: 'I', METAL_YIELD_RATE: v_metal_yield_rate, RES_TYPE: v_res_type, COM_FLAG: v_com_flag });

            if (eiblock1.data.length !== 1) {
                erFormHelper.messageError('请至少选择一条成分！');
                return false;
            }
            if (eiblock2.data.length !== 1) {
                erFormHelper.messageError('请至少选择一条加料实绩！');
                return false;
            }
            const eiInfo = new EI.EIInfo();
            if (!await erFormHelper.checkRequiredInput('Layout1')) {

                return false;
            }
            if (LAYVIS.value) {
                if (!await erFormHelper.checkRequiredInput('Layout2')) {
                    return false;
                }
            }
            else {
                if (!await erFormHelper.checkRequiredInput('Layout3')) {
                    return false;
                }
            }

            for (let i = 0; i < eiblock1.columns.length; i++) {
                if (eiblock.containsColumn(eiblock1.columns[i].name)) {
                    continue;
                }
                eiblock.addColumn(eiblock1.columns[i].name, eiblock1.data[0][eiblock1.columns[i].name], eiblock1.columns[i].type)
            }
            for (let i = 0; i < eiblock2.columns.length; i++) {
                if (eiblock.containsColumn(eiblock2.columns[i].name)) {
                    continue;
                }
                eiblock.addColumn(eiblock2.columns[i].name, eiblock2.data[0][eiblock2.columns[i].name], eiblock2.columns[i].type)
            }
            if (LAYVIS.value) {
               
                for (let i = 0; i < eiblock3.columns.length; i++) {
                    
                    if (eiblock.containsColumn(eiblock3.columns[i].name)) {
                        continue;
                    }
                    eiblock.addColumn(eiblock3.columns[i].name, eiblock3.data[0][eiblock3.columns[i].name])
                    
                }
            }
            else {
                for (let i = 0; i < eiblock4.columns.length; i++) {
                    if (eiblock.containsColumn(eiblock4.columns[i].name)) {
                        continue;
                    }
                    eiblock.addColumn(eiblock4.columns[i].name, eiblock4.data[0][eiblock4.columns[i].name])
                }
            }


            eiInfo.addBlock(eiblock);


            console.log('oiuyhtgfrdsa', eiInfo, eiblock3);
            const outInfo = await erFormHelper.callService('mmsmrqtl_pro', eiInfo, true, false, true);

            if (outInfo.sys.status < 0) {
                erFormHelper.messageError('处理错误:' + outInfo.sys.msg);
                return false;
            } else {
                erFormHelper.messageSuccess('处理成功');

                closeEfDialog();
                return true;
            }
        };
        // 点击关闭按钮，绑定事件closeEfDialog
        // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名
        const closeEfDialog = () => {

            const data = {
                // name: formName,
                close: true
            };
            emit('getChildInfo', data);
        };



        return {
            erGrid1Ready,
            efFormReady,
            erFormHelper,
            initializeFlag,
            F2_DO,
            F3_DO,
            closeEfDialog, LAYVIS

        };
    }
});

</script>

<style></style>