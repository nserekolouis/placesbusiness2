<template>
  <div class="container reaction-component">
    <div class="row">
      <div class="col-6 div-comment" @click="commentClicked">
        <font-awesome-icon
          icon="fa-regular fa-message"
          class="font-awesome-icon"
        />
        <p class="p-label">{{ post.num_comments }}</p>
      </div>
      <div class="col-6 div-like" @click="likeClicked">
        <font-awesome-icon
          icon="fa-regular fa-heart"
          class="font-awesome-icon"
          :style="{ color: activeColor }"
        />
        <p class="p-label" :style="{ color: activeColor }">{{ likes }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, inject} from "vue";

export default {
  name: "ReactionComponent",
  props: {
    post: {},
  },
  setup(props, { emit }) {
    console.log("ReactionComponent", props.post);

    const post = ref(props.post);
    const liked = ref(props.post.liked);
    const likes = ref(props.post.num_likes);
    const activeColor = ref("");
    const url = inject('url');

    if (liked.value == 1) {
      activeColor.value = "red";
    } else {
      activeColor.value = "";
    }

    const likeClicked = () => {
      console.log("like clicked");
      let page_url = url + "api/v2/like_post";
      let data = new FormData();
      data.append("post_id", post.value.post_id);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE LIKE POST ", response.data.status_code);
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
<style scoped>
p {
  font-size: 0.875rem;
}

.font-awesome-icon {
  font-size: 0.875rem;
  color: #a7a2a9;
}
</style>