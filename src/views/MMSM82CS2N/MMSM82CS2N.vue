<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO"
    :f3-cancel="F3_CANCEL" :f7-do="F7_DO"  :f6-do="F6_DO" :f6-pre-do="F6_PRE_DO"
    :f6-cancel="F6_CANCEL" :f8-do="F8_DO" :f12-do="F12_DO">
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
        ></er-layout>
      </template>
      <v-splitter  style="height: 100%;" :orientation="'horizontal'"  class="default-theme">
        <v-splitter-pane size="30">          
              <xr-ef-panel
                title="炉次信息"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane size="70">
          <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
                <a-tab-pane key="tab1" tab="工艺路径">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="40">              
                  <er-grid
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                    :config-id="'gridView2'" @erGridReady="erGrid2Ready"
                  >
                  </er-grid>
            </v-splitter-pane>
            <v-splitter-pane size="60">
              <v-splitter  style="height: 100%;" :orientation="'horizontal'"  class="default-theme">
                <v-splitter-pane size="60">      
              <xr-ef-panel title="消耗明细" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                    :config-id="'gridView3'" @erGridReady="erGrid3Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="40">
              <xr-ef-panel title="消耗汇总" style="height: 100%" padding="5px">
                <template #customButtonSlot> </template>
                <template v-if="initializeFlag === 1" #contentSlot>
                  <er-grid
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                    :config-id="'gridView4'" @erGridReady="erGrid4Ready"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>       
            </v-splitter-pane>
          </v-splitter>
        </a-tab-pane>
                <a-tab-pane key="tab2" tab="重复预熔液">
                 
                  <er-grid style="height: 70%;"
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                    :config-id="'gridView5'" @erGridReady="erGrid5Ready" @focus-changed="GridView5FocusChanged"
                  >
                  </er-grid>
                  <er-grid style="height: 30%;"
                  v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                    :config-id="'gridView6'" @erGridReady="erGrid6Ready" 
                  >
                  </er-grid>
                </a-tab-pane>
                <a-tab-pane key="tab3" tab="跳号">                 
                 <er-grid style="height: 100%;"
                 v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                   :config-id="'gridView_th'" @erGridReady="erGridthReady"
                 >
                 </er-grid>                 
               </a-tab-pane>
               <a-tab-pane key="tab4" tab="未过连铸">                 
                 <er-grid style="height: 100%;"
                 v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                   :config-id="'gridView_lz'" @erGridReady="erGridlzReady"
                 >
                 </er-grid>                 
               </a-tab-pane>

               <a-tab-pane key="tab5" tab="跳号2">                 
                 <er-grid style="height: 100%;"
                 v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                   :config-id="'gridView_th2'" @erGridReady="erGridth2Ready"
                 >
                 </er-grid>                 
               </a-tab-pane>

               <a-tab-pane key="tab6" tab="无消耗">                 
                 <er-grid style="height: 100%;"
                 v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" 
                   :config-id="'gridView_wxh'" @erGridReady="erGridwxhReady"
                 >
                 </er-grid>                 
               </a-tab-pane>
              </a-tabs>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM82CS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM82CS2N.scss";
</style>
./MMSM82CS2N.js./MMSM82CS2N.js
