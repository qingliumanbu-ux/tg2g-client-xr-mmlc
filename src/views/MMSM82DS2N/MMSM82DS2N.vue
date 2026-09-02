<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO"  :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO"
    :f4-cancel="F4_CANCEL"  :f5-do="F5_DO" :f6-do="F6_DO" :f7-do="F7_DO">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
        ></er-layout>
      </template>    
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel
                title="所分摊的物料和重量"
                style="height: 100%"
                padding="5px"
              >
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    @erGridReady="erGrid2Ready"
                    :config-id="'gridView2'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel title="分摊结果" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView3'"
                    @erGridReady="erGrid3Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>       
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM82DS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82DS2N.scss";
</style>
