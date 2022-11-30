<template>
<!--    <html lang="en">-->
<!--        <head>-->
<!--          <meta name="google-signin-client_id" content="751477675292-ng83mgnceanrv2fe6s7k1m9253hsd9j0.apps.googleusercontent.com">-->
<!--        </head>-->
<!--        <body>-->
<!--        <script src="https://apis.google.com/js/platform.js" async defer></script>-->
<!--        <div class="g-signin2" data-onsuccess="onSignIn">test</div>-->
<!--    </body>-->
<!--  </html>-->
  <layout :nav="false">
    <form action="POST" id="login">
      <label class="title">Login</label>
      <p style="color: red" v-if="showWarning">False Credentials</p>
      <TInput class="inputs" label="Email" type="email"
              v-model="email"
              @input="email = $event.target.value"
              :success="emailSuccess"
      >
      </TInput>
      <TInput label="password" type="password"
              class="inputs"
              v-model="password"
              @input="password = $event.target.value"
              :success="passwordSuccess"
      ></TInput>
      <TButton style="margin-top: 20px" :dark="true" @click="login" :disabled="disabled" :loading="loading">Submit</TButton>
<!--      <GoogleLogin :callback="callback()"/>-->
    </form>
  </layout>
<!--  <div class="g-signin2" data-onsuccess="onSignIn">test</div>-->


</template>

<script>

import TInput from "../components/TInput.vue";
import Layout from "../components/Layout.vue";
import TButton from "../components/TButton.vue";
import Login from "../graphql/mutations/Login";
export default {
  name: "Login",
  components: {TButton, Layout, TInput},
  apollo:{
    $client: 'backend'
  },
  data(){
    return{
      email: '',
      password: '',
      showWarning: false,
      loading: false
    }
  },
  computed:{
    emailSuccess(){
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
      {
        return true
      }else{
        return false
      }
    },
    passwordSuccess(){
      if( this.password.length >= 3)
      {
        return true
      }else{
        return false
      }
    },
    disabled(){
      if (this.emailSuccess && this.passwordSuccess){
        return false
      }else return true
    }
  },
  methods:{
    // callback (response) {
    //   // This callback will be triggered when the user selects or login to
    //   // his Google account from the popup
    //   console.log("Handle the response", response)
    // },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    login(){
      if (this.disabled){
        return
      }
      this.loading = true

      this.$apollo.mutate({
        mutation: Login,
        variables: {
          email: this.email,
          password: this.password,
        }
      }).then((result) => {
          this.$root.user = result.data.login
          localStorage.setItem('token', result.data.login.access_token);
          localStorage.setItem('user', JSON.stringify(result.data.login) );
        this.loading = false
        this.$router.push('/')
      }).catch((err) => {
        this.showWarning = true
        this.loading = false
        console.log("err: " ,err)
      })
    }
  }
}
</script>

<style scoped lang="scss">

*{
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
form{
  border: 2px solid var(--primary);
  border-radius: 7px;
  min-width: fit-content;
  width: 35vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: auto;
  padding: 16px 16px 36px 16px;

  .inputs{
    width: 260px;
  }

  .title{
    position: relative;
    top: -33px;
    left: -60px;
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
  }
}

</style>