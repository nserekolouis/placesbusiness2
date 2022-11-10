<template>
  <div class="container">
    <div
      class="row"
      v-if="clicked === false"
      style="background-color: #f5f5f5; padding: 5px"
    >
      <div class="col-2">
        <post-profile-picture
          :post="notification"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10 clickable" @click="updateNotificationClicked">
        <post-user-info :post="notification" />
        <notification-text :post="notification" />
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-2">
        <post-profile-picture
          :post="notification"
          @listen-user-profile="goToUserProfile"
        />
      </div>
      <div class="col-10 clickable" @click="updateNotificationClicked">
        <post-user-info :post="notification" />
        <notification-text :post="notification" />
      </div>
    </div>
  </div>
</template>
<script>
import PostUserInfo from "@/components/posts/PostUserInfo.vue";
import PostProfilePicture from "@/components/posts/PostProfilePicture.vue";
import NotificationText from "@/views/pages/main/notifications/NotificationText.vue";
import axios from "axios";
import {
  ref,
  inject,
  onMounted,
  onActivated,
} from "vue";

const TAG = "NOTIFICATION_ITEM";

export default {
  name: "NotificationItem",
  props: {
    notification: {},
    index: Number,
  },
  setup(props, { emit }) {
    const clicked = ref(false);
    const url_v3 = inject("url_v3");
    const notification_id = ref(props.notification.id);
    const post_id = ref(props.notification.post_id);
    const comment_id = ref(props.notification.comment_id);

    onMounted(() => {
      if (props.notification.clicked == 0) {
        clicked.value = false;
      } else {
        clicked.value = true;
      }
    });

    onActivated(() => {
      notification_id.value = props.notification.id;
      post_id.value = props.notification.post_id;
      if (props.notification.clicked == 0) {
        clicked.value = false;
      } else {
        clicked.value = true;
      }
    });

    const updateNotificationClicked = () => {
      let page_url = url_v3 + "/update_clicked";

      const data = {
        notification_id: "" + notification_id.value,
      };

      console.log(TAG, data);

      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG,response);
          clicked.value = true;
          if(post_id.value === ""){
            emit("listen-post-details",post_id.value);
          }else{
            emit("listen-comment-details",comment_id.value);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile",post);
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