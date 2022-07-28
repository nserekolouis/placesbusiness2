<template>
     <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Places</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <!-- <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg>
          Home
        </a>
      </li> -->
       <li  v-for="place in places" :key="place.sub_id">
        <!-- <a href="#" class="nav-link link-dark">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
          Dashboard
        </a> -->
        <p>Dashboard</p>
      </li>
      
      <!-- <li 
        class="nav-item"
        v-for="place in places" :key="place.sub_id"
        @click="selectPlace(place)"
      >
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
          Dashboard
        </a> 
        {{ place.main_text }}
      </li> -->
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default{
   name: 'SidebarBootstrap',
   componets: {

   },
   props: {

   },
   data(){
       return {
           places: []
       }
   },
   created(){
       this.getPlaceSubscriptions();
    },
   methods: {
       getPlaceSubscriptions: function(){
           //console.log("InitPlace:",this.initPlace.places_id);
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
   }
}
</script>
