<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="auth">
          <div class="auth-banner">
            <img src="./logo.png">
          </div>
            <div class="auth__form"><span class="ui-title-2">CROSSNOTE</span>
            <div class="auth-sub">
              Write once, open everywhere
            </div>
              <form @submit.prevent="onSubmit">
                <div class="form-item" :class="{ errorInput: $v.email.$error }">
                  <input type="email" placeholder="Email" v-model="email" :class="{ error: $v.email.$error }" @change="$v.email.$touch()" />
                  <div class="error" v-if="!$v.email.required">Field is required</div>
                  <div class="error" v-if="!$v.email.email">Email is not correct</div>
                </div>
                <div class="form-item" :class="{ errorInput: $v.password.$error }">
                  <input type="password" placeholder="Password" v-model="password" :class="{ error: $v.password.$error }" @change="$v.password.$touch()" />
                  <div class="error" v-if="!$v.password.required">Password is required.</div>
                  <div class="error" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
                </div>
                <div class="buttons-list">
                  <button class="button button--round button-light" type="submit" :class="{ 'button--disable': $v.$invalid }">Registration</button>
                </div>
                <div class="buttons-list buttons-list--info">
                  <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                  <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                  <p v-else="">{{ submitStatus }}</p> 
                </div>
                <div class="buttons-list buttons-list--info"><span>Need Registration?
                    <router-link to="/login">Enter Here</router-link></span></div>
              </form>
            </div>
        </div>
      </div>    
    </section>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  // Vuelidate
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    // Login button
    onSubmit () {
      // Initialize Vuelodate
      this.$v.$touch()
      // Invalid
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      // Valid
      } else {
        // User
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$store.dispatch('loginUser', user)
            // Message
            let message = {
              context: 'success',
              title: 'You are logged!'
            }
            this.$store.dispatch('getMessage', message)
            // this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .auth 
    height 620px
    width 539px
    border 1px solid #e9e9e9
    border-radius 16px
    box-shadow 0 0 3px 2px rgba(0, 0, 0, 0.07)
    background-color #fff
    margin 0 auto
    text-align center
  
  .auth-banner 
    margin-top 30px
  
  .auth-sub 
    margin-top -5px
    margin-bottom 30px
    font-size 16px

  .form-item 
    .error
      display none
      margin-bottom 10px
      font-size 13.4px
      color #fc5c65 
    &.errorInput
      .error
        display block
  
  input
    width 75%;
    margin 0 auto
    margin-bottom 25px
    &.error
      border-color #fc5c65
      animation shake .3s

  .buttons-list
    margin-bottom 20px
    &.buttons-list--info
      text-align center
      &:last-child
        margin-bottom 0
  a
    color #444ce0
  
  .button
    width 74%
    background #313131
</style>
