<script setup lang="ts">
import { computed } from "vue";
import { RouteRecordRaw } from "vue-router";

type Props = {
  item: RouteRecordRaw;
  basePath: string;
};

const props = defineProps<Props>();

const formatPrimaryRoute = (parentPath: string) => {
  if (parentPath === "/") return parentPath;
  return parentPath + "/";
};
</script>

<template>
  <div>
    <!-- NOTE: 存在子路由的情况 -->
    <template v-if="item.children">
      <ElSubMenu :index="item.path">
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
        <!-- NOTE: 二级路由 -->
        <template v-for="childRoute in item.children" :key="childRoute.path">
          <!-- 只有一层子路由 -->
          <el-menu-item-group>
            <el-menu-item :index="formatPrimaryRoute(item.path) + childRoute.path">{{
              childRoute.meta?.title
            }}</el-menu-item>
          </el-menu-item-group>
          <!-- 存在三级或更多级路由 -->
          <template v-if="childRoute.children">
            <SidebarItem v-for="gd in childRoute.children" :key="gd.path" :item="gd" :base-path="gd.path" />
          </template>
        </template>
      </ElSubMenu>
    </template>
    <!-- NOTE: 不存在子路由 -->
    <template v-else>
      <ElMenuItem>
        <span>{{ item.meta?.title }}</span>
      </ElMenuItem>
    </template>
  </div>
</template>
