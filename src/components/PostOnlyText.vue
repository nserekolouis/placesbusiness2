<template>
  <div class="container">
    <div class="row">
      <post-place-name
        :post="post"
        :index="index"
        @listen-userblocked="userBlocked"
        @listen-reportpost="reportPost"
        @listen-unsubplace="unSubPlace"
        @listen-deletepost="deletePost"
      />
    </div>
    <div class="row">
      <div class="col-md-2">
        <post-profile-picture :post="post" />
      </div>
      <div class="col-md-10">
        <post-user-info :post="post" />
        <post-text :post="post" />
        <reaction-component :post="post" 
        @listen-comment="goToComments"
         />
      </div>
    </div>
  </div>
</template>
<script>
import ReactionComponent from "@/components/PostReaction.vue";
import PostUserInfo from "@/components/PostUserInfo.vue";
import PostText from "@/components/PostText.vue";
import PostProfilePicture from "@/components/PostProfilePicture.vue";
import PostPlaceName from "@/components/PostPlaceName.vue";

export default {
  name: "OnlyText",
  props: {
    places: [],
    post: {},
    index: Number,
  },
  components: {
    ReactionComponent,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    PostPlaceName,
  },
  methods: {
    userBlocked(index) {
      console.log("USER BLOCKED 2");
      this.$emit("listen-userblocked", index);
    },
    reportPost(index) {
      console.log("Report Post 2");
      this.$emit("listen-reportpost", index);
    },
    unSubPlace(index) {
      console.log("Unsub Place 2");
      this.$emit("listen-unsubplace", index);
    },
    deletePost(index) {
      console.log("Delete Post 2");
      this.$emit("listen-deletepost", index);
    },
    goToComments(post) {
      this.$emit("listen-comment", post);
    },
  },
};
</script>