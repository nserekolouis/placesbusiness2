<template>
<!-- <div class="container-fluid"> -->
    <div class="row">
        <div class="col-md-3">
             <sidebar-coreui
             :initPlace="Place"
             @listen-place="emittedPlace"
             />
        </div>
        <div class="col-md-6">
            <posts-section
            :initPlace="Place"
            ></posts-section>
        </div>
        <div class="col-md-3">
            <search-users/>
        </div>
    </div>
<!-- </div> -->
</template>

<script>
import PostsSection from '@/views/pages/main/home/PostsScreen.vue'
import SidebarCoreui from '@/components/SideBar2.vue'
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
<style scoped>
body {
    overflow-x: hidden;
}

.border-right {
  border-right: 1px solid #c2c3c4;;
}

.container-fluid{
    background-color: white;
}
</style>
