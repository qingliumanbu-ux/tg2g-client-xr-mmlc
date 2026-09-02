<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="f2Do" :f3-do="f3Do" :f3-pre-do="f3PreDo" :f3-cancel="f3Cancel"
            :f6-do="f6Do" :f7-do="f7Do">
      <er-layout v-if="initializeFlag" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter'"></er-layout>
      <xr-ef-panel title="查询结果" style="height: 100%" padding="5px">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
            <a-tab-pane key="tab1" tab="料仓库存">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                :config-id="'gridView1'" @erGridReady="erGrid1Ready">                
              </er-grid>       
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="物料信息">
              <div style="height: 100%;">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView3'"
                @erGridReady="erGrid3Ready"></er-grid>
                </div>
            </a-tab-pane>
            <a-tab-pane key="tab3" tab="更新铁区信息">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView4'"
                @erGridReady="erGrid4Ready"></er-grid>
            </a-tab-pane>
            <a-tab-pane key="tab4" tab="库存比对">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                @erGridReady="erGrid2Ready"></er-grid>
            </a-tab-pane>
            <a-tab-pane key="tab5" tab="更新SEQ_NO信息">
              <div style="height: 100%;">
                <er-layout
                 v-if="initializeFlag"
                :er-form-helper-prop="erFormHelper"
                :config-id="'layoutControlGroup1'"
               ></er-layout>
                </div>
            </a-tab-pane>
          </a-tabs>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSM85_QC.ts"></script>

<style lang="scss">
@import "./MMSM85_QC.scss";
</style>
