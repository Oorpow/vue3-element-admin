<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'
import { useFullscreen } from '@vueuse/core'

const { toggle } = useFullscreen()
</script>

<template>
  <div>
    <ElIcon @click="toggle">
      <FullScreen />
    </ElIcon>
  </div>
</template>

<style scoped>

</style>
