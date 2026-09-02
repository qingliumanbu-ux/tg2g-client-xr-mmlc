<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO"
  :f3-pre-do="F3_PRE_DO"
  :f3-cancel="F3_CANCEL"
  :f4-do="F4_DO"
  :f4-pre-do="F4_PRE_DO"
  :f4-cancel="F4_CANCEL">
    <xr-ef-form :have-auth-button="false">
      <er-layout
        v-if="initializeFlag === 1"
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
            v-if="initializeFlag === 1"
            :er-form-helper-prop="erFormHelper"
            :toolbar-style="'both'"
            :config-id="'gridView1'"
           
            :page-options="{ pagination: 'server', pageSize: 5000 ,pageSizes:[5000,10000,20000]}" 

          >
          </er-grid>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM2AS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM2AS2N.scss";
</style>
