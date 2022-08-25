<template>
  <div class="container-fluid">
    <app-header/>
    <div class="row" style="margin-top: 30px;">
      <div class="col-md-6" 
      style="margin-left:auto;
             margin-right:auto;
             text-align: center;">
        <h1>Stay connected to your favourate Places</h1>
        <div class="row">
          <div class="col-md-3">
            <img :src="africanMale"
             class="round-image"
            />
          </div>
          <div class="col-md-3">
            <img :src="church"
            class="round-image"
            />
          </div>
          <div class="col-md-3">
            <img :src="people"
            class="round-image"
            />
          </div>
          <div class="col-md-3">
            <img :src="travel"
            class="round-image"
            />
          </div>
        </div>
        <div class="row div-gmail">
          <p
          class="p-login-gmail"
          >LOGIN WITH GMAIL</p>
          <GoogleLogin 
          :callback="callback" 
          prompt
          class="btn-google"
          />
        </div>
    </div>
    </div>
  </div>
</template>
<script setup>
import { decodeCredential } from 'vue3-google-login'
import Auth from '@/Auth.js';
import router from '@/router'
import axios from "axios";
import { inject } from 'vue';


const callback = (response) => {
  const url = inject('url')
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData.email)
  const data = { 
    email: userData.email,
    password: "password",
    password_confirmation: "password",
    role: "Client" 
  };
  let page_url = "http://192.168.43.79:8000/api/v2/register";
  axios.post(page_url, data)
  .then(response => {
    console.log("Response LOGIN", response.data.exist);
    console.log("Response LOGIN USER", response.data.user.userhandle);
    Auth.login(response.data.token,response.data.user);
        console.log("1");
      if(response.data.user.userhandle == null){
        console.log("2");
        router.push({name: 'UserHandle'})
      }else if(response.data.user.username == null){
        console.log("3");
        router.push({name: 'ProfileScreen' });
      }else{
        console.log("4");
        router.push({name: 'HomeScreen' });
      }
  })
  .catch(error => {
    console.error("There was an error!", error.message);
  });
  }
</script>

<script>
import  placesLogo  from '@/assets/images/placeslogo.png'
import  logo  from '@/assets/logo.png'
import  happyPeople1  from '@/assets/images/happypeople1.png'
import AppHeader from '@/components/AppHeader2.vue'

import  africanMale  from '@/assets/images/login/african_male.jpeg'
import  church  from '@/assets/images/login/church.jpg'
import  people  from '@/assets/images/login/people.jpeg'
import  travel  from '@/assets/images/login/travel.jpg'

export default {
  name: 'LoginScreen',
  props: {
    prompt: Boolean,
  },
  setup(){ 
    return {
      placesLogo,
      logo,
      happyPeople1,
      africanMale,
      church,
      people,
      travel
    }
  },
  components: {
    AppHeader
  },
}
</script>
<style scoped>
.round-image{
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 25%;
}
.btn-google{
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.p-login-gmail{
  position: absolute;
  top: 277px;
  left: 208px;
  background-color: #f7f7f7;
  width: 160px;
  font-weight: bold;
  font-size: 14px;
  display: none;
}
.div-gmail{
  margin-top: 50px;
  border: 1px solid #d9d9d9;
  padding: 10px;
}
</style>