<template>
    <div class="row">
        <div class="col-md-3">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6 sidebarstyle">
            <!-- <profile-and-posts
            :user_id="user_id"
            ></profile-and-posts> -->
            <load-more-user-posts
            :user_id="user_id"
            />
        </div>
       <div class="col-md-3 sidebarstyle">
            <search-users/>
        </div> 
    </div>
</template>

<script>
//import ProfileAndPosts from '@/views/pages/main/userprofile/ProfileAndPosts.vue'
import SidebarCoreui from '@/components/SidebarCoreui.vue'
import SearchUsers from '@/views/pages/main/search/SearchUsers.vue'
import LoadMoreUserPosts from '@/views/pages/main/userprofile/LoadMoreUserPosts.vue'

export default {
  name: 'UserProfileAndPosts',
  props: {
      user_id: String
  },
  watch: {
    user_id: {
    immediate: true, 
    handler (val) {
      if(Object.keys(val).length != 0){
          console.log("user id",val);
      }
    }
  }
  },
  components: {
       //ProfileAndPosts,
       SidebarCoreui,
       SearchUsers,
       LoadMoreUserPosts
  },
  data() {
      return {
        Place: {},
        post:{}
      }
  },
  methods: {
      emittedPlace(place){
          console.log("Emitted Place",place);
          this.Place = place;
      }
  },
}
</script>
