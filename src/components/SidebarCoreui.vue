<template>
<CSidebar visible>
  <CSidebarBrand>Places</CSidebarBrand>
  <CSidebarNav>
    <li class="nav-title">Recent Places</li>
    <CNavItem href="#"
    >
      <CIcon  customClassName="nav-icon" icon="cil-location-pin"/>
      All 
    </CNavItem>
    <CNavItem href="#"
    v-for="place in places" :key="place.sub_id"
     @click="selectPlace(place)"
    >
      <CIcon  customClassName="nav-icon" icon="cil-location-pin"/>
      {{ place.main_text }} 
    </CNavItem>
  </CSidebarNav>
  <CSidebarFooter>
    <CDropdown>
        <CDropdownToggle>
             <CAvatar :src="avatar" size="lg" />
             <p class="h6 p-h6">Nsereko Louis</p>
        </CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem href="#">
            <CIcon icon="cil-user"/>    
            Profile</CDropdownItem>
            <CDropdownItem href="#">
            <CIcon   icon="cil-settings"/>
            Settings</CDropdownItem>
            <CDropdownItem href="#">
            <CIcon  icon="cil-account-logout"/>    
            Logout</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
  </CSidebarFooter>
  <!-- <CSidebarToggler/> -->
</CSidebar>
</template>
<script>
import axios from "axios";
import logo from '@/assets/images/avatars/places_logo.png';
import avatar from '@/assets/images/avatars/8.jpg'
export default {
  name: 'SideBar',
  components:{
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
    immediate: true, 
    handler (val, oldVal) {
      console.log("New Value",val);
      console.log("Old Value",oldVal);
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

