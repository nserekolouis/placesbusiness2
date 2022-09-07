<template>
  <div class="container" v-if="showExtras == false">
    <div class="row">
      <post-place-name
        :post="post"
        :index="index"
        @listen-block-user="blockUser"
        @listen-report-comment="reportComment"
        @listen-delete-comment="deleteComment"
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
        <image-one :image_one="post.image_one" />
        <reaction-component :post="post" />
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <post-extras :info="info" />
  </div>
</template>
<script>
import ReactionComponent from "@/components/comments/CommentReaction.vue";
import ImageOne from "@/components/ImageOne.vue";
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostText from "@/components/posts/PostText.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import PostPlaceName from "@/components/comments/CommentPlaceName.vue";
import PostExtras from "@/components/posts/PostExtras.vue";

import { ref } from "vue";

export default {
  name: "OnlyText",
  props: {
    post: {},
  },
  setup(props, { emit }) {
    const showExtras = ref(false);
    const info = ref(null);

    const deleteComment = () => {
      showExtras.value = true;
      info.value = "Comment Deleted";
    };

    const blockUser = () => {
      showExtras.value = true;
      info.value = "Block User";
    };

    const reportComment = () => {
      showExtras.value = true;
      info.value = "Comment Reported";
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    return {
      showExtras,
      info,
      deleteComment,
      blockUser,
      reportComment,
      goToUserProfile,
    };
  },
  components: {
    ReactionComponent,
    ImageOne,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    PostPlaceName,
    PostExtras,
  },
};
</script>