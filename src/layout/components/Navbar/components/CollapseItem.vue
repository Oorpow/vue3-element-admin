<script setup lang="ts">
import { useAppStore } from "@/stores/modules/app";
import { Expand, Fold } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { sidebar } = storeToRefs(appStore);

function toggleSidebarStatus() {
  appStore.toggleSidebar();
}
</script>

<template>
  <div class="cursor-pointer" @click="toggleSidebarStatus">
    <ElIcon>
      <template v-if="sidebar.opened">
        <Fold />
      </template>
      <template v-else>
        <Expand />
      </template>
    </ElIcon>
  </div>
</template>

<style scoped></style>
