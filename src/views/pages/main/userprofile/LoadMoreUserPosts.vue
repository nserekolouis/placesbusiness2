<template>
  <div class="row">
    <div class="btn-home">
      <!-- <font-awesome-icon icon="fa-solid fa-long-arrow-left" @click="goBack" /> -->
      <h6>User Profile</h6>
    </div>
    <div>
      <user-profile :user_id="user_id" />
    </div>
  </div>
  <div class="" ref="scrollComponent" style="margin-top: 10px">
    <ul class="list-group">
      <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
        <post-extras v-if="post.post_extras == 1" :info="info" />
        <four-images v-else-if="post.image_four != null" :post="post" />
        <three-images v-else-if="post.image_three != null" :post="post" />
        <two-images v-else-if="post.image_two != null" :post="post" />
        <one-image v-else-if="post.image_one != null" :post="post" />
        <only-text
          v-else
          :post="post"
          :index="index"
          @listen-userblocked="userBlocked"
          @listen-reportpost="reportPost"
          @listen-deletepost="deletePost"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import OnlyText from "@/components/PostOnlyText.vue";
import OneImage from "@/components/PostImagesOne.vue";
import TwoImages from "@/components/PostImagesTwo.vue";
import ThreeImages from "@/components/PostImagesThree.vue";
import FourImages from "@/components/PostImagesFour.vue";

import PostExtras from "@/components/PostExtras.vue";
import UserProfile from "@/views/pages/main/userprofile/UserProfile.vue";

import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { inject } from "vue";

export default {
  props: {
    user_id: String,
    from_component: String,
  },
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    PostExtras,
    UserProfile,
  },
  setup(props) {
    const url = inject("url");
    console.log("LMUP WATCH", props.user_id);
    const u_id = ref(props.user_id);
    const length = ref(0);
    const count = ref(0);
    const post_id = ref(0);

    const posts = ref([]);
    const scrollComponent = ref(null);

    const getUserPosts = () => {
      console.log("LMUP U_ID", u_id.value);
      console.log("LMUP URL", "" + url);

      if (Object.keys(posts.value).length != 0) {
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
          console.log("LMUP POSTS", response);
          let newPosts = response.data.posts;
          console.log("LMUP POSTS 2", newPosts);
          posts.value.push(...newPosts);
          let total = response.data.total;
          length.value = total;
          count.value += 5;
        })
        .catch((error) => {
          console.log("LMUP", error);
        });
    };

    onMounted(() => {
      console.log("LMUP ON");
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
        count.value < length.value
      ) {
        getUserPosts();
      }
    };
    return {
      posts,
      scrollComponent,
    };
  },
  methods: {
    goBack() {
      console.log("FROM COMPONENT", this.from_component);
      if (this.from_component == "HomeScreen") {
        this.$emit("listen-home");
      } else if (this.from_Component == "LoadMoreUserPosts") {
        this.$emit("listen-user-profile");
      } else if (this.from_component == "CommentsScreen") {
        this.$emit("listen-comment");
      } else {
        console.log("UNKNOWN");
      }
    },
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
  margin-left: 5px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}
</style>