<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <!-- <div
        class="card-header"
        style="background: #dbefff !important; padding: 5px; border: 1px solid"
      >
        <div
          class="header-title"
          style="color: rgb(47, 128, 237); margin-left: 5px"
        >
          料仓信息
        </div>
      </div> -->
      <div style="width: 100%; height: 40%">
        <div style="width: 100%; height: 33.3%" class="Box">
          <div style="width: 4.5%; height: 100%" v-for="(item, index) in bunker1">
            <div style="width: 100%; height: 100%" v-if="buiker_stock_wt1[index] == 0">
              <div id="{{item}}" style="
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  white-space: nowrap; 
                  overflow: hidden;
                  justify-content: center;
                  text-align: center;
                  background: #f1eac0;
                  font-size: 10.8px;
                  
                  " @click="butClick1(item, index)" @dblclick="dbbutClick1(index)" :style="bunker_color_status1[index] == true
      ? { backgroundColor: '#d85b5b' }
      : { backgroundColor: '#f1eac0' }
      ">
                {{ item }} -{{ bunker_mat_type1[index] }}<br />
                {{ bunker_mat_name1[index] }}<br />
                {{ bunker_l2_code1[index] }}<br />
                {{ bunker_mat_code1[index] }}<br />
                {{ bunker_stock_wt1[index] }}<br />
              </div>
            </div>
            <div style="width: 100%; height: 100%;border: 1px solid;" v-if="buiker_stock_wt1[index] != 0">
              <div style="width: 100%; height: 100%;  white-space: nowrap; 
                  overflow: hidden;
                  justify-content: center;" v-if="BAOJI1[index] === 'X'">
                <div :style="{ width: 100 + '%', height: BL_WT1[index] + '%' }">
                  <div id="{{item}}" style="
                  width: 100%;
                  height: 100%;
                 
                  text-align: center;
                  background: #dabde2;
                  font-size: 10.8px;
                  
                  " @click="butClick1(item, index)" @dblclick="dbbutClick1(index)" :style="bunker_color_status1[index] == true
      ? { backgroundColor: '#d85b5b' }
      : { backgroundColor: '#FAFB03' }
      ">
                    {{ item }} -{{ bunker_mat_type1[index] }}<br />
                    {{ bunker_mat_name1[index] }}<br />
                    {{ bunker_l2_code1[index] }}<br />
                    {{ bunker_mat_code1[index] }}<br />
                    {{ bunker_stock_wt1[index] }}<br />
                  </div>
                </div>
                <div :style="{ width: 100 + '%', height: BS_WT1[index] + '%' }">
                  <div id="{{item}}" style="
                  width: 100%;
                  height: 100%;
                  white-space: nowrap; 
                  overflow: hidden;
                  justify-content: center;
                  text-align: center;
                  background: #A5D6A7;
                  font-size: 10.8px;
                  
                " @click="butClick1(item, index)" @dblclick="dbbutClick1(index)">

                  </div>
                </div>
              </div>
              <div style="width: 100%; height: 100%; white-space: nowrap; 
                overflow: hidden;
                justify-content: center;" v-if="BAOJI1[index] != 'X'">
                <div :style="{ width: 100 + '%', height: BL_WT1[index] + '%' }">
                  <div id="{{item}}" style="
                  width: 100%;
                  height: 100%;
                  
                  text-align: center;
                  background: #FAFB03;
                  font-size: 10.8px;
                  
                " @click="butClick1(item, index)" @dblclick="dbbutClick1(index)" :style="bunker_color_status1[index] == true
      ? { backgroundColor: '#d85b5b' }
      : { backgroundColor: '#dabde2' }
      ">
                    {{ item }} -{{ bunker_mat_type1[index] }}<br />
                    {{ bunker_mat_name1[index] }}<br />
                    {{ bunker_l2_code1[index] }}<br />
                    {{ bunker_mat_code1[index] }}<br />
                    {{ bunker_stock_wt1[index] }}<br />
                  </div>
                </div>
                <div :style="{ width: 100 + '%', height: BS_WT1[index] + '%' }">
                  <div id="{{item}}" style="
                  width: 100%;
                  height: 100%;
                  text-align: center;
                  background: #A5D6A7;
                  font-size: 10.8px;
                  
                " @click="butClick1(item, index)" @dblclick="dbbutClick1(index)">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <v-splitter style="height: 60%">
        <v-splitter-pane>
          <xr-ef-panel title="物料信息" style="height: 100%" padding="1px">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready"
                @focus-changed="GridView1FocusChanged">
              </er-grid>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane>
          <xr-ef-panel title="成分信息" style="height: 100%" padding="1px">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
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
    <div class="Box1">
      <xr-ef-dialog v-model:visible="dialogVisible" :title="dialogFormName" height="80%" width="80%"
        @click-close-icon="xrEfDialogClose" :default-footer="false">
        <div style="width: 100%; height: 100%" v-if="dialogFormName === 'MMSM53POP_KC'">
          <MMSM53POP_KC :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"></MMSM53POP_KC>
        </div>
        <div style="width: 100%; height: 100%" v-if="dialogFormName === 'MMSM50ADDS2N'">
          <MMSM50ADDS2N :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"></MMSM50ADDS2N>
        </div>
      </xr-ef-dialog>
    </div>
  </div>
</template>
<script lang="ts" src="./MMSM402_1S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM402_1S2N.scss";
</style>

