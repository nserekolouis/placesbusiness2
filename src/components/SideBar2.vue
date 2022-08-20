<template>
<div class="d-flex flex-column flex-shrink-0 p-3 bg-white" 
style="width: 280px; height: 100vh; border: 1px solid #c8c9ca;" >
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <img :src="placesLogo"
            class="places-logo"
      />
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/homeScreen" class="nav-link link-dark" aria-current="page">
          <div class="" style="position:relative">
            <font-awesome-icon 
            icon="fa-solid fa-house"
           />
           <span class="position-absolute top-0 start-1
           translate-middle p-1 bg-places border border-light rounded-circle"
           :style="{backgroundColor: indicator }">
           <span class="visually-hidden">New alerts</span>
           </span>
            <p>Home</p>
          </div>
        </a>
      </li>
       <li>
        <a href="/notificationsscreen" class="nav-link link-dark">
           <font-awesome-icon 
           icon="fa-solid fa-bell"/>
          <p>Notifications</p>
          <span class="badge bg-places"
          style="margin-left:10px"
          >{{ noteCount }}</span>
        </a>
      </li>
      <!-- <li>
        <a href="/editprofilescreen" class="nav-link link-dark">
         <font-awesome-icon 
           icon="fa-solid fa-user"/>
          <p>Profile</p>
        </a>
      </li> -->
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img :src="profile_picture" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>{{ username }}</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="/editprofilescreen">Profile</a></li>
        <li><a class="dropdown-item" href="/accounts">Accounts</a></li>
        <li><a class="dropdown-item" href="/privacyandsafety">Privacy and Safety</a></li>
        <li><a class="dropdown-item" href="/aboutplaces">About Places</a></li> 
        <li><a class="dropdown-item" href="#"
         @click="logout"
        >Sign out</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import  placesLogo  from '@/assets/images/placeslogo.png'
import Auth from '@/Auth.js';
import router from '@/router';
import { inject, ref } from 'vue';
import { getToken, onMessage } from "firebase/messaging";

export default {
  setup() {
    const messaging = inject('messaging')
    const vapidKey = inject('vapidKey')
    const url = inject('url')
    const noteCount = ref(0);
    const indicator = ref('#fff')
    
    const requestPermission = () => {
      console.log('Requesting permission...');
      Notification.requestPermission()
      .then((permission) => {
        if(permission === 'granted'){
          console.log("Notification permision granted");
          getToken(messaging, { vapidKey: vapidKey })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Token",currentToken);
              webOnline(currentToken)
            } else {
              console.log('Token not available');
            }
          }).catch((err) => {
            console.log('Token An error occurred while retrieving token. ', err);
          });
        }else{
            console.log("Notification permision not granted");
        }
      })
    }
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if(payload.data.payload === '9'){
         indicator.value = '#288c7f';
      }else{
         noteCount.value++;
      }
    });

    const webOnline = (currentToken) => {
            let page_url = url+'api/v2/web_online';
            let data = new FormData();
            data.append('token', currentToken);
            axios.post(page_url,data)
            .then(response => {
                console.log("RESPONSE WEB ONLINE",response);
                if(response.data.success){
                  noteCount.value = response.data.count;
                }
            })
            .catch(error => {
                console.log(error);
            });   
    }
    return{
      noteCount,
      placesLogo,
      indicator
    }
  },
  data(){
    return {
      places: [],
      profile_picture: this.url+Auth.user.user_photo,
      username: Auth.user.username,
    }
  },
  methods:{
    logout(){
       Auth.logout;
       router.push({name: 'LoginScreen'});
    }
  }
}
</script>
<style scoped>
p {
  display: inline;
  margin-left: 10px;
  margin-bottom: 0px;
  font-size: 15px;
}

.bg-places{
  background-color: #288c7f;
}
</style>
