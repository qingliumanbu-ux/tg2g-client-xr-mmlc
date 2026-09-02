<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f12-do="F12_DO"
    >
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'"
      ></er-layout>
      <v-splitter style="height: 100%" class="default-theme">
        <v-splitter-pane size="30">
          <xr-ef-panel style="height: 100%" title="详细信息" padding="5px">
            <template #customButtonSlot> </template>
            <template v-if="initializeFlag === 1" #contentSlot>
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
          <div>
            <er-layout
              style="height: 100%"
              v-if="initializeFlag === 1"
              :er-form-helper-prop="erFormHelper"
              :config-id="'layoutControlGroup2'"
              :auto-bind="true"
              @item-button-click="layout2_Changed"
            ></er-layout>
          </div>
          <div>
            <er-layout
              v-if="initializeFlag === 1"
              style="height: 100%"
              :er-form-helper-prop="erFormHelper"
              :config-id="'layoutControlGroup4'"
              :auto-bind="true"
              @item-button-click="layout4_click"
            ></er-layout>
          </div>
          <div>
            <div
              style="
                float: left;
                width: 98%;
                height: 100%;
                border: 1px solid;
                text-align: left;
                margin-left: 1%;
                font-size: 20px;
              "
            >
              <b>物料主数据</b><br />
              原料类型：{{ bunker[3] }}<br />
              物料名称：{{ bunker[1] }}<br />
              原料代码：{{ bunker[0] }}<br />
              物料牌号：<br />
              物料描述：<br />
              错误信息：无
            </div>
          </div>
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
          v-if="dialogFormName === 'MMSM81518ADDVS2N'"
        >
          <MMSM81518ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81518ADDV>
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
        <div
          style="width: 100%; height: 100%"
          v-if="dialogFormName === 'MMSM81ADDVS2N'"
        >
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo1"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
        <div
          style="width: 100%; height: 100%"
          v-if="dialogFormName === 'MMSM408N1ADDV'"
        >
          <MMSM408N1ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM408N1ADDV>
        </div>
        <div
          style="width: 100%; height: 100%"
          v-if="dialogFormName === 'MMSM408N2ADDV'"
        >
          <MMSM408N2ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM408N2ADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <!-- <div class="Box" v-if="formNamePara === 'MMSM518_1S2N'" >
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="60%"
        width="90%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%" >
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
      </xr-ef-dialog>
    </div> -->
  </div>
</template>
<script lang="ts" src="./MMSM519S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM519S2N.scss";
</style>

<!-- <script lang="ts" src="./MMSM831S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM831S2N.scss";
</style> -->
