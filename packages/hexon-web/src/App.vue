<script setup lang="ts">
import { useDark } from "@vueuse/core"
import { useThemeController } from "@winwin/vue-global-theming"
import { onMounted, watch } from "vue"
import HDialog from "@/others/HDialog.vue"
import HNotificationItem from "@/others/HNotificationItem.vue"
import { DialogContainer } from "./lib/dialog"
import { useLoading } from "./lib/loading"
import { Notifications } from "./lib/notification"
import { useDispatcher } from "./store/dispatcher"
import ClassProvider from "./ClassProvider.vue"
import HLoading from "./components/ui/loading/src/HLoading.vue"
import ModalContainer from "./lib/modal/src/ModalContainer.vue"

const dispatcher = useDispatcher()
const loading = useLoading()
const isDarkRef = useDark()
const controller = useThemeController()!
watch(
  () => isDarkRef.value,
  (isDark) => {
    if (isDark) controller.changeTheme("dark")
    else controller.changeTheme("default")
  },
  {
    immediate: true,
  }
)
onMounted(() => {
  dispatcher.init()
})
</script>

<template>
  <div style="width: 100vw; height: 100vh" @contextmenu.prevent>
    <HLoading :loading="loading.loading.value" overlay>
      <ClassProvider>
        <router-view></router-view>
        <Notifications>
          <template #default="slotsProps">
            <HNotificationItem :data="slotsProps.item" />
          </template>
        </Notifications>
        <DialogContainer>
          <template #default="slotProps">
            <HDialog :data="slotProps.data" />
          </template>
        </DialogContainer>
        <ModalContainer />
      </ClassProvider>
    </HLoading>
  </div>
</template>

<style lang="less">
@import "./styles/index.less";
</style>
