import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import accessEnum from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 全局的路由拦截
// to 要去的路由 from原始的路由 next 下一步是否要跳转
router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store.state.user.loginUser);

  let loginUser = store.state.user.loginUser;
  console.log("!loginUser = ", !loginUser, !loginUser.userRole);
  // 如果没登录过 自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加await是为了等用户登录成功之后再在执行后续代码
    await store.dispatch("user/getLoginUser"); // 会调用user.ts中的getLoginUser函数，去获取登陆状态
    loginUser = store.state.user.loginUser;
    console.log("登录", loginUser.userRole);
  }

  // 页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  console.log("页面需要的权限", needAccess);
  // 要跳转的页面必须登陆
  if (needAccess !== accessEnum.NOT_LOGIN) {
    // 如果没有登录，跳转到登录页
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`user/login?redirect=${to.fullPath}`); // 如果登录后要回到原来的页面，可以从这里获取
      return;
    }
    console.log("信息", loginUser);
    // 如果已经登录，权限不足跳转到无权限页
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next(); // 有权限就跳转到下一个页面
});
