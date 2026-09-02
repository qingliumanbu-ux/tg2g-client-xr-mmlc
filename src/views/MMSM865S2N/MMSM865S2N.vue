<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f3-pre-do="F3_PRE_DO"
      :f3-cancel="F3_CANCEL"
    >
    <template v-if="initializeFlag === 1">
      <er-layout
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup2'"
      ></er-layout>
    </template>
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <v-splitter-pane size="45">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel title="源料仓" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
                    :config-id="'gridView1'"
                    @focus-changed="GridView1FocusChanged"
                    @erGridReady="erGrid1Ready"
                  >
                  </er-grid>
                </template> </xr-ef-panel
            ></v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel title="源料仓" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
                    :config-id="'gridView2'"
                    @erGridReady="erGrid2Ready"
                    @focus-changed="GridView2FocusChanged"
                    @rowSelected="grid2rowselected"
                    
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="10">
          <xr-ef-panel padding="5px" :show-header="false">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
          <div style="display: flex; flex-direction: row">
            <div
              class="MMLC_BUTTON" style="
                    width: 200px;
                    height: 25px;
                    margin-top: 10px;
                    border: 1px solid;
              "
              @click="TLupd"
            >
              =》确认移库
            </div>
            <input
              id="box_text"
              style="width: 200px;height: 22.5px;margin-top: 10px;"
              type="number"
              v-model="wt"
            />
          </div>
        </template>
      </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane size="45">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="50">
              <xr-ef-panel title="目的料仓" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
                    :config-id="'gridView3'"
                    @focus-changed="GridView3FocusChanged"
                    @erGridReady="erGrid3Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel title="目的料仓" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
                    :config-id="'gridView4'"
                    @erGridReady="erGrid4Ready"
                  >
                  </er-grid>
                </template> </xr-ef-panel
            ></v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSM865S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM865S2N.scss";
</style>
./MMSM865S2N.js./MMSM865S2N.js