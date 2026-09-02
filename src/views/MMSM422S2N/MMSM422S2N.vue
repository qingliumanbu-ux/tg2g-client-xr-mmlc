<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <div
        class="card-header"
        style="background: #dbefff !important; padding: 5px; border: 1px solid"
      >
        <div
          class="header-title"
          style="color: rgb(47, 128, 237); margin-left: 5px"
        >
          料仓信息
        </div>
      </div>
      <div style="width: 100%; height: 75%" class="Box">
        <div style="width: 8.5%; height: 100%">
          <div style="overflow: auto; height: 100%; width: 100%">
            <div
              style="width: 100%; height: 9.5%"
              v-for="(item, index) in bunker11"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt11[index] == 0"
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
                    font-size: 9px;
                  "
                  @click="butClick11(item, index)"
                  @dblclick="dbbutClick11(index)"
                  :style="
                    bunker_color_status11[index] == true
                      ? { backgroundColor: '#d85b5b' }
                      : { backgroundColor: '#f1eac0' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type11[index] }}<br />
                  {{ bunker_mat_name11[index] }}<br />
                  {{ bunker_l2_code11[index] }}<br />
                  {{ bunker_mat_code11[index] }}<br />
                  {{ bunker_stock_wt11[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt11[index] != 0"
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
                    font-size: 9px;
                  "
                  @click="butClick11(item, index)"
                  @dblclick="dbbutClick11(index)"
                  :style="
                    bunker_color_status11[index] == true
                      ? { backgroundColor: '#bb3a4b' }
                      : { backgroundColor: '#dabde2' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type11[index] }}<br />
                  {{ bunker_mat_name11[index] }}<br />
                  {{ bunker_l2_code11[index] }}<br />
                  {{ bunker_mat_code11[index] }}<br />
                  {{ bunker_stock_wt11[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 0.5%; height: 100%"></div>
        <div style="width: 82%; height: 100%">
          <div style="width: 100%; height: 43%" class="Box">
            <div style="width: 19%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker5"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt5[index] == 0"
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
                      font-size: 9px;
                    "
                    @click="butClick5(item, index)"
                    @dblclick="dbbutClick5(index)"
                    :style="
                      bunker_color_status5[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type5[index] }}<br />
                    {{ bunker_mat_name5[index] }}<br />
                    {{ bunker_l2_code5[index] }}<br />
                    {{ bunker_mat_code5[index] }}<br />
                    {{ bunker_stock_wt5[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt5[index] != 0"
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
                      font-size: 9px;
                    "
                    @click="butClick5(item, index)"
                    @dblclick="dbbutClick5(index)"
                    :style="
                      bunker_color_status5[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type5[index] }}<br />
                    {{ bunker_mat_name5[index] }}<br />
                    {{ bunker_l2_code5[index] }}<br />
                    {{ bunker_mat_code5[index] }}<br />
                    {{ bunker_stock_wt5[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 40%"></div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker4"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt4[index] == 0"
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
                      font-size: 9px;
                    "
                    @click="butClick4(item, index)"
                    @dblclick="dbbutClick4(index)"
                    :style="
                      bunker_color_status4[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type4[index] }}<br />
                    {{ bunker_mat_name4[index] }}<br />
                    {{ bunker_l2_code4[index] }}<br />
                    {{ bunker_mat_code4[index] }}<br />
                    {{ bunker_stock_wt4[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt4[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick4(item, index)"
                    @dblclick="dbbutClick4(index)"
                    :style="
                      bunker_color_status4[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type4[index] }}<br />
                    {{ bunker_mat_name4[index] }}<br />
                    {{ bunker_l2_code4[index] }}<br />
                    {{ bunker_mat_code4[index] }}<br />
                    {{ bunker_stock_wt4[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker3"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt3[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick3(item, index)"
                    @dblclick="dbbutClick3(index)"
                    :style="
                      bunker_color_status3[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type3[index] }}<br />
                    {{ bunker_mat_name3[index] }}<br />
                    {{ bunker_l2_code3[index] }}<br />
                    {{ bunker_mat_code3[index] }}<br />
                    {{ bunker_stock_wt3[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt3[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick3(item, index)"
                    @dblclick="dbbutClick3(index)"
                    :style="
                      bunker_color_status3[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type3[index] }}<br />
                    {{ bunker_mat_name3[index] }}<br />
                    {{ bunker_l2_code3[index] }}<br />
                    {{ bunker_mat_code3[index] }}<br />
                    {{ bunker_stock_wt3[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker2"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt2[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick2(item, index)"
                    @dblclick="dbbutClick2(index)"
                    :style="
                      bunker_color_status2[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type2[index] }}<br />
                    {{ bunker_mat_name2[index] }}<br />
                    {{ bunker_l2_code2[index] }}<br />
                    {{ bunker_mat_code2[index] }}<br />
                    {{ bunker_stock_wt2[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt2[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick2(item, index)"
                    @dblclick="dbbutClick2(index)"
                    :style="
                      bunker_color_status2[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type2[index] }}<br />
                    {{ bunker_mat_name2[index] }}<br />
                    {{ bunker_l2_code2[index] }}<br />
                    {{ bunker_mat_code2[index] }}<br />
                    {{ bunker_stock_wt2[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 20.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker1"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt1[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick1(item, index)"
                    @dblclick="dbbutClick1(index)"
                    :style="
                      bunker_color_status1[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type1[index] }}<br />
                    {{ bunker_mat_name1[index] }}<br />
                    {{ bunker_l2_code1[index] }}<br />
                    {{ bunker_mat_code1[index] }}<br />
                    {{ bunker_stock_wt1[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt1[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick1(item, index)"
                    @dblclick="dbbutClick1(index)"
                    :style="
                      bunker_color_status1[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type1[index] }}<br />
                    {{ bunker_mat_name1[index] }}<br />
                    {{ bunker_l2_code1[index] }}<br />
                    {{ bunker_mat_code1[index] }}<br />
                    {{ bunker_stock_wt1[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; height: 1%"></div>
          <div style="width: 100%; height: 43%" class="Box">
            <div style="width: 19%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker10"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt10[index] == 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #f1eac0;
                    "
                    @click="butClick10(item, index)"
                    @dblclick="dbbutClick10(index)"
                    :style="
                      bunker_color_status10[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type10[index] }}<br />
                    {{ bunker_mat_name10[index] }}<br />
                    {{ bunker_l2_code10[index] }}<br />
                    {{ bunker_mat_code10[index] }}<br />
                    {{ bunker_stock_wt10[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt10[index] != 0"
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
                      font-size: 9px;
                      background: #dabde2;
                    "
                    @click="butClick10(item, index)"
                    @dblclick="dbbutClick10(index)"
                    :style="
                      bunker_color_status10[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type10[index] }}<br />
                    {{ bunker_mat_name10[index] }}<br />
                    {{ bunker_l2_code10[index] }}<br />
                    {{ bunker_mat_code10[index] }}<br />
                    {{ bunker_stock_wt10[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 40%"></div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker9"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt9[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick9(item, index)"
                    @dblclick="dbbutClick9(index)"
                    :style="
                      bunker_color_status9[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type9[index] }}<br />
                    {{ bunker_mat_name9[index] }}<br />
                    {{ bunker_l2_code9[index] }}<br />
                    {{ bunker_mat_code9[index] }}<br />
                    {{ bunker_stock_wt9[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt9[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #f68283;
                    "
                    @click="butClick9(item, index)"
                    @dblclick="dbbutClick9(index)"
                    :style="
                      bunker_color_status9[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type9[index] }}<br />
                    {{ bunker_mat_name9[index] }}<br />
                    {{ bunker_l2_code9[index] }}<br />
                    {{ bunker_mat_code9[index] }}<br />
                    {{ bunker_stock_wt9[index] }}<br />
                  </div>
                </div>
                <div style="width: 1%; height: 100%"></div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker8"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt8[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick8(item, index)"
                    @dblclick="dbbutClick8(index)"
                    :style="
                      bunker_color_status8[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type8[index] }}<br />
                    {{ bunker_mat_name8[index] }}<br />
                    {{ bunker_l2_code8[index] }}<br />
                    {{ bunker_mat_code8[index] }}<br />
                    {{ bunker_stock_wt8[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt8[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick8(item, index)"
                    @dblclick="dbbutClick8(index)"
                    :style="
                      bunker_color_status8[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type8[index] }}<br />
                    {{ bunker_mat_name8[index] }}<br />
                    {{ bunker_l2_code8[index] }}<br />
                    {{ bunker_mat_code8[index] }}<br />
                    {{ bunker_stock_wt8[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 19.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker7"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt7[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick7(item, index)"
                    @dblclick="dbbutClick7(index)"
                    :style="
                      bunker_color_status7[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type7[index] }}<br />
                    {{ bunker_mat_name7[index] }}<br />
                    {{ bunker_l2_code7[index] }}<br />
                    {{ bunker_mat_code7[index] }}<br />
                    {{ bunker_stock_wt7[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt8[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick7(item, index)"
                    @dblclick="dbbutClick7(index)"
                    :style="
                      bunker_color_status7[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type7[index] }}<br />
                    {{ bunker_mat_name7[index] }}<br />
                    {{ bunker_l2_code7[index] }}<br />
                    {{ bunker_mat_code7[index] }}<br />
                    {{ bunker_stock_wt7[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 0.5%; height: 100%"></div>
            <div style="width: 20.5%; height: 100%" class="Box">
              <div
                style="width: 33.33%; height: 25%"
                v-for="(item, index) in bunker6"
              >
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt6[index] == 0"
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
                      font-size: 9px;
                      background: #f1eac0;
                    "
                    @click="butClick6(item, index)"
                    @dblclick="dbbutClick6(index)"
                    :style="
                      bunker_color_status6[index] == true
                        ? { backgroundColor: '#d85b5b' }
                        : { backgroundColor: '#f1eac0' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type6[index] }}<br />
                    {{ bunker_mat_name6[index] }}<br />
                    {{ bunker_l2_code6[index] }}<br />
                    {{ bunker_mat_code6[index] }}<br />
                    {{ bunker_stock_wt6[index] }}<br />
                  </div>
                </div>
                <div
                  style="width: 100%; height: 100%"
                  v-if="buiker_stock_wt6[index] != 0"
                >
                  <div
                    id="{{item}}"
                    style="
                      width: 100%;
                      height: 100%;
                      border: 1px solid;
                      font-size: 9px;
                      white-space: nowrap; 
                      overflow: hidden;
                      justify-content: center;
                      text-align: center;
                      background: #dabde2;
                    "
                    @click="butClick6(item, index)"
                    @dblclick="dbbutClick6(index)"
                    :style="
                      bunker_color_status6[index] == true
                        ? { backgroundColor: '#bb3a4b' }
                        : { backgroundColor: '#dabde2' }
                    "
                  >
                    {{ item }} -{{ bunker_mat_type6[index] }}<br />
                    {{ bunker_mat_name6[index] }}<br />
                    {{ bunker_l2_code6[index] }}<br />
                    {{ bunker_mat_code6[index] }}<br />
                    {{ bunker_stock_wt6[index] }}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; height: 1%"></div>
          <div style="width: 100%; height: 12%" class="Box">
            <div
              style="width: 10%; height: 100%"
              v-for="(item, index) in bunker13"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt13[index] == 0"
              >
                <div
                  id="{{item}}"
                  style="
                    display: flex;
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    white-space: nowrap; 
                    overflow: hidden;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    background: #f1eac0;
                    font-size: 9px;
                  "
                  @click="butClick13(item, index)"
                  @dblclick="dbbutClick13(index)"
                  :style="
                    bunker_color_status13[index] == true
                      ? { backgroundColor: '#d85b5b' }
                      : { backgroundColor: '#f1eac0' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type13[index] }}<br />
                  {{ bunker_mat_name13[index] }}<br />
                  {{ bunker_l2_code13[index] }}<br />
                  {{ bunker_mat_code13[index] }}<br />
                  {{ bunker_stock_wt13[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt13[index] != 0"
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
                    font-size: 9px;
                  "
                  @click="butClick13(item, index)"
                  @dblclick="dbbutClick13(index)"
                  :style="
                    bunker_color_status13[index] == true
                      ? { backgroundColor: '#bb3a4b' }
                      : { backgroundColor: '#dabde2' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type13[index] }}<br />
                  {{ bunker_mat_name13[index] }}<br />
                  {{ bunker_l2_code13[index] }}<br />
                  {{ bunker_mat_code13[index] }}<br />
                  {{ bunker_stock_wt13[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 0.5%; height: 100%"></div>
        <div style="width: 8.5%; height: 100%">
          <div style="overflow: auto; height: 100%; width: 100%">
            <div
              style="width: 100%; height: 9.5%"
              v-for="(item, index) in bunker12"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt12[index] == 0"
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
                    font-size: 9px;
                  "
                  @click="butClick12(item, index)"
                  @dblclick="dbbutClick12(index)"
                  :style="
                    bunker_color_status12[index] == true
                      ? { backgroundColor: '#d85b5b' }
                      : { backgroundColor: '#f1eac0' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type12[index] }}<br />
                  {{ bunker_mat_name12[index] }}<br />
                  {{ bunker_l2_code12[index] }}<br />
                  {{ bunker_mat_code12[index] }}<br />
                  {{ bunker_stock_wt12[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt12[index] != 0"
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
                    font-size: 9px;
                  "
                  @click="butClick12(item, index)"
                  @dblclick="dbbutClick12(index)"
                  :style="
                    bunker_color_status12[index] == true
                      ? { backgroundColor: '#bb3a4b' }
                      : { backgroundColor: '#dabde2' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type12[index] }}<br />
                  {{ bunker_mat_name12[index] }}<br />
                  {{ bunker_l2_code12[index] }}<br />
                  {{ bunker_mat_code12[index] }}<br />
                  {{ bunker_stock_wt12[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div style="height:10px">
        </div> -->

      <v-splitter style="height: 25%" class="default-theme">
        <v-splitter-pane>
          <xr-ef-panel title="物料信息" style="height: 100%" padding="5px">
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
          <xr-ef-panel title="成分信息" style="height: 100%" padding="5px">
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
<script lang="ts" src="./MMSM422S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM422S2N.scss";
</style>
