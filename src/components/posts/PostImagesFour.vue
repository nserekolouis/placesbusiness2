<template>
  <div class="container" v-if="showExtras == false">
    <div class="row">
      <post-place-name
        v-if="Auth.user != null"
        :post="post"
        :index="index"
        @listen-block-user="blockUser"
        @listen-delete-post="deletePost"
        @listen-report-post="reportPost"
        @listen-place-page="goToPlacePage"
        @listen-promote-post="promotePost"
      />
      <post-place-name-login v-else :post="post" />
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
        <images-two :post="post" />
        <images-four :post="post" />
        <reaction-component :post="post" @listen-comment="goToComments" />
         <follow-component 
        :post="post"
        :followObject="followObj"
        @listen-follow-object="passFollowObject"
        />
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
import ImagesFour from "@/components/ImagesFour.vue";
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostText from "@/components/posts/PostText.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import PostPlaceName from "@/components/posts/PostPlaceName.vue";
import PostExtras from "@/components/posts/PostExtras.vue";
import FollowComponent from "@/components/posts/FollowComponent.vue";
import { ref, watch } from "vue";
import PostPlaceNameLogin from "@/components/posts/PostPlaceNameLogin.vue";
import Auth from "@/Auth.js";

const TAG = "POST_IMAGES_FOUR";

export default {
  name: "OnlyText",
  components: {
    ReactionComponent,
    ImagesTwo,
    PostUserInfo,
    PostText,
    PostProfilePicture,
    PostPlaceName,
    PostExtras,
    ImagesFour,
    PostPlaceNameLogin,
    FollowComponent,
  },
  props: {
    post: {},
    index: Number,
    deleted_post_id: Number,
    followObject: {}
  },
  setup(props, { emit }) {
    const showExtras = ref(false);
    const info = ref(null);
    const post = ref(props.post);

    //follow.......................
    const followObj = ref({});
    
    watch(
      () => props.followObject,
      (newVal, oldVal) => {
        console.log("FollowObj_New_Value", newVal);
        console.log("FollowObj_Old_Value", oldVal);
        followObj.value = newVal
      }
    );

    const passFollowObject = (obj) => {
      followObj.value = obj;
      console.log("follow_2");
      emit("listen-follow-object", obj);
    };
    //......................

    watch(
      () => props.deleted_post_id,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        console.log("DELETED POST ID 8", newVal);
        console.log("DELETED POST ID 8", "" + post.value.post_id);
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
      console.log("PI4 g2c", post);
      emit("listen-comment", post);
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    const goToPlacePage = (place) => {
      emit("listen-place-page", place);
    };

    const promotePost = (post) => {
      console.log(TAG,"Promote Post");
      emit("listen-promote-post", post);
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
      goToPlacePage,
      promotePost,
      passFollowObject,
      followObj
    };
  },
};
</script>