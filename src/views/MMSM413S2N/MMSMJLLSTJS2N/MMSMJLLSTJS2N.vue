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
              :page-options="{
                pagination: 'server',
                pageSize: 10000,
                pageSizes: [10000, 20000, 30000, 40000, 50000],
              }"
              @erGridReady="erGrid1Ready"
            >
            </er-grid>
          </template>
        </xr-ef-panel>
      </template>
    </xr-ef-form>
  </xr-ef-form>
</template>
<script lang="ts" src="./MMSMJLLSTJS2N.ts"></script>
