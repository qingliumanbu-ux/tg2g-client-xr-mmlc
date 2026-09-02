<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <template v-if="initializeFlag === 1">
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <v-splitter-pane :size="30">
          <a-tabs
            v-model:activeKey="tabActiveKey"
            type="card"
            @change="handleTabChange"
          >
            <a-tab-pane key="tab1" tab="VOD高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="v_bunker_container_total_height"
                :colNum="v_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="1#LF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="l1_bunker_container_total_height"
                :colNum="l1_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab3" tab="2#LF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="l2_bunker_container_total_height"
                :colNum="l2_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab4" tab="1#EAF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="e1_bunker_container_total_height"
                :colNum="e1_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab5" tab="2#EAF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="e2_bunker_container_total_height"
                :colNum="e2_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
          </a-tabs>
        </v-splitter-pane>
        <v-splitter-pane :size="70">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane>
              <xr-ef-panel title="物料信息" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    @erGridReady="erGrid1Ready"
                    @focus-changed="GridView1FocusChanged"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane>
              <xr-ef-panel title="成分信息" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'"
                    @erGridReady="erGrid2Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </template>
  </xr-ef-form>

  <div class="Box1">
    <xr-ef-dialog
      v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="80%"
      width="80%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <div
        style="width: 100%; height: 100%"
        v-if="dialogFormName === 'MMSM53POP_KC'"
      >
        <MMSM53POP_KC
          :openInDialog="true"
          :dialogFormName="dialogFormName"
          :parentInfo="parentInfo"
          @getChildInfo="getChildInfo"
        ></MMSM53POP_KC>
      </div>
      <div
        style="width: 100%; height: 100%"
        v-if="dialogFormName === 'MMSM50ADDS2N'"
      >
        <MMSM50ADDS2N
          :openInDialog="true"
          :dialogFormName="dialogFormName"
          :parentInfo="parentInfo"
          @getChildInfo="getChildInfo"
        ></MMSM50ADDS2N>
      </div>
    </xr-ef-dialog>
  </div>
</template>
<script lang="ts" src="./MMSM400LEVS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM400LEVS2N.scss";
</style>
