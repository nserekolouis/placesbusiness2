<template>
  <div class="container">
    <div class="row">
      <div class="login">
        <GoogleLogin :callback="callback" prompt/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { decodeCredential } from 'vue3-google-login'
import Auth from '@/Auth.js';
import router from '@/router'

const callback = (response) => {
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData.email)
  const data = { 
          email: userData.email,
          password: "password",
          password_confirmation: "password",
          role: "Client" 
        };

  axios.post("http://192.168.43.79:8000/api/register", data)
  .then(response => {
    console.log("Response LOGIN", response);
    Auth.login(response.data.token,userData);
    if(response.data.exist == 1){
      router.push({name: 'HomeScreen' });
    }else{
      router.push({name: 'UserHandle' });
    }
  })
  .catch(error => {
    this.errorMessage = error.message;
    console.error("There was an error!", error);
  });
  }
</script>

<script>
//import router from '@/router'
import axios from "axios";


export default {
  name: 'LoginScreen',
  props: {
    prompt: Boolean,
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
