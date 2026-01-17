/**
 * 检查用户授权验证
 * @returns {boolean} 返回是否授权验证通过
 */
export function checkAuth() {
  const auth = localStorage.getItem('token')
  // 如果授权数据存在并且数据长度不为0，则授权验证通过
  return auth && auth.length > 0;
}
