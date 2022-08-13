<template>
  <div class="container-fluid">
    <div class="row login-top">
      <img :src="logo"
        class="logo"
      />
      <h6 class="top-header">Places</h6>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="center">
          <div style="text-align:center;">
            <h3 style="display:block;
                       text-transform: capitalize;">
            Stay connected to your favourate </h3>
            <img :src="placesLogo"
             class="places-logo"
            />
            <div class="login">
              <GoogleLogin :callback="callback" prompt/>
            </div>
            <div class="">
              <hr>
            </div>
            <div class="login">
              <button
              type="button" 
              class="btn btn-secondary"
              style="background-color: #298f82;
                     color: white;
                     font-size: 13px;
                     width: 200px;
                     height: 38px;"
              >Download Android App</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 center">
        <img :src="happyPeople1"
        class="login-image"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { decodeCredential } from 'vue3-google-login'
import Auth from '@/Auth.js';
import router from '@/router'
import axios from "axios";

const callback = (response) => {
  const userData = decodeCredential(response.credential)
  console.log("Handle the userData", userData.email)
  const data = { 
          email: userData.email,
          password: "password",
          password_confirmation: "password",
          role: "Client" 
        };

  axios.post("http://192.168.43.79:8000/api/v2/register", data)
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


export default {
  name: 'LoginScreen',
  props: {
    prompt: Boolean,
  },
  setup(){ 
    return {
      placesLogo,
      logo,
      happyPeople1
    }
  },
  methods: {
    
  },
}
</script>