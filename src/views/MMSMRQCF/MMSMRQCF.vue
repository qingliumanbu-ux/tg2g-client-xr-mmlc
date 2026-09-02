<template>
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
        :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL" :f5-do="F5_DO" :f5-pre-do="F5_PRE_DO"
        :f5-cancel="F5_CANCEL" :f6-do="F6_DO" :f6-pre-do="F6_PRE_DO" :f6-cancel="F6_CANCEL" :f7-do="F7_DO" :f7-pre-do="F7_PRE_DO" :f7-cancel="F7_CANCEL"
        :f8-do="F8_DO" :f9-do="F9_DO" :f9-pre-do="F9_PRE_DO" :f9-cancel="F9_CANCEL" :f10-do="F10_DO"
        :f10-pre-do="F10_PRE_DO" :f10-cancel="F10_CANCEL" :f11-do="F11_DO" :f11-pre-do="F11_PRE_DO"
        :f11-cancel="F11_CANCEL">
        <xr-ef-form :have-auth-button="false">
            <template v-if="initializeFlag === 1">
                <er-layout :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter'"
                    @valueChanged="valueChanged"></er-layout>
                <a-tabs v-model:activeKey="tab1ActiveKey" type="card" @change="handleTabChange">
                    <a-tab-pane key="tab1" tab="查询结果" style="overflow: auto;" :forceRender="true">
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                            :config-id="'gridView1'" @erGridReady="erGrid1Ready">
                        </er-grid>
                    </a-tab-pane>
                    <a-tab-pane key="tab2" tab="操作记录" style="overflow: auto;" :forceRender="true">
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                            :config-id="'gridView2'">
                        </er-grid>
                    </a-tab-pane>
                </a-tabs>

            </template>
        </xr-ef-form>
    </xr-ef-form>
    <xr-ef-dialog ref="xrEfDialogRef" :title="dialogFormName" height="80%" width="95%"
        @click-close-icon="xrEfDialogClose" v-model:visible="dialogVisible">
        <MMSMTLCF_POP :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
            @getChildInfo="getChildInfo">
        </MMSMTLCF_POP>
    </xr-ef-dialog>
      <xr-ef-dialog ref="xrEfDialogRef" :title="dialogFormName_JQ" height="80%" width="95%"
        @click-close-icon="xrEfDialogClose_JQ" v-model:visible="dialogVisible_JQ">
        <MMSMJQ_POP :openInDialog="true" :dialogFormName="dialogFormName_JQ" :parentInfo="parentInfo_JQ"
            @getChildInfo_JQ="getChildInfo_JQ">
        </MMSMJQ_POP>
    </xr-ef-dialog>
</template>

<script lang="ts" src="./MMSMRQCF.ts"></script>
