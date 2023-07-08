<template>
    <form @submit.prevent="uploadProfile">
          <div
            style="
              max-width: 380px;
              margin-left: auto;
              margin-right: auto;
              min-width: 280px;
              "
          >
            <div class="form-item">
              <div 
                class="spinner-border spinner-border-sm profile-image-loader" 
                role="status"
                :style="{ display: dStatus }"
              >
                <span class="sr-only">Loading...</span>
              </div>

              <div class="avatar-upload">
                <div class="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    @change="uploadProfilePicture($event)"
                  />
                  <label for="imageUpload">
                    <font-awesome-icon
                      class="edit-icon"
                      icon="fa-solid fa-pencil"
                    />
                  </label>
                </div>

                <div class="avatar-preview">
                  <div
                    id="imagePreview"
                    :style="{ backgroundImage: 'url(' + profile_picture + ')' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="form-item">
              <label for="username">Display Name</label>
              <input
                id="username"
                class="form-control"
                v-model="username"
                type="text"
                required
                autocomplete="off"
              />
            </div>
            <div class="form-item">
              <label for="userbio">User Bio</label>
              <textarea
                id="userbio"
                class="form-control"
                v-model="userbio"
                type="text"
                maxlength="320"
                rows="4"
                required
                autocomplete="off"
              ></textarea>
            </div>
            <div class="form-item d-none">
              <label for="country">Search country of interest</label>
              <div class="form-item" style="position:relative">
                <div 
                class="spinner-border spinner-border-sm  spinner-pos" 
                role="status"
                :style="{ display: displayStatus }"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
      
                <input
                  autocomplete="off"
                  id="country"
                  class="form-control"
                  v-model="search_country"
                  type="text"
                  required
                />

              </div>
              <ul class="list-group">
                <li
                  v-for="country in countries"
                  :key="country.id"
                  class="list-group-item"
                  @click="selectCountry(country)"
                >
                  {{ country.name }}
                </li>
              </ul>
            </div>
            <div class="form-item" style="position:relative">
              <button type="submit" class="btn btn-primary btn-next"
              >
              <span class="span-p-text" v-html="buttonText"></span>
              </button>
            </div>
          </div>
    </form>
</template>
<script>
import axios from "axios";
import Auth from "@/Auth.js";
import router from "@/router";
import {ref, inject, watch} from "vue";

import Constants from "@/constants/index";

const TAG = "PROFILE_SCREEN";

