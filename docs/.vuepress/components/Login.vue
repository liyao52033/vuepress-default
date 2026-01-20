<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-header">
        <h2>欢迎登录</h2>
        <Date />
      </div>
      <div class="form-row">
        <div class="input-group">
          <span class="input-icon">👤</span>
          <input type="text" name="username" autocomplete="off" class="form-control" v-model="username" placeholder="请输入账号">
        </div>
      </div>
      <div class="form-row">
        <div class="input-group">
          <span class="input-icon">🔒</span>
          <input type="password" name="password" autocomplete="off" class="form-control" v-model="password" placeholder="请输入密码">
        </div>
      </div>
      <div class="btn-row">
        <button class="btn" @click="login" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </div>

      <!---
        <div style="margin-top: 20px;">
          <div style="text-align: center; margin-bottom: 15px;">
            <span style="color: #666; font-size: 14px;">其他登录方式</span>
          </div>
          <div style="display: flex; justify-content: center; gap: 20px;">
            <button id="githubBtn" @click="loginWithSocial('github')" style="cursor: pointer;border: none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </button>
            <button id="googleBtn" @click="loginWithSocial('google')" style="cursor: pointer;border: none;background: transparent;">
              <svg width="20" height="20" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid">
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4" />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853" />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05" />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335" />
              </svg>
            </button>
          </div>  
        </div>  
      --->


    </div>

    <!-- 添加提示框组件 -->
    <transition name="alert">
      <div v-show="alert.show" class="custom-alert" :class="alert.type">
        <div class="alert-content">
          <span class="alert-icon">{{ alert.type === 'success' ? '✓' : '!' }}</span>
          {{ alert.message }}
        </div>
      </div>
    </transition>

    <!-- 添加模态框组件 -->
    <transition name="modal">
      <div v-if="modal.show" class="modal-overlay">
        <div class="modal-container">
          <div class="modal-content" :class="modal.type">
            <div class="modal-icon">{{ modal.type === 'success' ? '✓' : '!' }}</div>
            <div class="modal-message">{{ modal.message }}</div>
            <button class="modal-button" @click="closeModal">确 定</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      alert: {
        show: false,
        message: '',
        type: 'success'
      },
      modal: {
        show: false,
        message: '',
        type: 'error'
      }
    }
  },

  // mounted() {
  //   // 页面加载时提取token
  //   const accessToken = this.getHashParam('access_token');

  //   // 拿到token后：存入localStorage + 跳转首页/处理业务
  //   if (accessToken) {
  //     localStorage.setItem('token', accessToken);
  //     const redirect = localStorage.getItem('redirect') || '/'
  //     history.replaceState(null, '', window.location.pathname); // 清除URL中的哈希参数
  //     this.$router.push(redirect)
  //     localStorage.removeItem('redirect')
  //   }
  // },

  methods: {
    /**
     * 从URL的哈希(#)片段中获取指定参数的值
     * @param {String} name 要获取的参数名
     * @returns {String|null} 参数值，没有则返回null
     */
    getHashParam(name) {
      const hash = window.location.hash.slice(1); // 去掉#号，得到 access_token=xxx&expires_in=7200
      const paramArr = hash.split('&'); // 按&分割成数组 ["access_token=xxx", "expires_in=7200"]
      const params = {};

      // 遍历转成键值对对象
      paramArr.forEach(item => {
        const [key, value] = item.split('=');
        params[key] = value;
      });
      // 返回指定参数值
      return params[name] || null;
    },

    // 显示提示框
    showAlert(message, type = 'error') {
      this.alert.message = message
      this.alert.type = type
      this.alert.show = true

      // 3秒后自动关闭
      setTimeout(() => {
        this.alert.show = false
      }, 3000)
    },

    // 显示模态框
    showModal(message, type = 'error') {
      this.modal.message = message
      this.modal.type = type
      this.modal.show = true
    },

    // 关闭模态框
    closeModal() {
      this.modal.show = false
    },

    // 登录
    async login() {
      this.isLoading = true;
      try {
        const res = await fetch('https://ssl.xiaoying.org.cn/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email: this.username, password: this.password })
        });
        const data = await res.json();

        if (res.ok && data.session) {
          const redirect = localStorage.getItem('redirect') || '/'
          this.$router.push(redirect)
          localStorage.removeItem('redirect')

        } else {
          this.showModal(data.error || '登录失败，账号或密码错误')
        }
      } catch (error) {
        this.showModal('登录错误:', error);
      } finally {
        this.isLoading = false;
      }

    },

    async loginWithSocial(provider) {
      try {
        const res = await fetch('https://ssl.xiaoying.org.cn/socialLogin', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider
          })
        });
        const data = await res.json();

        if (res.ok && data.url) {
          // 跳转到第三方登录授权页面
          window.location.href = data.url;
        } else {
          this.showAlert(data.error || '登录失败，请重试');
        }
      } catch (error) {
        this.showAlert('网络错误，请检查连接');
        console.error(`${provider}登录错误:`, error);
      }
    },

  }
}
</script>

