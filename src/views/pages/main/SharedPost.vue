<template>
  <div class="row">
    <div class="col-md-3">
      <side-bar-login />
    </div>
    <div class="col-md-6 border-left">
      <!-- <back-navigation :info="componentName" @listen-move-back="moveBack" /> -->
      <title-component :title="componentName" />
      <div class="" ref="scrollComponent" style="margin-top: 10px">
        <ul class="list-group">
          <li class="list-group-item">
            <four-images v-if="post.image_four != null" :post="post" />
            <three-images v-else-if="post.image_three != null" :post="post" />
            <two-images v-else-if="post.image_two != null" :post="post" />
            <one-image v-else-if="post.image_one != null" :post="post" />
            <only-text v-else :post="post" />
          </li>
          <li v-if="result" class="list-group-item">
            <make-comment :post="post" @listen-comment="newComment" />
          </li>
          <li class="list-group-item">
            <div style="text-align: center">COMMENTS</div>
          </li>
          <li
            v-for="(post, index) in comments"
            :key="post.id"
            class="list-group-item"
          >
            <post-extras v-if="post.post_extras == 1" :info="info" />
            <c-four-images v-else-if="post.image_four != null" :post="post" />
            <c-three-images v-else-if="post.image_three != null" :post="post" />
            <c-two-images v-else-if="post.image_two != null" :post="post" />
            <c-one-image v-else-if="post.image_one != null" :post="post" />
            <c-only-text
              v-else
              :post="post"
              :index="index"
              @listen-user-profile="goToUserProfile"
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
import axios from "axios";
import OnlyText from "@/components/posts/PostOnlyText.vue";
import OneImage from "@/components/posts/PostImagesOne.vue";
import TwoImages from "@/components/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/posts/PostImagesThree.vue";
import FourImages from "@/components/posts/PostImagesFour.vue";
import COnlyText from "@/components/comments/CommentOnlyText.vue";
import COneImage from "@/components/comments/CommentOneImage.vue";
import CTwoImages from "@/components/comments/CommentTwoImages.vue";
import CThreeImages from "@/components/comments/CommentThreeImages.vue";
import CFourImages from "@/components/comments/CommentFourImages.vue";
import MakeComment from "@/components/comments/MakeComment.vue";
import PostExtras from "@/components/posts/PostExtras.vue";
//import BackNavigation from "@/components/BackNavigation.vue";
import SideBarLogin from "@/components/SideBarLogin.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import Auth from "@/Auth.js";
import { ref, onMounted, onUnmounted, onActivated } from "vue";
import { inject } from "vue";

const TAG = "COMMENTS_PAGE";

export default {
  name: "CommentsPage",
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    COnlyText,
    COneImage,
    CTwoImages,
    CThreeImages,
    CFourImages,
    MakeComment,
    PostExtras,
    //BackNavigation,
    SideBarLogin,
    TitleComponent,
    SearchUsers,
  },
  props: {
    id: String,
    from_component: String,
    new_comments: Boolean,
  },
  setup(props, { emit }) {
    const componentName = "Post and Comments";
    const url = inject("url");
    const post_id = ref(props.id);
    const post = ref({});
    const count = ref(0);
    const comments = ref([]);
    const comment_id_mine = ref(0);
    const comment_id_others = ref(0);
    const return_mine = ref(0);
    const totalMine = ref(0);
    const totalOthers = ref(0);
    const loadMore = ref(true);
    const scrollComponent = ref(null);
    const result = ref(true);

    if (Auth.user === null) {
      result.value = false;
    } else {
      result.value = true;
    }

    onActivated(() => {
      console.log(TAG + " onactivated ", props.id);
      count.value = 0;
      return_mine.value = 0;
      totalMine.value = 0;
      totalOthers.value = 0;
      loadMore.value = true;
      post_id.value = props.id;
      comments.value = [];
      getPost();
    });

    onMounted(() => {
      console.log(TAG + "MOUNTED");
      document.title = "Places | Comments";
      window.addEventListener("scroll", handleScroll);
      window.addEventListener(
        "backbutton",
        function (e) {
          e.preventDefault();
          console.log("BACK BUTTON PRESSED");
        },
        false
      );
      getPost();
    });

    onUnmounted(() => {
      console.log(TAG + "UNMOUNTED");
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("backbutton", moveBack());
    });

    //methods
    const handleScroll = () => {
      let element = scrollComponent.value;
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        count.value < totalMine.value + totalOthers.value &&
        loadMore.value
      ) {
        console.log(TAG + "SCROLL GET COMMENTS");
        loadMore.value = false;
        getComments();
      }
    };

    const getPost = () => {
      console.log(TAG + "GET POST");
      let page_url = url + "api/v2/get_post";
      const data = {
        post_id: "" + post_id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + "POST DETAILS", response);
          post.value = response.data.post;
          getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getComments = () => {
      let page_url = url + "api/v2/get_comments";
      if (count.value != 0) {
        if (return_mine.value < totalMine.value) {
          comment_id_mine.value = comments.value[comments.value.length - 1].id;
        } else if (return_mine.value == totalMine.value) {
          comment_id_others.value = 0;
        } else {
          comment_id_others.value =
            comments.value[comments.value.length - 1].id;
        }
      }

      const data = {
        post_id: "" + post_id.value,
        comment_id_mine: comment_id_mine.value,
        comment_id_others: comment_id_others.value,
        return_mine: return_mine.value,
      };

      console.log(TAG + "COMMENTS DATA", data);

      axios
        .post(page_url, data)
        .then((response) => {
          loadMore.value = true;
          console.log(TAG + "GET COMMENTS REPONSE", response);
          let newComments = response.data.comments;
          comments.value.push(...newComments);
          let newTotalMine = response.data.total_mine;
          totalMine.value = newTotalMine;
          let newTotalOthers = response.data.total_others;
          totalOthers.value = newTotalOthers;
          count.value += 5;
          let newReturnMine = response.data.return_mine;
          return_mine.value += newReturnMine;
        })
        .catch((error) => {
          loadMore.value = true;
          console.log(error);
        });
    };

    const newComment = () => {
      count.value = 0;
      let page_url = url + "api/v2/get_comments";

      const data = {
        post_id: "" + post_id.value,
        comment_id_mine: 0,
        comment_id_others: 0,
        return_mine: 0,
      };

      console.log(TAG + "NEW COMMENT DATA", data);

      axios
        .post(page_url, data)
        .then((response) => {
          loadMore.value = true;
          console.log(TAG + " NEW COMMENT RESPONSE", response);
          let newComments = response.data.comments;
          //newComments.push(...comments.value);
          comments.value = newComments;
          let newTotalMine = response.data.total_mine;
          totalMine.value = newTotalMine;
          let newTotalOthers = response.data.total_others;
          totalOthers.value = newTotalOthers;
          count.value += 5;
          let newReturnMine = response.data.return_mine;
          return_mine.value += newReturnMine;
        })
        .catch((error) => {
          loadMore.value = true;
          console.log("LMPAC", error);
        });
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    const moveBack = () => {
      emit("listen-move-back");
    };

    return {
      comments,
      post,
      scrollComponent,
      newComment,
      goToUserProfile,
      componentName,
      moveBack,
      result,
    };
  },
};
</script>
<style scoped>
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