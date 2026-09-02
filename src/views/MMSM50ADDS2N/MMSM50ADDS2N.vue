<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeEfDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <er-layout
        v-if="initializeFlag"
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
        @item-button-click="butClick"
      ></er-layout>
      <div style="height: 100%; width: 100%" class="Box">
        <div style="height: 100%; width: 60%">
          <er-grid
            v-if="initializeFlag"
            :er-form-helper-prop="erFormHelper"
            :config-id="'gridView1'"
            @erGridReady="erGrid1Ready"
            @focus-changed="GridView1FocusChanged"
            @dblclick="gridView1_dblclick"
          >
          </er-grid>
        </div>
        <div style="height: 100%; width: 40%">
          <div style="height: 100%; width: 100%;  border: 1px solid; margin-left: 1%;" class="Box">
            <div style="height: 100%; width: 10%"></div>
            <div
              style="
                width: 90%;
                height: 100%;
                text-align: left;
                fontSize: 20px;
              "
              >
              <b>物料主数据</b><br />
              物料名称：{{ ARRAY_MAT_CODE[0] }}<br />
              物料描述：{{ ARRAY_MAT_CODE[1] }}<br />
              错误信息：无
            </div>
          </div>
        </div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM50ADDS2N.ts"></script>

<style lang="scss" scoped>
@import "./MMSM50ADDS2N.scss";
</style>
