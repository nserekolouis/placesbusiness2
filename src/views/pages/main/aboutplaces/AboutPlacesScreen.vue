<template> 
    <div class="row">
        <div class="col-md-3" style="display">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-9">
            <about-section
            ></about-section>
        </div>
        <!-- <div class="col-md-3">
            <search-users/>
        </div> -->
    </div>
</template>

<script>
import AboutSection from '@/views/pages/main/aboutplaces/AboutSection.vue'
import SidebarCoreui from '@/components/SideBar2.vue'
//import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'

export default {
  name: 'HomeScreen',
  props: {},
  components: {
       AboutSection,
       SidebarCoreui,
       //SearchUsers
  },
  data() {
      return {
        Place: {},
        post:{}
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
