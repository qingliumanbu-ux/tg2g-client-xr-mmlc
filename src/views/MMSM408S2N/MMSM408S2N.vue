<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <div
        class="card-header"
        style="background: #dbefff !important; padding: 1px; border: 1px solid"
      >
        
      </div>
      <div style="width: 100%; height: 85%" class="Box">
        <div style="width: 100%; height: 22%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 10%; height: 50%"
              v-for="(item, index) in bunker_J"
            >
              <div
                style="width: 100%; height: 100%"
                v
                v-if="buiker_stock_wt_J[index] == 0"
              >
                <div
                  id="{{item}}"
                  style="
                    display: flex;
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background: #f1eac0;
                    font-size: 11px;
                  "
                  @click="butClick_J(item, index)"
                  @dblclick="dbbutClick_J(index)"
                  :style="
                    bunker_J_color_status[index] == true
                      ? { backgroundColor: '#d85b5b' }
                      : { backgroundColor: '#f1eac0' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                  {{ bunker_mat_name_J[index] }}<br />
                  {{ bunker_l2_code_J[index] }}<br />
                  {{ bunker_mat_code_J[index] }}<br />
                  {{ bunker_stock_wt_J[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt_J[index] != 0"
              >
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    white-space: nowrap; 
                    overflow: hidden;
                    justify-content: center;
                    text-align: center;  
                    background: #dabde2;
                    font-size: 11px;
                  "
                  @click="butClick_J(item, index)"
                  @dblclick="dbbutClick_J(index)"
                  :style="
                    bunker_J_color_status[index] == true
                      ? { backgroundColor: '#bb3a4b' }
                      : { backgroundColor: '#dabde2' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                  {{ bunker_mat_name_J[index] }}<br />
                  {{ bunker_l2_code_J[index] }}<br />
                  {{ bunker_mat_code_J[index] }}<br />
                  {{ bunker_stock_wt_J[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%; height: 0.5%">
          <div style="width: 100%; height: 100%" class="Box">
            <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
            <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
            <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
            <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
            <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
            <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
            <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
            <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
            <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          </div>
        </div>
        <div style="width: 100%; height: 43%" class="Box">
          <div
            style="width: 5.55555%; height: 25%"
            v-for="(item, index) in bunker_K"
          >
            <div
              style="width: 100%; height: 100%"
              v-if="buiker_stock_wt_K[index] == 0"
            >
              <div
                id="{{item}}"
                style="
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  white-space: nowrap; 
                  overflow: hidden;
                  justify-content: center;
                  text-align: center;
                  background: #f1eac0;
                  font-size: 11px;
                "
                @click="butClick_K(item, index)"
                @dblclick="dbbutClick_K(index)"
                :style="
                  bunker_K_color_status[index] == true
                    ? { backgroundColor: '#d85b5b' }
                    : { backgroundColor: '#f1eac0' }
                "
              >
                {{ item }} -{{ bunker_mat_type_K[index] }}<br />
                {{ bunker_mat_name_K[index] }}<br />
                {{ bunker_l2_code_K[index] }}<br />
                {{ bunker_mat_code_K[index] }}<br />
                {{ bunker_stock_wt_K[index] }}<br />
              </div>
            </div>
            <div
              style="width: 100%; height: 100%"
              v-if="buiker_stock_wt_K[index] != 0"
            >
              <div
                id="{{item}}"
                style="
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  white-space: nowrap; 
                  overflow: hidden;
                  justify-content: center;
                  text-align: center;
                  background: #dabde2;
                  font-size: 11px;
                "
                @click="butClick_K(item, index)"
                @dblclick="dbbutClick_K(index)"
                :style="
                  bunker_K_color_status[index] == true
                    ? { backgroundColor: '#bb3a4b' }
                    : { backgroundColor: '#dabde2' }
                "
              >
                {{ item }} -{{ bunker_mat_type_K[index] }}<br />
                {{ bunker_mat_name_K[index] }}<br />
                {{ bunker_l2_code_K[index] }}<br />
                {{ bunker_mat_code_K[index] }}<br />
                {{ bunker_stock_wt_K[index] }}<br />
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%; height: 35%" class="Box">
          <div style="width: 77%; height: 100%">
            <div style="width: 100%; height: 100%" class="Box">
              <div
                style="width: 7.14%; height: 32%"
                v-for="(item, index) in bunker_V"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt_V[index] == 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #f1eac0;
                      font-size: 11px;
                    "
                    @click="butClick_V(item, index)"
                    @dblclick="dbbutClick_V(index)"
                    :style="
                      bunker_V_color_status[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                    {{ bunker_mat_name_V[index] }}<br />
                    {{ bunker_l2_code_V[index] }}<br />
                    {{ bunker_mat_code_V[index] }}<br />
                    {{ bunker_stock_wt_V[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt_V[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                      font-size: 11px;
                    "
                    @click="butClick_V(item, index)"
                    @dblclick="dbbutClick_V(index)"
                    :style="
                      bunker_V_color_status[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                    {{ bunker_mat_name_V[index] }}<br />
                    {{ bunker_l2_code_V[index] }}<br />
                    {{ bunker_mat_code_V[index] }}<br />
                    {{ bunker_stock_wt_V[index] }}<br />
                  </div>
                </div>
              </div>       
              <div  style="
                width: 100%;
                height: 36%;
              "></div>   
            </div>
          </div>
          <div style="width: 2%; height: 100%"></div>
          <div style="width: 21%; height: 100%">
            <div style="width: 100%; height: 100%" class="Box">
              <div
                style="width: 50%; height: 32%"
                v-for="(item, index) in bunker_M"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt_M[index] == 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #f1eac0;
                      font-size: 11px;
                    "
                    @click="butClick_M(item, index)"
                    @dblclick="dbbutClick_M(index)"
                    :style="
                      bunker_M_color_status[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type_M[index] }}<br />
                    {{ bunker_mat_name_M[index] }}<br />
                    {{ bunker_l2_code_M[index] }}<br />
                    {{ bunker_mat_code_M[index] }}<br />
                    {{ bunker_stock_wt_M[index] }}<br />
                  </div>
                </div>     
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt_M[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                      font-size: 11px;
                    "
                    @click="butClick_M(item, index)"
                    @dblclick="dbbutClick_M(index)"
                    :style="
                      bunker_M_color_status[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type_M[index] }}<br />
                    {{ bunker_mat_name_M[index] }}<br />
                    {{ bunker_l2_code_M[index] }}<br />
                    {{ bunker_mat_code_M[index] }}<br />
                    {{ bunker_stock_wt_M[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 10px"></div>
      </div>
      <div style="width: 100%; height: 15%" class="Box">
        <v-splitter style="height: 100%" class="default-theme">
          <v-splitter-pane>
            <xr-ef-panel title="物料信息" style="height: 100%" padding="5px" :show-header="false">
              <template #customButtonSlot> </template>
              <template v-if="initializeFlag === 1" #contentSlot>
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView1'"
                  @erGridReady="erGrid1Ready"
                  @focus-changed="GridView1FocusChanged"
                >
                </er-grid>
              </template>
            </xr-ef-panel>
          </v-splitter-pane>
          <v-splitter-pane>
            <xr-ef-panel title="成分信息" style="height: 100%" padding="5px" :show-header="false" >
              <template #customButtonSlot> </template>
              <template v-if="initializeFlag === 1" #contentSlot>
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
      </div>
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
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="80%"
        width="80%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div
          style="width: 100%; height: 100%"
          v-if="dialogFormName === 'MMSM53POP_KC'"
        >
          <MMSM53POP_KC
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM53POP_KC>
        </div>
        <div
          style="width: 100%; height: 100%"
          v-if="dialogFormName === 'MMSM50ADDS2N'"
        >
          <MMSM50ADDS2N
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM50ADDS2N>
        </div>
      </xr-ef-dialog>
    </div>
  </div>
</template>
<script lang="ts" src="./MMSM408S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM408S2N.scss";
</style>
