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
export default {
  name: "ReactionComponent",
  props: {
    post: {},
  },
  setup(props) {
    console.log("PR", props);
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
          this.likes = val.num_likes;
        }
      },
    },
  },
  data() {
    return {
      activeColor: "",
    };
  },
  methods: {
    commentClicked() {
      console.log("comment clicked", this.post);
      this.$emit("listen-comment", this.post);
    },
    likeClicked() {
      console.log("like clicked");
      let page_url = this.url + "api/v2/like_post";
      let data = new FormData();
      data.append("post_id", this.post.id);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE LIKE POST ", response.data.status_code);
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
<style scoped>
p {
  font-size: 0.875rem;
}

.font-awesome-icon {
  font-size: 0.875rem;
  color: #a7a2a9;
}
</style>