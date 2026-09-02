<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <!-- <div class="card-header" style="background: #dbefff !important;padding:5px;border: 1px solid;"> -->
        <!-- <div class="header-title" style="color: rgb(47, 128, 237); margin-left: 5px"> -->
          <!-- 料仓信息 -->
        <!-- </div> -->
      <!-- </div> -->
      <div style="height: 100%;">
      <xr-ef-panel title="主信息" style="height: 100%;">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
  
          <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
            :toolbar-style="'both'" @erGridReady="erGrid1Ready">
          </er-grid>
        </template>
      </xr-ef-panel>
      
      <div style="height:10px">
      </div>
    </div>

      <v-splitter style="height: 100%" class="default-theme">
       
        <v-splitter-pane>
          <xr-ef-panel title="物料信息" style="height: 100%" padding="5px">
            <template #customButtonSlot> </template>
             <template v-if="initializeFlag === 1" #contentSlot>
             <er-grid
             
             :er-form-helper-prop="erFormHelper"
             :config-id="'gridView2'"
             @erGridReady="erGrid2Ready"
             @focus-changed="GridView1FocusChanged">
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
             :config-id="'gridView3'"
             @erGridReady="erGrid3Ready">
             </er-grid>
             </template>
             </xr-ef-panel>
        </v-splitter-pane>
     </v-splitter>

     
     
       <!-- <kendo-tabstrip style="height: 100%;">
     
      <div>
        <kendo-splitter style="height: 100%;"
          :orientation="'horizontal'"
          :panes="[
  {
    'size': '65%',
    'collapsible': true
  },
  {
    'collapsible': true
  }
]">
          <div style="display: flex; flex-direction: column;">
            <er-grid 
              @erGridReady="erGrid1Ready"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @focus-changed="GridView1FocusChanged">
            </er-grid>
          </div>
          <div style="display: flex; flex-direction: column;">
            <er-grid 
               @erGridReady="erGrid2Ready"
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView2'">
            </er-grid>
          </div>
        </kendo-splitter>
      </div>
    </kendo-tabstrip> -->
      <!-- <div class="card-header" style="border: 1px solid;background: #dbefff !important;padding:5px">
        <div class="header-title" style="color: rgb(47, 128, 237); margin-left: 5px">
          明细信息
        </div>
      </div>
      <div style="border: 1px solid; text-align: center; height: 50%">
        <div style="height: 100%; padding:5px ; float: right">
          <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
            :toolbar-options="gridToolbar" :toolbar-style="'both'">
          </er-grid>
        </div>
        <div style="height: 100%; padding:5px ; float: left">
           <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
            :toolbar-options="gridToolbar" :toolbar-style="'both'">
          </er-grid>
        </div>
      </div> -->

    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM866V.ts"></script>

<style lang="scss" scoped>
@import "./MMSM866V.scss";
</style>
<!-- ./MMSM866V.js./MMSM866V.js -->