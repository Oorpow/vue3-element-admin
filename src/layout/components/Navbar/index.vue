<script setup lang="ts">
import FullScreenItem from "./components/FullScreenItem.vue";
import LangSelectItem from "./components/LangSelectItem.vue";
import UserProfileItem from "./components/UserProfileItem.vue";
import CollapseItem from "./components/CollapseItem.vue";
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <div class="flex justify-between">
      <!-- 侧边栏收缩 -->
      <CollapseItem />
      <!-- 右侧导航 -->
      <div class="flex gap-3 items-center">
        <!-- 全屏 -->
        <FullScreenItem />
        <!-- 中英文切换 -->
        <LangSelectItem />
        <!-- 用户信息 -->
        <UserProfileItem />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
