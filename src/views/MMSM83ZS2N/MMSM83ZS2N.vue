<template >
  <div style="height: 100%">
  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f4-do="F4_DO" >
    <!-- :in-dialog-form-name="openInDialog ? dialogFormName : null"
    @initialized="efFormInitialized"
    @closeEfDialog="closeEfDialog" -->
    <template v-if="initializeFlag === 1">
    <!-- <er-layout  :er-form-helper-prop="erFormHelper" :config-id="`${i_func_id_q}`"></er-layout> -->
    <er-layout  :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter'"></er-layout>
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
            @focus-changed="GridView1FocusChanged"
          >
          </er-grid>
        </div>
      </template>
    </xr-ef-panel>
    <!-- <xr-ef-panel title="详细信息"
      padding="5px">
      <template #customButtonSlot>

      </template>
    </xr-ef-panel> -->
  </xr-ef-form>
  <!-- <xr-ef-dialog v-model:visible="dialogVisible" :title="dialogFormName" height="80%" width="80%"
    @click-close-icon="xrEfDialogClose" :default-footer="false">
    <MMSM81ADDV :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo" @getChildInfo="getChildInfo">
    </MMSM81ADDV>
  </xr-ef-dialog> -->

</div>
  <xr-ef-dialog v-model:visible="dialogVisible"
      :title="dialogFormName"
      height="80%"
      width="80%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false">
      <MMSM81POP :openInDialog="true"
        :dialogFormName="dialogFormName"
        :parentInfo="parentInfo"
        @getChildInfo="getChildInfo"></MMSM81POP>
    </xr-ef-dialog>

</template>

<script lang="ts"
  src="./MMSM83ZS2N.ts">
</script>

<style lang="scss"
  scoped>
  @import './MMSM83ZS2N.scss';
</style>