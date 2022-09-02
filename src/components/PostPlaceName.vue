<template>
  <div class="col-6 div-left">
    <u>
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
        <button
          v-if="user_id != post.user_id"
          class="dropdown-item"
          type="button"
          @click="followAction"
        >
          {{ follow }}
        </button>

        <button
          v-if="user_id == post.user_id"
          class="dropdown-item"
          type="button"
          @click="deletePost"
        >
          Delete
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
    <modal 
    :show="show"
    :post="post"
    @listen-report-post="reportPost"
    >
      <template #header>
        <h6>Reasons</h6>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import Auth from "@/Auth.js";
import axios from "axios";
import Modal from "@/components/ModalComponent.vue";
import { ref } from "vue";

export default {
  name: "PostPlaceName",
  props: {
    post: {},
    index: Number,
  },
  setup() {
    const show = ref(false);
    const showModal = () => {
      console.log("show modal");
      show.value = !show.value;
    };

    return {
      show,
      showModal,
    };
  },
  components: {
    Modal,
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
      let page_url = this.url + "api/v2/block_user";
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
      let page_url = this.url + "api/v2/delete_post";
      const data = {
        post_id: "" + this.post.id,
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
      console.log("POSTPLACENAME FOLLOW");
      let page_url = this.url + "api/user_follow";
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
  },
};
</script>
<style scoped>
.div-main {
}

.div-left {
}

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
  /* background-color: #c1c1c12e; */
  text-align: center;
  border-radius: 50%;
}

.dropdown-toggle::after {
  display: none;
}
.p-place-name {
  margin-bottom: 0px;
  padding-top: 5px;
  font-size: 0.875rem;
}
</style>