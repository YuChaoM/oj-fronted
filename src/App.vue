<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
      <!--      <UserLayout />-->
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";

const route = useRoute();

// 全局初始化函数，有全局单次调用的代码，都可以写到这里
const doInit = () => {
  console.log("he1lo欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});
</script>
