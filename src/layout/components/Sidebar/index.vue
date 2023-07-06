<script setup lang="ts">
import { usePermissionStore } from "@/stores/modules/permission";
import SidebarItem from "./sidebar-item.vue";

const permissionStore = usePermissionStore();
const routeList = permissionStore.routes.filter((route) => route.path !== "/login");
</script>

<template>
  <div class="sidebar-container">
    <ElScrollbar height="98vh">
      <ElMenu :collapse="false" :unique-opened="false" :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path" />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  height: calc(100% - 50px);
}
</style>
