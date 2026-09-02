<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeEfDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <div style="width: 100%; height: 100%" class="Box">
        <div style="width: 8.5%; height: 100%">
          <div style="overflow: auto; height: 100%; width: 100%">
            <div style="width: 100%; height: 9.5%" v-for="(item, index) in bunker_11">
              <div style="width: 100%; height: 100%" v-if="bunker_flag_11[index] === 1">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #105085;
                  "
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_11[index] }}<br />
                  {{ bunker_mat_name_11[index] }}<br />
                  {{ bunker_mat_name_L2_11[index] }}<br />
                  {{ bunker_STOCK_WT_11[index] }}<br />
                </div>
              </div>
              <div style="width: 100%; height: 100%" v-if="bunker_flag_11[index] === 0">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #ff9999;
                  "
                  @click="butClick(item,bunker_mat_name_11[index])"
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_11[index] }}<br />
                  {{ bunker_mat_name_11[index] }}<br />
                  {{ bunker_mat_name_L2_11[index] }}<br />
                  {{ bunker_STOCK_WT_11[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 1.5%; height: 100%"></div>
        <div style="width: 80%; height: 100%">
          <div style="width: 100%; height: 40%" class="Box">
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_5">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_5[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_5[index] }}<br />
                    {{ bunker_mat_name_5[index] }}<br />
                    {{ bunker_mat_name_L2_5[index] }}<br />
                    {{ bunker_STOCK_WT_5[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_5[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_5[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_5[index] }}<br />
                    {{ bunker_mat_name_5[index] }}<br />
                    {{ bunker_mat_name_L2_5[index] }}<br />
                    {{ bunker_STOCK_WT_5[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 40%"></div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_4">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_4[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_4[index] }}<br />
                    {{ bunker_mat_name_4[index] }}<br />
                    {{ bunker_mat_name_L2_4[index] }}<br />
                    {{ bunker_STOCK_WT_4[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_4[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_4[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_4[index] }}<br />
                    {{ bunker_mat_name_4[index] }}<br />
                    {{ bunker_mat_name_L2_4[index] }}<br />
                    {{ bunker_STOCK_WT_4[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_3">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_3[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_3[index] }}<br />
                    {{ bunker_mat_name_3[index] }}<br />
                    {{ bunker_mat_name_L2_3[index] }}<br />
                    {{ bunker_STOCK_WT_3[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_3[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_3[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_3[index] }}<br />
                    {{ bunker_mat_name_3[index] }}<br />
                    {{ bunker_mat_name_L2_3[index] }}<br />
                    {{ bunker_STOCK_WT_3[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_2">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_2[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_2[index] }}<br />
                    {{ bunker_mat_name_2[index] }}<br />
                    {{ bunker_mat_name_L2_2[index] }}<br />
                    {{ bunker_STOCK_WT_2[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_2[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_2[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_2[index] }}<br />
                    {{ bunker_mat_name_2[index] }}<br />
                    {{ bunker_mat_name_L2_2[index] }}<br />
                    {{ bunker_STOCK_WT_2[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 20%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_1">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_1[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_1[index] }}<br />
                    {{ bunker_mat_name_1[index] }}<br />
                    {{ bunker_mat_name_L2_1[index] }}<br />
                    {{ bunker_STOCK_WT_1[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_1[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_1[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_1[index] }}<br />
                    {{ bunker_mat_name_1[index] }}<br />
                    {{ bunker_mat_name_L2_1[index] }}<br />
                    {{ bunker_STOCK_WT_1[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; height: 1%"></div>
          <div style="width: 100%; height: 40%" class="Box">
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_10">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_10[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_10[index] }}<br />
                    {{ bunker_mat_name_10[index] }}<br />
                    {{ bunker_mat_name_L2_10[index] }}<br />
                    {{ bunker_STOCK_WT_10[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_10[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_10[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_10[index] }}<br />
                    {{ bunker_mat_name_10[index] }}<br />
                    {{ bunker_mat_name_L2_10[index] }}<br />
                    {{ bunker_STOCK_WT_10[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 40%"></div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_9">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_9[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_9[index] }}<br />
                    {{ bunker_mat_name_9[index] }}<br />
                    {{ bunker_mat_name_L2_9[index] }}<br />
                    {{ bunker_STOCK_WT_9[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_9[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_9[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_9[index] }}<br />
                    {{ bunker_mat_name_9[index] }}<br />
                    {{ bunker_mat_name_L2_9[index] }}<br />
                    {{ bunker_STOCK_WT_9[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_8">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_8[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_8[index] }}<br />
                    {{ bunker_mat_name_8[index] }}<br />
                    {{ bunker_mat_name_L2_8[index] }}<br />
                    {{ bunker_STOCK_WT_8[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_8[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_8[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_8[index] }}<br />
                    {{ bunker_mat_name_8[index] }}<br />
                    {{ bunker_mat_name_L2_8[index] }}<br />
                    {{ bunker_STOCK_WT_8[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 19%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_7">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_7[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_7[index] }}<br />
                    {{ bunker_mat_name_7[index] }}<br />
                    {{ bunker_mat_name_L2_7[index] }}<br />
                    {{ bunker_STOCK_WT_7[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_7[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_7[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_7[index] }}<br />
                    {{ bunker_mat_name_7[index] }}<br />
                    {{ bunker_mat_name_L2_7[index] }}<br />
                    {{ bunker_STOCK_WT_7[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 1%; height: 100%"></div>
            <div style="width: 20%; height: 100%" class="Box">
              <div style="width: 33.33%; height: 25%" v-for="(item, index) in bunker_6">
                <div style="width: 100%; height: 100%" v-if="bunker_flag_6[index] === 1">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      text-align: center;
                      fontsize: 9px;
                      background: #105085;
                    "
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_6[index] }}<br />
                    {{ bunker_mat_name_6[index] }}<br />
                    {{ bunker_mat_name_L2_6[index] }}<br />
                    {{ bunker_STOCK_WT_6[index] }}<br />
                  </div>
                </div>
                <div style="width: 100%; height: 100%" v-if="bunker_flag_6[index] === 0">
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      fontsize: 9px;
                      text-align: center;
                      background: #ff9999;
                    "
                    @click="butClick(item,bunker_mat_name_6[index])"
                  >
                    {{ item }} <br />
                    {{ bunker_mat_code_6[index] }}<br />
                    {{ bunker_mat_name_6[index] }}<br />
                    {{ bunker_mat_name_L2_6[index] }}<br />
                    {{ bunker_STOCK_WT_6[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; height: 1%"></div>
          <div style="width: 100%; height: 18%" class="Box">
            <div style="width: 10%; height: 100%" v-for="(item, index) in bunker_13">
              <div style="width: 100%; height: 100%" v-if="bunker_flag_13[index] === 1">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #105085;
                  "
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_13[index] }}<br />
                  {{ bunker_mat_name_13[index] }}<br />
                  {{ bunker_mat_name_L2_13[index] }}<br />
                  {{ bunker_STOCK_WT_13[index] }}<br />
                </div>
              </div>
              <div style="width: 100%; height: 100%" v-if="bunker_flag_13[index] === 0">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #ff9999;
                  "
                  @click="butClick(item,bunker_mat_name_13[index])"
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_13[index] }}<br />
                  {{ bunker_mat_name_13[index] }}<br />
                  {{ bunker_mat_name_L2_13[index] }}<br />
                  {{ bunker_STOCK_WT_13[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 1.5%; height: 100%"></div>
        <div style="width: 8.5%; height: 100%">
          <div style="overflow: auto; height: 100%; width: 100%">
            <div style="width: 100%; height: 9.5%" v-for="(item, index) in bunker_12">
              <div style="width: 100%; height: 100%" v-if="bunker_flag_12[index] === 1">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #105085;
                  "
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_12[index] }}<br />
                  {{ bunker_mat_name_12[index] }}<br />
                  {{ bunker_mat_name_L2_12[index] }}<br />
                  {{ bunker_STOCK_WT_12[index] }}<br />
                </div>
              </div>
              <div style="width: 100%; height: 100%" v-if="bunker_flag_12[index] === 0">
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #ff9999;
                  "
                  @click="butClick(item,bunker_mat_name_12[index])"
                >
                  {{ item }} <br />
                  {{ bunker_mat_code_12[index] }}<br />
                  {{ bunker_mat_name_12[index] }}<br />
                  {{ bunker_mat_name_L2_12[index] }}<br />
                  {{ bunker_STOCK_WT_12[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM81XLFGK.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81XLFGK.scss";
</style>
