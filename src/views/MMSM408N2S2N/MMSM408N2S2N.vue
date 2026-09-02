<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
      <div
        class="card-header"
        style="background: #dbefff !important; padding: 1px; border: 1px solid"
      ></div>

      <div style="width: 100%; height: 34%">
        <div style="width: 100%; height: 100%" class="Box">
          <div
            style="width: 6.25%; height: 33.333%"
            v-for="(item, index) in bunker_J"
          >
            <div
              style="width: 100%; height: 100%"
              v
              v-if="buiker_stock_wt_J[index] == 0"
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
                  background: #f1eac0;
                  font-size: 11px;
                "
                @click="butClick_J(item, index)"
                @dblclick="dbbutClick_J(index)"
                :style="
                  bunker_J_color_status[index] == true
                    ? { backgroundColor: '#d85b5b' }
                    : { backgroundColor: '#f1eac0' }
                "
              >
                {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                {{ bunker_mat_name_J[index] }}<br />
                {{ bunker_l2_code_J[index] }}<br />
                {{ bunker_mat_code_J[index] }}<br />
                {{ bunker_stock_wt_J[index] }}<br />
              </div>
            </div>
            <div
              style="width: 100%; height: 100%"
              v-if="buiker_stock_wt_J[index] != 0"
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
                  font-size: 11px;
                "
                @click="butClick_J(item, index)"
                @dblclick="dbbutClick_J(index)"
                :style="
                  bunker_J_color_status[index] == true
                    ? { backgroundColor: '#bb3a4b' }
                    : { backgroundColor: '#dabde2' }
                "
              >
                {{ item }} -{{ bunker_mat_type_J[index] }}<br />
                {{ bunker_mat_name_J[index] }}<br />
                {{ bunker_l2_code_J[index] }}<br />
                {{ bunker_mat_code_J[index] }}<br />
                {{ bunker_stock_wt_J[index] }}<br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 0.5%">
        <div style="width: 100%; height: 100%" class="Box">
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
        </div>
      </div>
      <div style="width: 100%; height: 34%" class="Box">
        <div
          style="width: 6.25%; height: 33.333%"
          v-for="(item, index) in bunker_K"
        >
          <div
            style="width: 100%; height: 100%"
            v-if="buiker_stock_wt_K[index] == 0"
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
                font-size: 11px;
              "
              @click="butClick_K(item, index)"
              @dblclick="dbbutClick_K(index)"
              :style="
                bunker_K_color_status[index] == true
                  ? { backgroundColor: '#d85b5b' }
                  : { backgroundColor: '#f1eac0' }
              "
            >
              {{ item }} -{{ bunker_mat_type_K[index] }}<br />
              {{ bunker_mat_name_K[index] }}<br />
              {{ bunker_l2_code_K[index] }}<br />
              {{ bunker_mat_code_K[index] }}<br />
              {{ bunker_stock_wt_K[index] }}<br />
            </div>
          </div>
          <div
            style="width: 100%; height: 100%"
            v-if="buiker_stock_wt_K[index] != 0"
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
                font-size: 11px;
              "
              @click="butClick_K(item, index)"
              @dblclick="dbbutClick_K(index)"
              :style="
                bunker_K_color_status[index] == true
                  ? { backgroundColor: '#bb3a4b' }
                  : { backgroundColor: '#dabde2' }
              "
            >
              {{ item }} -{{ bunker_mat_type_K[index] }}<br />
              {{ bunker_mat_name_K[index] }}<br />
              {{ bunker_l2_code_K[index] }}<br />
              {{ bunker_mat_code_K[index] }}<br />
              {{ bunker_stock_wt_K[index] }}<br />
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 0.5%">
        <div style="width: 100%; height: 100%" class="Box">
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
          <div style="width: 11.11%; height: 100%; background: #d8d82e"></div>
          <div style="width: 11.11%; height: 100%; background: #0000ff"></div>
        </div>
      </div>
      <div style="width: 100%; height: 32%" class="Box">
        <div style="width: 80%; height: 100%"></div>
        <div style="width: 20%; height: 100%">
          <div style="width: 100%; height: 100%" class="Box">
            <div
              style="width: 50%; height: 33.3%"
              v-for="(item, index) in bunker_V"
            >
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt_V[index] == 0"
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
                    font-size: 11px;
                  "
                  @click="butClick_V(item, index)"
                  @dblclick="dbbutClick_V(index)"
                  :style="
                    bunker_M_color_status[index] == true
                      ? { backgroundColor: '#d85b5b' }
                      : { backgroundColor: '#f1eac0' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                  {{ bunker_mat_name_V[index] }}<br />
                  {{ bunker_l2_code_V[index] }}<br />
                  {{ bunker_mat_code_V[index] }}<br />
                  {{ bunker_stock_wt_V[index] }}<br />
                </div>
              </div>
              <div
                style="width: 100%; height: 100%"
                v-if="buiker_stock_wt_V[index] != 0"
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
                    font-size: 11px;
                  "
                  @click="butClick_V(item, index)"
                  @dblclick="dbbutClick_V(index)"
                  :style="
                    bunker_M_color_status[index] == true
                      ? { backgroundColor: '#bb3a4b' }
                      : { backgroundColor: '#dabde2' }
                  "
                >
                  {{ item }} -{{ bunker_mat_type_V[index] }}<br />
                  {{ bunker_mat_name_V[index] }}<br />
                  {{ bunker_l2_code_V[index] }}<br />
                  {{ bunker_mat_code_V[index] }}<br />
                  {{ bunker_stock_wt_V[index] }}<br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 10px"></div>
      <div
        style="width: 100%; height: 100%; display: flex; flex-direction: row"
      >
        <div style="width: 70%">
          <xr-ef-panel
            title="物料信息"
            style="height: 100%"
            padding="5px"
            :show-header="false"
          >
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
        </div>
        <div style="width: 30%; height: 100%">
          <xr-ef-panel
            title="成分信息"
            style="height: 100%"
            padding="5px"
            :show-header="false"
          >
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
        </div>
      </div>
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
<script lang="ts" src="./MMSM408N2S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM408N2S2N.scss";
</style>
