<template>
  <div class="row">
    <back-navigation :info="componentName" @listen-move-back="moveBack" />
    <div>
      <user-profile :user_id="user_id" />
    </div>
  </div>
  <div class="" ref="scrollComponent" style="margin-top: 10px">
    <ul class="list-group">
      <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
        <four-images
          v-if="post.image_four != null"
          :post="post"
          @listen-comment="goToComments"
        />
        <three-images
          v-else-if="post.image_three != null"
          :post="post"
          @listen-comment="goToComments"
        />
        <two-images
          v-else-if="post.image_two != null"
          :post="post"
          @listen-comment="goToComments"
        />
        <one-image
          v-else-if="post.image_one != null"
          :post="post"
          @listen-comment="goToComments"
        />
        <only-text
          v-else
          :post="post"
          :index="index"
          @listen-comment="goToComments"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import OnlyText from "@/components/posts/PostOnlyText.vue";
import OneImage from "@/components/posts/PostImagesOne.vue";
import TwoImages from "@/components/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/posts/PostImagesThree.vue";
import FourImages from "@/components/posts/PostImagesFour.vue";
import BackNavigation from "@/components/BackNavigation.vue";
//import PostExtras from "@/components/posts/PostExtras.vue";
import UserProfile from "@/views/pages/main/userprofile/UserProfile.vue";

import { ref, onMounted, onUnmounted, onActivated } from "vue";
import axios from "axios";
import { inject } from "vue";

export default {
  props: {
    user_id: String,
    from_component: String,
  },
  setup(props, { emit }) {
    const componentName = "User Profile";
    const url = inject("url");
    const u_id = ref(props.user_id);
    const length = ref(0);
    const count = ref(0);
    const post_id = ref(0);
    const loadMore = ref(true);
    const posts = ref([]);
    const scrollComponent = ref(null);

    // watch(
    //   () => props.user_id,
    //   (newVal, oldVal) => {
    //     console.log("New Value", newVal);
    //     console.log("Old Value", oldVal);
    //     u_id.value = newVal;
    //     posts.value = [];
    //     getUserPosts();
    //   }
    // );

    onActivated(() => {
      u_id.value = props.user_id;
      posts.value = [];
      getUserPosts();
    });

    const getUserPosts = () => {
      if (posts.value.length != 0) {
        console.log("posts value", posts.value[posts.value.length - 1].id);
        post_id.value = posts.value[posts.value.length - 1].id;
      } else {
        post_id.value = 0;
      }

      let page_url = url + "api/v2/get_user_posts";
      const data = {
        profile_id: "" + u_id.value,
        latest_post_id: "" + post_id.value,
      };

      axios
        .post(page_url, data)
        .then((response) => {
          console.log("User", response);
          let newPosts = response.data.posts;
          console.log("posts 2", newPosts);
          posts.value.push(...newPosts);
          let total = response.data.total;
          length.value = total;
          count.value += 5;
          if (count.value >= total.value) {
            loadMore.value = false;
          } else {
            loadMore.value = true;
          }
        })
        .catch((error) => {
          console.log("posts", error);
        });
    };

    onMounted(() => {
      console.log("posts");
      document.title = "Places | User Profile";
      window.addEventListener("scroll", handleScroll);
      getUserPosts();
    });

    onUnmounted(() => {
      console.log("LMUP SCROLLING");
      window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
      let element = scrollComponent.value;
      console.log("LMUP SCROLLING", element.getBoundingClientRect().bottom);
      console.log("LMUP SCROLLING WH", element.getBoundingClientRect().bottom);
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        count.value < length.value &&
        loadMore.value
      ) {
        loadMore.value = false;
        getUserPosts();
      }
    };

    const moveBack = () => {
      emit("listen-move-back");
    };

    const goToComments = (post) => {
      console.log("comment clicked", post);
      emit("listen-comment", post);
    };

    return {
      posts,
      scrollComponent,
      moveBack,
      componentName,
      goToComments,
    };
  },
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    //PostExtras,
    UserProfile,
    BackNavigation,
  },
};
</script>
<style scoped>
.btn_home {
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  cursor: pointer;
}

h6 {
  display: inline-block;
  margin-left: 10px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.btn {
  display: none;
}
</style>