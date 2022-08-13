<template> 
    <div class="row">
        <div class="col-md-3" style="display">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6">
            <!-- <post-and-comments
            :id="id"
            /> -->
            <load-more-posts-and-comments
            :id="id"
            />
        </div>
        <div class="col-md-3 sidebarstyle">
            <search-users/>
        </div>
    </div>
</template>

<script>

import SidebarCoreui from '@/components/SidebarCoreui.vue'
//import PostAndComments from '@/views/pages/main/comments/PostAndComments.vue'
import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'
import LoadMorePostsAndComments from '@/views/pages/main/comments/LoadMorePostsAndComments.vue'

export default {
  name: 'HomeScreen',
  props: {
      id: String
  },
  components: {
       SidebarCoreui,
       //PostAndComments,
       SearchUsers,
       LoadMorePostsAndComments
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