<style lang="stylus" scoped>

.login-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9)),
            url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
  
.login-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  padding: 3rem 4rem;
  border-radius: 1.5rem;
  animation: fadeIn 0.6s ease-out;
  
  // 添加微光效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
}
  
  .login-header {
	text-align: center;
	margin-bottom: 3rem;  // 增加底部间距
	
	h2 {
	  color: #fff;
	  font-size: 2rem;  // 增大标题字号
	  margin-bottom: 1rem;
	}
  }
  
  .form-row {
	margin-bottom: 2rem;  // 增加表单行间距
	width: 100%; 
  }
  
  .input-group {
	position: relative;
	width: 100%; 
    display: flex; 
	
	.input-icon {
		position: absolute;
		left: 0.3rem;
		top: 50%;
		transform: translateY(-50%);
		color: #60C084;
		font-size: 1.2rem;
		z-index: 1;
		pointer-events: none;
	}
  }

  // 输入框样式优化
.form-control {
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.6rem;
  color: white;
  font-size: 1.1rem;
  height: 3.2rem;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(96, 192, 132, 0.5);
    box-shadow: 
      0 0 0 4px rgba(96, 192, 132, 0.1),
      inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
  
  .btn-row {
	margin-top: 3rem;  // 增加按钮上方间距
	text-align: center;
  }
  
  // 按钮样式优化
.btn {
  width: 100%;
  height: 3.2rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(45deg, #60C084, #4fa36f);
  color: white;
  border: none;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(96, 192, 132, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(96, 192, 132, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  
  .icon-user:before {
	content: '\e7ae';
	font-family: 'iconfont';
  }
  
  .icon-lock:before {
	content: '\e7c9';
	font-family: 'iconfont';
  }

  .custom-alert {
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);
	padding: 12px 24px;
	border-radius: 8px;
	color: white;
	font-size: 14px;
	z-index: 1000;
	display: flex;
	align-items: center;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	
	&.success {
		background: linear-gradient(45deg, #60C084, #4fa36f);
	}
	
	&.error {
		background: linear-gradient(45deg, #ff4757, #ff6b81);
	}

	.alert-content {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.alert-icon {
		font-size: 16px;
		font-weight: bold;
	}
}

// 淡入淡出动画
.alert-enter-active, .alert-leave-active {
  transition: all 0.3s ease;
}
.alert-enter, .alert-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}


// 给容器添加视距
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  perspective: 1000px;  // 添加视距
}

.modal-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform-origin: center center;
  transform-style: preserve-3d;  // 保持3D效果
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  min-width: 400px;
  
  &.success .modal-icon {
    background: linear-gradient(45deg, #60C084, #4fa36f);
  }
  
  &.error .modal-icon {
    background: linear-gradient(45deg, #ff4757, #ff6b81);
  }
}

.modal-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.modal-message {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.modal-button {
  background: linear-gradient(45deg, #60C084, #4fa36f);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(96, 192, 132, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 淡入淡出动画
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  .modal-container {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.modal-enter, .modal-leave-to {
  opacity: 0;
  .modal-container {
    transform: translateZ(-100px) scale(0.7);  // 添加Z轴位移
  }
}

.modal-enter-to, .modal-leave {
  opacity: 1;
  .modal-container {
    transform: translateZ(0) scale(1);  // 恢复到原始位置
  }
}

  </style>