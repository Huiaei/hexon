<script setup lang="ts">
import { InputHTMLAttributes, ref, useSlots } from "vue"
import { computed } from "vue"
import { createClassNames } from "~/utils/create-classnames"
import { useTheme } from "@/ui/theme"
import { HIcon, HIconName } from "@/ui/icon"

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    clearable?: boolean
    type?: "primary" | "secondary"
    error?: string
    attrType?: InputHTMLAttributes["type"]
  }>(),
  { placeholder: "", clearable: false, type: "primary" }
)
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>()

//#region logic
const inputRef = ref<HTMLElement | null>(null)
const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()
defineExpose({
  focus,
  blur,
})
const requestChange = (value: string) => emit("update:modelValue", value)
const onInput = (e: Event) =>
  requestChange((e.target as HTMLInputElement)?.value)
const onClear = () => requestChange("")
//#endregion

//#region display
const theme = useTheme("Input")
const showSuffix = computed(() => props.clearable && props.modelValue)
const { classNames } = createClassNames("h-input")
const styleVars = computed(() => {
  const o = {
    color: theme.value.textColorPrimary,
    placeholder: theme.value.textColorSecondary,
    outline: theme.value.colorTransparent,
  }
  if (props.type === "primary") {
    return { ...o, backgroundColor: theme.value.backgroundColorPrimary }
  } else {
    return {
      ...o,
      outline: theme.value.colorTransparent,
      backgroundColor: theme.value.backgroundColorTertiary,
    }
  }
})
//#endregion
const slots = useSlots()
</script>
<template>
  <div class="w-full">
    <label
      class="text-sm h-8 border-none rounded-2xl px-3 py-0 flex cursor-text items-center w-full"
      :class="classNames"
      :style="{ outline: `1px solid ${styleVars.outline}` }"
    >
      <div class="prefix mr-1" v-if="slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <!-- input min-w-0 make input can shrink in flexbox -->
      <input
        class="border-none outline-none flex-1 flex-shrink rounded-none leading-full bg-transparent mx-1 min-w-0"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :type="props.attrType"
        @input="onInput"
        ref="inputRef"
      />
      <div class="suffix ml-1" v-if="showSuffix" @click="onClear">
        <HIcon :name="HIconName.Cancel" />
      </div>
      <div
        class="suffix"
        :class="{ 'ml-1': !showSuffix, 'ml-2': showSuffix }"
        v-if="slots.suffix"
      >
        <slot name="suffix"></slot>
      </div>
    </label>
    <div
      class="h-input-hint w-full"
      :style="{ color: theme.colorError }"
      v-if="props.error !== void 0"
    >
      {{ error }}&nbsp;
    </div>
  </div>
</template>
<style scoped lang="less">
@import "~/styles/mixins.less";
.h-input {
  color: v-bind("styleVars.color");
  background-color: v-bind("styleVars.backgroundColor");
  .prefix,
  .suffix {
    @apply flex items-center h-full text-sm;
  }
  .suffix > * {
    @apply cursor-pointer;
  }

  input {
    &::placeholder {
      transform: translateY(-1px);
      @apply text-sm;
      color: v-bind("styleVars.placeholder");
    }
  }
}
.h-input-hint {
  @apply pl-5 my-1 text-xs;
  .ellipsis(1);
}
</style>
