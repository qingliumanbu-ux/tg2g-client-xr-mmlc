<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">  
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'layoutControlGroup2'"
        ></er-layout>
      </template>
      <div style=" height: 100%">
          <xr-ef-panel title="高位料仓" padding="5px" style="height: 45%">
            <template v-if="initializeFlag === 1" #contentSlot>
              <div style="float: left; width: 50%; height: 100%;padding: 0 5px 0 5px; ">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready"
                  @focus-changed="GridView1FocusChanged">
                </er-grid>
              </div>
              <div style="float: left; width:50%; height: 100%; ">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
                </er-grid>
              </div>

            </template>
          </xr-ef-panel>
          <xr-ef-panel padding="5px" :show-header="false" style="height: 60px;">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <div style="display: flex; height: 100%; align-items: center;">
                <div>退料数据：<input id="box_text" style="width: 150px;height: 25px;" type="number" v-model="box_wt" /></div>
                <div class="MMLC_BUTTON" style="width: 200px;height: 25px; margin-left: 5px;" @click="butClick">
                  退料确认
                </div>
              </div>
            </template>
          </xr-ef-panel>
          <div style="height: 47%; margin: auto; overflow: auto; flex: 1; ">
          <xr-ef-panel title="低位料仓" padding="5px"  style="height: 100%;">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <div style="float: left; width: 50%; height: 100%; padding: 0 5px 0 5px;">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView3'" @erGridReady="erGrid3Ready"
                  @focus-changed="GridView3FocusChanged">
                </er-grid>
              </div>
              <div style="float: left; width: 50%; height: 100%; ">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView4'" @erGridReady="erGrid4Ready">
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
        </div>
        </div> 
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM861S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM861S2N.scss";
</style>
