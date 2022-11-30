<template>
  <layout :nav="false">
    <form action="POST" id="login">
      <label class="title">Sign-Up</label>
     <span class="info" v-if="submitEmail">Email already in use</span>
      <TInput class="inputs" label="Email" type="email"
              v-model="email"
              @input="email = $event.target.value"
              @change="emailAvailable"
              :success="!submitEmail && emailSuccess"
      >
      </TInput>
      <span class="info" v-if="submitUsername">Username already in use</span>
      <template v-if="username.length">
        <span class="info" v-if="!usernameSuccess" >Username is too short</span>
      </template>
      <TInput label="Username" type="username"
              class="inputs"
              v-model="username"
              @input="username = $event.target.value"
              @change="usernameAvailable"
              :success="!submitUsername && usernameSuccess"
      ></TInput>
      <template v-if="password.length">
        <span class="info" v-if="!passwordSuccess" style="text-align: center">Password has to be 6 characters long, <br> include a number and a special character</span>
      </template>
      <TInput label="New password" type="password"
              class="inputs"
              v-model="password"
              @input="password = $event.target.value"
              @change="emailAvailable"
              :success="passwordSuccess"
      ></TInput>
      <TInput label="Reenter password" type="password"
              class="inputs"
              v-model="reenter"
              @input="reenter = $event.target.value"
              :success="reenterSuccess"
      ></TInput>
      <TButton style="margin-top:20px" :dark="true" :disabled="disabled" @click="submit" :loading="loading">Submit</TButton>
    </form>
  </layout>

</template>

<script>

import TInput from "../components/TInput.vue";
import Layout from "../components/Layout.vue";
import TButton from "../components/TButton.vue";
import CheckEmailQuery from "../graphql/queries/CheckEmailQuery";
import CheckUsernameQuery from "../graphql/queries/CheckUsernameQuery";
import Register from "../graphql/mutations/Register";
export default {
  name: "Register",
  components: {TButton, Layout, TInput},
  data(){
    return{
      submitEmail: false,
      submitUsername: false,
      email: '',
      username: '',
      password: '',
      reenter: '',
      loading: false,
    }
  },
  apollo:{
    $client: 'backend'
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
    emailAvailable(){
      this.$apollo.query({
        query: CheckEmailQuery,
        variables: {
          email: this.email
        },
      })
          .then(result => {
            if (result.data.checkEmailAvailable){
              this.submitEmail = true
            }else{
              this.submitEmail = false
            }
          })
          .catch(err => console.log("err: ", err))
    },
    usernameSuccess(){
      if(this.username.length >= 2)
      {
        return true
      }else{
        return false
      }
    },
    usernameAvailable(){
      this.$apollo.query({
        query: CheckUsernameQuery,
        variables: {
          username: this.username
        },
      })
          .then(result => {
            if (result.data.checkUsernameAvailable){
              this.submitUsername = true
            }else{
              this.submitUsername = false
            }
          })
          .catch(err => console.log("err: ", err))
    },
    passwordSuccess(){
      if(/^(?=.*[0-9])(?=.*[!@#$%^&*.])[a-zA-Z0-9!@#$%^&*.]{6,16}$/.test(this.password))
      {
        return true
      }else{
        return false
      }
    },
    reenterSuccess(){
      if(this.password === this.reenter && this.reenter.length >= 2)
      {
        return true
      }else{
        return false
      }
    },
    disabled(){
      if (
          this.emailSuccess
          && !this.submitEmail
          && this.usernameSuccess
          && !this.submitUsername
          && this.passwordSuccess
          && this.reenterSuccess
      ){
        return false
      }else return true
    },
    submit(){
      if (this.disabled){
        return
      }

        this.loading = true

        this.$apollo.mutate({
          mutation: Register,
          variables: {
            name: this.username,
            email: this.email,
            password: this.password,
            password_confirmation: this.reenter,
          }
        }).then((result) => {
          if (result.data.register.status == "SUCCESS"){
            this.loading = false
            this.$router.push('/login')
          }

        }).catch((err) => {
          this.showWarning = true
          this.loading = false
          console.log("err: " ,err)
        })
    }
  },
  methods:{
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

  //margin: auto;
  padding: 16px 16px 36px 16px;

  .inputs{
    width: 260px;
  }

  .info{
    color: red;
  }

  .title{
    position: relative;
    top: -33px;
    left: -42px;
    font-size: 30px;
    font-weight: bold;
    line-height: 1;
  }
}


</style>