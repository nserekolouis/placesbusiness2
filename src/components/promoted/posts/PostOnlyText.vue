<template>
  <div class="container" v-if="showExtras == false">
    <!-- <div class="row">
      <post-place-name
        v-if="Auth.user != null"
        :post="post"
        :index="index"
        @listen-block-user="blockUser"
        @listen-delete-post="deletePost"
        @listen-report-post="reportPost"
        @listen-place-page="goToPlacePage"
      />
      <post-place-name-login v-else :post="post" />
    </div> -->
    <div class="row">
      <div class="col-2">
        <post-profile-picture
          :post="post"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10">
        <post-user-info :post="post" />
        <post-text :post="post" />
        <reaction-component :post="post" @listen-comment="goToComments" />
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <post-extras :info="info" />
  </div>
</template>
<script>
import ReactionComponent from "@/components/promoted/posts/PostReaction.vue";
import PostUserInfo from "@/components/promoted/posts/PostUserInfo.vue";
import PostText from "@/components/promoted/posts/PostText.vue";
import PostProfilePicture from "@/components/promoted/posts/PostProfilePicture.vue";

//import PostPlaceName from "@/components/promoted/posts/PostPlaceName.vue";
//import PostPlaceNameLogin from "@/components/promoted/posts/PostPlaceNameLogin.vue";

import PostExtras from "@/components/promoted/posts/PostExtras.vue";
import { ref, watch } from "vue";
import Auth from "@/Auth.js";

export default {
  name: "OnlyText",
  props: {
    places: [],
    post: {},
    index: Number,
    deleted_post_id: Number,
  },
  setup(props, { emit }) {
    const showExtras = ref(false);
    const info = ref(null);
    const post = ref(props.post);

    watch(
      () => props.deleted_post_id,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        console.log("DELETED POST ID 4", newVal);
        console.log("DELETED POST ID 4", "" + post.value.post_id);
        if (newVal === "" + post.value.post_id) {
          console.log("DELETED POST ID 4 DELETED");
          deletePost();
        }
      }
    );

    const deletePost = () => {
      showExtras.value = true;
      info.value = "Post Deleted";
    };

    const blockUser = () => {
      showExtras.value = true;
      info.value = "Block User";
    };

    const reportPost = () => {
      showExtras.value = true;
      info.value = "Post Reported";
    };

    const goToComments = (post) => {
      emit("listen-comment", post);
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    const goToPlacePage = (place) => {
      emit("listen-place-page", place);
    };

    return {
      showExtras,
      info,
      deletePost,
      blockUser,
      reportPost,
      goToComments,
      goToUserProfile,
      Auth,
      goToPlacePage
    };
  },
  components: {
    ReactionComponent,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    //PostPlaceName,
    PostExtras,
    //PostPlaceNameLogin,
  },
};
</script>