<template>
    <div>

    </div>
</template>

<script>
export default {

    mounted: function () {
        setTimeout(() => {
            if (this.$route.path !== "/" && this.$route.path !== '/login') {
                this.adjustArrow();
            }
        }, 200);
    },


     watch: {
        $route(to, from) {
            // 如果页面是非首页，# 号也会触发路由变化，这里要排除掉
            if (
                to.path !== "/" &&
                to.path !== from.path &&
                this.$themeConfig.blogInfo
            ) {
                this.$nextTick(() => {
                    this.adjustArrow();
                });  
            }
        },
    },
    methods: {
        adjustArrow() {
            let rightbar = document.querySelector(".right-menu-wrapper");
            let arrow = document.querySelector(".page-nav-centre-next");
           
            if (rightbar) {
                if (arrow) {
                     arrow.style.right = "16rem";   
                }  
            } else { 
                if (arrow) {
                     arrow.style.right = "2rem";
                 }
                   
                }
        },

    }
};
</script>


<style>

</style>