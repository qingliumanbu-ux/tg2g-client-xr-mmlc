<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <div style="width: 100%; height: 28%">
        <div style="height: 100%; width: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 10%; height: 50%"
              v-for="(item, index) in bunker_J"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_J[index] === 1"
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
                    background: #e4e5ea;
                    font-size: 9px;
                  "
                >
                  {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                  {{ bunker_mat_name_J[index] }}<br />
                  {{ bunker_l2_code_J[index] }}<br />
                  {{ bunker_mat_code_J[index] }}<br />
                  {{ bunker_STOCK_WT_J[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_J[index] === 0"
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
                    background: #dabde2;
                    font-size: 9px;
                  "
                  @click="butClick(item,bunker_mat_name_J[index] )"
                >
                  {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                  {{ bunker_mat_name_J[index] }}<br />
                  {{ bunker_l2_code_J[index] }}<br />
                  {{ bunker_mat_code_J[index] }}<br />
                  {{ bunker_STOCK_WT_J[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 3%; margin: bottom">
        <div style="width: 100%; height: 60%"></div>
        <div style="width: 100%; height: 40%" class="Box">
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #ffff33"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #ffff33"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #ffff33"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #ffff33"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
        </div>
      </div>
      <div style="width: 100%; height: 40%" class="Box">
        <div style="height: 100%; width: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 5.55555%; height: 25%"
              v-for="(item, index) in bunker_K"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_K[index] === 1"
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
                    background: #e4e5ea;
                    font-size: 9px;
                  "
                >
                  {{ item }} -{{ bunker_mat_type_K[index] }}<br />
                  {{ bunker_mat_name_K[index] }}<br />
                  {{ bunker_l2_code_K[index] }}<br />
                  {{ bunker_mat_code_K[index] }}<br />
                  {{ bunker_STOCK_WT_K[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_K[index] === 0"
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
                    background: #dabde2;
                    font-size: 9px;
                  "
                  @click="butClick(item,bunker_mat_name_K[index])"
                >
                  {{ item }} -{{ bunker_mat_type_K[index] }}<br />
                  {{ bunker_mat_name_K[index] }}<br />
                  {{ bunker_l2_code_K[index] }}<br />
                  {{ bunker_mat_code_K[index] }}<br />
                  {{ bunker_STOCK_WT_K[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 3%"></div>
      <div style="width: 100%; height: 27%" class="Box">
        <div style="width: 79%; height: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 7.03%; height: 33.33%"
              v-for="(item, index) in bunker_V"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_V[index] === 1"
              >
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #e4e5ea;
                    font-size: 9px;
                  "
                >
                  {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                  {{ bunker_mat_name_V[index] }}<br />
                  {{ bunker_l2_code_V[index] }}<br />
                  {{ bunker_mat_code_V[index] }}<br />
                  {{ bunker_STOCK_WT_V[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_V[index] === 0"
              >
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #dabde2;
                    font-size: 9px;
                  "
                  @click="butClick(item,bunker_mat_name_V[index])"
                >
                  {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                  {{ bunker_mat_name_V[index] }}<br />
                  {{ bunker_l2_code_V[index] }}<br />
                  {{ bunker_mat_code_V[index] }}<br />
                  {{ bunker_STOCK_WT_V[index] }}<br />
                </div>
              </div>
            </div>
            <div  style="
                width: 100%;
                height: 36%;
              "></div>
          </div>
        </div>
        <div style="width: 1%; height: 100%"></div>
        <div style="width: 20%; height: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 50%; height: 33.33%"
              v-for="(item, index) in bunker_M"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_M[index] === 1"
              >
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #e4e5ea;
                    font-size: 9px;
                  "
                >
                  {{ item }} -{{ bunker_mat_type_M[index] }}<br />
                  {{ bunker_mat_name_M[index] }}<br />
                  {{ bunker_l2_code_M[index] }}<br />
                  {{ bunker_mat_code_M[index] }}<br />
                  {{ bunker_STOCK_WT_M[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="bunker_flag_M[index] === 0"
              >
                <div
                  id="{{item}}"
                  style="
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    text-align: center;
                    background: #dabde2;
                    font-size: 9px;
                  "
                  @click="butClick(item,bunker_mat_name_M[index])"
                >
                  {{ item }} -{{ bunker_mat_type_M[index] }}<br />
                  {{ bunker_mat_name_M[index] }}<br />
                  {{ bunker_l2_code_M[index] }}<br />
                  {{ bunker_mat_code_M[index] }}<br />
                  {{ bunker_STOCK_WT_M[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM81518ADDV.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81518ADDV.scss";
</style>

<!-- <template>
  <div style="height: 100%">
    <xr-ef-form :f2-do="F2_DO"
    :in-dialog-form-name="openInDialog ? dialogFormName : null"
    @closeEfDialog="closeEfDialog"
    @closeClick="closeClick"
    @ready="efFormReady">
      <xr-ef-panel padding="5px" title="料仓信息" style="overflow: auto;">
        <template #contentSlot>
          <div class="Box">
            <div v-for="(item, index) in bunker">
              <div v-if="bunker_flag[index] === 0">
                <div
                  id="{{item}}"
                  style="
                    width: 140px;
                    height: 200px;
                    border: 1px solid;
                    text-align: center;
                    background: #99ffff;
                  "
                  @click="butClick(item)"
                >
                  {{ item }} <br />
                  {{ bunker_mat_code[index] }}<br />
                  {{ bunker_mat_name[index] }}<br />
                  {{ bunker_mat_type[index] }}
              </div>
            </div>
            <div v-else>
              <div
                id="{{item}}"
                style="
                  width: 140px;
                  height: 200px;
                  border: 1px solid;
                  text-align: center;
                  background: #c0c0c0;
                "
              >
                {{ item }} <br />
                {{ bunker_mat_code[index] }}<br />
                {{ bunker_mat_name[index] }}<br />
                {{ bunker_mat_type[index] }}<br />
              </div>
            </div>
            </div>
          </div>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM81ADDV.ts"></script>

<style lang="scss" scoped>
@import url("./MMSM81ADDV.scss");
</style> -->
./MMSM81518ADDV.js./MMSM81518ADDV.js
