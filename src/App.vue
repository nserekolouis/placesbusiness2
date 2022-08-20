<template>
  <!-- <keep-alive> -->
    <router-view />
  <!-- </keep-alive> -->
</template>

<script>
import firebaseMessaging from './firebase'
import { provide } from 'vue'

export default {
  name: 'App',
  components: {},
  provide: {
    messaging: firebaseMessaging
  },
  setup() {
    provide('messaging', firebaseMessaging)
  }
}
</script>
<style lang="scss">
   @import 'styles/style';
</style>

