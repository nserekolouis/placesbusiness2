<template>
  <div class="container reaction-component">
    <div class="row">
      <div class="col-sm-12 div-comment-like" @click="likeClicked">
        <CIcon icon="cilHeart" size="m" :style="{ color: activeColor }" />
        <p class="p-label" :style="{ color: activeColor }">{{ likes }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, inject, watch } from "vue";

const TAG = "COMMENT_REACTION";

export default {
  name: "CommentReaction",
  props: {
    post: {},
  },
  setup(props, { emit }) {
    console.log(TAG, props.post);
    const pst = ref(props.post);
    const liked = ref(props.post.liked);
    const likes = ref(props.post.likes);
    const activeColor = ref("");
    const url_v3 = inject("url_v3");

    watch(
      () => props.post,
      (newVal, oldVal) => {
        console.log("oldVal",oldVal);
        console.log("newVal",newVal);
        pst.value = newVal;
        liked.value = newVal.liked;
        likes.value = newVal.likes;

        if (liked.value == 1) {
          activeColor.value = "red";
        } else {
          activeColor.value = "";
        }
      }
    );

    const likeClicked = () => {
      console.log("like clicked");
      let page_url = url_v3 + "/like_comment";
      let data = new FormData();
      data.append("comment_id", pst.value.id);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE LIKE COMMENT", response);
          if (response.data.liked == 1) {
            activeColor.value = "red";
          } else {
            activeColor.value = "";
          }
          likes.value = response.data.num_likes;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const commentClicked = () => {
      console.log("comment clicked", pst.value);
      emit("listen-comment", pst.value);
    };

    return {
      pst,
      liked,
      likes,
      activeColor,
      likeClicked,
      commentClicked,
    };
  },
};
</script>