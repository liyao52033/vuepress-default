<template>
    <div>

    </div>
</template>

<script>
import { checkAuth, STORAGE_KEY } from '../login/helper';

const List = ['/pages/bbd1d8/', '/pages/2fcd29/']  //加密文章列表

export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted() {
        let { isLogin } = this.$themeConfig.loginInfo
      //     if (!checkAuth() && this.$route.path !== '/login' && this.$route.path !== '/' && isLogin) { //全局拦截
      //     this.$router.push('/login')
      // }
        if (List.includes(this.$route.path) && !checkAuth() && isLogin) {   // 加密文章列表拦截
             this.$router.push('/login')
         }
    },
};
</script>