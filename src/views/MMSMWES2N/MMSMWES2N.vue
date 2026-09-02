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
        <a-tab-pane key="tab1" tab="回收铁料铬镍静态表1">
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
        <a-tab-pane key="tab2" tab="回收铁料铬镍静态表2">
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
        <a-tab-pane key="tab3" tab="物料大类维护">
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
      </a-tabs>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSMWES2N.ts"></script>

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
