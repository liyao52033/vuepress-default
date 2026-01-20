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
        // if (List.includes(this.$route.path) && isLogin) {   // 加密文章列表拦截
        //      this.$router.push('/login')
        //  }
    },
};
</script>