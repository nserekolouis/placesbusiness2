<template>
    <!-- <nav-app-header/> -->
    <!-- <AppHeaderDropdownAccnt /> -->
    <div class="sidenavbar">
      <div class="brand">
         <img :src="places_logo" 
          width="50" 
          height="50" 
          class="d-inline-block align-center" alt="Logo">
         <p class="p-logo">Places</p>
      </div>
      <hr>
      <div class="sidebar-places">
        <p class="p-sidebar-places-label">Recent Places</p>
        <ul class="list-group">
          <!-- <li class="li-sidebar"> -->
          <!-- <div>
            <CIcon icon="cilHome" size="lg" />
             Home
          </div> -->
          <!-- </li> -->
        <!-- <li class="li-sidebar">
          Selected Place
        </li> -->
        <li v-for="place in places" :key="place.sub_id"
        class="list-group-item list-group-item-action"
        @click="selectPlace(place)"
        >
        <div class="container">
           <div class="row">
          <!-- <div class="col-md-2 place-icon-center">
              <CIcon icon="cilLocationPin" size="lg" />
          </div> -->
          <div class="col-md-10">
            <p class="p-li-bar-place">{{ place.main_text }}</p>
            <p class="p-li-bar-place">{{ place.secondary_text }}</p>
          </div>
        </div>
        </div>
       </li>
       <!-- <li class="li-sidebar">
         Profile
       </li>
       <li class="li-sidebar">
         Settings
       </li>
       <li class="li-sidebar">
         Logout
       </li> -->
      </ul>
      </div>
      
      <!-- <div class="profile-background">
       <CAvatar :src="avatar" size="lg" />
       <p class="h6 p-h6">Nsereko Louis</p>
      </div> -->
    </div>
    <!-- <div class="sidebar sidebar-show">
    <ul class="sidebar-nav">
    <li class="nav-title">Recent Places </li>
    <li class="nav-item li-sidebar card"
    @click="selectAllPosts()"
    >
    <div class="row">
      <div class="col-md-2 place-icon-center">
          <CIcon icon="cilLocationPin" size="lg" />
      </div>
      <div class="col-md-10">
        <p class="p-li-bar-place">All</p>
        <p class="p-li-bar-place">Places</p>
      </div>
    </div>
    </li>
    <li class="nav-item li-sidebar card selected-li-sidebar">
    <div class="row" v-show="initPlace.main_text != null">
      <div class="col-md-2 place-icon-center">
          <CIcon icon="cilLocationPin" size="lg" />
      </div>
      <div class="col-md-10">
        <p class="p-li-bar-place">{{ initPlace.main_text }}</p>
        <p class="p-li-bar-place">{{ initPlace.secondary_text }}</p>
      </div>
    </div>
    </li>
    <li v-for="place in places" :key="place.sub_id"
    class="nav-item li-sidebar card"
    @click="selectPlace(place)"
    >
    <div class="row">
      <div class="col-md-2 place-icon-center">
          <CIcon icon="cilLocationPin" size="lg" />
      </div>
      <div class="col-md-10">
        <p class="p-li-bar-place">{{ place.main_text }}</p>
        <p class="p-li-bar-place">{{ place.secondary_text }}</p>
      </div>
    </div>
    </li>
    </ul>
</div> -->
</template>
<script>
import axios from "axios";
import logo from '@/assets/images/avatars/places_logo.png';
//import NavAppHeader from '@/components/NavAppHeader.vue'
//import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import avatar from '@/assets/images/avatars/8.jpg'
export default {
  name: 'SideBar',
  components:{
    //NavAppHeader,
    //AppHeaderDropdownAccnt
  },
  setup() {
    return{
      avatar: avatar,
      places_logo: logo,
    }
  },
  props: {
    initPlace: {}
  },
  data(){
    return {
      places: []
    }
  },
  watch: {
    initPlace: {
    // the callback will be called immediately after the start of the observation
    immediate: true, 
    handler (val, oldVal) {
      console.log("New Value",val);
      console.log("Old Value",oldVal);
      // do your stuff
      if(Object.keys(val).length != 0){
        //this.addPlaceSubscription(val)
      }
    }
  }
  },
  created(){
    this.getPlaceSubscriptions();
  },
  methods: {
    getPlaceSubscriptions: function(){
      console.log("InitPlace:",this.initPlace.places_id);
      let page_url = this.url+'api/v2/get_place_subs';
      const data = { 
        userplacesub_id: "0"
      };
      axios.post(page_url,data)
          .then(response =>{
            console.log("Response Places: ",response);
            //this.places = (response.data.place_subs).reverse();
            this.places = (response.data.place_subs).filter(place => 
            { return place.places_id != this.initPlace.places_id });
          }).catch(error => {
            console.log(error);
          });
    },
    addPlaceSubscription(val){
      console.log("place id",val.places_id);
      let page_url = this.url+'api/v2/add_user_place_subscription';
      const data = { 
        place_id: ""+val.places_id
      };
      axios.post(page_url,data)
          .then(response =>{
            console.log("Response ADD SUB: ",response);
            //this.places = response.data.place_subs;
            this.getPlaceSubscriptions();
          }).catch(error => {
            console.log(error);
          });
    },
    selectPlace(place){
      console.log(place);
      this.$emit('listen-place',place);
    },
    selectAllPosts(){
     this.$emit('listen-place',{});
    }
  },
}
</script>
