<template>
  <div class="col-6 div-left">
    <u
    @click="goToPlacePage"
    >
      <button class="d-none p-0 border-0 rounded" 
      style="
      margin-right:2px; 
      width:25px;
      height:25px;
      color:white;
      background: teal;
      ">-</button>
      <p class="p-place-name">{{ post.main_text }}</p>
    </u>
  </div>
  <div class="col-6 div-right">
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ...
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <button class="dropdown-item" type="button" @click="promotePost">
          Promote Post
        </button>
        <button class="dropdown-item" type="button" @click="shareAction">
          Copy Link
        </button>
        <!-- <button
          v-if="user_id != post.user_id"
          class="dropdown-item"
          type="button"
          @click="followAction"
        >
          {{ follow }}
        </button> -->

        <button
          v-if="user_id == post.user_id"
          class="dropdown-item"
          type="button"
          @click="deletePost"
        >
          Delete
        </button>

        <button class="dropdown-item" type="button" @click="unFollowPlace">
          Unfollow place
        </button>

        <button
          class="dropdown-item"
          type="button"
          @click="showModal"
          v-if="user_id != post.user_id"
        >
          Report
        </button>

        <button
          v-if="user_id != post.user_id"
          class="dropdown-item"
          type="button"
          @click="blockUser"
        >
          Block
        </button>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <modal :show="show" :post="post" @listen-report-post="reportPost">
      <template #header>
        <h6>Reasons</h6>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import Auth from "@/Auth.js";
import axios from "axios";
import Modal from "@/components/posts/PostModal.vue";


import { ref } from "vue";
import Constants from "@/constants/index.js";

const TAG = "POST_PLACE_NAME";

export default {
  name: "PostPlaceName",
  components: {
    Modal
  },
  props: {
    post: {},
    index: Number,
  },
  setup(props,{emit}) {
    console.log(TAG,props.post);
    const show = ref(false);
    const place = ref({});
    const post = ref(props.post);
    const showPromotePost = ref(false);
    

    const showModal = () => {
      console.log("show modal");
      show.value = !show.value;
    };

    const goToPlacePage = () => {
      place.value = {
        places_id: post.value.place_id,
        main_text: post.value.main_text,
      };
      emit("listen-place-page", place.value);
    };

    const promotePost = () => {
      console.log(TAG,"promote post");
      emit("listen-promote-post", post.value);
    };

    const moveBack = () => {
      emit("listen-move-back");
    };

    return {
      show,
      showModal,
      place,
      goToPlacePage,
      promotePost,
      showPromotePost,
      moveBack,
    };
  },
  data() {
    return {
      user_id: Auth.user.id,
      follow: "",
      open: false,
    };
  },
  watch: {
    post: {
      immediate: true,
      handler(val, oldVal) {
        console.log("New Value", val);
        console.log("Old Value", oldVal);
        if (Object.keys(val).length != 0) {
          if (val.follow_status == 1) {
            this.follow = "UnFollow User";
          } else {
            this.follow = "Follow User";
          }
        }
      },
    },
  },
  methods: {
    blockUser() {
      console.log("BLOCK USER");
      let page_url = this.url_v3 + "/block_user";
      const data = {
        blocked_user_id: "" + this.post.user_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("BLOCK USER", response);
          if (response.data.status == 1) {
            this.$emit("listen-block-user", this.index);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reportPost() {
      console.log("Report Post");
      this.$emit("listen-report-post");
    },
    deletePost() {
      console.log("DELETE POST");
      let page_url = this.url_v3 + "/delete_post";
      const data = {
        post_id: "" + this.post.post_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("DELETE POST RESPONSE", response);
          if (response.data.is_deleted == 1) {
            this.$emit("listen-delete-post", this.index);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    followAction() {
      let page_url = this.url_v1 + "/user_follow";
      const data = {
        followed_id: "" + this.post.user_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("POSTPLACENAME RESPONSE", response.data.status);
          if (response.data.status == 1) {
            this.follow = "Unfollow user";
          } else {
            this.follow = "Follow user";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unFollowPlace() {
      let page_url = this.url_v3 + "/remove_user_place_subscription";
      const data = {
        place_id: "" + this.post.place_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("REMOVE PLACE SUB", response);
          if (response.data.status_code == 1) {
            alert(Constants.REMOVE_PLACE + "" + this.post.main_text);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    shareAction() {
      var link = window.location.origin + "/post/" + this.post.post_id;
      console.log(TAG, link);
      navigator.clipboard.writeText(link);
    },
  },
};
</script>
<style scoped>
.div-right {
  text-align: right;
}

.place-name {
  width: 100px;
}

.dropdown {
  width: 36px;
  height: 30px;
  display: inline-block;
  margin-left: auto;
  text-align: center;
  border-radius: 50%;
}

.dropdown-toggle::after {
  display: none;
}

.p-place-name {
  margin-bottom: 0px;
  padding-top: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #288c7f;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
}
</style>