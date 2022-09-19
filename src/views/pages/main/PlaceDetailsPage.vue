<template>
  <back-navigation :info="componentTitle" @listen-move-back="moveBack" />
  <place-profile :place="place" style="margin-top: 10px" />
  <center-infomation :info="alert" v-show="show" class="info-missing" />
  <ul class="list-group" ref="scrollComponent">
    <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
      <four-images
        v-if="post.image_four != null"
        :post="post"
        :index="post.id"
        :deleted_post_id="d_post_id"
        @listen-comment="goToComments"
        @listen-user-profile="goToUserProfile"
      />
      <three-images
        v-else-if="post.image_three != null"
        :post="post"
        :index="post.id"
        :deleted_post_id="d_post_id"
        @listen-comment="goToComments"
        @listen-user-profile="goToUserProfile"
      />
      <two-images
        v-else-if="post.image_two != null"
        :post="post"
        :index="post.id"
        :deleted_post_id="d_post_id"
        @listen-comment="goToComments"
        @listen-user-profile="goToUserProfile"
      />
      <one-image
        v-else-if="post.image_one != null"
        :post="post"
        :index="post.id"
        :deleted_post_id="d_post_id"
        @listen-comment="goToComments"
        @listen-user-profile="goToUserProfile"
      />
      <only-text
        v-else
        :post="post"
        :index="index"
        :places="places"
        :deleted_post_id="d_post_id"
        @listen-comment="goToComments"
        @listen-user-profile="goToUserProfile"
      />
    </li>
  </ul>
</template>
<script>
import axios from "axios";
import OnlyText from "@/components/posts/PostOnlyText.vue";
import OneImage from "@/components/posts/PostImagesOne.vue";
import TwoImages from "@/components/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/posts/PostImagesThree.vue";
import FourImages from "@/components/posts/PostImagesFour.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import BackNavigation from "@/components/BackNavigation.vue";
import PlaceProfile from "@/components/PlaceProfile.vue";
import { onActivated, onDeactivated, ref, inject } from "vue";

const TAG = "PLACE_DETAILS_PAGE";

export default {
  name: "PlaceDetailsPage",
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    CenterInfomation,
    BackNavigation,
    PlaceProfile,
  },
  props: {
    place: {},
  },
  setup(props, { emit }) {
    console.log(TAG + " 1 ", props.place);
    const place = ref(props.place);
    const url = inject("url");
    const id = ref(0);
    const loadMore = ref(true);
    const count = ref(0);
    const total = ref(0);
    const show = ref(true);
    const posts = ref({});
    const alert = "No posts yet";
    const componentTitle = "Place Page";
    const active = ref(true);
    const scrollComponent = ref(null);
    const scrollingPosition = ref(0);

    onActivated(() => {
      window.addEventListener("scroll", handleScroll);
      place.value = props.place;
      id.value = 0;
      console.log(TAG + " 2 ", place.value);
      getPlacePosts();
    });

    onDeactivated(() => {
      active.value = false;
      window.removeEventListener("scroll", handleScroll);
    });

    const getPlacePosts = () => {
      let page_url = url + "api/v2/get_place_posts";
      const data = {
        id: "" + id.value,
        place_id: "" + place.value.places_id,
      };
      console.log(TAG, data);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG, response);
          loadMore.value = true;
          let newPosts = response.data.posts;
          if (newPosts.length > 0) {
            show.value = false;
            if (id.value == 0) {
              posts.value = newPosts;
            } else {
              posts.value.push(...newPosts);
            }
            count.value += newPosts.length;
            total.value = response.data.total;
            console.log(TAG, count.value);
            console.log(TAG, total.value);
          } else if (posts.value == 0) {
            posts.value = [];
            show.value = true;
          }
        })
        .catch((error) => {
          console.log(error);
          loadMore.value = true;
        });
    };

    const moveBack = () => {
      emit("listen-move-back");
    };

    const handleScroll = () => {
      let element = scrollComponent.value;
      if (active.value) {
        scrollingPosition.value = window.scrollY;
        //console.log(TAG + " Scroll Position ", scrollingPosition.value);
      }

      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        loadMore.value &&
        count.value < total.value
      ) {
        loadMore.value = false;
        id.value = posts.value[posts.value.length - 1].id;
        getPlacePosts();
      }
    };

    const goToComments = (post) => {
      console.log("COMMENT_CLICKED", post);
      emit("listen-comment", post);
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    return {
      show,
      posts,
      alert,
      componentTitle,
      moveBack,
      scrollComponent,
      goToComments,
      goToUserProfile
    };
  },
};
</script>