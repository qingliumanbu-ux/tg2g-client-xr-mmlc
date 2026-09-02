<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f5-do="F5_DO"
      :f6-do="F6_DO"
      :f7-do="F7_DO"
      :f8-do="F8_DO"
      :f9-do="F9_DO"
      :f10-do="F10_DO"
      :f11-do="F11_DO"
    >
      <v-splitter style="height: 100%" class="default-theme">
        <v-splitter-pane size="70">
          <xr-ef-panel style="height: 45%" title=" " :show-header="false">
            <template #customButtonSlot=""> </template>
            <template v-if="initializeFlag === 1" #contentSlot="">
              <div style="float: left; width: 17%; height: 60%">
                <div
                  style="
                    width: 100%;
                    height: 100px;
                    border: 1px solid;
                    text-align: center;
                    background-color: #cc99ff;
                    overflow: auto;
                    padding: 5px;
                  "
                >
                  {{ MX_LC_G[0] }}<br />
                  {{ MX_LC_G[2] }}<br />
                  <!-- {{ MX_LC_G[1] }}<br /> -->
                  {{ MX_LC_G[3] }}<br />
                </div>
              </div>
              <div
                style="float: left; width: 59%; height: 100%; margin-left: 1%"
              >
                <div
                  style="
                    float: left;
                    width: 100%;
                    height: 70%;
                    padding: 0 5px 0 5px;
                  "
                >
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    @erGridReady="erGrid1Ready"
                    @focus-changed="GridView1FocusChanged"
                  >
                  </er-grid>
                </div>
                <div style="float: left; width: 100%; height: 30%">
                  <er-layout
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroupFilter2'"
                    :show-group-border="false"
                    :auto-bind="true"
                  ></er-layout>
                </div>
              </div>
              <div
                style="float: left; width: 22%; height: 100%; margin-left: 1%"
              >
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView2'"
                  @erGridReady="erGrid2Ready"
                >
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
          <xr-ef-panel style="height: 55%" :show-header="false">
            <template #customButtonSlot=""> </template>
            <template v-if="initializeFlag === 1" #contentSlot="">
              <div style="float: left; width: 17%">
                装  料  量：<input
              id="box_text"
              type="number"
              style="width: 60%; height: 30px"
              v-model="box_wt"
              oninput="value=value.replace(/[^0-9]/g,'')"
                />
                <br />
                废钢扣杂重：<input
           id="box_deduct_text"
           type="number"
            style="width: 60%; height: 30px"
            v-model="box_deduct_wt"
            oninput="value=value.replace(/[^0-9]/g,'')"
                  />
                <br />
                <div
                  CLASS="MMLC_BUTTON"
                  style="
                    width: 95%;
                    height: 35px;
                    font-size: 20px;
                    margin-top: 5px;
                  "
                  @click="butClick"
                >
                  装入料篮/料槽
                </div>
                <br />
                <div style="float: left; width: 95%">
                  <div
                    style="
                      width: 100%;
                      margin-top: 10px;
                      border: 1px solid;
                      text-align: center;
                      background-color: #cc99ff;
                      overflow: auto;
                      height: 100px;
                      padding: 5px;
                    "
                  >
                    {{ MX_LC_D[0] }}<br />
                    {{ MX_LC_D[2] }}<br />
                    {{ MX_LC_D[1] }}<br />
                    {{ MX_LC_D[3] }}<br />
                  </div>
                  <br />
                  铁料坑
                  <select
                    name="art-cate"
                    v-model="DL_LC.name"
                    style="margin-left: 12px; width: 60%; height: 25px"
                    v-on:change="DL_Change()"
                  >
                    <option disabled="" selected="" style="display: block">
                      请选择
                    </option>
                    <option
                      v-for="(item, index) in bunker_f"
                      :key="index"
                      :value="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <br />
                  地下料仓
                  <select
                    name="art-cate"
                    v-model="DL_DX.name"
                    style="width: 60%; height: 25px; margin-top: 1%"
                    v-on:change="DL_Change1()"
                  >
                    <option disabled="" selected="" style="display: block">
                      请选择
                    </option>
                    <option
                      v-for="(item, index) in bunker_d"
                      :key="index"
                      :value="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <br />
                  火车受料
                  <select
                    name="art-cate"
                    v-model="DL_HC.name"
                    style="width: 60%; height: 25px; margin-top: 1%"
                    v-on:change="DL_Change2()"
                  >
                    <option disabled="" selected="" style="display: block">
                      请选择
                    </option>
                    <option
                      v-for="(item, index) in bunker_h"
                      :key="index"
                      :value="item.name"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div
                style="float: left; width: 59%; height: 100%; margin-left: 5px"
              >
                <div
                  style="
                    float: left;
                    width: 100%;
                    height: 70%;
                    padding: 0 5px 0 5px;
                  "
                >
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView3'"
                    @erGridReady="erGrid3Ready"
                    @focus-changed="GridView3FocusChanged"
                    @rowSelected="grid3rowselected"
                  >
                  </er-grid>
                </div>
                <div style="float: left; width: 100%; height: 30%">
                  <er-layout
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroupFilter3'"
                    :show-group-border="false"
                    :auto-bind="true"
                  ></er-layout>
                </div>
              </div>
              <div
                style="float: left; width: 22%; height: 100%; margin-left: 5px"
              >
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView4'"
                  @erGridReady="erGrid4Ready"
                >
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane size="30">
          <xr-ef-panel style="height: 80%" title=" " :show-header="false">
            <template #customButtonSlot=""> </template>
            <template v-if="initializeFlag === 1" #contentSlot="">
              <div
                style="float: left; width: 100%; height: 100%; margin-left: 1%"
              >
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView5'"
                  @erGridReady="erGrid5Ready"
                  @focus-changed="GridView5FocusChanged"
                  @double-click="dbbutClick"
                >
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
          <xr-ef-panel style="height: 20%" title=" " :show-header="false">
            <template #customButtonSlot=""> </template>
            <template v-if="initializeFlag === 1" #contentSlot="">
              <div
                style="float: left; width: 100%; height: 100%; margin-left: 1%"
              >
                <er-layout
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilter4'"
                  :show-group-border="false"
                  :auto-bind="true"
                ></er-layout>
              </div>
            </template>
          </xr-ef-panel>
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
      <MMSM82POP
        :openInDialog="true"
        :dialogFormName="dialogFormName"
        :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"
      ></MMSM82POP>
    </xr-ef-dialog>
  </div>
</template>
<script lang="ts" src="./MMSM835S2N.ts"></script>

<style lang="scss" scoped="">
  @import "./MMSM835S2N.scss";
</style>
