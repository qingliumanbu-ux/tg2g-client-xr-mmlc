<template>
  <div style="height: 100%">
    <xr-ef-form :f2-do="F2_DO" @ready="efFormReady">
      <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'">查询条件</er-layout>
      <xr-ef-panel title="历史数据" flex="7" padding="1px">
        <template #customButtonSlot>
        </template>
        <template #contentSlot>
          <v-splitter style="height: 100%;" :orientation="'horizontal'"  class="default-theme">
            <v-splitter-pane size="50">
              <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
              
              :page-options="{ pagination: 'server', pageSize: 10000 ,pageSizes:[10000,20000,30000]}" 
                @erGridReady="erGrid1Ready" @focus-changed="GridView1FocusChanged">
              </er-grid>
            </v-splitter-pane>
            <v-splitter-pane size="50">
              <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
                <a-tab-pane key="tab1" tab="详细信息">
                  <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                    :config-id="'layoutControlGroup2'" :auto-bind="true">明细</er-layout>
                  <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                    :config-id="'layoutControlGroup3'" :auto-bind="true">物料主数据</er-layout>
                  <xr-ef-panel title=" " flex="3.5" padding="1px">
                    <template #customButtonSlot>
                    </template>
                    <template #contentSlot>
                      <div class="kendo-field-label" style="width: 100%;">
                        <b>移库类型:</b><br />
                        移库类型分为四种:进厂、移库(上料/退料)、加料和盘库进厂:一般物料进厂和石灰进厂，石灰进厂没有计量单号
                        <br />
                        加料:正常加料和EXTRA加料,EXTRA加料时,收到的加料数据比高位料
                        <br />
                        仓存量大，而产生的没有减库的数据，发生这种情况是由于磅差造成的，需要后期对库存数据进行处理盘库:修正进厂和加料质检的磅差<br />
                        <b>发生时间</b>:<br />
                        进厂:进厂进入地下料仓的时间<br />
                        移库:移库时间<br />
                        加料:收到加料数据后减库时间<br />
                        盘库:操作员修正高位料仓数据/盘库(手动)<br />
                        <b>料仓</b>:<br />
                        进厂:进厂没有源料仓<br />
                        加料:加料没有目的料仓<br />
                        <b>加料消息号</b>:<br />
                        加料消息号只对加料数据有效，可以根据该消息号查询对应的加料数据<br />
                        <b>注意</b>:<br />
                        该窗口数据非实时数据，请手动刷新(且默认显示最新50条)，或设置条件查询
                      </div>
                    </template>
                  </xr-ef-panel>
                </a-tab-pane>
                <a-tab-pane key="tab2" tab="计量信息">
                  <div style="height: 40%;">
                    <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                      :config-id="'layoutControlGroup4'" :auto-bind="true"></er-layout>
                  </div>
                  <div style="height: 60%;">
                    <v-splitter style="height: 100%;" :orientation="'horizontal'">
                    <v-splitter-pane size="20">
                      <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                        :config-id="'layoutControlGroup5'" :auto-bind="true">库存</er-layout>
                    </v-splitter-pane>
                    <v-splitter-pane size="60">
                      <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                        @erGridReady="erGrid2Ready" @focus-changed="GridView2FocusChanged">
                      </er-grid>
                    </v-splitter-pane>
                    <v-splitter-pane size="20">
                      <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridView3'"
                        @erGridReady="erGrid3Ready"></er-grid>
                    </v-splitter-pane>
                  </v-splitter>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="tab3" tab="加料信息">               
                      <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                    :config-id="'layoutControlGroupjl'" :auto-bind="true">明细</er-layout>  
                      
                      <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'gridViewjl'"
                      @erGridReady="erGridjlReady"
                       >
                      </er-grid>
                </a-tab-pane>
              </a-tabs>
            </v-splitter-pane>
          </v-splitter>
        </template>
      </xr-ef-panel>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSMLC99S2N.ts">
</script>

<style lang="scss" scoped>
@import './MMSMLC99S2N.scss';
</style>
