<template>
  <div style="height: 100%;">
    <xr-ef-form @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f3-pre-do="F3_PRE_DO"
      :f3-cancel="F3_CANCEL"
      :f4-do="F4_DO"
      :f4-pre-do="F4_PRE_DO"
      :f4-cancel="F4_CANCEL"
      :f5-do="F5_DO"
      :f5-pre-do="F5_PRE_DO"
      :f5-cancel="F5_CANCEL"
      :f6-do="F6_DO"
      :f6-pre-do="F6_PRE_DO"
      :f6-cancel="F6_CANCEL">
      <er-layout v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'"></er-layout>
      <v-splitter :vertical="true"
        style="height: 100%"
        class="default-theme">
        <v-splitter-pane size="70">
          <xr-ef-panel title="铸坯信息"
            style="height: 100%">
            <template #customButtonSlot>
            </template>
            <template #contentSlot>
              <er-grid v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :config-id="'GridView1'"
                :toolbar-options="gridToolbar"
                :toolbar-style="'both'"
                @erGridReady="erGrid1Ready"
                @focus-changed="GridView1FocusChanged"
                @dblclick="GridView1dblclick">
              </er-grid>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane size="30">
          <xr-ef-panel title="自动收货开关管理"
            style="height: 100%">
            <template #customButtonSlot>
            </template>
            <template #contentSlot>
              <er-grid v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :config-id="'GridView2'"
                :toolbar-options="gridToolbar"
                :toolbar-style="'both'"
                @dblclick="GridView2dblclick"
                @erGridReady="erGrid2Ready">
              </er-grid>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts"
  src="./MMSMACSHS2N.ts">
</script>

<style lang="scss"
  scoped>
@import './MMSMACSHS2N.scss';
</style>
