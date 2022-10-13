<template>
  <div class="col div-pp">
    <img
      :src="post.user_photo"
      class="profile-picture"
      @click="goToProfile"
    />

    <div v-show="isPromoted" class="ad-label">
      <p>AD</p>
    </div>
  </div>
</template>
<script>
import { ref } from "vue"
export default {
  name: "PostProfilePicture",
  props: {
    post: {},
  },
  setup(props){
    const isPromoted = ref(false);
    const post = ref(props.post);

    if(post.value.promoted === 1){
      isPromoted.value = true;
    }

    return {
      isPromoted
    }
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

p{
  margin-bottom: 0px;
  font-size: 10px;
  font-weight: bold;
  color: #288c7f;
}

.ad-label{
  position: absolute;
  bottom: 13px;
  left: 40px;
}

@media (max-width: 1199.98px) {
  .ad-label{
    left: 54px;
  }
}
</style>