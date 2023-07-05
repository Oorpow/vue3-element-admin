<script setup lang="ts">
import { Apple, House, SwitchButton } from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-dropdown>
      <div class="avatar-container">
        <ElAvatar shape="circle">
          O
        </ElAvatar>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/">
            <el-dropdown-item :icon="House">
              Home
            </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/youlaitech/vue3-element-admin"
          >
            <el-dropdown-item :icon="Apple">Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided :icon="SwitchButton">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>

</style>
