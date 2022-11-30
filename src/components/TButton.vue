<template>
<div class="body" :class="{disabled: disabled, dark: dark && !disabled, light: light && !disabled}">
    <slot v-if="!loading">
    </slot>
  <looping-rhombuses-spinner
      v-else
      :animation-duration="2500"
      :rhombus-size="15"
      color="hsla(160, 100%, 37%, 1)"
  />
</div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners'

export default {
  name: "TButton",
  components: {
    LoopingRhombusesSpinner
  },
  props: {
    dark: {
      default: false,
      type: Boolean
    },
    light: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">
.body{
  height: 40px;
  min-height: fit-content;
  width: 120px;
  min-width: fit-content;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;


    &.light{
        background: var(--color-text-green);
        color: var(--color-background);
        cursor: pointer;
     }
    &.dark{
      background: var(--primary);
      color: var(--color-text-green);
      cursor: pointer;
    }
    &.disabled{
      background: var(--color-background-mute);
      color: var(--primary);
    }
}
</style>