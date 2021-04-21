<template>
    <div>
      <div class="welcome">
        <h2>Welcome</h2>
        <p>Welcome to the MyTunes site! You can create an account or log in using the forms below.</p>
      </div>
  
        <form @submit.prevent="register">
          <h2>Register</h2>
          <input placeholder="First Name" v-model="firstname"/>
          <input placeholder="Last Name" v-model="lastname"/>
          <input placeholder="Username" v-model="username"/>
          <input placeholder="Password" type="password" v-model="password"/>
          <button type="submit">Register</button>
        </form>


        
        <form @submit.prevent="login">
          <h2>Login</h2>
          <input placeholder="Username" v-model="usernameLogin"/>
          <input placeholder="Password" type="password" v-model="passwordLogin"/>
          <button type="submit">Login</button>
        </form>
        <p>{{error}} {{errorLogin}}</p>
    </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
    methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstname || !this.lastname || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
        this.error = '';
        this.errorLogin = '';
        if (!this.usernameLogin || !this.passwordLogin)
            return;
        try {
            let response = await axios.post('/api/users/login', {
                username: this.usernameLogin,
                password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
        } catch (error) {
            this.errorLogin = "Error: " + error.response.data.message;
            this.$root.$data.user = null;
        }
    }
  }
}
</script>

<style scoped>
.welcome{
  text-align: center;
}

form {
  padding:25px;
}
</style>