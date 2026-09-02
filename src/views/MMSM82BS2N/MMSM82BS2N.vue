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
        <v-splitter-pane size="20">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="100">
              <xr-ef-panel
                title="工艺路线多炉号分摊"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="80">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="30">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                  <xr-ef-panel
                    title="DA_HEAT_RELATION"
                    style="height: 100%"
                    padding="5px"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        :er-form-helper-prop="erFormHelper"
                        :config-id="'gridView2'"
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
                    title="PM_CCM_HEAT"
                    style="height: 100%"
                    padding="5px"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        :er-form-helper-prop="erFormHelper"
                        :config-id="'gridView4'"
                        :toolbar-options="gridToolbar"
                        @focus-changed="GridView3FocusChanged"
                        :toolbar-style="'both'"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
              </v-splitter>
            </v-splitter-pane>

            <v-splitter-pane size="70">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                  <xr-ef-panel
                    title="消耗信息"
                    style="height: 100%"
                    padding="5px"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        :er-form-helper-prop="erFormHelper"
                        :config-id="'gridView3'"
                        :toolbar-options="gridToolbar"
                        :toolbar-style="'both'"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
                <v-splitter-pane size="50">
                  <v-splitter
                    horizontal
                    style="height: 100%"
                    class="default-theme"
                  >
                    <v-splitter-pane size="50">
                      <xr-ef-panel
                        title="分摊消耗"
                        style="height: 100%"
                        padding="5px"
                      >
                        <template #customButtonSlot> </template>
                        <template v-if="initializeFlag === 1" #contentSlot>
                          <er-grid
                            :er-form-helper-prop="erFormHelper"
                            :config-id="'gridView5'"
                            :toolbar-options="gridToolbar"
                            :toolbar-style="'both'"
                          >
                          </er-grid>
                        </template>
                      </xr-ef-panel>
                    </v-splitter-pane>
                    <v-splitter-pane size="50">
                      <xr-ef-panel
                        title="历史数据"
                        style="height: 100%"
                        padding="5px"
                      >
                        <template #customButtonSlot> </template>
                        <template v-if="initializeFlag === 1" #contentSlot>
                          <er-grid
                            :er-form-helper-prop="erFormHelper"
                            :config-id="'gridView6'"
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
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM82BS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82BS2N.scss";
</style>
