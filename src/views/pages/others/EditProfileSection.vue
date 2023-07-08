<template>
  <title-component :title="componentTitle" />
  <hr>
  <div class="row">
    <div class="col-md-6 profilescreen">
      <ProfileComponent />
    </div>
  </div>
</template>

<script>
import TitleComponent from "@/components/TitleComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";
import { onMounted } from "vue";

export default {
  name: "EditProfileSection",
  components: {
    TitleComponent,
    ProfileComponent
  },
  props: {},
  setup() {
    const componentTitle = "Profile";

    onMounted(() => {
      document.title = "Places | Profile";
    });

    return {
      componentTitle,
    };
  },
};
</script>
