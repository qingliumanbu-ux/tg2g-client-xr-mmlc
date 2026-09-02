<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="f2Do"
      :f3-do="f3Do"
      :f3-pre-do="f3PreDo"
      :f3-cancel="f3Cancel"
    >
      <er-layout
        v-if="initializeFlag"
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
      ></er-layout>
      <xr-ef-panel title="查询结果" style="height: 100%" padding="5px">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <a-tabs
            v-model:activeKey="tabActiveKey"
            type="card"
            @change="handleTabChange"
          >
            <a-tab-pane key="tab1" tab="料仓库存信息">
              <er-grid
                v-if="initializeFlag"
                :er-form-helper-prop="erFormHelper"
                :config-id="'gridView1'"
                @erGridReady="erGrid1Ready"
              >
              </er-grid>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="火车库">
              <er-grid
                v-if="initializeFlag"
                :er-form-helper-prop="erFormHelper"
                :config-id="'gridView2'"
                @erGridReady="erGrid2Ready"
              >
              </er-grid>
            </a-tab-pane>
            <a-tab-pane key="tab3" tab="铬库">
              <er-grid
                v-if="initializeFlag"
                :er-form-helper-prop="erFormHelper"
                :config-id="'gridView3'"
                @erGridReady="erGrid3Ready"
              >
              </er-grid>
            </a-tab-pane>
          </a-tabs>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSMWSS2N.ts"></script>

<style lang="scss">
@import "./MMSMWSS2N.scss";
</style>
