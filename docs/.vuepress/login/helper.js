/**
 * 检查用户授权验证
 * @returns {boolean} 返回是否授权验证通过
 */
export function checkAuth() {
  const auth = storage.getItem('token')
  // 如果授权数据存在并且数据长度不为0，则授权验证通过
  return auth && auth.length > 0;
}

/**
 * 判断当前是否在 Node.js 服务端环境运行
 * @returns {Boolean} true=服务端，false=浏览器客户端
 */
export function isServer() {
  return typeof window === 'undefined' && typeof process !== 'undefined';
}

// 兼容浏览器+Node环境的本地存储工具
export const storage = {
  getItem(key) {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem(key, value) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key)
    }
  },
  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear()
    }
  }
}