<script setup lang="ts">
import { useTheme } from "@winwin/vue-global-theming"
import { ref } from "vue"
import { HTheme } from "~/themes"
import logo from "~/assets/logo.svg"
import { HButton } from "@/ui/button"
import { HIconName } from "@/ui/icon"
import { HIcon } from "@/ui/icon"
import { HInput } from "@/ui/input"
import HImage from "@/HImage.vue"

const emits = defineEmits<{
  (e: "on-submit", payload: { username: string; password: string }): void
  (e: "on-forget"): void
  (e: "on-help"): void
}>()
const username = ref("")
const password = ref("")
const onSubmit = () => {
  emits("on-submit", { username: username.value, password: password.value })
}
const onForget = () => {
  emits("on-forget")
}
const onHelp = () => {
  emits("on-help")
}
const theme = useTheme<HTheme>()!
</script>
<template>
  <form @submit.prevent="onSubmit" class="flex flex-col items-center w-60">
    <HImage :src="logo" alt="" size="100px" />
    <div
      class="text-lg mt-4 select-none"
      :style="{ color: theme.color.foreground.main }"
    >
      登录到 Hexon
    </div>
    <HInput placeholder="用户名" v-model="username" class="mt-4" clearable>
      <template v-slot:prefix>
        <HIcon :name="HIconName.Contact" />
      </template>
    </HInput>
    <HInput
      placeholder="密码"
      v-model="password"
      class="mt-4"
      attr-type="password"
      clearable
    >
      <template v-slot:prefix>
        <HIcon :name="HIconName.Keyboard12Key" />
      </template>
    </HInput>
    <HButton class="mt-4" block>登录</HButton>
    <div class="mt-4 flex w-full">
      <HButton
        type="common"
        inverted
        class="flex-1"
        @click="onForget"
        attr-type="button"
      >
        忘记密码
      </HButton>
      <HButton
        type="common"
        inverted
        class="flex-1 ml-2"
        @click="onHelp"
        attr-type="button"
      >
        帮助
      </HButton>
    </div>
  </form>
</template>
