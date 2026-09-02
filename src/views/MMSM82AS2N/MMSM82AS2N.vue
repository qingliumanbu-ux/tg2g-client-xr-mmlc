<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f4-do="F4_DO" :f5-do="F5_DO" :f6-do="f6Do" :f6-pre-do="f6PreDo" :f6-cancel="f6Cancel" :f7-do="F7_DO" :f9-do="F9_DO" >
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"  @valueChanged="query_zx"
        ></er-layout>
      </template>
      <v-splitter>
        <v-splitter-pane size="30">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="100">
              <xr-ef-panel title="炉次列表" style="height: 100%" padding="5px">
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
                  <!-- <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'" @erGridReady="erGrid2Ready"
                  >
                  </er-grid> -->

                  <div style="float: left; width:80%;height: 100%;  ">
                    <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
                    </er-grid>
                  </div>
                  <div style="float: left; width:20%; height: 100%;  ">
                    
                    <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView_q'" @erGridReady="erGrid_qReady">
                    </er-grid>
                  </div>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <xr-ef-panel title="投料列表" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView3'" @erGridReady="erGrid3Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>

            <v-splitter-pane size="50">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                  <xr-ef-panel
                    title="板坯列表"
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
                    title="发送历史"
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
<script lang="ts" src="./MMSM82AS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82AS2N.scss";
</style>

./MMSM82AS2N.js./MMSM82AS2N.js
