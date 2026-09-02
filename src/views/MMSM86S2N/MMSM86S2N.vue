<template>
  <div style="height: 100%;">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL">
      <!-- 左右结构 -->
      <v-splitter style="height: 100%" class="default-theme">
        <v-splitter-pane size="30">
          <!-- 查询物料 -->
          <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter'"
          @item-button-click="query_zx">
          </er-layout>
          <!-- 请选择物料 -->
          <div style="display: flex; flex-direction: column;height: 87%;">
            <xr-ef-panel title="请选择物料" padding="5px">
              <template #customButtonSlot>

              </template>
              <template #contentSlot>
                <!-- :toolbar-options="gridToolbar1" -->
                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
                  :toolbar-style="'both'" @focus-changed="gridView1FocusChanged" @erGridReady="erGrid1Ready">
                </er-grid>
              </template>
            </xr-ef-panel>
          </div>
        </v-splitter-pane>
        <v-splitter-pane>
          <!-- 查询计量单信息 -->

          <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter3'"
            @item-button-click="query_jl_zx"></er-layout>
          <!-- 请选择计量单 -->
          <div style="display: flex;height:25%;">

            <xr-ef-panel title="请选择计量单" padding="5px">
              <template #customButtonSlot>

              </template>
              <template #contentSlot>
                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                  :toolbar-style="'both'" @focus-changed="gridView2FocusChanged" @erGridReady="erGrid2Ready">
                </er-grid>
              </template>
            </xr-ef-panel>
          </div>
          <!-- 库存记录 -->
          <div style="display: flex; flex-direction: column;height: 25%;">
            <xr-ef-panel title="请选择详细库存记录" padding="5px">
              <template #customButtonSlot>

              </template>
              <template #contentSlot>
                <!-- :toolbar-options="gridToolbar1" -->
                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView3'"
                  :toolbar-style="'both'" @focus-changed="gridView3FocusChanged" @erGridReady="erGrid3Ready">
                </er-grid>
              </template>
            </xr-ef-panel>
          </div>

          <!-- 物料信息 -->
          <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter1'">
          </er-layout>
          <!-- 修正信息 -->
          <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
            :config-id="'LayoutGroupFilter2'">
            :auto-bind="true"
          </er-layout>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSM86S2N.ts">
</script>