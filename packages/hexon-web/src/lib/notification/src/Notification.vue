<script setup lang="ts">
import { computed } from "vue-demi"
import { useNotification } from "."
import FadeTransitionGroup from "./FadeTransitionGroup.vue"
const props = withDefaults(
  defineProps<{
    zIndex?: number
    type?: "absolute" | "fixed"
  }>(),
  { type: "fixed" }
)
const notification = useNotification()
const list = computed(() =>
  notification.notificationList.value.filter((item) => item.show)
)
const position = computed(() => notification.position.value)
const close = (id: string) => notification.close(id)
</script>
<template>
  <FadeTransitionGroup
    tag="div"
    class="h-notification flex"
    :class="[type, position]"
    :style="{ zIndex: zIndex }"
  >
    <div v-for="item in list" :key="item.id">
      <slot :item="item"></slot>
    </div>
  </FadeTransitionGroup>
</template>
<style lang="less" scoped>
.top-left {
  top: 8px;
  left: 8px;
  @apply flex-col-reverse items-start justify-end mb-2;
}
.top {
  top: 8px;
  left: 8px;
  right: 8px;
  @apply flex-col-reverse items-center justify-end mb-2;
}
.top-right {
  top: 8px;
  right: 8px;
  @apply flex-col-reverse items-end justify-end mb-2;
}
.bottom-left {
  bottom: 8px;
  left: 8px;
  @apply flex-col items-start justify-end mt-2;
}
.bottom {
  bottom: 8px;
  left: 8px;
  right: 8px;
  @apply flex-col items-center justify-end mt-2;
}
.bottom-right {
  bottom: 8px;
  right: 8px;
  @apply flex-col items-end justify-end mt-2;
}
</style>
