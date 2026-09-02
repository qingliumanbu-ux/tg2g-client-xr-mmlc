<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady">
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="float: left; width: 10%;">
            <div style="
                width: 100%;
                height: 200PX;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto; height: 100px; padding:5px
              ">
              {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              {{ MX_LC_G[1] }}<br />
              {{ MX_LC_G[3] }}<br />
            </div>
            <select  name="art-cate" v-model="GL_LC.name" style="width: 100%; height: 25px; margin-top: 5%"
              v-on:change="GL_Change()" >
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_g" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
              <!-- <a-select
                v-model:value="GL_LC.name"
                show-search
                placeholder="Select a person"
                style="width: 100%; height: 25px; margin-top: 5%"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select> -->
            
            


            <!-- <template>
              <a-auto-complete
                v-model:value="value"
                :options="options"
                style="width: 200px"
                placeholder="input here"
                :filter-option="filterOption"
              />
            </template>
            <script lang="ts" setup>
            import { ref } from 'vue';
            interface Option {
              value: string;
            }
            const filterOption = (input: string, option: Option) => {
              return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
            };
            const value = ref('');
            const options = ref<Option[]>([
              { value: 'Burns Bay Road' },
              { value: 'Downing Street' },
              { value: 'Wall Street' },
            ]);
            </script> -->
            
            <!-- <template>
              <a-auto-complete
                v-model:value="value"
                :options="options"
                style="width: 200px"
                placeholder="input here"
                :filter-option="filterOption"
              />
            </template>
            <script setup>
            import { ref } from 'vue';
            const filterOption = (input, option) => {
              return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
            };
            const value = ref('');
            const options = ref([
              {
                value: 'Burns Bay Road',
              },
              {
                value: 'Downing Street',
              },
              {
                value: 'Wall Street',
              },
            ]);
            </script> -->
            
            
            
          </div>
          <div style="
              float: left;
              width: 15%;
              height: 230px;
              border: 1px solid;
              text-align: left;
              margin-left: 1%;
              overflow: auto; height: 100%; padding:5px ">
            <b>物料主数据</b><br />
            原料类型：{{ MX_LC_G[4] }}<br />
            物料名称：{{ MX_LC_G[2] }}<br />
            原料代码：{{ MX_LC_G[1] }}<br />
            错误信息：无
          </div>
          <div style="float: left; width: 40%; height: 230px; margin-left: 1%">
            <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView1'" @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged">
            </er-grid>
          </div>
          <div style="float: left; width:30%; height: 230px; margin-left: 1%">
            <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
      <xr-ef-panel padding="5px" :show-header="false">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <input id="box_text" style="width: 200px" type="number" v-model="box_wt" /><br />
          <div style="
              width: 200px;
              height: 25px;
              margin-top: 10px;
              border: 1px solid;
              text-align: center;
              background-color: #0066ff;
            " @click="butClick">
            验证上数并确认
          </div>
        </template>
      </xr-ef-panel>
      <xr-ef-panel title=" " padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <div style="float: left; width: 10%;">
            <div style="
                width: 100%;
                height: 180px;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
                overflow: auto; height: 85px; padding:5px
              ">
              {{ MX_LC_D[0] }}<br />
              {{ MX_LC_D[2] }}<br />
              {{ MX_LC_D[1] }}<br />
              {{ MX_LC_D[3] }}<br />
            </div>
             
            <select name="art-cate" v-model="DL_LC.name" style="width: 50%; height: 25px; margin-top: 5%"
              v-on:change="DL_Change()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
            <!-- 镍板库
            <select name="art-cate" v-model="DL_LC.name" style="width: 60%; height: 25px; margin-top: 1%"
              v-on:change="DL_Change()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
            络铁库
            <select name="art-cate" v-model="DL_LC.name" style="width: 60%; height: 25px; margin-top: 1%"
              v-on:change="DL_Change()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select>
             废钢坑
            <select name="art-cate" v-model="DL_LC.name" style="width: 60%; height: 25px; margin-top: 1%"
              v-on:change="DL_Change()">
              <option disabled selected style="display: block">请选择</option>
              <option v-for="(item, index) in bunker_d" :key="index" :value="item.name">
                {{ item.name }}
              </option>
            </select> -->
          </div>
          <div style="
              float: left;
              width: 15%;
              height: 230px;
              border: 1px solid;
              text-align: left;
              margin-left: 1%;
              overflow: auto; height: 100%; padding:5px
            ">
            <b>物料主数据</b><br />
            原料类型：{{ MX_LC_D[4] }}<br />
            物料名称：{{ MX_LC_D[2] }}<br />
            原料代码：{{ MX_LC_D[1] }}<br />
            错误信息：无
          </div>
          <div style="float: left; width: 40%; height: 230px; margin-left: 1%">
            <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView3'" @erGridReady="erGrid3Ready" @focus-changed="GridView3FocusChanged" >
            </er-grid>
          </div>
          <div style="float: left; width: 30%; height: 230px; margin-left: 1%">
            <er-grid :er-form-helper-prop="erFormHelper" :config-id="'gridView4'" @erGridReady="erGrid4Ready">
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM83AS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM83AS2N.scss";
</style>