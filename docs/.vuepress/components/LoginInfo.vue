<template>
    <div>

    </div>
</template>

<script>
import { checkAuth } from '../login/helper';

export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted() {
        let { isLogin, List } = this.$themeConfig.loginInfo
      //     if (!checkAuth() && this.$route.path !== '/login' && this.$route.path !== '/' && isLogin) { //全局拦截
      //     this.$router.push('/login')
      // }
        if (List.includes(this.$route.path) && !checkAuth() && isLogin) {   // 加密文章列表拦截
             this.$router.push('/login')
         }
    },
};
</script>