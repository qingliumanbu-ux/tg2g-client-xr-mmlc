<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f5-do="F5_DO"
      :f6-do="F6_DO"
      :f7-do="F7_DO"
      :f8-do="F8_DO"
      :f9-do="F9_DO"
      :f11-do="F11_DO"
      :f11-pre-do="F11_PRE_DO"
      :f11-cancel="F11_CANCEL"
      :f12-do="F12_DO"
    >
      <!-- <er-layout  :er-form-helper-prop="erFormHelper" :config-id="`${i_func_id_q}`" -->

      <v-splitter horizontal="" style="height: 100%" class="default-theme">
        <v-splitter-pane size="50">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="70">
              <xr-ef-panel
                title="代收物料"
                style="height: 100%"
                padding="5px"
              >
                <template #customButtonSlot=""> </template>
                <template v-if="initializeFlag === 1" #contentSlot="">
                  <er-layout style="height: 20%"
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilter0'"
                  :show-group-border="false"
                  @item-button-click="TC0"
                ></er-layout>
                  <er-grid
                    style="height: 80%"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView1'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                    @focus-changed="GridView1FocusChanged"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane size="30">
              <template v-if="initializeFlag === 1">
                <er-layout
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilter'"
                  :show-group-border="false"
                  @item-button-click="TC"
                ></er-layout>
              </template>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>

        <v-splitter-pane size="50">
          <v-splitter horizontal="" style="height: 100%" class="default-theme">
            <v-splitter-pane size="20">
              <template v-if="initializeFlag === 1">
                <er-layout
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroupFilterHs'"
                  :show-group-border="true"
                  @item-button-click="TC2"
                ></er-layout>
              </template>
            </v-splitter-pane>
            <v-splitter-pane size="80">
              <xr-ef-panel title="查询结果" style="height: 100%" padding="5px">
                <template #customButtonSlot=""> </template>
                <template v-if="initializeFlag === 1" #contentSlot="">
                  <er-grid
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'gridView2'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                  >
                  </er-grid>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
    <div class="Box" v-if="formNamePara === 'MMSM511S2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="60%"
        width="90%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <div class="Box" v-if="formNamePara === 'MMSM512S2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="60%"
        width="90%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <div class="Box" v-if="formNamePara === 'MMSM513S2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="60%"
        width="95%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <div class="Box" v-if="formNamePara === 'MMSM515S2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="60%"
        width="90%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM81ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81ADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <div class="Box" v-if="formNamePara === 'MMSM81518ADDV'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="80%"
        width="80%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM81518ADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM81518ADDV>
        </div>
      </xr-ef-dialog>
    </div>
  </div>
</template>
<script lang="ts" src="./MMSM51HDS2N.ts"></script>

<style lang="scss" scoped="">
  @import "./MMSM51HDS2N.scss";
</style>

<!-- <script lang="ts" src="./MMSM831S2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM831S2N.scss";
</style> -->
./MMSM51Z.js./MMSM51Z.js
