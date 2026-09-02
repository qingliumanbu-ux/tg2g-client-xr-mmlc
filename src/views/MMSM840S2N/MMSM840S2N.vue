<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady">
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="float: left; width: 10%; height: 100%; margin-left: 5px">
            <div style="
                width: 100%;
                height: 50%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto;  padding:5px
              ">
              {{ MX_LC_D[0] }}<br />
              {{ MX_LC_D[2] }}<br />
              {{ MX_LC_D[1] }}<br />
              {{ MX_LC_D[3] }}<br />
            </div>
            <select name="art-cate" v-model="DL_LC1.name" style="width: 100%; height: 25px; margin-top:5px"
              v-on:change="DL_Change()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_f" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div style="float: left; width: 55%; height: 100%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged">
            </er-grid>
          </div>
          <div style="float: left; width:20%; height: 100%; margin-left: 1%">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          

          <!-- <div style="float: left; width: 10%;">
            
          </div>   -->

          <div style="float: left; width: 79%; height: 100%;">
            <er-grid  :er-form-helper-prop="erFormHelper" :config-id="'gridView3'" @erGridReady="erGrid3Ready" >
            </er-grid>
          </div>

          <div style=" float:left;  width: 20%; height: 100%; margin-left: 5px" >
           
           
              <br/>
              物料编码
              <br/>
              <select name="art-cate1"  v-model="DL_LC.name" style="width: 196PX; height: 25px;  "  
              v-on:change="DL_Change1()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_g" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
            <br/>
          质检批号
          <br/>
          <!-- <input id="box_text" style="width: 40%; height: 20px; margin-top: 1px;" type="string" v-model="box_namme" /> -->
         <select name="art-cate2" v-model="GL_LC.name" style="width: 196PX; height: 25px; margin-top: 1%"
         v-on:change="DL_Change2()">
           <option disabled selected style="display: block">请选择</option>
           <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
             {{ item.name }}
           </option>
         </select>
         <br/>
         重量
         <br/>
           <input id="box_text" style="width: 196PX; height: 20px;margin-top: 1px;" type="number" v-model="box_wt" />
            <div class="MMLC_BUTTON" style="
            width: 200px;
            height: 25px;
            margin-top: 10px;
            " @click="butClick">
            确认
          </div>
      </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM840S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM840S2N.scss";
</style>