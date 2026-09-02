<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f4-do="F4_DO">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'layoutControlGroup2'"
        ></er-layout>
      </template>
      <xr-ef-panel title="选择要修正的高位料仓" padding="0 0 0 0">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <div style="float: left; width: 60%; height: 100%">
            <er-grid
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
              :toolbar-style="'both'"
              @focus-changed="GridView1FocusChanged"
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
    <xr-ef-dialog
      v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="80%"
      width="20%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <MMSMUPD863V
        :openInDialog="true"
        :dialogFormName="dialogFormName"
        :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"
      ></MMSMUPD863V>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM863S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM863S2N.scss";
</style>
./MMSM862S2N.js./MMSM862S2N.js./MMSM863S2N.js./MMSM863S2N.js