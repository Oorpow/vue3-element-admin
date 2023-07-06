<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.getInfo();
});

console.log(router.getRoutes());
</script>

<template>
  <div>dashboard</div>
</template>
