<template>
  <div id="userLoginView">
    <!--    <h2 style="margin-bottom: 16px">用户登录</h2>-->
    <h2 style="margin-bottom: 32px">用户名:yuchao 密码：12345678</h2>
    <a-form
      style="max-width: 450px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <!--      <a-form-item>-->
      <!--        <a-button type="primary" html-type="submit" style="width: 120px">-->
      <!--          登录-->
      <!--        </a-button>-->
      <!--      </a-form-item>-->
    </a-form>
    <a-space wrap>
      <a-button size="large" type="secondary" status="success" @click="toIndex">
        首 页
      </a-button>
      <a-button
        style="width: 120px; margin: 16px"
        size="large"
        type="primary"
        html-type="submit"
        @click="handleSubmit"
      >
        登 录
      </a-button>
      <a-button
        size="large"
        type="outline"
        status="success"
        @click="toRegister"
      >
        注 册
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form); // 调用登陆接口
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/", // 简单一点直接到首页
      replace: true, //不能回退
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};

/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: `/`,
  });
};

const toRegister = () => {
  router.push({
    path: `/user/register`,
  });
};
</script>
