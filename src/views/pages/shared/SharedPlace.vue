<template>
<div class="container-fluid row">
    <div class="col-md-3">
      <side-bar-login />
    </div>
    
    <div class="col-md-6 border-left">
      <back-navigation :info="componentTitle" @listen-move-back="moveBack" />
      <hr class="m-0">
      <place-profile :id="place_id" style="margin-top: 10px" />
      <center-infomation :info="alert" v-show="show" class="info-missing" />

      <ul class="list-group" ref="scrollComponent">
        <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
          <ad-space
            v-if="post.id === ''"
          />
          <four-images
            v-else-if="post.image_four != null"
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
        <li v-show="showSpin" class="list-group-item">
          <spinner-component :spin="spin" :info="spinInfo" />
        </li>
      </ul>
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
  import axios from "axios";
  import OnlyText from "@/components/posts/PostOnlyText.vue";
  import OneImage from "@/components/posts/PostImagesOne.vue";
  import TwoImages from "@/components/posts/PostImagesTwo.vue";
  import ThreeImages from "@/components/posts/PostImagesThree.vue";
  import FourImages from "@/components/posts/PostImagesFour.vue";
  import CenterInfomation from "@/components/CenterInformation.vue";
  import BackNavigation from "@/components/BackNavigation.vue";
  import PlaceProfile from "@/views/pages/shared/SharedPlaceProfile.vue";
  import SpinnerComponent from "@/components/SpinnerComponent.vue";
  import AdSpace from "@/components/AdSpace.vue";
  import { onMounted, onUnmounted, ref, inject } from "vue";
  import SideBarLogin from "@/components/SideBarLogin.vue";
  import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";

  const TAG = "SHARED_PLACE";

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
      SpinnerComponent,
      AdSpace,
      SideBarLogin,
      SearchUsers
    },
    props: {
      id: String,
    },
    setup(props, { emit }) {

      console.log(TAG +'-1-', props.id);
      const place_id = ref(props.id);
      const url_v3 = inject("url_v3");
      const loadMore = ref(true);
      const count = ref(0);
      const total = ref(0);

      const show = ref(true);
      const posts = ref([]);
      const alert = "No posts yet";
      const componentTitle = "PLACE_PAGE";
      const active = ref(true);
      const scrollComponent = ref(null);
      const scrollingPosition = ref(0);

      const first_post_id = ref("");
      const last_post_id = ref("");
      const ad_id = ref(0);

      const spin = ref(false);
      const spinInfo = ref(null);
      const showSpin = ref(false);

      onMounted(() => {
        window.addEventListener("scroll", handleScroll);
        place_id.value = props.id;
        posts.value = [];
        getPlacePosts();
      });

      onUnmounted(() => {
        active.value = false;
        window.removeEventListener("scroll", handleScroll);
      });

      const getPlacePosts = () => {
      
        if (posts.value.length != 0) {
          first_post_id.value = posts.value[0].id;
          last_post_id.value = posts.value[posts.value.length - 2].id;
          ad_id.value = posts.value[posts.value.length - 1].id;
          if(ad_id.value === ""){
            ad_id.value = 0;
          }
        } else {
          first_post_id.value = "";
          last_post_id.value = "";
          ad_id.value = 0;
        }

        const data = {
          place_id: place_id.value,
          first_post_id: first_post_id.value,
          last_post_id: last_post_id.value,
          ad_id: ad_id.value
        };

        console.log(TAG + "-G-P-P-DATA", data);

        let page_url = url_v3 + "/get_place_posts";

        axios
          .post(page_url, data)
          .then((response) => {
            console.log(TAG+"-G-P-P-RESPONSE", response);
            loadMore.value = true;
            let newPosts = response.data.posts;
            posts.value.push(...newPosts);
            count.value += newPosts.length;
            total.value = response.data.total;
            if (count.value < total.value) {
              spin.value = true;
              showSpin.value = true;
            }

            if(count.value > 0){
              show.value = false;
            }else{
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
        }

        if (count.value >= total.value) {
          spin.value = false;
          spinInfo.value = "NO MORE POSTS";
        }

        console.log(TAG + "-S-HEIGHT", element.getBoundingClientRect().bottom < window.innerHeight + 20);
        console.log(TAG + "-S-COUNT", count.value < total.value);
        console.log(TAG + "-S-LOADMORE", loadMore.value);

        if (
          element.getBoundingClientRect().bottom < window.innerHeight + 10 &&
          loadMore.value &&
          count.value < total.value
        ) {
          loadMore.value = false;
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
        goToUserProfile,
        spin,
        spinInfo,
        showSpin,
        place_id
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