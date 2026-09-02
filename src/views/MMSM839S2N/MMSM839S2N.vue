<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady"  :f2-do="F2_DO">
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="display: flex; height: 100% ">
          <div style="float: left; width: 60%; height: 100%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged">
            </er-grid>
          </div>
          <div style="float: left; flex: 1;  height: 100%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
            </er-grid>
          </div>
        </div>
        </template>
      </xr-ef-panel>
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
        <div style="float: left; width: 15%; height: 100%; ">
          <div style="
              float: left;
              width: 100%;
              height: 50%;
              border: 1px solid;
              text-align: left;
              margin-left: 1%;
              overflow: auto; padding:5px
            ">
            <b>物料主数据</b><br />
            原料类型：{{ MX_LC_D[4] }}<br />
            物料名称：{{ MX_LC_D[2] }}<br />
            原料代码：{{ MX_LC_D[1] }}<br />
            错误信息：无
          </div>
          <div style="float: left; width: 100%; height: 50%">
            <er-layout  :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter3'"
            :show-group-border="false"></er-layout>
          </div>
        </div>
          <div style="float: left; width: 10%; height: 100%; margin-left: 5px">
            <div v-if="bunker_d1[0] == '0'" style="
                width: 100%;
                height: 50%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px
              " @click="butClick1">
              {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              <!-- {{ MX_LC_G[1] }}<br /> -->
              {{ MX_LC_G[3] }}<br />
            </div>
            <div v-if="bunker_d1[0] == '1'" style="
                width: 100%;
                height: 50%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px
              " @click="butClick1">
              {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              <!-- {{ MX_LC_G[1] }}<br /> -->
              {{ MX_LC_G[3] }}<br />
            </div>
            <div v-if="bunker_d2[0] == '0'" style="
                width: 100%;
                height: 50%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
              " @click="butClick2">
              {{ MX_LC_D3[0] }}<br />
              {{ MX_LC_D3[2] }}<br />
              <!-- {{ MX_LC_D3[1] }}<br /> -->
              {{ MX_LC_D3[3] }}<br />
            </div> 
             <div v-if="bunker_d2[0] == '1'" style="
                width: 100%;
                height: 50%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px;
              " @click="butClick2">
              {{ MX_LC_D3[0] }}<br />
              {{ MX_LC_D3[2] }}<br />
              <!-- {{ MX_LC_D3[1] }}<br /> -->
              {{ MX_LC_D3[3] }}<br />
            </div> 
          </div>

          <div style="float: left; width: 50%; height: 50%; margin-left: 5px">
            <div v-if="bunker_d3[0] == '0'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
              " @click="butClick3">
              {{ MX_LC_D[0] }}<br />
              {{ MX_LC_D[2] }}<br />
              <!-- {{ MX_LC_D[1] }}<br /> -->
              {{ MX_LC_D[3] }}<br />
            </div>
            <div v-if="bunker_d3[0] == '1'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px;
              " @click="butClick3">
              {{ MX_LC_D[0] }}<br />
              {{ MX_LC_D[2] }}<br />
              <!-- {{ MX_LC_D[1] }}<br /> -->
              {{ MX_LC_D[3] }}<br />
            </div>
            <div v-if="bunker_d4[0] == '0'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick4">
              {{ MX_LC_D1[0] }}<br />
              {{ MX_LC_D1[2] }}<br />
              <!-- {{ MX_LC_D1[1] }}<br /> -->
              {{ MX_LC_D1[3] }}<br />
            </div> 
            <div v-if="bunker_d4[0] == '1'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick4">
              {{ MX_LC_D1[0] }}<br />
              {{ MX_LC_D1[2] }}<br />
              <!-- {{ MX_LC_D1[1] }}<br /> -->
              {{ MX_LC_D1[3] }}<br />
            </div>
            <div v-if="bunker_d5[0] == '0'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick5">
              {{ MX_LC_D2[0] }}<br />
              {{ MX_LC_D2[2] }}<br />
              <!-- {{ MX_LC_D2[1] }}<br /> -->
              {{ MX_LC_D2[3] }}<br />
            </div>
            <div v-if="bunker_d5[0] == '1'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick5">
              {{ MX_LC_D2[0] }}<br />
              {{ MX_LC_D2[2] }}<br />
              <!-- {{ MX_LC_D2[1] }}<br /> -->
              {{ MX_LC_D2[3] }}<br />
            </div> 
            <div v-if="bunker_d6[0] == '0'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick6">
              {{ MX_LC_D4[0] }}<br />
              {{ MX_LC_D4[2] }}<br />
              <!-- {{ MX_LC_D4[1] }}<br /> -->
              {{ MX_LC_D4[3] }}<br />
            </div>
            <div v-if="bunker_d6[0] == '1'" style="
                float: left;
                width: 20%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #ff99a3;
                overflow: auto;  padding:5px;
                margin-left: 5px
              " @click="butClick6">
              {{ MX_LC_D4[0] }}<br />
              {{ MX_LC_D4[2] }}<br />
              <!-- {{ MX_LC_D4[1] }}<br /> -->
              {{ MX_LC_D4[3] }}<br />
            </div> 
          </div>
          <div style=" float:left;  width: 40%; height: 100%; margin-left: 5px" > 
              <br/>
              工 位：
              <select v-model="DL_LC.name" style="width: 21%; height: 25px;  " >
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_g" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
            <br/>
          领料人:
          <input id="box_text" style="width: 20%; height: 20px; margin-top: 1px;" type="string" v-model="box_namme" />         
         <br/>
         数  量：
           <input id="box_text" style="width: 20%; height: 20px;margin-top: 1px;" type="number" v-model="box_wt" />
            <div class="MMLC_BUTTON" style="
            width: 200px;
            height: 25px;
            margin-top: 10px;
            " @click="butClick">
            验证上数并确认上料
          </div>
      </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM839S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM839S2N.scss";
</style>