<template>
  <div style="height: 100%">
    <xr-ef-form :f2-do="F2_DO" @ready="efFormReady">
      <div style="display: flex">
        <div style="display: flex; flex-direction: column; width: 100%">
          <er-layout
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :config-id="'LayoutGroupFilter'"
            @valueChanged="valueChanged"
          ></er-layout>
        </div>
      </div>

      <a-tabs
        v-model:activeKey="tabActiveKey"
        type="card"
        @change="handleTabChange"
      >
        <a-tab-pane key="tab1" tab="消耗明细">
          <er-grid
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-options="gridToolbar"
            :toolbar-style="'both'"
            :config-id="'GridView1'"
            @erGridReady="erGrid1Ready"
          >
          </er-grid>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="消耗汇总">
          <er-grid
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-options="gridToolbar"
            :toolbar-style="'both'"
            :config-id="'GridView2'"
            @erGridReady="erGrid2Ready"
          >
          </er-grid>
        </a-tab-pane>
        <a-tab-pane key="tab3" tab="批次汇总">
          <er-grid
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-options="gridToolbar"
            :toolbar-style="'both'"
            :config-id="'GridView3'"
            @erGridReady="erGrid3Ready"
          >
          </er-grid>
        </a-tab-pane>
        <a-tab-pane key="tab4" tab="投料成功">
          <er-grid
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-options="gridToolbar"
            :toolbar-style="'both'"
            :config-id="'GridView4'"
            @erGridReady="erGrid4Ready"
          >
          </er-grid>
        </a-tab-pane>
      </a-tabs>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSMXHHDS2N.ts"></script>

<style lang="scss" scoped>
// @import url('./MMSM35V.scss');
.fenqieLayout {
  padding: 0;
  height: 100%;
  :deep(.efpanel-root) {
    height: 100% !important;
  }
}
</style>
./MMSMXHHDS2N.js./MMSMXHHDS2N.js
