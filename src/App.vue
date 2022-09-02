<template>
  <router-view />
</template>

<script>
import firebaseMessaging from "./firebase";
import { provide, onMounted } from "vue";

export default {
  name: "App",
  components: {},
  provide: {
    messaging: firebaseMessaging,
  },
  setup() {
    provide("messaging", firebaseMessaging);

    onMounted(() => {
      document.title = "Places";
    });
  },
};
</script>
<style lang="scss">
@import "styles/style";
</style>