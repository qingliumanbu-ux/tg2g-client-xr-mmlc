<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady">
      <div style="height: 100%">
        <xr-ef-panel title="高位料仓" padding="5px" style="height: 45%">
          <template #customButtonSlot> </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <div style="display: flex; height: 100%">
              <div style="float: left; width: 200px; padding-right: 5px">
                <div
                  style="
                    width: 100%;
                    border: 1px solid;
                    text-align: center;
                    font-size: 13px;
                    background-color: #cc99ff;
                    overflow: auto;
                    height: 100px;
                    padding: 5px;
                  "
                >
                  {{ MX_LC_G[0] }}<br />
                  {{ MX_LC_G[2] }}<br />
                  {{ MX_LC_G[1] }}<br />
                  {{ MX_LC_G[3] }}<br />
                </div>
                <select
                  name="art-cate"
                  v-model="GL_LC.name"
                  style="width: 100%; height: 25px; margin-top: 5%"
                  v-on:change="GL_Change()"
                >
                  <option disabled selected style="display: block">
                    请选择
                  </option>
                  <option
                    v-for="(item, index) in bunker_g"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div style="float: left; width: 15%; padding-right: 5px">
                <div
                  style="
                    float: left;
                    border: 1px solid;
                    text-align: left;
                    font-size: 13px;
                    overflow: auto;
                    height: 100%;
                    width: 100%;
                  "
                >
                  <b>物料主数据</b><br />
                  原料类型：{{ MX_LC_G[4] }}<br />
                  物料名称：{{ MX_LC_G[2] }}<br />
                  原料代码：{{ MX_LC_G[1] }}<br />
                  错误信息：无
                </div>
              </div>
              <div style="float: left; width: 50%; padding-right: 5px">
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView1'"
                  @erGridReady="erGrid1Ready"
                  @focus-changed="GridView1FocusChanged"
                >
                </er-grid>
              </div>
              <div style="float: left; flex: 1">
                <div style="width: 100%; height: 100%">
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'"
                    @erGridReady="erGrid2Ready"
                  >
                  </er-grid>
                </div>
              </div>
            </div>
          </template>
        </xr-ef-panel>
        <xr-ef-panel padding="5px" :show-header="false" style="height: 75px">
          <template #customButtonSlot> </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <div style="margin: auto">
              <div style="float: left; font-size: 15px; width: 250px">
                上料重量：<input
                  id="box_text"
                  style="width: 150px; height: 25px"
                  type="number"
                  v-model="box_wt"
                />
              </div>
              <div
                class="MMLC_BUTTON"
                style="
                  margin-left: 260px;
                  width: 150px;
                  height: 28px;
                  font-size: 20px;
                "
                @click="butClick"
              >
                确认上料
              </div>
            </div>
          </template>
        </xr-ef-panel>
        <xr-ef-panel title="低位料仓" style="height: 45%">
          <template #customButtonSlot> </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <div style="display: flex; height: 100%">
              <div style="float: left; width: 200px; padding-right: 5px">
                <div
                  style="
                    width: 100%;
                    border: 1px solid;
                    text-align: center;
                    background-color: #cc99ff;
                    font-size: 13px;
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
                地下料仓
                <select
                  name="art-cate"
                  v-model="DL_LC.name"
                  style="width: 63%; height: 25px; margin-top: 5%"
                  v-on:change="DL_Change()"
                >
                  <option disabled selected style="display: block">
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
                镍板库
                <select
                  name="art-cate"
                  v-model="DL_LC1.name"
                  style="width: 65%; height: 25px; margin-top: 1%"
                  v-on:change="DL_Change1()"
                >
                  <option disabled selected style="display: block">
                    请选择
                  </option>
                  <option
                    v-for="(item, index) in bunker_d1"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <br />
                络铁库
                <select
                  name="art-cate"
                  v-model="DL_LC2.name"
                  style="width: 65%; height: 25px; margin-top: 1%"
                  v-on:change="DL_Change2()"
                >
                  <option disabled selected style="display: block">
                    请选择
                  </option>
                  <option
                    v-for="(item, index) in bunker_d2"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <br />
                铁料坑
                <select
                  name="art-cate"
                  v-model="DL_LC3.name"
                  style="width: 65%; height: 25px; margin-top: 1%"
                  v-on:change="DL_Change3()"
                >
                  <option disabled selected style="display: block">
                    请选择
                  </option>
                  <option
                    v-for="(item, index) in bunker_d3"
                    :key="index"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div style="float: left; width: 15%; padding-right: 5px">
                <div
                  style="
                    float: left;
                    border: 1px solid;
                    text-align: left;
                    font-size: 13px;
                    overflow: auto;
                    height: 100%;
                    width: 100%;
                  "
                >
                  <b>物料主数据</b><br />
                  原料类型：{{ MX_LC_D[4] }}<br />
                  物料名称：{{ MX_LC_D[2] }}<br />
                  原料代码：{{ MX_LC_D[1] }}<br />
                  错误信息：无
                </div>
              </div>
              <div style="float: left; width: 50%; padding-right: 5px">
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView3'"
                  @erGridReady="erGrid3Ready"
                  @focus-changed="GridView3FocusChanged"
                >
                </er-grid>
              </div>
              <div style="float: left; flex: 1">
                <div style="width: 100%; height: 100%">
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView4'"
                    @erGridReady="erGrid4Ready"
                  >
                  </er-grid>
                </div>
              </div>
            </div>
          </template>
        </xr-ef-panel>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM833S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM833S2N.scss";
</style>
