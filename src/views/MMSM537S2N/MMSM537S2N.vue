<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f5-do="F5_DO"
    >
      <v-splitter>
        <v-splitter-pane size="40">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="40">
              <er-layout
                v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :config-id="'LayoutGroupFilter'"
                @valueChanged="valueChanged_CX"
              ></er-layout>
            </v-splitter-pane>
            <v-splitter-pane size="130">
              <xr-ef-panel title="物料列表" padding="5px" style="height: 100%">
                <template #customButtonSlot> </template>
                <template #contentSlot>
                  <div style="width: 100%; height: 100%">
                    <er-grid
                      style="width: 100%; height: 76%"
                      v-if="initializeFlag === 1 && XIANSHI_FLAG"
                      :er-form-helper-prop="erFormHelper"
                      :toolbar-style="'both'"
                      :config-id="'gridView1'"
                      @focus-changed="GridView1FocusChanged"
                      @erGridReady="erGrid1Ready"
                    >
                    </er-grid>
                    <er-grid
                      style="width: 100%; height: 76%"
                      v-if="initializeFlag === 1 && !XIANSHI_FLAG"
                      :er-form-helper-prop="erFormHelper"
                      :toolbar-style="'both'"
                      :config-id="'gridView4'"
                      @focus-changed="GridView4FocusChanged"
                      @erGridReady="erGrid4Ready"
                    >
                    </er-grid>
                    <er-layout
                      style="width: 100%; height: 24%"
                      v-if="initializeFlag === 1"
                      :er-form-helper-prop="erFormHelper"
                      :config-id="'LayoutGroupFilter2'"
                    ></er-layout>
                  </div>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
        <v-splitter-pane size="60">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="40">
              <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="40">
                  <div
                    style="
                      height: 100%;
                      width: 100%;
                      border: 1px solid rgb(152 178 219);
                    "
                  >
                    <div
                      class="card-header"
                      style="
                        background: #dbefff !important;
                        padding: 5px;
                        height: 7%;
                        width: 100%;
                      "
                    >
                      <div
                        class="header-title"
                        style="color: rgb(47, 128, 237); margin-left: 5px"
                      >
                        质检批信息
                      </div>
                    </div>
                    <div style="height: 3%; width: 100%"></div>
                    <div style="height: 90%; width: 100%" class="Box">
                      <div style="height: 100%; width: 10%"></div>
                      <div style="height: 100%; width: 90%">
                        选择质检批号

                        <a-select
                          v-model:value="NO_SELECT.name"
                          style="width: 90%; margin-top: 2%; margin-bottom: 2%"
                          show-search
                          placeholder="Select a person"
                          v-on:change="valueChanged()"
                        >
                          <a-select-option
                            v-for="(item, index) in bunker_no"
                            :key="index"
                            :value="item.name"
                          >
                            {{ item.text }}
                          </a-select-option>
                        </a-select>
                        <br />
                        质检批创建时刻
                        <input
                          style="
                            width: 90%;
                            height: 7%;
                            margin-top: 2%;
                            margin-bottom: 2%;
                            background: rgb(213 213 213);
                          "
                          readonly="false"
                          type="string"
                          v-model="AA_TIME"
                        />
                        <br />
                        是否已发送
                        <input
                          style="
                            width: 90%;
                            height: 7%;
                            margin-top: 2%;
                            margin-bottom: 2%;
                            background: rgb(213 213 213);
                          "
                          readonly="false"
                          type="string"
                          v-model="SEND_FLAG"
                        />
                        <br />
                        发送时间
                        <input
                          style="
                            width: 90%;
                            height: 7%;
                            margin-top: 2%;
                            margin-bottom: 2%;
                            background: rgb(213 213 213);
                          "
                          readonly="false"
                          type="string"
                          v-model="SENT_TIME"
                        />
                      </div>
                    </div>
                  </div>
                </v-splitter-pane>
                <v-splitter-pane size="60">
                  <xr-ef-panel
                    title="质检批成分"
                    padding="5px"
                    style="height: 100%"
                  >
                    <template #customButtonSlot> </template>
                    <template #contentSlot>
                      <er-grid
                        v-if="initializeFlag === 1"
                        :er-form-helper-prop="erFormHelper"
                        :toolbar-style="'both'"
                        :config-id="'gridView2'"
                        @erGridReady="erGrid2Ready"
                      >
                      </er-grid>
                    </template>
                  </xr-ef-panel>
                </v-splitter-pane>
              </v-splitter>
            </v-splitter-pane>
            <v-splitter-pane size="60">
              <xr-ef-panel
                title="与质检批关联的进厂计量单"
                padding="5px"
                style="height: 100%"
              >
                <template #customButtonSlot> </template>
                <template #contentSlot>
                  <er-grid
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :toolbar-style="'both'"
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
    <xr-ef-dialog
      v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="60%"
      width="60%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <MMSM53POP
        :openInDialog="true"
        :dialogFormName="dialogFormName"
        :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"
      ></MMSM53POP>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./MMSM537S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM537S2N.scss";
</style>
./MMSM537S2N.js./MMSM537S2N.js
