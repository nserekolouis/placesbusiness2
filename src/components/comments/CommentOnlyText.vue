<template>
  <div class="container" v-if="showExtras == false">
    <div class="row">
      <post-place-name
        v-if="Auth.user != null"
        :post="pst"
        :index="index"
        @listen-block-user="blockUser"
        @listen-report-comment="reportComment"
        @listen-delete-comment="deleteComment"
      />
      <comment-place-name-login
      v-else
      />
    </div>
    <div class="row">
      <div class="col-2">
        <post-profile-picture
          :post="pst"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10">
        <post-user-info :post="pst" />
        <post-text :post="pst" />
        <reaction-component :post="pst" />
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <post-extras :info="info" />
  </div>
</template>
<script>
import ReactionComponent from "@/components/comments/CommentReaction.vue";
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostText from "@/components/posts/PostText.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import PostPlaceName from "@/components/comments/CommentPlaceName.vue";
import PostExtras from "@/components/posts/PostExtras.vue";
import CommentPlaceNameLogin from "@/components/comments/CommentPlaceNameLogin.vue";
import Auth from "@/Auth.js";
import { ref, watch } from "vue";

const TAG = "COMMENT_ONLY_TEXT";

export default {
  name: "OnlyText",
  props: {
    post: {},
    index: Number,
  },
  setup(props, { emit }) {
    console.log(TAG, props.post);
    const showExtras = ref(false);
    const info = ref(null);
    const pst = ref(props.post);

    watch(
      () => props.post,
      (newVal, oldVal) => {
        console.log("oldVal",oldVal);
        pst.value = newVal;
      }
    );

    const deleteComment = () => {
      showExtras.value = true;
      info.value = "Comments Deleted";
    };

    const blockUser = () => {
      showExtras.value = true;
      info.value = "User Blocked";
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
      Auth,
      pst
    };
  },
  components: {
    ReactionComponent,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    PostPlaceName,
    PostExtras,
    CommentPlaceNameLogin,
  },
};
</script>