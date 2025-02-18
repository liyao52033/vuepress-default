<template>
    <div>

    </div>
</template>

<script>
export default {

    mounted: function () {
        setTimeout(() => {

         //   this.adjustFooter();

            if (this.$route.path !== "/" && this.$route.path !== '/login') {
                this.adjustArrow();
            }
         
        }, 200);
    },


     watch: {
         $route(to, from) {

            //  this.$nextTick(() => {
            //      this.adjustFooter();
            //  });  
          
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
                     arrow.style.right = "3rem";   
                }  
            } else { 
                if (arrow) {
                    arrow.style.right = "2rem";
                }     
            }
        },

        adjustFooter() {

            let rightMenu = document.querySelector(".have-rightmenu");
            let sidebar = document.querySelector(".sidebar-open");
            let footer = document.querySelector(".footer");

            if ((sidebar && rightMenu) || this.$route.path === '/' ) {
                footer.style.left = "50%";
                footer.style.padding = "3rem 15rem 2.5rem"
            } else if (sidebar && !rightMenu){
                footer.style.left = "58%";
                footer.style.padding = "3rem 17rem 2.5rem"
            } else if (!sidebar && !rightMenu) {
                footer.style.left = "48.5%";
                footer.style.padding = "3rem 17rem 2.5rem"
            } else if (!sidebar && rightMenu) {
                footer.style.left = "40%";
                footer.style.padding = "3rem 17rem 2.5rem"
            }

        }

    }
};
</script>


<style>

</style>