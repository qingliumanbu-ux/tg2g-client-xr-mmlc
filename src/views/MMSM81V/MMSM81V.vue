<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f4-pre-do="F4_PRE_DO"
      :f4-cancel="F4_CANCEL"
    >
      <!-- <er-layout  :er-form-helper-prop="erFormHelper" :config-id="`${i_func_id_q}`" -->
      <template v-if="initializeFlag === 1">
        <er-layout
          :er-form-helper-prop="erFormHelper"
          :config-id="'LayoutGroupFilter'"
          :show-group-border="false"
        ></er-layout>
      </template>
      <xr-ef-panel id="gridView1" title="详细信息" padding="5px">
        <template #customButtonSlot> </template>
        <template v-if="initializeFlag === 1" #contentSlot>
          <!-- <er-grid  :er-form-helper-prop="erFormHelper" :config-id="`${i_func_id_p}`" -->
          <div style="overflow: auto; height: 100%; padding: 5px">
            <er-grid
              :er-form-helper-prop="erFormHelper"
              :config-id="'gridView1'"
              @erGridReady="erGrid1Ready"
              @dblclick="dbbutClick"
              @focus-changed="GridView1FocusChanged"
            >
            </er-grid>
          </div>
        </template>
      </xr-ef-panel>
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
    <div class="Box" v-if="formNamePara === 'MMSM51YS2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="50%"
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
    <div class="Box" v-if="formNamePara === 'MMSM51RS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM8151CADDVS2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="50%"
        width="60%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM8151CADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM8151CADDV>
        </div>
      </xr-ef-dialog>
    </div>
    <div class="Box" v-if="formNamePara === 'MMSM51KS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM51NS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM51HS2N'">
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

    <div class="Box" v-if="formNamePara === 'MMSM518_1S2N'">
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

    <div class="Box" v-if="formNamePara === 'MMSM51PS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM51TS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM51MS2N'">
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

    <div class="Box" v-if="formNamePara === 'MMSM81518ADDVS2N'">
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
    <div class="Box" v-if="formNamePara === 'MMSM8151LADDVS2N'">
      <xr-ef-dialog
        v-model:visible="dialogVisible"
        :title="dialogFormName"
        height="80%"
        width="80%"
        @click-close-icon="xrEfDialogClose"
        :default-footer="false"
      >
        <div style="width: 100%; height: 100%">
          <MMSM8151LADDV
            :openInDialog="true"
            :dialogFormName="dialogFormName"
            :parentInfo="parentInfo"
            @getChildInfo="getChildInfo"
          ></MMSM8151LADDV>
        </div>
      </xr-ef-dialog>
    </div>
  </div>
</template>
<script lang="ts" src="./MMSM81V.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81V.scss";
</style>