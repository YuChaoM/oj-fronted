<template>
  <div class="globalHeader">
    <a-row align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :default-selected-keys="selectKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/oj-logo.jpg" />
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import user from "@/store/user";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();

// 默认主页
const selectKeys = ref(["/"]);
// 高亮
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});
const store = useStore();
// console.log(store.state.user.loginUser);

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "管理员",
//     useRole: "admin",
//   });
// }, 3000);

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false; //不显示
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  height: 48px;
}
</style>
