<script setup lang="ts">
import HChangePasswordForm from "@/forms/HChangePasswordForm.vue"
import { useAccount } from "~/lib/account"
import { IChangePasswordFormPayload } from "~/components/forms/interface"
import { useNotification } from "~/lib/notification"
import HChangeUsernameForm from "~/components/forms/HChangeUsernameForm.vue"
import HDivider from "~/components/ui/divider/src/HDivider.vue"
import { useDispatcher } from "~/store/dispatcher"
const account = useAccount()
const notification = useNotification()
const dispatcher = useDispatcher()
const onChangePassword = (payload: IChangePasswordFormPayload) => {
  dispatcher.changePassword(payload)
}
const onChangeUsername = (username: string) => {
  account.changeUsername(username).then(
    () => {
      notification.notify({ type: "success", title: "用户名修改成功" })
      dispatcher.getUsername()
    },
    (err) => {
      notification.notify({
        title: "用户名修改失败",
        desc: (err as Error).message,
        type: "error",
        duration: 5000,
      })
    }
  )
}
</script>
<template>
  <div class="w-72">
    <HChangeUsernameForm @change-username="onChangeUsername" />
    <HDivider class="my-4" />
    <HChangePasswordForm @change-password="onChangePassword" />
  </div>
</template>
