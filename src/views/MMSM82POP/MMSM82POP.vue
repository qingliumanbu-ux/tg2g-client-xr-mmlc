<template>
  <xr-ef-form
    :f3-do="F3_DO"
    :f2-do="F2_DO"
    :f2-pre-do="F2_PRE_DO"
    :f2-cancel="F2_CANCEL"
    :in-dialog-form-name="openInDialog ? dialogFormName : null"
    @closeDialog="closeEfDialog"
    @ready="efFormReady"
  >

    <er-layout
        v-if="initializeFlag"
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
        :auto-bind="true"
     ></er-layout>

    <xr-ef-panel title="料槽料篮信息" padding="5px">
      <template #customButtonSlot> </template>
      <template #contentSlot>
        <er-grid
          v-if="initializeFlag === 1"
          :er-form-helper-prop="erFormHelper"
          :config-id="'gridView1'"
          :toolbar-options="gridToolbar"
          :toolbar-style="'both'"
          @erGridReady="erGrid1Ready"  
        >
        <!-- @dblclick="dbbutClick" -->
        </er-grid>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM82POP.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82POP.scss";
</style>