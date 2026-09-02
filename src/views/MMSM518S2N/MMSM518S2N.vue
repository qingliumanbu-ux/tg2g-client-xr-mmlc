<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f5-do="F5_DO"
      :f6-do="F6_DO"
    >
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'"
      ></er-layout>
      <v-splitter style="height: 100%" class="default-theme">
        <v-splitter-pane size="30">
          <xr-ef-panel id="gridView1" style="height: 100%" title="详细信息" padding="5px">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
              <!-- <er-grid  :er-form-helper-prop="erFormHelper" :config-id="`${i_func_id_p}`" -->
              <div style="overflow: auto; height: 100%; padding: 5px">
                <er-grid
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'gridView1'"
                  @erGridReady="erGrid1Ready"
                  @focus-changed="GridView1FocusChanged"
                >
                </er-grid>
              </div>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>
        <v-splitter-pane size="70">
          <v-splitter horizontal style="height: 100%" class="default-theme">
            <v-splitter-pane size="42">
              <div style="height: 100%">
                <er-layout
                  style="height: 100%"
                  v-if="initializeFlag === 1"
                  :er-form-helper-prop="erFormHelper"
                  :auto-bind="true"
                  :config-id="'layoutControlGroup2'"
                  @item-button-click="layout2_Changed"
                ></er-layout>
              </div>
            </v-splitter-pane>
            <v-splitter-pane size="10">
              <er-layout
                v-if="initializeFlag === 1"
                style="height: 100%"
                :er-form-helper-prop="erFormHelper"
                :config-id="'layoutControlGroup4'"
              ></er-layout>
            </v-splitter-pane>
            <v-splitter-pane size="48">
              <div
                style="
                  float: left;
                  width: 100%;
                  height: 100%;
                  border: 1px solid;
                  text-align: left;
                  margin-left: 1%;
                "
              >
                <b>物料主数据</b><br />
                原料类型：<br />
                物料名称：{{bunker[0]}}<br />
                原料代码：<br />
                物料牌号：<br />
                物料描述：{{bunker[1]}}<br />
                错误信息：无
              </div>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
    <div class="Box">
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
      v-if="dialogFormName === 'MMSM81FG'"
      >
        <MMSM81FG
          :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
        ></MMSM81FG>
        </div>
         <div style="width: 100%; height: 100%" v-if="dialogFormName === 'MMSM50ADDS2N'">
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
<script lang="ts" src="./MMSM518S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM518S2N.scss";
</style>

<!-- <script lang="ts" src="./MMSM831S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM831S2N.scss";
</style> -->
