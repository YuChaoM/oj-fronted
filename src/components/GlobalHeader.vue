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
        <a-space size="large">
          <a-dropdown trigger="hover">
            <template
              v-if="loginUser && loginUser.userRole !== accessEnum.NOT_LOGIN"
            >
              <template v-if="loginUser.userAvatar">
                <a-avatar shape="circle" :image-url="loginUser.userAvatar">
                </a-avatar>
              </template>
              <template v-else>
                <a-avatar shape="circle">
                  <IconUser />
                </a-avatar>
              </template>
            </template>
            <template v-else>
              <a-avatar shape="circle" :style="{ backgroundColor: '#3370ff' }">
                <IconUser />
              </a-avatar>
            </template>
            <template #content>
              <template v-if="loginUser.userRole !== accessEnum.NOT_LOGIN">
                <!--                <a-doption>-->
                <!--                  <template #icon>-->
                <!--                    <icon-idcard />-->
                <!--                  </template>-->
                <!--                  <template #default>-->
                <!--                    <a-anchor-link href="/user/info">个人信息</a-anchor-link>-->
                <!--                  </template>-->
                <!--                </a-doption>-->
                <a-doption>
                  <template #icon>
                    <icon-poweroff />
                  </template>
                  <template #default>
                    <a-anchor-link @click="logout">退出登录</a-anchor-link>
                  </template>
                </a-doption>
              </template>
              <template v-else>
                <a-doption>
                  <template #icon>
                    <icon-user />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/login">登录</a-anchor-link>
                  </template>
                </a-doption>
                <a-doption>
                  <template #icon>
                    <icon-user-add />
                  </template>
                  <template #default>
                    <a-anchor-link href="/user/register">注册</a-anchor-link>
                  </template>
                </a-doption>
              </template>
            </template>
          </a-dropdown>
        </a-space>
        <!--        <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>-->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routers";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { LoginUserVO, UserControllerService } from "../../generated";
import accessEnum from "@/access/accessEnum";

const router = useRouter();

// 默认主页
const selectKeys = ref(["/"]);
// 路由跳转后，修改选中的菜单项 高亮
router.afterEach((to, from, failure) => {
  selectKeys.value = [to.path];
});
// 获取存储用户的信息
const store = useStore();
// console.log(store.state.user.loginUser);

// 获取登录用户信息
const loginUser: LoginUserVO = computed(
  () => store.state.user?.loginUser
) as LoginUserVO;

// 用户注销
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  location.reload();
};

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
