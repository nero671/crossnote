<template>
<div class="body">
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <router-link class="header-logo" to="/">CROSSNOTE</router-link>
            <div class="button-burger" @click="menuShow = !menuShow" :class="{ active: menuShow }"><span class="line line-1"></span><span class="line line-2"></span><span class="line line-3"></span></div>
            <div class="navbar-list__wrapper" :class="{ active: menuShow }">
              <ul class="navbar-list">
                <li class="navbar-item" v-for="link in links" :key="link.title" @click="menuShow = false">
                  <router-link class="navbar-link" :to="link.url">{{ link.title }}</router-link>
                </li>
                <li class="navbar-item" v-if="checkUser" @click="logout">
                  <span class="navbar-link">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view :class="{blur: loading}"></router-view>
    <div class="preloader__wrapper" v-if="loading">
      <div class="preloader1"></div>
      <div class="preloader2"></div>
      <div class="preloader3"></div>
    </div>
    <div class="ui-message" v-if="messageShow" :class="[{ 'ui-message--success': messageContext === 'success' }, { 'ui-message--danger': messageContext === 'error' }]"><span class="message-title">{{ messageTitle }}</span></div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Library', url: '/library'}
        ]
      }
      return [
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    },
    // Show loading status
    loading () {
      return this.$store.getters.loading
    },
    messageShow () {
      return this.$store.getters.message.show
    },
    messageTitle () {
      return this.$store.getters.message.title
    },
    messageContext () {
      return this.$store.getters.message.context
    }
  }
}
</script>

<style>
.body {
  background: url('./assets/bg.jpg');
}
.navbar {
  background: inherit;
}
</style>
