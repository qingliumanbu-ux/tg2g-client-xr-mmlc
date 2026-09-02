<template>
    <div style="height: 100%;">
        <xr-ef-form :f2-do="F2_DO" :f3-do="F3_DO" :in-dialog-form-name="openInDialog ? dialogFormName : null"
            @closeDialog="closeEfDialog" @ready="efFormReady">


            <v-splitter style="height: 100%" class="default-theme" horizontal>
                <v-splitter-pane size="70">
                    <xr-ef-panel title="熔清成分" padding="5px" style="height: 100%;">
                        <template #customButtonSlot>
                        </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'gridView1'" @erGridReady="erGrid1Ready">
                            </er-grid>
                        </template>
                    </xr-ef-panel></v-splitter-pane>
                <v-splitter-pane size="30">
                    <xr-ef-panel title="加权成分" padding="5px" style="height: 100%;">
                        <template #customButtonSlot>
                        </template>
                        <template #contentSlot>
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="'gridView2'" @erGridReady="erGrid1Ready">
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
    name: 'MMSMJQ_POPS2N',
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
    emits: ['getChildInfo_JQ'],
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
                }
            
                nextTick(() => {
                    F2_DO();

                });

            } else {
                erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
            }
        };

        const erGrid1Ready = () => {

            erFormHelper.setGridEditable('gridView1', false)
        };

        onMounted(() => {

        });



        const F2_DO = async () => {
            const eiInfo = new EI.EIInfo();
            eiInfo.addBlock(erFormHelper.buildEiBlock(Object(props.parentInfo[0]).p_Info), 'Table1')
            eiInfo.addBlock(erFormHelper.buildEiBlock([{ FN_NO: Object(props.parentInfo[0]).FN_NO }]), 'Table2')

            const outInfo = await erFormHelper.callService('mmsmjq_inq', eiInfo, true, false, true);

            if (outInfo.sys.status < 0) {
                erFormHelper.messageError('处理错误:' + outInfo.sys.msg);
                return false;
            } else {
                erFormHelper.messageSuccess('处理成功');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0), true, 'gridView1')
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(1), true, 'gridView2')

                erFormHelper.checkAllGridRow('gridView1');
                erFormHelper.checkAllGridRow('gridView2')
                return true;
            }
        };
        const F3_DO = async (e: any) => {
            let v_fn_no = Object(props.parentInfo[0]).FN_NO;


            const eiblock2 = erFormHelper.getGridCheckedRowsAsBlock('gridView2', { PROC_DIV: LAYVIS.value ? 'RA' : 'ZA', FN_NO: v_fn_no }, true);


            if (eiblock2.data.length === 0) {
                erFormHelper.messageError('请至少选择一条加权成分！');
                return false;
            }
            const eiInfo = new EI.EIInfo();

            eiInfo.addBlock(eiblock2);

           

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
            emit('getChildInfo_JQ', data);
        };



        return {
            erGrid1Ready,
            efFormReady,
            erFormHelper,
            initializeFlag,
            F2_DO,
            F3_DO,
            closeEfDialog,

        };
    }
});

</script>

<style></style>