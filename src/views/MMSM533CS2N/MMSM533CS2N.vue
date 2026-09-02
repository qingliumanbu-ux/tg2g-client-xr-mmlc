<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <template v-if="initializeFlag === 1">
      <er-layout
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
      ></er-layout>
    </template>
      <v-splitter>
        <v-splitter-pane size="50">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel
                title="退货计划查询结果"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView1'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel
                title="退货进厂车辆信息"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView2'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="50">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel
                title="采购退货装货确认信息-主表"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView3'"
                    :toolbar-options="gridToolbar"
                    @focus-changed="GridView3FocusChanged"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel
                title="采购退货装货确认信息-子表"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView4'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM533CS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM533CS2N.scss";
</style>

