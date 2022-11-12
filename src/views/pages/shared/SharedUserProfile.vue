<template>
<div class="container-fluid row">
    <div class="col-md-3">
      <side-bar-login />
    </div>

    <div class="col-md-6 border-left">
      <back-navigation :info="componentName" @listen-move-back="moveBack" />
      <hr class="mt-0 mb-1">
      <div>
        <user-profile :user_id="id" />
      </div>
      <div class="" ref="scrollComponent" style="margin-top: 10px">
      <ul class="list-group">
        <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
        <ad-space
        v-if="post.id === ''"
        />
        <four-images
          v-else-if="post.image_four != null"
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
      <li v-show="showSpin" class="list-group-item">
        <spinner-component :spin="spin" :info="spinInfo" />
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
import OnlyText from "@/components/userposts/PostOnlyText.vue";
import OneImage from "@/components/userposts/PostImagesOne.vue";
import TwoImages from "@/components/userposts/PostImagesTwo.vue";
import ThreeImages from "@/components/userposts/PostImagesThree.vue";
import FourImages from "@/components/userposts/PostImagesFour.vue";
import BackNavigation from "@/components/BackNavigation.vue";
import UserProfile from "@/views/pages/main/userprofile/UserProfile.vue";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import AdSpace from "@/components/AdSpace.vue";
import SideBarLogin from "@/components/SideBarLogin.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

import { ref, onMounted, onUnmounted} from "vue";
import axios from "axios";
import { inject } from "vue";

const TAG = "USER_POSTS_PAGE";

export default {
  props: {
    id: String,
    from_component: String,
  },
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    UserProfile,
    BackNavigation,
    SpinnerComponent,
    AdSpace,
    SideBarLogin,
    SearchUsers
  },
  setup(props, { emit }) {
    const componentName = "User Profile";
    const url_v3 = inject("url_v3");

    const u_id = ref(props.id);
    const first_post_id = ref(0);
    const last_post_id = ref(0);
    const ad_id = ref(0);

    const totalUserPosts = ref(0);
    const count = ref(0);
    const post_id = ref(0);
    const loadMore = ref(true);
    const posts = ref([]);
    const scrollComponent = ref(null);

    const spin = ref(false);
    const spinInfo = ref(null);
    const showSpin = ref(false);

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

    // onActivated(() => {
    //   u_id.value = props.id;
    //   posts.value = [];
    //   getUserPosts();
    // });

    const getUserPosts = () => {
      if (posts.value.length != 0) {
        first_post_id.value = posts.value[0].id;
        last_post_id.value = posts.value[posts.value.length - 2].id;
        ad_id.value = posts.value[posts.value.length - 1].id;
        if(ad_id.value === ""){
          ad_id.value = 0;
        }
      } else {
        first_post_id.value = 0;
        last_post_id.value = 0;
        ad_id.value = 0;
      }

      let page_url = url_v3 + "/get_user_posts";
      const data = {
        profile_id: "" + u_id.value,
        first_post_id: "" + post_id.value,
        last_post_id: "" + post_id.value,
        ad_id: "" + ad_id.value,
      };

     console.log(TAG + "-G-U-P-DATA",data); 

      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + "-G-U-P-RESPONSE",response);

          let newPosts = response.data.posts;
          console.log("posts 2", newPosts);
          posts.value.push(...newPosts);
          let total = response.data.total;
          totalUserPosts.value = total;
          count.value += 5;
          if (count.value >= totalUserPosts.value) {
            loadMore.value = false;
            console.log(TAG + "-G-U-P-COUNT",count.value);
            console.log(TAG + "-G-U-P-TOTAL",totalUserPosts.value);
            console.log(TAG + "-G-U-P-LOADMORE",loadMore.value);
          } else {
            loadMore.value = true;
            //show spin
            spin.value = true;
            showSpin.value = true;
            console.log(TAG + "-G-U-P-COUNT",count.value);
            console.log(TAG + "-G-U-P-TOTAL",totalUserPosts.value);
            console.log(TAG + "-G-U-P-LOADMORE",loadMore.value);
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
      //u_id.value = props.id;
      //posts.value = [];
      getUserPosts();
    });

    onUnmounted(() => {
      console.log("LMUP SCROLLING");
      window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
      let element = scrollComponent.value;

      console.log(TAG + "-S-HEIGHT", element.getBoundingClientRect().bottom < window.innerHeight);
      console.log(TAG + "-S-COUNT", count.value < totalUserPosts.value);
      console.log(TAG + "-S-LOADMORE", loadMore.value);

      if (count.value >= totalUserPosts.value) {
        spin.value = false;
        spinInfo.value = "NO MORE POSTS";
      }

      if (
        element.getBoundingClientRect().bottom < window.innerHeight + 10 &&
        count.value < totalUserPosts.value &&
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
      spin,
      spinInfo,
      showSpin,
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