<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <v-splitter-pane size="50">
          <div style="width: 100%; height: 100%" class="Box">
            <div style="float: left; width: 55%; height: 100%">
              <template v-if="initializeFlag === 1">
                <er-layout
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilter'"
                ></er-layout>
              </template>
              <xr-ef-panel
                title="料仓信息"
                style="height: 80%; width: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    @erGridReady="erGrid1Ready"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </div>
            <div style="float: left; width: 45%; height: 100%">
              <template v-if="initializeFlag === 1">
                <er-layout
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilter'"
                ></er-layout>
              </template>
              <xr-ef-panel
                title="料仓预警"
                style="height: 80%; width: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'"
                    @erGridReady="erGrid2Ready"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </div>
          </div>
        </v-splitter-pane>
        <v-splitter-pane size="50">
          <xr-ef-panel title="库存详细" style="height: 100%" padding="5px">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <div style="float: left; width: 70%; height: 100%">
                <er-grid
                  v-if="initializeFlag === 1"
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView3'"
                  @erGridReady="erGrid3Ready"
                  :toolbar-options="gridToolbar"
                  :toolbar-style="'both'"
                >
                </er-grid>
              </div>
              <div style="float: left; width: 30%; height: 100%">
                <er-grid
                  v-if="initializeFlag === 1"
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView4'"
                  @erGridReady="erGrid4Ready"
                  :toolbar-options="gridToolbar"
                  :toolbar-style="'both'"
                >
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSM432S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM432S2N.scss";
</style>
./MMSM432S2N.js./MMSM432S2N.js
