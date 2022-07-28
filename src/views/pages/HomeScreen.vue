<template> 
    <div class="row">
        <div class="col-md-3" style="display">
             <!-- <side-bar
               :initPlace="Place"
               @listen-place="emittedPlace"
             >
             </side-bar> -->
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-9">
            <nav-app-header-search/>
            <posts-section
            :initPlace="Place"
            ></posts-section>
        </div>
        <!-- <div class="col-md-3">
        </div> -->
    </div>
</template>

<script>
import NavAppHeaderSearch from '@/components/NavAppHeaderSearch.vue'
//import SideBar from '@/components/SideBar.vue'
//import SidebarBootstrap from '@/components/SidebarBootstrap.vue'
import PostsSection from '@/views/pages/PostsScreen.vue'
import SidebarCoreui from '@/components/SidebarCoreui.vue'


export default {
  name: 'HomeScreen',
  props: {},
  components: {
      // AppHeader,
       //SideBar,
       PostsSection,
       NavAppHeaderSearch,
       //SidebarBootstrap
       SidebarCoreui
  },
  data() {
      return {
        Place: {}
      }
  },
  watch: {
      
  },
  methods: {
      emittedPlace(place){
          console.log("Emitted Place",place);
          this.Place = place;
      }
  },
}
</script>
