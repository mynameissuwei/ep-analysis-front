const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  preventId: (state) => state.user.preventId,
  userId: (state) => state.user.userId,
  nickName: (state) => state.user.nickName,
  username: (state) => state.user.username,
  hasTenant: (state) => state.user.hasTenant,
  tenantId: (state) => state.user.tenantId,
  permission_routes: (state) => state.permission.permission_routes,
  routeInfo: (state) => state.user.routeInfo,
  buttonLoading: (state) => state.loading.buttonLoading,
  isOperation: (state) => state.user.isOperation,
};
export default getters;
