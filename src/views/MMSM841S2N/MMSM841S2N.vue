<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL">
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
              <div style=" width: 100%; height: 60%">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                  @erGridReady="erGrid2Ready"  :toolbar-style="'both'"
                  @focus-changed="GridView2FocusChanged">
                </er-grid>
              </div>
              <div style=" width: 100%; height: 10%">
                <er-layout :er-form-helper-prop="erFormHelper" :config-id="'layoutControlGroup1'" @item-button-click="query_zx" @valueChanged="valueChanged_CX" ></er-layout>
              </div>
              <div style="float: left; width: 50%; height: 30%">
                <er-layout :er-form-helper-prop="erFormHelper" :config-id="'layoutControlGroup2'" >
                </er-layout>
              </div>
              <div style="float: left; width: 50%; height: 30%">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView3'"
                  @erGridReady="erGrid3Ready"  :toolbar-style="'both'"
                  >
                </er-grid>
              </div>
              <!-- <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter1'">
              </er-layout> -->
            </div>
          </template>
        </xr-ef-panel>
      </template>

    </xr-ef-form>
    <xr-ef-dialog v-model:visible="dialogVisible" :title="dialogFormName" height="80%" width="50%"
      @click-close-icon="xrEfDialogClose" :default-footer="false">
      <MMSM53POP :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"></MMSM53POP>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM841S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM841S2N.scss";
</style>./MMSM841S2N.js./MMSM841S2N.js