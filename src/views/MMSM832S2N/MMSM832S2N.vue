<template>
  <div style="height: 100%">
    <xr-ef-form :f2-do="F2_DO" @ready="efFormReady">
      <xr-ef-panel title="虚拟库存" padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="float: left; width: 60%; height: 400px; margin-left: 1%">
            <er-grid
             
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
            >
            </er-grid>
          </div>
          <div style="float: left; width: 35%; height: 400px; margin-left: 1%">
            <er-grid
             
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView2'"
              @erGridReady="erGrid2Ready"
            >
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
      <xr-ef-panel padding="5px" :show-header="false">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <input
            id="box_text"
            style="width: 200px"
            type="number"
            v-model="box_wt"
          /><br />
          <select
            v-model="DL_LC.name"
            style="width: 200px; height: 25px; margin-top: 10px"
          >
            <option disabled selected style="display: block">请选择</option>
            <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
              {{ item.name }}
            </option>
          </select>
          <div
            style="
              width: 200px;
              height: 25px;
              margin-top: 10px;
              border: 1px solid;
              text-align: center;
              background-color: #0066ff;
            "
            @click="butClick"
          >
            确认领料
          </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM832S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM832S2N.scss";
</style>
<!-- ./MMSM832S2N.js./MMSM832S2N.js -->