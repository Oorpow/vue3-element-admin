import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const sidebarStatus = useStorage("sidebarStatus", "opened");
  const sidebar = ref({
    opened: sidebarStatus.value !== "closed",
  });

  function toggleSidebar() {
    sidebar.value.opened = !sidebar.value.opened;
    sidebar.value.opened ? (sidebarStatus.value = "opened") : (sidebarStatus.value = "closed");
  }

  function closeSidebar() {
    sidebar.value.opened = false;
    sidebarStatus.value = "closed";
  }

  function openSidebar() {
    sidebar.value.opened = true;
    sidebarStatus.value = "opened";
  }

  return {
    sidebar,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  };
});
