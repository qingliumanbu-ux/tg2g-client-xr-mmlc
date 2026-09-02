<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f3-pre-do="F3_PRE_DO"
      :f3-cancel="F3_CANCEL"
      @ready="efFormReady"
    >
      <div style="display: flex">
        <div style="display: flex; flex-direction: column; width: 100%">
          <er-layout
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :config-id="'LayoutGroupFilter'"
          ></er-layout>
        </div>
      </div>

      <a-tabs
        v-model:activeKey="tabActiveKey"
        type="card"
        @change="handleTabChange"
      >
        <a-tab-pane key="tab1" tab="工序效验排除表">
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
        <a-tab-pane key="tab2" tab="过钢量工序阈值及标准值">
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
        <a-tab-pane key="tab3" tab="铁水消耗系数">
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
        <a-tab-pane key="tab4" tab="物料代码大类">
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

<script lang="ts" src="./MMSMWXS2N.ts"></script>

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
./MMSMWXS2N.js./MMSMWXS2N.js
