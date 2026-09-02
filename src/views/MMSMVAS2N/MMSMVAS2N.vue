<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
    <xr-ef-form :have-auth-button="false">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
        ></er-layout>
        <xr-ef-panel title="查询结果" padding="5px" :open-header-show="false">
          <template #customButtonSlot> </template>
          <template #contentSlot>
            <er-grid
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
            >
            </er-grid>
          </template>
        </xr-ef-panel>
      </template>
    </xr-ef-form>
  </xr-ef-form>
</template>
<script lang="ts" src="./MMSMVAS2N.ts"></script>
