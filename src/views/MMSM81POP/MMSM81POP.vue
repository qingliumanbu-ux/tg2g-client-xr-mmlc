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
    <xr-ef-panel title="订单信息" padding="5px">
      <template #customButtonSlot> </template>
      <template #contentSlot>
        <er-grid
          v-if="initializeFlag === 1"
          :er-form-helper-prop="erFormHelper"
          :config-id="'gridView1'"          
          @erGridReady="erGrid1Ready"
          @focus-changed="GridView1FocusChanged"
        >
        </er-grid>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM81POP.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81POP.scss";
</style>