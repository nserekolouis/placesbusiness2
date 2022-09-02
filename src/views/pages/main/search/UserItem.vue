<template>
  <div class="row">
    <div class="col-2">
      <user-photo :post="post" />
    </div>
    <div class="col-10">
      <post-user-info :post="post" />
    </div>
  </div>
</template>
<script>
import PostUserInfo from "@/views/pages/main/search/UserInfo.vue";
import UserPhoto from "./UserPhoto.vue";

export default {
  name: "NotificationItem",
  props: {
    post: {},
    index: Number,
  },
  setup(props) {
    console.log("NI", props.index);
  },
  created() {
    console.log("Notification Item");
  },
  components: {
    PostUserInfo,
    UserPhoto,
  },
};
</script>