<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <template v-if="initializeFlag === 1">
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <v-splitter-pane :size="40">
          <a-tabs
            v-model:activeKey="tabActiveKey"
            type="card"
            @change="handleTabChange"
          >
            <a-tab-pane key="tab1" tab="0#BOF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="b0_bunker_container_total_height"
                :colNum="b0_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="1#BOF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="b1_bunker_container_total_height"
                :colNum="b1_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab3" tab="2#BOF高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="b2_bunker_container_total_height"
                :colNum="b2_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab4" tab="0#AOD高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="a0_bunker_container_total_height"
                :colNum="a0_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab5" tab="1#AOD高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="a1_bunker_container_total_height"
                :colNum="a1_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab6" tab="2#AOD高位料仓">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="a2_bunker_container_total_height"
                :colNum="a2_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
          </a-tabs>
        </v-splitter-pane>
        <v-splitter-pane :size="60">
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
<script lang="ts" src="./MMSM400BAS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM400BAS2N.scss";
</style>
./MMSM400BAS2N.js./MMSM400BAS2N.js
