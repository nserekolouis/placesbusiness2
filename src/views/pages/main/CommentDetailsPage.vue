<template>
  <div class="row">
    <div class="col">
      <!-- <title-component :title="componentTitle" /> -->
      <back-navigation :info="componentName" @listen-move-back="moveBack" />
      <div class="" ref="scrollComponent">
        <ul class="list-group">
          <li class="list-group-item">
            <c-four-images
              v-if="comment.image_four != null"
              :post="comment"
              @listen-user-profile="goToUserProfile"
            />
            <c-three-images
              v-else-if="comment.image_three != null"
              :post="comment"
              @listen-user-profile="goToUserProfile"
            />
            <c-two-images
              v-else-if="comment.image_two != null"
              :post="comment"
              @listen-user-profile="goToUserProfile"
            />
            <c-one-image
              v-else-if="comment.image_one != null"
              :post="comment"
              @listen-user-profile="goToUserProfile"
            />
            <c-only-text
              v-else
              :post="comment"
              @listen-user-profile="goToUserProfile"
            />
          </li>
        </ul>
        <div class="row">
          <div class="col">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="row">
                  <div class="col-2"></div>
                  <div class="col-10">
                    <four-images v-if="post.image_four != null" :post="post" />
                    <three-images
                      v-else-if="post.image_three != null"
                      :post="post"
                    />
                    <two-images
                      v-else-if="post.image_two != null"
                      :post="post"
                    />
                    <one-image
                      v-else-if="post.image_one != null"
                      :post="post"
                    />
                    <only-text v-else :post="post" />
                  </div>
                </div>
              </li>
              <li v-show="result"  class="list-group-item">
                <make-comment :post="post" @listen-comment="newComment" />
              </li>
              <li class="list-group-item">
                <div style="text-align: center">OTHER COMMENTS</div>
              </li>
              <li
                v-for="(post, index) in comments"
                :key="post.id"
                class="list-group-item"
              >
                <post-extras v-if="post.post_extras == 1" :info="info" />
                <c-four-images
                  v-else-if="post.image_four != null"
                  :post="post"
                  @listen-user-profile="goToUserProfile"
                />
                <c-three-images
                  v-else-if="post.image_three != null"
                  :post="post"
                  @listen-user-profile="goToUserProfile"
                />
                <c-two-images
                  v-else-if="post.image_two != null"
                  :post="post"
                  @listen-user-profile="goToUserProfile"
                />
                <c-one-image
                  v-else-if="post.image_one != null"
                  :post="post"
                  @listen-user-profile="goToUserProfile"
                />
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
import BackNavigation from "@/components/BackNavigation.vue";
import { 
    ref, 
    //onMounted, 
    //onUnmounted, 
    onActivated,
    onDeactivated 
    } from "vue";
import { inject } from "vue";
//import SideBar from "@/components/SideBar.vue";
//import SideBarLogin from "@/components/SideBarLogin.vue";
//import TitleComponent from "@/components/TitleComponent.vue";
//import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import Auth from "@/Auth.js";

const TAG = "COMMENT-DETAILS-PAGE";

export default {
  name: "CommentDetailsPage",
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
    BackNavigation
    //TitleComponent,
    //SideBar,
    //SearchUsers,
    //SideBarLogin,
  },
  props: {
    comment_id: String,
    from_component: String,
    new_comments: Boolean,
  },
  setup(props, { emit }) {
    const componentName = "Comments";
    const componentTitle = "Comment Details";
    const url_v3 = inject("url_v3");
    const comment_id = ref(props.comment_id);
    const post_id = ref(0);
    const post = ref({});
    const count = ref(0);
    const comments = ref([]);
    const result = ref(true);
    const comment_id_mine = ref(0);
    const comment_id_others = ref(0);
    const return_mine = ref(0);
    const totalMine = ref(0);
    const totalOthers = ref(0);
    const loadMore = ref(true);
    const comment = ref({});
    const scrollComponent = ref(null);

    console.log(TAG, Auth.user);

    if (Auth.user === null) {
      result.value = false;
    } else {
      result.value = true;
    }

    

    //onMounted(() => {
      //console.log(TAG + " onmounted ");
      //count.value = 0;
      //return_mine.value = 0;
      //totalMine.value = 0;
      //totalOthers.value = 0;
      //loadMore.value = true;
      //post_id.value = props.id;
      //comments.value = [];
      //getPost();
    //});

    onActivated(() => {
      document.title = "Places | Comment Details";
      window.addEventListener("scroll", handleScroll);
      window.addEventListener(
        "backbutton",
        function (e) {
          e.preventDefault();
          alert("BACK BUTTON PRESSED");
        },
        false
      );
      comment_id.value = props.comment_id;
      console.log(TAG + "-COMMENT-ID",comment_id.value);
      getCommentDetails();
    });

    onDeactivated(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("backbutton", moveBack());
    });

    const getCommentDetails = () => {
      let page_url = url_v3 + "/get_comment";
      const data = {
        comment_id: "" + comment_id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + " COMMENT RESPONSE", response);
          comment.value = response.data.comment[0];
          post_id.value = comment.value.post_id;
          getPost();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getPost = () => {
      let page_url = url_v3 + "/get_post";
      const data = {
        post_id: "" + post_id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + " POST RESPONSE", response);
          post.value = response.data.post;
          getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getComments = () => {
      let page_url = url_v3 + "/get_comments";
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
      let page_url = url_v3 + "/get_comments";

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

    /** scroll method */
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
      componentTitle,
      comment,
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