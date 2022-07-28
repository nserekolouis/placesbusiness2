<template>
  <CHeader position="sticky" class="mb-0">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <!-- <CIcon icon="cil-menu" size="lg" /> -->
      </CHeaderToggler>
      <!-- <CHeaderBrand class="mx-auto d-lg-none" to="/"> -->
      <CHeaderBrand class="" to="/">
        <CNavLink href="/homeScreen">
          <CAvatar 
          :src="places_logo" 
          size="md" 
          />
        </CNavLink>
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex mx-auto">
        <CNavItem>
          <div class="row">
            <div class="col-lg-12">
              <div class="input-group">
                  <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search for..." 
                  aria-label="Search for..."
                  v-model="search_place"
                  @input="searchPlace"
                  >
              </div>
              <ul class="ul-places">
              <li v-for="place in places" :key="place.id"
              class="li-bar-place"
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
            </div>
          </div>
        </CNavItem>
      <!--  <CNavItem>
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav> -->
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <!-- <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem> -->
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <!-- <CHeaderDivider /> -->
    <!-- <CContainer fluid>
      <AppBreadcrumb />
    </CContainer> -->
  </CHeader>
</template>

<script>
import axios from "axios";
//import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import  places_logo  from '@/assets/places_logo.png'
export default {
  name: 'AppHeader',
  components: {
    //AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    return {
      places_logo,
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