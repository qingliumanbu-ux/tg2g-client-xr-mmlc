<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f4-do="F4_DO" :f5-do="F5_DO">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
        ></er-layout>
      </template>
      <v-splitter>
        <v-splitter-pane size="30">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="100">
              <xr-ef-panel title="回炉列表" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'" @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>           
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="70">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel title="工艺路线" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'" @erGridReady="erGrid2Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>            
            <v-splitter-pane size="50">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                  <xr-ef-panel
                    title="回炉消耗"
                    style="height: 100%"
                    padding="5px"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        :er-form-helper-prop="erFormHelper"
                        :config-id="'gridView4'" @erGridReady="erGrid4Ready"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
                <v-splitter-pane size="50">
                  <xr-ef-panel
                    title="总消耗信息"
                    style="height: 100%"
                    padding="5px"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        :er-form-helper-prop="erFormHelper"
                        :config-id="'gridView5'" @erGridReady="erGrid5Ready"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
              </v-splitter>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM82HS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82HS2N.scss";
</style>
