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
export default {
  name: "ReactionComponent",
  props: {
    post: {},
  },
  watch: {
    post: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length != 0) {
          if (val.liked == 1) {
            this.activeColor = "red";
          } else {
            this.activeColor = "";
          }
        }
      },
    },
  },
  data() {
    return {
      activeColor: "",
      likes: this.post.likes,
    };
  },
  methods: {
    likeClicked() {
      console.log("like clicked");
      let page_url = this.url + "api/v2/like_comment";
      let data = new FormData();
      data.append("comment_id", this.post.id);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE LIKE COMMENT", response);
          if (response.data.liked == 1) {
            this.activeColor = "red";
          } else {
            this.activeColor = "";
          }
          this.likes = response.data.num_likes;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>