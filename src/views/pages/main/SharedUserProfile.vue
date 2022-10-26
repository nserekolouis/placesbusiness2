<template>
<div class="container-fluid row">
    <div class="col-md-3">
    <side-bar-login />
</div>
<div class="col-md-6">
      <div class="row">
    <back-navigation :info="componentName" @listen-move-back="moveBack" />
    <div>
      <user-profile :user_id="id" />
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
</div>
<div class="col-md-3 border-left">
    <button
    class="btn d-md-none btn-menu-right"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasResponsive2"
    aria-controls="offcanvasResponsive2"
    >
    <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </button>
    <div
    class="offcanvas-md offcanvas-end"
    tabindex="-1"
    id="offcanvasResponsive2"
    aria-labelledby="offcanvasResponsiveLabel2"
    >
    <div class="offcanvas-body">
        <button
        type="button"
        class="btn-close btn-close-right"
        data-bs-dismiss="offcanvas"
        data-bs-target="#offcanvasResponsive2"
        aria-label="Close"
        ></button>
        <search-users @listen-search-user-profile="searchUserProfile" />
    </div>
    </div>
</div>
</div>
</template>
<script>
import OnlyText from "@/components/posts/PostOnlyText.vue";
import OneImage from "@/components/posts/PostImagesOne.vue";
import TwoImages from "@/components/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/posts/PostImagesThree.vue";
import FourImages from "@/components/posts/PostImagesFour.vue";
import BackNavigation from "@/components/BackNavigation.vue";
import UserProfile from "@/views/pages/main/userprofile/UserProfile.vue";
import SideBarLogin from "@/components/SideBarLogin.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

import { ref, onMounted, onUnmounted, onActivated } from "vue";
import axios from "axios";
import { inject } from "vue";

export default {
  name: 'SharedUserProfile',
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    UserProfile,
    BackNavigation,
    SideBarLogin,
    SearchUsers
  },
  props: {
    id: String,
  },
  setup(props, { emit }) {
    const componentName = "User Profile";
    //const url = inject("url");
    //const url_v1 = inject("url_v1");
    const url_v3 = inject("url_v3");
    const u_id = ref(props.id);
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
      u_id.value = props.id;
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

      let page_url = url_v3 + "/get_user_posts";
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

h6 {
  display: inline-block;
  margin-left: 10px;
}
html:not([dir="rtl"]) .offcanvas.offcanvas-start {
  transform: translateX(0%);
}

.btn-close {
  display: none;
}

@media (max-width: 1199.98px) {
  .btn-close {
    display: none;
  }
}

@media (max-width: 991.98px) {
  html:not([dir="rtl"]) .offcanvas-sm.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: none;
  }

  .btn {
    border: 0px solid black;
  }

  .btn-menu-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .offcanvas-md.offcanvas-start {
    width: 330px;
  }

  .offcanvas-md.offcanvas-end {
    width: 330px;
  }

  .btn-close-right {
    position: absolute;
    left: 1px;
    top: 1px;
  }

  .btn-close-left {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  .main {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (max-width: 767.98px) {
  html:not([dir="rtl"]) .offcanvas-md.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: block;
  }

  .offcanvas-sm.offcanvas-start {
    width: 330px;
  }
}
</style>