<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'layoutControlGroup2'"
        ></er-layout>
      </template>
      <template v-if="initializeFlag === 1">
        <xr-ef-panel title="选择要修正的高位料仓" padding="0 0 0 0">
          <template #customButtonSlot> </template>
          <template #contentSlot>
            <div style="float: left; width: 60%; height: 100%">
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
                @erGridReady="erGrid1Ready" :toolbar-style="'both'" @focus-changed="GridView1FocusChanged">
              </er-grid>
            </div>
            <div style="float: left; width: 40%; height: 100%">
              <div style=" width: 100%; height: 80%">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                  @erGridReady="erGrid2Ready"  :toolbar-style="'both'"
                  @focus-changed="GridView2FocusChanged"
                  @rowSelected="grid2rowselected"
                  >
                </er-grid>
              </div>
              <div style=" width: 100%; height: 20%">
                <er-layout :er-form-helper-prop="erFormHelper" :config-id="'layoutControlGroup1'"></er-layout>
              </div>
              <!-- <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter1'">
              </er-layout> -->
            </div>
          </template>
        </xr-ef-panel>
      </template>

    </xr-ef-form>
    <xr-ef-dialog v-model:visible="dialogVisible" :title="dialogFormName" height="80%" width="20%"
      @click-close-icon="xrEfDialogClose" :default-footer="false">
      <MMSMUPD862V :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"></MMSMUPD862V>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM862S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM862S2N.scss";
</style>