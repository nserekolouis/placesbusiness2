<template>
  <div class="col div-pp">
    <img
      :src="this.url + post.user_photo"
      class="profile-picture"
      @click="goToProfile"
    />
  </div>
</template>
<script>
export default {
  name: "PostProfilePicture",
  props: {
    post: {},
  },
  methods: {
    goToProfile() {
      console.log("Notifications CLICKED", this.post);
      this.$emit("listen-user-profile", this.post);
    },
  },
};
</script>
<style scoped>
.div-pp {
  text-align: center;
}

.profile-picture {
  cursor: pointer;
}
</style>