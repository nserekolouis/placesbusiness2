<template> 
    <div class="row">
        <div class="col-md-3">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6 sidebarstyle">
            <posts-section
            :initPlace="Place"
            ></posts-section>
        </div>
        <div class="col-md-3 sidebarstyle">
            <search-users/>
        </div>
    </div>
</template>

<script>
import PostsSection from '@/views/pages/main/home/PostsScreen.vue'
import SidebarCoreui from '@/components/SidebarCoreui.vue'
import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'

export default {
  name: 'HomeScreen',
  props: {},
  components: {
       PostsSection,
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
