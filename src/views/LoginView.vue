<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import type { LocationQueryValue } from "vue-router";
import { getCaptcha } from "@/request/api";
import { useUserStore } from "@/stores/modules/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const loginFormRef = ref<FormInstance>();
/** 验证码图片 */
const codeImgSrc = ref();
const loading = ref(false);

/** 用户登录所需表单信息 */
const userLoginForm = ref<ApiUser.IUserLoginFormDto>({
  username: "admin",
  password: "123456",
  verifyCode: "",
  verifyCodeKey: "",
});

/** 用户登录表单的校验规则 */
const loginFormRules = ref<FormRules<LoginView.IloginFormRule>>({
  username: [{ required: true, message: "Please input username", trigger: "blur" }],
  password: [{ required: true, validator: passwordValidator, trigger: "blur" }],
});

/** 自定义密码校验函数 */
function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 6) callback(new Error("password length cannot less than 6 degits"));
  else callback();
}

/** 用户登录 */
function loginSubmit() {
  loginFormRef.value!.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(userLoginForm.value)
        .then(() => {
          const query = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          router.push({
            path: redirect,
          });
        })
        .catch(() => {
          setCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

/** 获取验证码base64 */
function setCaptcha() {
  getCaptcha().then((res) => {
    userLoginForm.value.verifyCodeKey = res.data.verifyCodeKey;
    codeImgSrc.value = res.data.verifyCodeBase64;
  });
}

onMounted(() => {
  setCaptcha();
});
</script>

<template>
  <div class="bg-blueGray w-full h-100vh">
    <ElCard class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] min-w-[400px]">
      <div class="text-center py-1">
        <h1 class="text-gray">Oorpow Admin System</h1>
      </div>
      <ElForm ref="loginFormRef" class="mt-8" :model="userLoginForm" :rules="loginFormRules">
        <ElFormItem prop="username">
          <ElInput v-model="userLoginForm.username" placeholder="username" size="large" />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput v-model="userLoginForm.password" type="password" placeholder="password" size="large" />
        </ElFormItem>
        <ElFormItem>
          <div class="flex flex-1 gap-1">
            <ElInput v-model="userLoginForm.verifyCode" placeholder="verify code" size="large" />
            <img :src="codeImgSrc" width="300" />
          </div>
        </ElFormItem>
        <ElFormItem>
          <ElButton class="w-full" type="primary" size="large" :loading="loading" @click="loginSubmit">
            Submit
          </ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>
