<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
    >
      <v-splitter>
        <v-splitter-pane size="40">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="40">
              <template v-if="initializeFlag === 1">
              <er-layout
                
                :er-form-helper-prop="erFormHelper"
                :config-id="'LayoutGroupFilter'"
              ></er-layout>
            </template>
            </v-splitter-pane>
            <v-splitter-pane size="300">
              <xr-ef-panel
                title="质检批列表"
                padding="5px"
                style="height: 100%"
              >
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
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="60">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="40">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="40">
                  <er-layout
                    style="height: 100%"
                    
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroupFilterEdit'"
                  ></er-layout>
                </v-splitter-pane>
                <v-splitter-pane size="60">
                  <xr-ef-panel
                    title="质检批成分"
                    padding="5px"
                    style="height: 100%"
                  >
                    <template #customButtonSlot> </template>
                    <template v-if="initializeFlag === 1" #contentSlot>
                      <er-grid
                        
                        :er-form-helper-prop="erFormHelper"
                        :toolbar-style="'both'"
                        :config-id="'gridView2'"
                        @erGridReady="erGrid2Ready"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
              </v-splitter>
            </v-splitter-pane>
            <v-splitter-pane size="60">
              <xr-ef-panel
                title="与质检批关联的进厂计量单"
                padding="5px"
                style="height: 100%"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
                    :config-id="'gridView3'"
                    @erGridReady="erGrid3Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
    <xr-ef-dialog
      v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="60%"
      width="60%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <MMSM53POP
        :openInDialog="true"
        :dialogFormName="dialogFormName"
        :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"
      ></MMSM53POP>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM536S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM536S2N.scss";
</style>

