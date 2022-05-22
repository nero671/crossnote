// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
      // Configuration
      let config = {
        apiKey: "AIzaSyCW3L7WCz34WcnTaJw2ss0qVYI2RSG2MLg",
        authDomain: "crossnoteproject.firebaseapp.com",
        databaseURL: "https://crossnoteproject.firebaseio.com",
        projectId: "crossnoteproject",
        storageBucket: "crossnoteproject.appspot.com",
        messagingSenderId: "1022668133213",
        appId: "1:1022668133213:web:ce82661ec88ed22c"
      }
      // Firebase Initialize
      firebase.initializeApp(config)

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // Check Logged
          this.$store.dispatch('loggedUser', user)
          // Loading All Tasks
          this.$store.dispatch('loadTasks')
        }
      })
  }
})
