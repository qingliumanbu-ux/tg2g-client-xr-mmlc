<template>
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <template v-if="initializeFlag === 1">
      <v-splitter horizontal="" style="height: 100%" class="default-theme">
        <v-splitter-pane :size="60">
          <a-tabs
            v-model:activeKey="tabActiveKey"
            type="card"
            @change="handleTabChange"
          >
            <a-tab-pane key="tab1" tab="汽车受料槽库库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="qc_bunker_container_total_height"
                :colNum="qc_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab2" tab="火车受料槽库库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="hc_bunker_container_total_height"
                :colNum="hc_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab3" tab="火车受料槽库库存新扩">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="hcn_bunker_container_total_height"
                :colNum="hcn_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab4" tab="虚拟地下料仓库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="xd_bunker_container_total_height"
                :colNum="xd_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab5" tab="镍板库库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="ni_bunker_container_total_height"
                :colNum="ni_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab6" tab="铁料料场库存1">
              <div style="width: 100%; height: 100%">
                <div style="width: 100%; height: 22%" class="Box">
                  <div
                    style="width: 10%; height: 50%"
                    v-for="(item, index) in bunker_J"
                  >
                    <div
                      style="width: 100%; height: 100%"
                      v=""
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
                <div style="width: 100%; height: 0.5%">
                  <div style="width: 100%; height: 100%" class="Box">
                    <div
                      style="width: 11.11%; height: 100%; background: #0000ff"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #d8d82e"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #0000ff"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #d8d82e"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #0000ff"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #d8d82e"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #0000ff"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #d8d82e"
                    ></div>
                    <div
                      style="width: 11.11%; height: 100%; background: #0000ff"
                    ></div>
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
                      <div style="width: 100%; height: 36%"></div>
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
            </a-tab-pane>
            <a-tab-pane key="tab7" tab="铁料料场库存2">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="fl2_bunker_container_total_height"
                :colNum="fl2_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab8" tab="铁料料场地下料仓库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="fd_bunker_container_total_height"
                :colNum="fd_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
            <a-tab-pane key="tab9" tab="铬铁筛分库存">
              <MMSM400BUNKER
                :bunker="bunker_info"
                :height="nf_bunker_container_total_height"
                :colNum="nf_bunker_cols"
                @butClick="butClick"
                @dbbutClick="dbbutClick"
              ></MMSM400BUNKER>
            </a-tab-pane>
          </a-tabs>
        </v-splitter-pane>
        <v-splitter-pane :size="40">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane>
              <xr-ef-panel title="物料信息" style="height: 100%" padding="5px">
                <template #customButtonSlot=""> </template>
                <template v-if="initializeFlag === 1" #contentSlot="">
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
              <xr-ef-panel title="成分信息" style="height: 100%" padding="5px">
                <template #customButtonSlot=""> </template>
                <template v-if="initializeFlag === 1" #contentSlot="">
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
      </v-splitter>
    </template>
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
    </xr-ef-dialog
    >V
  </div>
</template>
<script lang="ts" src="./MMSM400DXS2N.ts"></script>

<style lang="scss" scoped="">
  @import "./MMSM400DXS2N.scss";
</style>
