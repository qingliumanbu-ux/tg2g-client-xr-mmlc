<template v-if="initializeFlag === 1">
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO">
      <xr-ef-panel title="块状石灰上料" padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="display: flex; height: 100%">
            <div style="width: 10%;height: 110px ;padding-right: 1%">
              <div style="
                width: 100%;
                height: 90%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
                font-size: 15px;
              ">
                {{ MX_LC_G[0] }}<br />
                {{ MX_LC_G[2] }}<br />
                {{ MX_LC_G[1] }}<br />
                {{ MX_LC_G[3] }}<br />
              </div>
              <select name="art-cate" v-model="GL_LC.name" style="width: 100%; height: 25px; margin-top: 5%"
                v-on:change="GL_Change1()"
                v-on:click="queryLCdata_G()"
                >
                <option disabled selected style="display: block">请选择</option>
                <option v-for="(item, index) in bunker_g1" :key="index" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div style="width: 38%; height: 100%; ">
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready">
              </er-grid>
            </div>
            <div style="width: 200px; margin-left: 1%;margin-right: 1%;">
              <br />
              重量
              <input id="box_text" style="width: 168px;height: 30px;"   v-model="box_wt" />
              <br />
              皮带
              <select v-model="DL_LC.name" style="width: 172px; height: 25px; margin-top: 8px">
                <option disabled selected style="display: block">请选择</option>
                <option v-for="(item, index) in bunker_g" :key="index" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
              石灰混料槽
              <select name="art-cate" v-model="GL_LC1.name" style="width: 135px; height: 25px; margin-top: 8px"
                v-on:change="DL_Change()">
                <option disabled selected style="display: block">请选择</option>
                <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
              <div class="MMLC_BUTTON" style="
                   width: 200px;
                    height: 30px;
                    margin-top: 10px;
                    font-size: 15px;
                  " @click="butClick">
                验证上数并确认上料
              </div>
            </div>
            <div style="height: 100%; width: 10%; margin-right:  1%;">
              <div style="width:100%; height: 50%;  "> 
              <div v-if="bunker_d1[0] == 'H01'" style="height: 110px ; width: 100%;">
                <div style="
                  float:left;
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  text-align: center;
                  background-color: #ff9999;
                  overflow: auto;
                  padding:5px;
                  font-size: 15px;
                ">
                  {{ MX_LC_G1[0] }}<br />
                  {{ MX_LC_G1[2] }}<br />
                  {{ MX_LC_G1[1] }}<br />
                  {{ MX_LC_G1[3] }}<br />
                </div>
              </div>
              <div v-if="bunker_d1[0] != 'H01'" style="height: 110px ; width: 100%;">
                <div style="
                  float:left;
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  text-align: center;
                  background-color: #cc99ff;
                  overflow: auto;
                  padding:5px;
                  font-size: 15px;
                ">
                  {{ MX_LC_G1[0] }}<br />
                  {{ MX_LC_G1[2] }}<br />
                  {{ MX_LC_G1[1] }}<br />
                  {{ MX_LC_G1[3] }}<br />
                </div>
              </div>
            </div>
              <div style="width:100%; height: 50%;  "> 
              <div v-if="bunker_d1[0] == 'H02'" style="height: 110px; width: 100%;">
                <div style="
                  float:left;
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  text-align: center;
                  background-color: #ff9999;
                  overflow: auto;
                  padding:5px;
                  font-size: 15px;
                ">
                  {{ MX_LC_G2[0] }}<br />
                  {{ MX_LC_G2[2] }}<br />
                  {{ MX_LC_G2[1] }}<br />
                  {{ MX_LC_G2[3] }}<br />
                </div>
              </div>
              <div v-if="bunker_d1[0] != 'H02'" style="height:  110px; width: 100%;">
                <div style="
                  float:left;
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  text-align: center;
                  background-color: #cc99ff;
                  overflow: auto;
                  padding:5px;
                  font-size: 15px;
                ">
                  {{ MX_LC_G2[0] }}<br />
                  {{ MX_LC_G2[2] }}<br />
                  {{ MX_LC_G2[1] }}<br />
                  {{ MX_LC_G2[3] }}<br />
                </div>
              </div>
            </div>
          </div>
            <div style="height: 100%; margin: auto; overflow: auto; flex: 1; ">
              <div style=" width:100%;height: 50%;  ">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView5'" @erGridReady="erGrid5Ready">
                </er-grid>
              </div>

              <div style="width:100%; height: 50%;  ">
                <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
                </er-grid>
              </div>
            </div>
          </div>

        </template>
      </xr-ef-panel>
      <xr-ef-panel title="电炉喷吹石灰上料" padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="display: flex; height: 100%">
            <div style="float: left; width: 10%;height: 110px ;margin-right: 1%">
              <div style="
                width: 100%;
                height: 90%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto; 
                 padding:5px;
                 font-size: 15px;
              ">
                {{ MX_LC_D[0] }}<br />
                {{ MX_LC_D[2] }}<br />
                {{ MX_LC_D[1] }}<br />
                {{ MX_LC_D[3] }}<br />
              </div>
            </div>
            <div style="float: left; width: 38%; height: 100%;  ">
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView3'" @erGridReady="erGrid3Ready">
              </er-grid>
            </div>

            <div style="
              float: left;
              width: 200px;
              margin-right: 1%;
              margin-left: 1%;
            ">
              <br />
              <input id="box_textD" style="width: 196px;height: 25px;" type="number" readonly="true" v-model="box_wtD" />

              <div class="MMLC_BUTTON" style="
              width: 200px;
              height: 30px;
                    margin-top: 10px;
                    font-size: 15px;
            " @click="butClick1">
                验证上数并确认上料
              </div>
            </div>
            <div style="float: left; width: 10%;height: 110px;">
              <div style="
            width: 100%;
            height: 90%;
            border: 1px solid;
            text-align: center;
            background-color: #cc99ff;
            overflow: auto;
              padding:5px;
              font-size: 15px;
          ">
                {{ MX_LC_G3[0] }}<br />
                {{ MX_LC_G3[2] }}<br />
                {{ MX_LC_G3[1] }}<br />
                {{ MX_LC_G3[3] }}<br />
              </div>
            </div>

            <div style="float:left; flex: 1; height: 100%;margin-left: 1%">
              <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid4Ready">
              </er-grid>
            </div>
          </div>

        </template>
      </xr-ef-panel>
    </xr-ef-form>
    <xr-ef-dialog v-model:visible="dialogVisible" :title="dialogFormName" height="60%" width="60%"
      @click-close-icon="xrEfDialogClose" :default-footer="false">
      <MMSM81POP :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"></MMSM81POP>
    </xr-ef-dialog>
  </div>
</template>
<script lang="ts" src="./MMSM831S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM831S2N.scss";
</style>