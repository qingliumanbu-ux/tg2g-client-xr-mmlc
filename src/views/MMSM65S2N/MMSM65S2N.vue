<template v-if="initializeFlag === 1">
  <xr-ef-form
    @ready="efFormReady"
    :f2-do="F2_DO"
    :f3-do="F3_DO"
    :f4-do="F4_DO"
    :f5-do="F5_DO"
    :f6-do="F6_DO"
    :f7-do="F7_DO"
    :f7-pre-do="F7_PRE_DO"
    :f7-cancel="F7_CANCEL"
    :f8-do="F8_DO"
    :f8-pre-do="F8_PRE_DO"
    :f8-cancel="F8_CANCEL"
  >
    <template v-if="initializeFlag === 1">
      <er-layout
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
        :show-query-button="false"
        @item-button-click="layout4_click"
      >
        <!-- :show-form-toolbar="true" -->
      </er-layout>
    </template>
    <xr-ef-panel
      title="要料信息"
      padding="5px"
      style="height: 100%"
      class="Box"
    >
      <template #customButtonSlot> </template>
      <template v-if="initializeFlag === 1" #contentSlot>
        <er-grid
          :er-form-helper-prop="erFormHelper"
          :config-id="'GridView1'"
          :toolbar-style="'both'"
          @erGridReady="erGrid1Ready"
          @focus-changed="focusChange"
        >
        </er-grid>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
  <div class="Box1">
    <xr-ef-dialog
      v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="80%"
      width="80%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <div
        style="width: 100%; height: 100%"
        v-if="dialogFormName === 'MMSM50ADDS2N'"
      >
        <MMSM50ADDS2N
          :openInDialog="true"
          :dialogFormName="dialogFormName"
          :parentInfo="parentInfo"
          @getChildInfo="getChildInfo"
        ></MMSM50ADDS2N>
      </div>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM65S2N.ts"></script>
<style lang="scss" scoped>
@import "./MMSM65S2N.scss";
</style>
