<template>
    <div>
        
    </div>
</template>

<script>
import { checkAuth, STORAGE_KEY } from '../login/helper';
export default {
    data() {
        return {
            
        };
    },
    methods: {
       
    },
    mounted() {
        let { isLogin } = this.$themeConfig.loginInfo
        if (!checkAuth() && this.$route.path !== '/login' && this.$route.path !== '/' && isLogin) {
            this.$router.push('/login')
        }
    },
};
</script>