<template>
  <xr-ef-form
    @ready="efFormReady"
    :f2-do="F2_DO"
    :f3-do="F3_DO"
    :f6-pre-do="F3_PRE_DO"
    :f6-cancel="F3_CANCEL"
  >
    <xr-ef-form :have-auth-button="false">
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
      ></er-layout>
      <xr-ef-panel title="计量磅单履历" padding="5px" :open-header-show="false">
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <er-grid
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-style="'both'"
            :config-id="'gridView1'"
          >
          </er-grid>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM81RCVS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81RCVS2N.scss";
</style>
./MMSM81RCVS2N.js./MMSM81RCVS2N.js
