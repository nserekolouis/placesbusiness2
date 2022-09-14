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
import { ref, inject } from "vue";

export default {
  name: "CommentReaction",
  props: {
    post: {},
  },
  setup(props, { emit }) {
    console.log("CommentReaction", props.post);

    const post = ref(props.post);
    const liked = ref(props.post.liked);
    const likes = ref(props.post.likes);
    const activeColor = ref("");
    const url = inject("url");

    if (liked.value == 1) {
      activeColor.value = "red";
    } else {
      activeColor.value = "";
    }

    const likeClicked = () => {
      console.log("like clicked");
      let page_url = url + "api/v2/like_comment";
      let data = new FormData();
      data.append("comment_id", post.value.id);
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
      console.log("comment clicked", post.value);
      emit("listen-comment", post.value);
    };

    return {
      liked,
      likes,
      activeColor,
      likeClicked,
      commentClicked,
    };
  },
};
</script>