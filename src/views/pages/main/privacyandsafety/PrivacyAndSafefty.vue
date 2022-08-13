<template> 
    <div class="row">
        <div class="col-md-3" style="display">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6">
            <privacy-and-safety-section
            ></privacy-and-safety-section>
        </div>
        <div class="col-md-3 sidebarstyle">
            <search-users/>
        </div>
    </div>
</template>

<script>
import PrivacyAndSafetySection from '@/views/pages/main/privacyandsafety/PrivacyAndSafetySection.vue'
import SidebarCoreui from '@/components/SidebarCoreui.vue'
import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'

export default {
  name: 'HomeScreen',
  props: {},
  components: {
       PrivacyAndSafetySection,
       SidebarCoreui,
       SearchUsers
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