export default {
  name: "UserHandle",
  components: {},
  props: {},
  setup(){
    const buttonText = ref("Next");
    const displayStatus = ref("none");
    const nextSpin = ref("none");
    const dStatus = ref("none");
    const profile_picture = ref(Constants.PROFILE_IMAGE_URL);
    const search_country = ref("229");
    const countries = ref([]);
    const username = ref("");
    const userbio = ref("");
    const country_id = ref(229);
    const url = inject('url');
    const url_v1 = inject('url_v1');
    const url_v3 = inject('url_v3');
    const searching = ref(true);
    const userouter = ref(true);
    // const url = ref("");

    console.log(TAG+"-AUTH-",Auth);

    if(Auth.user.username != null){
      profile_picture.value = Auth.user.user_photo;
      username.value = Auth.user.username;
      userbio.value = Auth.user.user_bio;
      userouter.value = false;
    }


    const uploadProfilePicture = (event) => {
      if (event.target.files[0]) {
        if (event.target.files[0].size > Constants.FILE_SIZE) {
          alert(Constants.IMAGE_PROFILE);
        } else {
          dStatus.value = "initial";
          // const file = event.target.files[0];
          // url.value = URL.createObjectURL(file);
          // dStatus.value = "none";
          // profile_picture.value = url.value;
          // console.log(url.value);
          // buttonText.value = "SAVE"

          let page_url = url_v3 + "/upload_profile_picture";
          let data = new FormData();
          data.append("image_one", event.target.files[0]);
          axios
            .post(page_url, data)
            .then((response) => {
              console.log("profile_picture", response);
              dStatus.value = "none";
              profile_picture.value = url+response.data.user_photo;
            })
            .catch((error) => {
              dStatus.value = "none";
              console.log(error);
            });
        }
      }
    }

    watch(search_country, (value) => {
       if(searching.value){
          displayStatus.value = "block";
          let page_url = url_v1 + "/search_countries";
          const data = {
            keyword: value,
          };
          axios
          .post(page_url, data)
          .then((response) => {
            console.log(response);
            displayStatus.value = "none";
            countries.value = response.data.countries
          })
          .catch((error) => {
            console.log(error);
          });
       }else{
         searching.value = true;
       }
     });


    const selectCountry = (country) => {
      searching.value = false;
      search_country.value = country.name;
      countries.value = [];
      country_id.value = country.id;
    }

    const uploadProfile = () => {
      if(username.value.length === 0){
        alert("Please put your username");
      }else if(userbio.value.length === 0){
        alert("Please put your userbio");
      }else if(country_id.value === 0){
        alert("Please select a country of interest");
      }else{
        buttonText.value = "<span class='spinner-border spinner-border-sm'></span> Processing ...";
        nextSpin.value = "block";
        let data = new FormData();
        data.append("userphoto", profile_picture.value);
        data.append("username", username.value);
        data.append("userbio", userbio.value);
        data.append("country_id",229);
        let page_url = url_v3 + "/web_upload_profile";
        axios
          .post(page_url, data)
          .then((response) => {
            buttonText.value = "Done";
            nextSpin.value = "none";
            console.log("Response::",response);
            if (response.data.status_code === 1) {
              Auth.updateUser(response.data.user);
              if(userouter.value){
                  router.push({ name: "SwitchScreen" });
              }
            }
          })
          .catch((err) => {
            nextSpin.value = "none";
            buttonText.value = "Next";
            console.log("error", err);
          });
        return true;
      }
    }

    return {
      buttonText,
      uploadProfilePicture,
      displayStatus,
      nextSpin,
      dStatus,
      selectCountry,
      uploadProfile,
      countries,
      profile_picture,
      search_country,
      username,
      userbio,
      country_id
    }
  },
};
</script>
<style scoped>
body {
  background: whitesmoke;
  font-family: "Open Sans", sans-serif;
}

.container {
  max-width: 960px;
  margin: 30px auto;
  padding: 20px;
}

h1 {
  font-size: 20px;
  text-align: center;
  margin: 20px 0 20px;
}

h1 small {
  display: block;
  font-size: 15px;
  padding-top: 8px;
  color: gray;
}

.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 0px auto;
}

.avatar-upload .avatar-edit {
  position: absolute;
  right: 44px;
  z-index: 1;
  top: 10px;
}

.avatar-upload .avatar-edit input {
  display: none;
}

.avatar-upload .avatar-edit input + label {
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}

.avatar-upload .avatar-edit input + label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
}

.avatar-upload .avatar-edit input + label:after {
  color: #757575;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}

.avatar-upload .avatar-preview {
  width: 160px;
  height: 160px;
  position: relative;
  border-radius: 100%;
  border: 6px solid #f8f8f8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.avatar-upload .avatar-preview div {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.edit-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 13px;
  color: #c9c9c9;
}

label {
  font-size: 13px;
  margin: 0px;
}

.btn-userhandle {
  margin-left: auto;
  display: block;
  margin-top: 10px;
}

.profilescreen {
  margin-top: 50px;
}

.btn-next {
  margin-left: auto;
  display: block;
  font-weight: bold;
  height: 35px;
  font-size: 15px;
}

.spinner-pos {
  position: absolute;
  right: 10px;
  top: 10px
}

.next-spinner-pos {
  position: absolute;
  right: 11%;
  top: 11px;
}

.profile-image-loader{
  position: absolute;
  z-index: 1;
  top: 220px;
  left: 41%;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .profile-image-loader{
    position: absolute;
    z-index: 1;
    top: 220px;
    left: 47%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
  .profile-image-loader{
    position: absolute;
    z-index: 1;
    top: 220px;
    left: 48%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {

}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {

}
</style>