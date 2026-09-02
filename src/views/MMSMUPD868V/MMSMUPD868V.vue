<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeDialog="closeEfDialog"
    >
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'layoutControlGroup1'"
      ></er-layout>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./MMSMUPD868V.ts"></script>

<style lang="scss" scoped>
@import "./MMSMUPD868V.scss";
</style>
./MMSMUPD868V.js./MMSMUPD868V.js