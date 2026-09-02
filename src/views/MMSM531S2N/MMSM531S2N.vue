<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <xr-ef-form :have-auth-button="false">
    <template v-if="initializeFlag === 1">
      <er-layout
        
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
      ></er-layout>
      <xr-ef-panel
        title="计量单查询结果"
        padding="5px"
        :open-header-show="false"
      >
        <template #customButtonSlot> </template>
        <template #contentSlot>
          <er-grid
            
            :er-form-helper-prop="erFormHelper"
            :toolbar-style="'both'"
            :config-id="'gridView1'"
          >
          </er-grid>
        </template>
      </xr-ef-panel>
    </template>
    </xr-ef-form>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM531S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM531S2N.scss";
</style>
