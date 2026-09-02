<template>
  <div style="height: 100%">
    <xr-ef-form
      :f2-do="F2_DO"
      :in-dialog-form-name="openInDialog ? dialogFormName : null"
      @closeDialog="closeEfDialog"
      @ready="efFormReady"
    >
      <div style="width: 100%; height: 100%" class="Box">
        <div style="width: 50%; height: 33.3%" v-for="(item, index) in bunker1">
          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag1[index] === '1'"
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
              @click="butClick1(item)"
            >
              {{ item }} -{{ bunker_mat_type1[index] }}<br />
              {{ bunker_mat_name1[index] }}<br />
              {{ bunker_l2_code1[index] }}<br />
              {{ bunker_mat_code1[index] }}<br />
              {{ bunker_stock_wt1[index] }}<br />
            </div>
          </div>

          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag1[index] === '0'"
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
              {{ item }} -{{ bunker_mat_type1[index] }}<br />
              {{ bunker_mat_name1[index] }}<br />
              {{ bunker_l2_code1[index] }}<br />
              {{ bunker_mat_code1[index] }}<br />
              {{ bunker_stock_wt1[index] }}<br />
            </div>
          </div>
        </div>
        <div style="width: 50%; height: 33.3%"></div>
        <div style="width: 50%; height: 33.3%" v-for="(item, index) in bunker2">
          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag2[index] === '1'"
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
              @click="butClick2(item)"
            >
              {{ item }} -{{ bunker_mat_type2[index] }}<br />
              {{ bunker_mat_name2[index] }}<br />
              {{ bunker_l2_code2[index] }}<br />
              {{ bunker_mat_code2[index] }}<br />
              {{ bunker_stock_wt2[index] }}<br />
            </div>
          </div>

          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag2[index] === '0'"
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
              {{ item }} -{{ bunker_mat_type2[index] }}<br />
              {{ bunker_mat_name2[index] }}<br />
              {{ bunker_l2_code2[index] }}<br />
              {{ bunker_mat_code2[index] }}<br />
              {{ bunker_stock_wt2[index] }}<br />
            </div>
          </div>
        </div>
        <div style="width: 50%; height: 33.3%" v-for="(item, index) in bunker3">
          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag3[index] === '1'"
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
              @click="butClick3(item)"
            >
              {{ item }} -{{ bunker_mat_type3[index] }}<br />
              {{ bunker_mat_name3[index] }}<br />
              {{ bunker_l2_code3[index] }}<br />
              {{ bunker_mat_code3[index] }}<br />
              {{ bunker_stock_wt3[index] }}<br />
            </div>
          </div>

          <div
            style="width: 100%; height: 100%"
            v-if="bunker_flag3[index] === '0'"
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
              {{ item }} -{{ bunker_mat_type3[index] }}<br />
              {{ bunker_mat_name3[index] }}<br />
              {{ bunker_l2_code3[index] }}<br />
              {{ bunker_mat_code3[index] }}<br />
              {{ bunker_stock_wt3[index] }}<br />
            </div>
          </div>
        </div>
      </div>
    </xr-ef-form>
  </div>
</template>
<script lang="ts" src="./MMSM8151CADDV.ts"></script>

<style lang="scss" scoped>
@import "./MMSM8151CADDV.scss";
</style>
