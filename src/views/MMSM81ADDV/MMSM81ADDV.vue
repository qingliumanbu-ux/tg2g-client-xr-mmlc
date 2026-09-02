<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <div style="width: 100%; height: 100%" class="Box">
        <div
          :style="{ width: rateWidth + '%', height: rateHeight + '%' }"
          v-for="(item, index) in bunker"
        >
          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag[index] === '1'"
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
                background: #dabde2;
              "
              @click="butClick(item,bunker_mat_name[index])"
            >
              {{ item }} -{{ bunker_mat_type[index] }}<br />
              {{ bunker_mat_name[index] }}<br />
              {{ bunker_l2_code[index] }}<br />
              {{ bunker_mat_code[index] }}<br />
              {{ bunker_stock_wt[index] }}<br />
            </div>
          </div>

          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag[index] === '0'"
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
                background: #e4e5ea;
              "
            >
              {{ item }} -{{ bunker_mat_type[index] }}<br />
              {{ bunker_mat_name[index] }}<br />
              {{ bunker_l2_code[index] }}<br />
              {{ bunker_mat_code[index] }}<br />
              {{ bunker_stock_wt[index] }}<br />
            </div>
          </div>
        </div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM81ADDV.ts"></script>

<style lang="scss" scoped>
@import "./MMSM81ADDV.scss";
</style>

