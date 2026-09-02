import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
  PropType,
} from "vue";

export default defineComponent({
  name: "MMSM400BUNKER",
  components: {},
  // 接收父组件传递的参数
  props: {
    // 料仓信息
    bunker: {
      type: Array as PropType<any[]>,
      default: [],
    },
    // 总高度
    height: {
      type: String,
      default: "50%",
    },
    // 列数
    colNum: {
      type: Number,
      default: 10,
    },
  },
  // 接收父组件的事件参数
  emits: ["butClick", "dbbutClick"],
  setup(props, { emit }) {
    // 当前激活格子的index索引号
    const current_active_bunker = ref<any>(null);

    const butClickChild = async (item: any, index: any) => {
      // 设置当前激活的格子
      current_active_bunker.value = index;
      // 调用父组件的点击事件
      emit("butClick", item);
    };
    const dbbutClickChild = async (item: any, index: any) => {
      // 设置当前激活的格子
      current_active_bunker.value = index;
      // 调用父组件的双击事件
      emit("dbbutClick", item);
    };

    onMounted(() => {});

    return {
      current_active_bunker,
      butClickChild,
      dbbutClickChild,
    };
  },
});
