<template>
  <title-component :title="componentTitle" />
  <hr>
  <div class="row">
    <div class="col-md-6 profilescreen">
      <form @submit.prevent="uploadProfile">
        <div
          class=""
          style="width: 300px; margin-left: auto; margin-right: auto"
        >
          <div class="form-item" style="text-align: -webkit-center">
            <!-- <div class=""> -->
              <div 
              class="spinner-border spinner-border-sm profile-image-loader" 
              role="status"
              :style="{ display: displayStatus }"
              >
                <span class="sr-only">Loading...</span>
              </div>
            <!-- </div> -->
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
              class="form-control form-control-sm"
              v-model="username"
              type="text"
              required
            />
          </div>
          <div class="form-item">
            <label for="userbio">User Bio</label>
            <textarea
              id="userbio"
              class="form-control form-control-sm"
              v-model="userbio"
              type="text"
              maxlength="320"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="form-item">
            <label for="country">Search country of interest</label>
            <input
              id="country"
              class="form-control form-control-sm"
              v-model="search_country"
              @input="searchCountries"
              type="text"
              required
            />
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
          <div class="form-item" style="text-align: end">
            <button type="submit" class="btn btn-primary">
              <span class="span-p-text" v-html="buttonText"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Auth from "@/Auth.js";
import TitleComponent from "@/components/TitleComponent.vue";
import { onMounted } from "vue";
import Constants from "@/constants/index.js";

const TAG = "EDIT_PROFILE_SECTION";

export default {
  name: "UserHandle",
  components: {
    TitleComponent,
  },
  props: {},
  setup() {
    const componentTitle = "Profile";

    onMounted(() => {
      document.title = "Places | Profile";
      console.log(TAG,Auth);
    });

    return {
      componentTitle,
    };
  },
  data() {
    return {
      profile_picture: Auth.user.user_photo,
      search_country: "",
      countries: [],
      username: Auth.user.username,
      userbio: Auth.user.user_bio,
      country_id: Auth.user.country_id,
      displayStatus: "none",
      buttonText: "Update"
    };
  },
  watch: {
    country_id: {
      immediate: true,
      handler(country_id) {
        console.log("COUNTRY ID", country_id);
        this.getCountry(country_id);
      },
    },
  },
  methods: {
    uploadProfilePicture(event) {
      if (event.target.files[0]) {
        if (event.target.files[0].size > 5242880) {
          alert(Constants.IMAGE_PROFILE);
        } else {
          this.displayStatus = "initial";
          let page_url = this.url_v1 + "/upload_profile_picture";
          let data = new FormData();
          data.append("image_one", event.target.files[0]);
          axios
            .post(page_url, data)
            .then((response) => {
              console.log("profile_picture", response);
              this.displayStatus = "none";
              this.profile_picture = response.data.user_photo;
            })
            .catch((error) => {
              this.displayStatus = "none";
              console.log(error);
            });
        }
      }
    },
    searchCountries() {
      let page_url = this.url_v1 + "/search_countries";
      const data = {
        keyword: this.search_country,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(response.data.countries);
          this.countries = response.data.countries;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectCountry(country) {
      console.log("country", country);
      this.search_country = country.name;
      this.countries = [];
      this.country_id = country.id;
    },
    uploadProfile: function () {
      console.log(TAG);
      this.buttonText = "<span class='spinner-border spinner-border-sm'></span> Processing ...";
      let data = new FormData();
      data.append("userphoto", this.profile_picture);
      data.append("username", this.username);
      data.append("userbio", this.userbio);
      data.append("country_id", this.country_id);

      console.log(TAG + "Edit Profile Section", data);

      let page_url = this.url_v1 + "/web_upload_profile";
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + "Response: ", response);

          if (response.data.status_code) {
            Auth.updateUser(response.data.user);
            //alert("Profile Updated");
            this.buttonText = "Update";
          }
        })
        .catch((err) => {
          let message =
            typeof err.response !== "undefined"
              ? err.response.data.message
              : err.message;
          console.log("error", message);
          this.buttonText = "Next";
        });

      this.showModal = false;
      return true;
    },
    getCountry(country_id) {
      let page_url = this.url_v3 + "/get_country";
      const data = {
        country_id: "" + country_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("country", response.data.country);
          this.search_country = response.data.country.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}
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
  /* margin: 50px auto; */
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
  font-size: 0.875rem;
  margin: 0px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.profile-image-loader{
  position: absolute;
  z-index: 1;
  top: 108px;
}
</style>