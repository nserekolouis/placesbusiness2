<template>
  <div class="container">
    <div
      class="row"
      v-if="clicked == false"
      style="background-color: #f5f5f5; padding: 5px"
    >
      <div class="col-2">
        <post-profile-picture
          :post="post"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10 clickable" @click="updateNotificationClicked">
        <post-user-info :post="post" />
        <notification-text :post="post" />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-2">
        <post-profile-picture
          :post="post"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10 clickable" @click="updateNotificationClicked">
        <post-user-info :post="post" />
        <notification-text :post="post" />
      </div>
    </div>
  </div>
</template>
<script>
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import NotificationText from "@/views/pages/main/notifications/NotificationText.vue";
import axios from "axios";
import { ref, inject, onMounted } from "vue";

const TAG = "NOTIFICATION_ITEM";

export default {
  name: "NotificationItem",
  props: {
    post: {},
    index: Number,
  },
  setup(props, { emit }) {
    console.log("NOTIFICATION ITEM", props.index);
    const clicked = ref(false);
    const url = inject("url");
    const note_id = ref(props.post.id);
    const post_id = ref(props.post.post_id);

    onMounted(() => {
      console.log("NOTIFICATIONS ITEM ONMOUNTED", props.post.clicked);
      if (props.post.clicked == 0) {
        clicked.value = false;
      } else {
        clicked.value = true;
      }
    });

    const updateNotificationClicked = () => {
      console.log("NOTIFICATION CLICKED");
      let page_url = url + "api/v2/update_clicked";
      const data = {
        notification_id: "" + note_id.value,
      };
      console.log(TAG,props.post)
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(response);
          console.log("NOTIFICATION ID", note_id.value);
          clicked.value = true;
          emit("listen-post-details", post_id.value);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    return {
      clicked,
      updateNotificationClicked,
      goToUserProfile,
    };
  },
  created() {
    console.log("Notification Item");
  },
  components: {
    PostUserInfo,
    PostProfilePicture,
    NotificationText,
  },
};
</script>