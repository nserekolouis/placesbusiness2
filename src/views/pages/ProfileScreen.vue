<template>
  <app-header/>
  <div class="container">
    <div class="row">
      <form
        @submit.prevent="uploadProfile">
        <div class="form-item">
            <img v-if="profile_picture != null" v-bind:src="''+profile_picture" width="100" height="100">
        </div>
        <div class="form-item">
            <input
                class="input-userhandle"
                id="logo"
                type="file"
                accept="image/*"
                @change="uploadProfilePicture($event)"
            />
        </div>
        <div class="form-item">
            <input
                class="input-userhandle"
                placeholder="username"
                v-model="username"
                type="text"/>
        </div>
        <div class="form-item">
            <textarea
                class="input-userhandle"
                placeholder="user bio"
                v-model="userbio"
                type="text"/>
        </div>
        <div class="form-item">
            <input
                class="input-userhandle"
                placeholder="country of interest"
                v-model="search_country"
                @input="searchCountries"
                type="text"/>
            <ul>
              <li v-for="country in countries" :key="country.id"
              class="li-countries"
              @click="selectCountry(country)"
              >
              {{ country.name }}
              </li>
            </ul>
        </div>
        <div>
            <input
            type="submit"
            value="Submit"
            class="bg-gray-600 p-1 text-white my-1 rounded-sm"
            >
        </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Auth from '@/Auth.js';
import router from '@/router';
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'UserHandle',
  components:{
    AppHeader,
  },
  props: {
   
  },
  data () {
    return {
      profile_picture: "",
      search_country: "",
      countries: [],
      username: "",
      userbio: "",
      country_id: ""
    }
  },
  mounted () {
    console.log('TOKEN',Auth);
  },
  methods: {
    uploadProfilePicture(event) {
        let page_url = this.url+'api/upload_profile_picture';
        let data = new FormData();
        data.append('image_one', event.target.files[0]);
        axios.post(page_url,data)
        .then(response =>{
            console.log("profile_picture",response);
                //this.profile_picture = response.data.logo;
                this.profile_picture = this.url+response.data.user_photo;
            })
        .catch(error => {
            console.log(error);
        });
    },
    searchCountries() {
        let page_url = this.url+'api/search_countries';
        const data = { 
          keyword: this.search_country
        };
        axios.post(page_url,data)
              .then(response =>{
                  console.log(response.data.countries);
                  this.countries = response.data.countries;
              }).catch(error => {
                console.log(error);
              });  
    },
    selectCountry(country){
      console.log("country",country);
      this.search_country = country.name;
      this.countries = [];
      this.country_id = country.id;
    },
    uploadProfile: function(){
      let data = new FormData();
      data.append('username', this.username);
      data.append('userbio', this.userbio);
      data.append('country_id', this.country_id);

      let page_url = this.url + 'api/web_upload_profile';
      axios.post(page_url,data)
          .then(response =>{
              console.log("Response: "+response.data.status_code);
              if(response.data.status_code){
                router.push({name: 'HomeScreen'});
              }
          })
          .catch(err => {
              let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
              console.log("error", message);
          });

      this.showModal = false;
      return true;
    },
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