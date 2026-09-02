<template>
  <div style="height: 100%">
    <xr-ef-form :f2-do="F2_DO" @ready="efFormReady">
      <div style="display: flex">
        <div style="display: flex; flex-direction: column; width: 100%">
          <er-layout
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :config-id="'LayoutGroupFilter'"
          ></er-layout>
        </div>
      </div>
      <xr-ef-panel title="详细信息" padding="5px">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <a-tabs
            v-model:activeKey="tabActiveKey"
            type="card"
            @change="handleTabChange"
          >
            <a-tab-pane key="tab1" tab="料仓库存信息">
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
            <a-tab-pane key="tab2" tab="物料库存信息">
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
            <a-tab-pane key="tab3" tab="料仓库存信息">
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
            <a-tab-pane key="tab4" tab="料仓详细信息">
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
            <a-tab-pane key="tab5" tab="特定料仓库存信息">
              <er-grid
                v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :toolbar-options="gridToolbar"
                :toolbar-style="'both'"
                :config-id="'GridView5'"
                @erGridReady="erGrid5Ready"
              >
              </er-grid>
            </a-tab-pane>
          </a-tabs>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSM869S2N.ts"></script>

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
