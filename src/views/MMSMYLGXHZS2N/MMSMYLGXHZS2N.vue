<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'layoutControlGroup2'"
          @item-button-click="layout2_Changed"
          @valueChanged="valueChanged"
        ></er-layout>
      </template>
      <xr-ef-panel title="工序及物料汇总" padding="0 0 0 0">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <div style="float: left; width: 60%; height: 100%">
            <er-grid
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
              :toolbar-style="'both'"
            >
            </er-grid>
          </div>
          <div style="float: left; width: 40%; height: 100%">
            <er-grid
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView2'"
              @erGridReady="erGrid2Ready"
              :toolbar-options="gridToolbar"
              :toolbar-style="'both'"
            >
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSMYLGXHZS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSMYLGXHZS2N.scss";
</style>
