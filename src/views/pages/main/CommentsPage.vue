<template>
  <back-navigation :info="componentName" @listen-move-back="moveBack" />
  <div class="" ref="scrollComponent" style="margin-top: 10px">
    <ul class="list-group">
      <li class="list-group-item">
        <four-images v-if="post.image_four != null" :post="post" />
        <three-images v-else-if="post.image_three != null" :post="post" />
        <two-images v-else-if="post.image_two != null" :post="post" />
        <one-image v-else-if="post.image_one != null" :post="post" />
        <only-text v-else :post="post" />
      </li>
      <li class="list-group-item">
        <make-comment :post="post" @listen-comment="newComment" />
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
       <li v-show="showSpin" class="list-group-item">
        <spinner-component :spin="spin" :info="spinInfo" />
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import OnlyText from "@/components/commentpagedetails/PostOnlyText.vue";
import OneImage from "@/components/commentpagedetails/PostImagesOne.vue";
import TwoImages from "@/components/commentpagedetails/PostImagesTwo.vue";
import ThreeImages from "@/components/commentpagedetails/PostImagesThree.vue";
import FourImages from "@/components/commentpagedetails/PostImagesFour.vue";
import COnlyText from "@/components/comments/CommentOnlyText.vue";
import COneImage from "@/components/comments/CommentOneImage.vue";
import CTwoImages from "@/components/comments/CommentTwoImages.vue";
import CThreeImages from "@/components/comments/CommentThreeImages.vue";
import CFourImages from "@/components/comments/CommentFourImages.vue";
import MakeComment from "@/components/comments/MakeComment.vue";
import PostExtras from "@/components/posts/PostExtras.vue";
import BackNavigation from "@/components/BackNavigation.vue";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
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
    BackNavigation,
    SpinnerComponent
  },
  props: {
    id: String,
    from_component: String,
    new_comments: Boolean,
  },
  setup(props, { emit }) {
    const componentName = "Comments";
    const url_v3 = inject('url_v3');

    const post_id = ref(props.id);
    const post = ref({});
    const count = ref(0);
    const comments = ref([]);
    const timestamp_mine = ref("");
    const timestamp_others = ref("");
    const return_mine = ref(0);
    const totalMine = ref(0);
    const totalOthers = ref(0);
    const loadMore = ref(true);

    const spin = ref(false);
    const spinInfo = ref(null);
    const showSpin = ref(false);

    const scrollComponent = ref(null);

    const getCommentsIsRunning = ref(false);


    onActivated(() => {
      console.log(TAG + " onactivated ", props.id);
      document.title = "Places | Comments";
      count.value = 0;
      return_mine.value = 0;
      totalMine.value = 0;
      totalOthers.value = 0;
      loadMore.value = true;
      post_id.value = props.id;
      comments.value = [];
      console.log(TAG,"-post_id-"+post_id.value);
      timestamp_mine.value = '';
      timestamp_others.value = '';
      getPost();
    });

    onMounted(() => {
      console.log(TAG,"MOUNTED");
      document.title = "Places | Comments";
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      console.log(TAG + "UNMOUNTED");
      window.removeEventListener("scroll", handleScroll);
      //window.removeEventListener("backbutton", moveBack());
    });

    //methods
    const handleScroll = () => {
      let element = scrollComponent.value;
      console.log(TAG + '-s-height',element.getBoundingClientRect().bottom < (window.innerHeight + 10));
      console.log(TAG + '-s-count',count.value < (totalMine.value + totalOthers.value));
      console.log(TAG + '-s-loadmore',loadMore.value);
      console.log(TAG + '-s-total',count.value >= (totalMine.value + totalOthers.value));

      if (count.value >= (totalMine.value + totalOthers.value)) {
        spin.value = false;
        spinInfo.value = "NO MORE COMMENTS";
      }

      if (
        element.getBoundingClientRect().bottom < (window.innerHeight + 10)&&
        count.value < (totalMine.value + totalOthers.value) &&
        loadMore.value
      ) {
        console.log(TAG + "-SCROLL-GET-COMMENTS");
        loadMore.value = false;
        getComments();
      }
    };

    const getPost = () => {
      console.log(TAG + "-GET-POST");
      let page_url = url_v3 + "/get_post";
      const data = {
        post_id: "" + post_id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + "-POST-DETAILS", response.data.post);
          post.value = response.data.post;
          getComments();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getComments = () => {
      if(getCommentsIsRunning.value === false){
        getCommentsIsRunning.value = true;
        let page_url = url_v3 + "/get_comments";
        if (count.value != 0) {
          if (return_mine.value < totalMine.value) {
            timestamp_mine.value = comments.value[comments.value.length - 1].created_at;
          } else if (return_mine.value == totalMine.value) {
            timestamp_others.value = "";
          } else {
            timestamp_others.value =
              comments.value[comments.value.length - 1].created_at;
          }
        }

        const data = {
          post_id: "" + post_id.value,
          timestamp_mine: timestamp_mine.value,
          timestamp_others: timestamp_others.value,
          return_mine: return_mine.value,
        };

        console.log(TAG + "-GC-DATA", data);

        axios
          .post(page_url, data)
          .then((response) => {
            getCommentsIsRunning.value = false;
            loadMore.value = true;
            console.log(TAG + "-GC-RESPONSE", response);
            let newComments = response.data.comments;
            comments.value.push(...newComments);
            let newTotalMine = response.data.total_mine;
            totalMine.value = newTotalMine;
            let newTotalOthers = response.data.total_others;
            totalOthers.value = newTotalOthers;
            count.value += 5;
            let newReturnMine = response.data.return_mine;
            return_mine.value += newReturnMine;
            if (count.value < (totalMine.value + totalOthers.value)) {
                spin.value = true;
                showSpin.value = true;
            }
          })
          .catch((error) => {
            getCommentsIsRunning.value = false;
            loadMore.value = true;
            console.log(error);
          });
        }
    };

    const newComment = () => {
      count.value = 0;
      let page_url = url_v3 + "/get_comments";

      const data = {
        post_id: "" + post_id.value,
        timestamp_mine: "",
        timestamp_others: "",
        return_mine: 0,
      };

      console.log(TAG + "NEW COMMENT DATA", data);

      axios
        .post(page_url, data)
        .then((response) => {
          loadMore.value = true;
          console.log(TAG + " NEW COMMENT RESPONSE", response);
          let newComments = response.data.comments;
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
      spin,
      spinInfo,
      showSpin,
    };
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}
</style>