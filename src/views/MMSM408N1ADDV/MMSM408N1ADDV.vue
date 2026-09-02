<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <div style="width: 100%; height: 22%">
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
                  @click="butClick(item, bunker_mat_name_J[index])"
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
      <div style="width: 100%; height: 0.5%; margin: bottom">
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
      <div style="width: 100%; height: 38%" class="Box">
        <div style="height: 100%; width: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 6.25%; height: 33.333%"
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
                  @click="butClick(item, bunker_mat_name_K[index])"
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
      <div style="width: 100%; height: 0.5%; margin: bottom">
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
      <div style="width: 100%; height: 38%" class="Box">
        <div style="width: 100%; height: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 7.14%; height: 33.333%"
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
                  @click="butClick(item, bunker_mat_name_V[index])"
                >
                  {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                  {{ bunker_mat_name_V[index] }}<br />
                  {{ bunker_l2_code_V[index] }}<br />
                  {{ bunker_mat_code_V[index] }}<br />
                  {{ bunker_STOCK_WT_V[index] }}<br />
                </div>
              </div>
            </div>
            <div style="width: 100%; height: 36%"></div>
          </div>
        </div>
        <div style="width: 1%; height: 100%"></div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM408N1ADDV.ts"></script>

<style lang="scss" scoped>
@import "./MMSM408N1ADDV.scss";
</style>
