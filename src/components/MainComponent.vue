<template>
  <posts-section
  :Place="Place"
  ></posts-section>
</template>
<script>
import PostsSection from '@/views/pages/PostsScreen.vue'

export default {
  name: 'MainComponent',
  components: {
    PostsSection,
  },
  props: {
    Place: {}
  }
}
</script>