<template>
  <div class="container" v-if="showExtras == false">
    <div class="row">
      <post-place-name
        :post="post"
        :index="index"
        @listen-block-user="blockUser"
        @listen-delete-post="deletePost"
        @listen-report-post="reportPost"
      />
    </div>
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
        <images-two :image_one="post.image_one" :image_two="post.image_two" />
        <reaction-component :post="post" @listen-comment="goToComments" />
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <post-extras :info="info" />
  </div>
</template>
<script>
import ReactionComponent from "@/components/posts/PostReaction.vue";
import ImagesTwo from "@/components/ImagesTwo.vue";
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostText from "@/components/posts/PostText.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import PostPlaceName from "@/components/posts/PostPlaceName.vue";
import PostExtras from "@/components/posts/PostExtras.vue";
import { ref, watch } from "vue";

export default {
  name: "OnlyText",
  props: {
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
        console.log("DELETED POST ID 6", newVal);
        console.log("DELETED POST ID 6", "" + post.value.post_id);
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

    return {
      showExtras,
      info,
      deletePost,
      blockUser,
      reportPost,
      goToComments,
      goToUserProfile,
    };
  },
  components: {
    ReactionComponent,
    ImagesTwo,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    PostPlaceName,
    PostExtras,
  },
};
</script>