<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady"  :f2-do="f2Do">
     
      <er-layout
        v-if="initializeFlag"
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'"
      ></er-layout>

      <div style="height: 100%;">
        <xr-ef-panel title="加料历史" style="height: 100%" padding="5px">
          <template #customButtonSlot> </template>
           <template v-if="initializeFlag " #contentSlot>
           <er-grid
           
           :er-form-helper-prop="erFormHelper"
           :config-id="'gridView1'"
           @erGridReady="erGrid1Ready"
           @focus-changed="GridView1FocusChanged">
           </er-grid>
           </template>
           </xr-ef-panel>
      
          <div style="height:10px">
          </div>
      </div>

      <v-splitter style="height: 100%" class="default-theme">
       
        <v-splitter-pane>
          <xr-ef-panel title="详细数据  " style="height: 100%" padding="5px">
            <template #customButtonSlot> </template>
             <template v-if="initializeFlag" #contentSlot>
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

     
     
       

    </xr-ef-form>
    
  </div>
</template>
<script lang="ts" src="./MMSM870S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM870S2N.scss";
</style>
<!-- ./MMSM868V.js./MMSM868V.js -->./MMSM870S2N.js./MMSM870S2N.js