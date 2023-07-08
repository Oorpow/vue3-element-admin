<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";
import SidebarItem from "./sidebar-item.vue";
import { usePermissionStore } from "@/stores/modules/permission";
import variables from "@/styles/variables.module.scss";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
const { sidebar } = storeToRefs(appStore);

const routeList = permissionStore.routes.filter((route) => route.path !== "/login");
</script>

<template>
  <div class="sidebar-container">
    <ElScrollbar height="100vh">
      <ElMenu
        class="el-menu-vertical-demo"
        unique-opened
        router
        :collapse="!sidebar.opened"
        :active-text-color="variables.menuActiveText"
        :text-color="variables.menuText"
        :background-color="variables.menuBg"
      >
        <SidebarItem v-for="route in routeList" :key="route.path" :item="route" :base-path="route.path" />
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  height: calc(100% - 50px);
  background-color: $menuBg;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
