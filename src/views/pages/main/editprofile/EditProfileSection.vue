<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 profilescreen">
         <form
        @submit.prevent="uploadProfile">
        <div v-if="profile_picture" class="form-item img-profilescreen">
            <img v-bind:src="''+this.url+profile_picture" width="100" height="100">
        </div>
        <div class="form-item">
            <input
                class="form-control"
                id="logo"
                type="file"
                accept="image/*"
                @change="uploadProfilePicture($event)"
            />
        </div>
        <div class="form-item">
            <input
                class="form-control"
                placeholder="username"
                v-model="username"
                type="text"
                required
                />
        </div>
        <div class="form-item">
            <textarea
                class="form-control"
                placeholder="user bio"
                v-model="userbio"
                type="text"
                maxlength="320"
                required
                ></textarea>
        </div>
        <div class="form-item">
            <input
                class="form-control"
                placeholder="country of interest"
                v-model="search_country"
                @input="searchCountries"
                type="text"
                required
                />
            <ul class="list-group">
              <li v-for="country in countries" :key="country.id"
              class="list-group-item"
              @click="selectCountry(country)"
              >
              {{ country.name }}
              </li>
            </ul>
        </div>
        <div class="form-item">
           <button 
            type="submit" 
            class="btn btn-light btn-userhandle"
            >Save</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Auth from '@/Auth.js';
import router from '@/router';

export default {
  name: 'UserHandle',
  components:{
  
  },
  props: {
   
  },
  data () {
    return {
      profile_picture: Auth.user.user_photo,
      search_country: "",
      countries: [],
      username: Auth.user.username,
      userbio: Auth.user.user_bio,
      country_id: Auth.user.country_id,
    }
  },
  watch: {
      country_id: {
          immediate:true,
          handler(country_id){
              console.log("COUNTRY ID",country_id);
              this.getCountry(country_id);
          }
      }
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
                this.profile_picture = response.data.user_photo;
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
      data.append('userphoto', this.profile_picture);
      data.append('username', this.username);
      data.append('userbio', this.userbio);
      data.append('country_id', this.country_id);

      let page_url = this.url + 'api/web_upload_profile';
      axios.post(page_url,data)
          .then(response =>{
              console.log("Response: "+response.data.status_code);
              if(response.data.status_code){
                Auth.updateUser(response.data.user)
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
    getCountry(country_id){
        let page_url = this.url+'api/v2/get_country';
        const data = { 
          country_id: ""+country_id
        };
        axios.post(page_url,data)
              .then(response =>{
                  console.log("country",response.data.country);
                  this.search_country = response.data.country.name;
              }).catch(error => {
                console.log(error);
              });  
    }
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