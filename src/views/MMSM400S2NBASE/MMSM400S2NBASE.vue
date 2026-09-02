<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <template v-if="initializeFlag === 1">
      <MMSM400BUNKER
        :bunker="bunker_info"
        :height="bunker_container_total_height"
        :colNum="bunker_cols"
        @butClick="butClick"
        @dbbutClick="dbbutClick"
      ></MMSM400BUNKER>

      <v-splitter
        :style="{ height: `calc(100% - ${bunker_container_total_height})` }"
        class="default-theme"
      >
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
<script lang="ts" src="./MMSM400S2NBASE.ts"></script>

<style lang="scss" scoped>
@import "./MMSM400S2NBASE.scss";
</style>
