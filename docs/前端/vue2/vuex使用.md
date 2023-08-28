---
title: vuex使用
date: 2023/8/25 11:13:21
author: 华总
autoSort: 900
tags: 
   - vue2
   - element-ui
---

::: tip 总体流程

store => mutation => action => 组件内this.$store.dispatch()调用(非async异步)

:::

store

```js
 const getters = {
  token: state => state.user.token,
  userAvatar: state => state.user.userAvatar,
  userProfile: state => state.user.userProfile
}
```

mutation

```js
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_PROFILE: (state, userProfile) => {
    state.userProfile = userProfile
  },
  SET_AVATAR: (state, userAvatar) => {
    state.userAvatar = userAvatar
  },
}

```

action

```js
const action = {
    updateInfo({ commit, state }, data) {
    const { profile, avatar } = data
    return new Promise((resolve, reject) => {
      changeProfile({
        userProfile: profile,
        userAvatar: avatar
      }, state.token).then(res => {
        const { userProfile, userAvatar } = res.data
        if (res.code !== 0) {
          reject('请求参数错误')
        }
        commit('SET_PROFILE', userProfile)
        commit('SET_AVATAR', userAvatar)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}
```

组件内使用

```javascript
updateUserInfo() {
  this.$store.dispatch('user/updateInfo', this.form).then(() => {
    this.$message({
      message: '修改成功',
      type: 'success',
      duration: 5 * 1000
    })
    this.dialogFormVisible = false
    this.flag = !this.flag
    this.form.profile = ''
  })
}
```



<div style="float: right;font-size: .9em;line-height: 30px;">
  <span style="font-weight: 500;color: #4e6e8e;">上次更新: </span> 
  <span style="font-weight: 400; color: #767676;">{{ $page.frontmatter.date }}   </span>
  <div>
     <span style="font-weight: 500;color: #4e6e8e;">By: </span> 
     <span style="font-weight: 400; color: #767676;">{{ $page.frontmatter.author }}   </span>
  </div>
</div>


