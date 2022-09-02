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
        <images-two
          :image_one="post.image_three"
          :image_two="post.image_four"
          style="margin-top: 10px"
        />
        <reaction-component :post="post" @listen-comment="goToComments" />
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <post-extras :info="info" />
  </div>
</template>
<script>
import ReactionComponent from "@/components/PostReaction.vue";
import ImagesTwo from "@/components/ImagesTwo.vue";
import PostUserInfo from "@/components/PostUserInfo.vue";
import PostText from "@/components/PostText.vue";
import PostProfilePicture from "@/components/PostProfilePicture.vue";
import PostPlaceName from "@/components/PostPlaceName.vue";
import PostExtras from "@/components/PostExtras.vue";
import { ref } from "vue";

export default {
  name: "OnlyText",
  props: {
    post: {},
    index: Number,
  },
  setup(props, { emit }) {
    const showExtras = ref(false);
    const info = ref(null);

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
      console.log("PI4 g2c", post);
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