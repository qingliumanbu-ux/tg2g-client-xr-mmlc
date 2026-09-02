<template>
  <xr-ef-form
    @ready="efFormReady"
    :f2-do="F2_DO"
    :f3-do="F3_DO"
    :f4-do="F4_DO"
    :f5-do="F5_DO"
    :f6-do="F6_DO"
    :f6-pre-do="F6_PRE_DO"
    :f6-cancel="F6_CANCEL"
    :f7-do="F7_DO"
    :f8-do="F8_DO"
  >
    <xr-ef-form :have-auth-button="false">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
          @valueChanged="valueChanged"
        ></er-layout>
        
          <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
            <a-tab-pane key="tab1" tab="查询结果">            
            <er-grid
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
            >
            </er-grid>
          </a-tab-pane>
          <a-tab-pane key="tab2" tab="导出结果">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                        @erGridReady="erGrid2Ready">
              </er-grid>                   
           </a-tab-pane>
        </a-tabs>
     
      </template>
    </xr-ef-form>
  </xr-ef-form>
</template>
<script lang="ts" src="./MMSM57S2N.ts"></script>
