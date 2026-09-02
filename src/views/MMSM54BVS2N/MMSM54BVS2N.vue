<template>
  <xr-ef-form :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL" @ready="efFormReady">
    <v-splitter style="height: 100%;" :orientation="'horizontal'" >
      <v-splitter-pane>
      <!-- <div > -->
          <template v-if="initializeFlag === 1">
          <er-layout  :er-form-helper-prop="erFormHelper"
      :config-id="'layoutControlGroup1'"></er-layout>
          </template>
        <xr-ef-panel title="查询结果" padding="5px" style="height: 100%">
          <template #customButtonSlot>

          </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <er-grid  :toolbar-options="gridToolbar" :toolbar-style="'both'" :er-form-helper-prop="erFormHelper" :config-id="'gridView5'" @erGridReady="erGrid5Ready">
            </er-grid>
          </template>
        </xr-ef-panel>
      </v-splitter-pane>
      <!-- </div> -->
      <div >
        <xr-ef-panel title="要料单详细信息" padding="5px" style="height: 100%" >
          <template #customButtonSlot>

          </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <v-splitter-pane size='50'>
            <v-splitter style="height: 100%;" :orientation="'horizontal'" >
              <div >
                <er-grid  :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView1'" @erGridReady="erGrid1Ready">
                </er-grid>
              </div>
              <div >
                <er-grid :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView5'" @erGridReady="erGrid5Ready">
                </er-grid>
              </div>
              <div >
                <er-grid  :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView2'" @erGridReady="erGrid3Ready">
                </er-grid>
              </div>
            </v-splitter>
          </v-splitter-pane>
          </template>
        </xr-ef-panel>
        <xr-ef-panel title="配料操作区" padding="5px" style="height: 100%">
          <template #customButtonSlot>

            <!-- <div
            style="

              width: 70%;
              height: 230px;
              border: 1px solid;

              margin-left: 1%;
            "
          >
            <b>物料主数据</b><br />
            原料类型：{{ MX_LC_G[4] }}<br />
            物料名称：{{ MX_LC_G[2] }}<br />
            原料代码：{{ MX_LC_G[1] }}<br />
            错误信息：无
          </div> -->
          </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <v-splitter style="height: 100%;" :orientation="'horizontal'" :panes="[
              {
                'size': '20%',
                'collapsible': true
              },
              {
                'size': '50%',
                'collapsible': true
              },
              {
                'collapsible': true
              }
            ]">

              <div >
                <div style="float: left; width: 100%;">
                  <div style="
                width: 100%;
                height: 60%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
              ">
                    <br />
                    <br />
                    <br />
                    <br />
                    <!-- {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              {{ MX_LC_G[1] }}<br />
              {{ MX_LC_G[3] }}<br /> -->
                  </div>

                  <div class="kendo-field-label" style="float: left;width: 30%;">
                    BOF料槽
                  </div>
                  <div class="kendo-field-value" style="float: right;width: 70%;">
                    <kendo-combobox id="a" :data-source="[]" placeholder="请选择" data-value-field="name"
                      data-text-field="name" />
                  </div>
                  <br />
                  <br />
                  <div class="kendo-field-label" style="float: left;width: 30%;">
                    AOD料槽
                  </div>
                  <div class="kendo-field-value" style="float: right;width: 70%;">
                    <kendo-combobox id="a" :data-source="[]" placeholder="请选择" data-value-field="name"
                      data-text-field="name" />
                  </div>
                  <br />
                  <br />
                  <div class="kendo-field-label" style="float: left;width: 30%;">
                    EAF科蓝
                  </div>
                  <div class="kendo-field-value" style="float: right;width: 70%;">
                    <kendo-combobox id="a" :data-source="[]" placeholder="请选择" data-value-field="name"
                      data-text-field="name" />
                  </div>
                </div>
              </div>
              <div >
                <er-grid  :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView1'" @erGridReady="erGrid1Ready">
                </er-grid>
                <er-grid  :toolbar-options="gridToolbar" :toolbar-style="'both'" :er-form-helper-prop="erFormHelper" :config-id="'gridView5'" @erGridReady="erGrid5Ready">
                </er-grid>
              </div>
              <div >
                <er-grid :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
                </er-grid>
              </div>
            </v-splitter>
          </template>
        </xr-ef-panel>
        <xr-ef-panel title="地下料仓" padding="5px" style="height: 100%">
          <template #customButtonSlot>

          </template>
          <template v-if="initializeFlag === 1" #contentSlot>
            <v-splitter style="height: 100%;" :orientation="'horizontal'" :panes="[
              {
                'size': '20%',
                'collapsible': true
              },
              {
                'size': '50%',
                'collapsible': true
              },
              {
                'collapsible': true
              }
            ]">
              <div >
 <div style="float: left; width: 100%;">
                  <div style="
                width: 100%;
                height: 100%;
                border: 1px solid;
                text-align: center;
                background-color: #cc99ff;
              ">
                    <br />
                    <br />
                    <br />
                    <br />
                    <!-- {{ MX_LC_G[0] }}<br />
              {{ MX_LC_G[2] }}<br />
              {{ MX_LC_G[1] }}<br />
              {{ MX_LC_G[3] }}<br /> -->
                  </div>

                  <div class="kendo-field-label" style="float: left;width: 30%;">
                    废料坑
                  </div>
                  <div class="kendo-field-value" style="float: right;width: 70%;">
                    <kendo-combobox id="a" :data-source="[]" placeholder="请选择" data-value-field="name"
                      data-text-field="name" />
                  </div>
                  <br />
                  <br />
                  <div class="kendo-field-label" style="float: left;width: 30%;">
                    地下料仓
                  </div>
                  <div class="kendo-field-value" style="float: right;width: 70%;">
                    <kendo-combobox id="a" :data-source="[]" placeholder="请选择" data-value-field="name"
                      data-text-field="name" />
                  </div>
                </div>
              </div>
              <div >
                <er-grid :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView1'" @erGridReady="erGrid1Ready">
                </er-grid>
                <er-grid :toolbar-options="gridToolbar" :toolbar-style="'both'" :er-form-helper-prop="erFormHelper" :config-id="'gridView5'" @erGridReady="erGrid5Ready">
                </er-grid>
              </div>
              <div >
                <er-grid :er-form-helper-prop="erFormHelper" :toolbar-style="'both'" :config-id="'gridView2'" @erGridReady="erGrid2Ready">
                </er-grid>
              </div>
            </v-splitter>
          </template>
        </xr-ef-panel>
      </div>
    </v-splitter>
  </xr-ef-form>
</template>

<script lang="ts"
  src="./MMSM54BVS2N.ts">
</script>

<style lang="scss"
  scoped>
  @import './MMSM54BVS2N.scss';
  </style>
