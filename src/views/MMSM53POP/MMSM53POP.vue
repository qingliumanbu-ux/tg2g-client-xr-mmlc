<template>
  <xr-ef-form
    :f3-do="F3_DO"
    :f3-pre-do="F3_PRE_DO"
    :f3-cancel="F3_CANCEL"
    :in-dialog-form-name="openInDialog ? dialogFormName : null"
    @closeDialog="closeEfDialog"
    @ready="efFormReady"
  >
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'layoutControlGroup1'"
    ></er-layout>
    <xr-ef-panel title="成分信息" padding="5px">
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
        </er-grid>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM53POP.ts"></script>

<style lang="scss" scoped>
@import "./MMSM53POP.scss";
</style>
