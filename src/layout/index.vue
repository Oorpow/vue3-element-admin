<script setup lang="ts">
import Sidebar from "./components/Sidebar/index.vue";
import Navbar from "./components/Navbar/index.vue";
import AppMain from "./components/AppMain.vue";
</script>

<template>
  <div class="w-full flex">
    <!-- 侧边栏 -->
    <Sidebar />
    <div class="flex-1">
      <div class="p-4">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
