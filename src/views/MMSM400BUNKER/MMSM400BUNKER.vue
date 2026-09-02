<template>
  <div class="bunker-container" style="height: 100%">
    <div class="bunker-header">
      <div class="header-title">料仓信息</div>
    </div>
    <div
      class="bunker-body"
      :style="`grid-template-columns: repeat(${colNum}, 1fr); grid-template-rows: repeat(${
        bunker.length / colNum
      }), 1fr);`"
    >
      <div
        :id="item.BUNKER_NO"
        class="bunker-item"
        v-for="(item, index) in bunker.slice(
          0,
          bunker.length - (bunker.length % colNum)
        )"
        :key="index"
        @click="butClickChild(item, index)"
        @dblclick="dbbutClickChild(item, index)"
        :style="{
          backgroundColor:
            index === current_active_bunker
              ? item.STOCK_WT == 0
                ? '#d85b5b'
                : '#bb3a4b'
              : item.STOCK_WT == 0
              ? '#f1eac0'
              : '#dabde2',
        }"
      >
        {{ item.BUNKER_NO }} -{{ item.BASE_NAME }}<br />
        {{ item.MAT_NAME }}<br />
        {{ item.BACK_C5 }}<br />
        {{ item.MAT_CODE }}<br />
        {{ item.STOCK_WT }}<br />
      </div>
      <div
        class="last-row"
        v-if="bunker.length % colNum > 0"
        :style="`grid-template-columns: repeat(${
          bunker.length % colNum
        }, 1fr); grid-column: 1 / span ${colNum}`"
      >
        <div
          :id="item.BUNKER_NO"
          class="bunker-item"
          v-for="(item, index) in bunker.slice(
            bunker.length - (bunker.length % colNum)
          )"
          :key="index"
          @click="
            butClickChild(
              item,
              index + bunker.length - (bunker.length % colNum)
            )
          "
          @dblclick="
            dbbutClickChild(
              item,
              index + bunker.length - (bunker.length % colNum)
            )
          "
          :style="{
            backgroundColor:
              index + bunker.length - (bunker.length % colNum) ===
              current_active_bunker
                ? item.STOCK_WT == 0
                  ? '#d85b5b'
                  : '#bb3a4b'
                : item.STOCK_WT == 0
                ? '#f1eac0'
                : '#dabde2',
          }"
        >
          {{ item.BUNKER_NO }} -{{ item.BASE_NAME }}<br />
          {{ item.MAT_NAME }}<br />
          {{ item.BACK_C5 }}<br />
          {{ item.MAT_CODE }}<br />
          {{ item.STOCK_WT }}<br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./MMSM400BUNKER.ts"></script>

<style lang="scss" scoped>
@import "./MMSM400BUNKER.scss";
</style>
