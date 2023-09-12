import accessEnum from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = accessEnum.NOT_LOGIN) => {
  // 获取当前登录用户的权限，（如果没有表示为登录）
  const loginUserAccess = loginUser?.userRole ?? accessEnum.NOT_LOGIN;

  if (needAccess === accessEnum.NOT_LOGIN) {
    return true;
  }
  // 要求登录才能访问
  if (needAccess === accessEnum.USER) {
    // 当前没有登录
    if (loginUserAccess === accessEnum.NOT_LOGIN) {
      return false;
    }
  }
  // 要求是管理员才能范问
  if (needAccess === accessEnum.ADMIN) {
    if (loginUserAccess !== accessEnum.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
