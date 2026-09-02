<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady">
      <xr-ef-panel  title=" " padding="5px" >
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="float: left; width: 10%;height: 100%; ">
            <div style="
                width: 100%;
                height: 40%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto; padding:5px
              ">
              {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              {{ MX_LC_G[1] }}<br />
              {{ MX_LC_G[3] }}<br />
            </div>
            
            
          </div>
          <div style="float: left; width: 20%; height: 50%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready" >
            </er-grid>
          </div>
          <div
          style="
              float: left;
              width: 200px;
            " >
          <input id="box_text" style="width: 200px" type="number" v-model="box_wt" /><br />
          <div class="MMLC_BUTTON" style="
          width: 200px;
          height: 25px;
          margin-top: 10px;
            " @click="butClick">
            验证上数并确认
          </div>
          </div>
        </template>    
      </xr-ef-panel>
      <xr-ef-panel   title=" " padding="5px"  >
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
         
          <div style="float: left; width: 52%; height: 60%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView3'" @erGridReady="erGrid3Ready" @focus-changed="GridView3FocusChanged" >
            </er-grid>
          </div>
          <div style="float: left; width: 20%; height: 60%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView4'" @erGridReady="erGrid4Ready">
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM837S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM837S2N.scss";
</style>
<!-- ./MMSM837S2N.js./MMSM837S2N.js -->