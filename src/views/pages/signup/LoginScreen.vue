<template>
  <div class="container-fluid">
    <app-header />
    <div class="row">
      <div
        class="col-md-6"
        style="
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          margin-top: 40px;
        "
      >
        <h1>Stay connected to your favourite Places</h1>
        <div class="row d-md-none">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="true"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  :src="africanMale"
                  class="d-block w-100"
                  alt="African Male"
                />
              </div>
              <div class="carousel-item">
                <img :src="church" class="d-block w-100" alt="Church" />
              </div>
              <div class="carousel-item">
                <img :src="people" class="d-block w-100" alt="People" />
              </div>
              <div class="carousel-item">
                <img :src="travel" class="d-block w-100" alt="Travel" />
              </div>
            </div>
          </div>
        </div>
        <div class="row d-md-flex d-none">
          <div class="col-md-3">
            <img :src="africanMale" class="round-image" />
          </div>
          <div class="col-md-3">
            <img :src="church" class="round-image" />
          </div>
          <div class="col-md-3">
            <img :src="people" class="round-image" />
          </div>
          <div class="col-md-3">
            <img :src="travel" class="round-image" />
          </div>
        </div>
        <div class="row">
          <div class="col div-gmail">
            <p class="p-login-gmail">LOGIN WITH GMAIL</p>
            <GoogleLogin :callback="callback" prompt class="btn-google" />
          </div>
          <div style="cursor:pointer"
          >
            <p
            @click="goToTermsAndConditions"
            ><u>By signing in you accept the places terms & conditions</u></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { decodeCredential } from "vue3-google-login";
import Auth from "@/Auth.js";
import router from "@/router";
import axios from "axios";
import { inject } from "vue";

const url = inject("url_v3");

const callback = (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData.email);
  const data = {
    email: userData.email,
    password: "password",
    password_confirmation: "password",
    role: "Client",
  };

  let page_url = url + "/register";
  axios
    .post(page_url, data)
    .then((response) => {
      console.log("LOGIN", response);
      console.log("Response LOGIN USER", response.data.user.userhandle);
      Auth.login(response.data.token, response.data.user);
    
      if(response.data.user.deleted_at != null){
        console.log("1");
        alert("Your account has been disabled, await administration verification to find out why?")
      }else if (response.data.user.userhandle == null) {
        console.log("2");
        router.push({ name: "UserHandle" });
      } else if (response.data.user.username == null) {
        console.log("3");
        router.push({ name: "UploadProfile" });
      } else {
        console.log("4");
        router.push({ name: "SwitchScreen" });
      }
    })
    .catch((error) => {
      console.error("There was an error!", error.message);
    });
  
};

const goToTermsAndConditions = () => {
  router.push({ name: "TermsAndConditions" });
};
</script>

<script>
import placesLogo from "@/assets/images/placeslogo.png";
import logo from "@/assets/logo.png";
import happyPeople1 from "@/assets/images/happypeople1.png";
import AppHeader from "@/components/AppHeader.vue";

import africanMale from "@/assets/images/login/african_male.jpeg";
import church from "@/assets/images/login/church.jpg";
import people from "@/assets/images/login/people.jpeg";
import travel from "@/assets/images/login/travel.jpg";

export default {
  name: "LoginScreen",
  components: {
    AppHeader,
  },
  props: {
    prompt: Boolean
  },
  setup() {
    return {
      placesLogo,
      logo,
      happyPeople1,
      africanMale,
      church,
      people,
      travel
    };
  },
};
</script>
<style scoped>
.round-image {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 25%;
}
.btn-google {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}
.p-login-gmail {
  position: absolute;
  top: 277px;
  left: 208px;
  background-color: #f7f7f7;
  width: 160px;
  font-weight: bold;
  font-size: 14px;
  display: none;
}
.div-gmail {
  margin-top: 50px;
  border: 1px solid #d9d9d9;
  padding: 10px;
}
</style>