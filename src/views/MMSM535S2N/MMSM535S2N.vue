<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
    <template v-if="initializeFlag === 1">
    <er-layout
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroupFilter'"
    ></er-layout>
  </template>
    <v-splitter horizontal style="height: 100%" class="default-theme">
      <v-splitter-pane size="50">
        <xr-ef-panel title="查询结果" style="height: 100%" padding="5px">
          <template #customButtonSlot> </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <er-grid
              
              :er-form-helper-prop="erFormHelper"
              :toolbar-style="'both'"
              :config-id="'gridView1'"
              @focus-changed="GridView1FocusChanged"
            >
            </er-grid>
          </template>
        </xr-ef-panel>
      </v-splitter-pane>
      <v-splitter-pane size="50">
        <v-splitter style="height: 100%" class="default-theme">
          <v-splitter-pane size="50">
            <xr-ef-panel title="质检批成分" style="height: 100%" padding="5px">
              <template #customButtonSlot=""> </template>
              <template v-if="initializeFlag === 1" #contentSlot="">
                <er-grid
              
                  :er-form-helper-prop="erFormHelper"
                  :toolbar-style="'both'"
                  :config-id="'gridView2'"
            >
                </er-grid>
              </template>
            </xr-ef-panel>
          </v-splitter-pane>
          <v-splitter-pane size="50">
            <xr-ef-panel title="批次号成分" style="height: 100%" padding="5px">
              <template #customButtonSlot=""> </template>
              <template v-if="initializeFlag === 1" #contentSlot="">
                <er-grid
              
                  :er-form-helper-prop="erFormHelper"
                  :toolbar-style="'both'"
                  :config-id="'gridView3'"
            >
                </er-grid>
              </template>
            </xr-ef-panel>
          </v-splitter-pane>
        </v-splitter>
      </v-splitter-pane>
    </v-splitter>
  </xr-ef-form>
</template>

<script lang="ts" src="./MMSM535S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM535S2N.scss";
</style>

