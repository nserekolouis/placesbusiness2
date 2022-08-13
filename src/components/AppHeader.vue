<template>
  <CHeader position="sticky" class="mb-0">
    <CContainer fluid>
      <CNavbarBrand href="#">
        <div class="row login-top"
        style="box-shadow: 0px 0px 0px 0px #d5d5d5;">
          <img :src="logo"
          class="logo"
          />
          <h6 
          class="top-header">
          Places</h6>
    </div>
      </CNavbarBrand>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
      </CHeaderToggler>   
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import axios from "axios";
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import  logo  from '@/assets/logo.png'

export default {
  name: 'AppHeader',
  components: {
    AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      logo
    }
  },
  data(){
    return {
      places: [],
      search_place: ""
    }
  },
  methods: {
    searchPlace: function(){
      let page_url = this.url+'api/v2/search_places';
      const data = { 
        query: this.search_place
      };
      axios.post(page_url,data)
           .then(response =>{
              console.log("Response: ",response.data.predictions);
              this.places = response.data.predictions;
            }).catch(error => {
              console.log(error);
            }); 
    },
    selectPlace: function(place){
      this.search_place = "";
      this.places = [];
      this.$emit('listen-place',place);
    }
  }
}
</script>