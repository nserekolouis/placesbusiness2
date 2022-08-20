<template> 
    <div class="row">
        <div class="col-md-3">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6">
            <notification-section
            ></notification-section>
        </div>
        <div class="col-md-3">
            <search-users/>
        </div>
    </div>
</template>

<script>
import NotificationSection from '@/views/pages/main/notifications/NotificationSection.vue'
import SidebarCoreui from '@/components/SideBar2.vue'
import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'


export default {
  name: 'HomeScreen',
  props: {},
  components: {
       NotificationSection,
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
