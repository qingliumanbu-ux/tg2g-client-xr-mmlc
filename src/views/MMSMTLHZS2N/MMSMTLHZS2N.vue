<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady"  :f2-do="f2Do">
        <v-splitter style="height: 100%" class="default-theme">
              <v-splitter-pane size="70">
                <v-splitter :horizontal="true">
                    
                      <er-layout
                      v-if="initializeFlag"
                      :er-form-helper-prop="erFormHelper"
                      :config-id="'layoutControlGroup1'"
                     ></er-layout>
                   
                    <v-splitter-pane size="60">
                   <xr-ef-panel title="投料明细" style="height: 100%" padding="5px">
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
                  </v-splitter-pane>
                
                  <v-splitter-pane size="40">
                   <xr-ef-panel title="炉次投料汇总  " style="height: 100%" padding="5px">
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
              </v-splitter-pane>
              <v-splitter-pane size="30">
                <v-splitter style="height: 100%" class="default-theme">
       
               <v-splitter-pane>
               <xr-ef-panel title="物料投料汇总  " style="height: 100%" padding="5px">
              <template #customButtonSlot> </template>
              <template v-if="initializeFlag" #contentSlot>
              <er-grid
            
                :er-form-helper-prop="erFormHelper"
                :config-id="'gridView3'"
                @erGridReady="erGrid3Ready"
              >
              </er-grid>
              </template>
               </xr-ef-panel>
       </v-splitter-pane>
      
    </v-splitter>
              </v-splitter-pane>  
        </v-splitter> 
    </xr-ef-form>
    
  </div>
</template>







<script lang="ts" src="./MMSMTLHZS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSMTLHZS2N.scss";
</style>
<!-- ./MMSM868V.js./MMSM868V.js -->./MMSMTLHZS2N.js./MMSMTLHZS2N.js