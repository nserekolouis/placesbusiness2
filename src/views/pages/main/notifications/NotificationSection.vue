<template>
  <title-component class="d-none d-sm-block" :title="componentTitle" />
  <post-pages-top-component 
   class="d-md-none"
   :indicator="color"
   :noteCount="nCount"
   :LeftColor="leftColor"
   :RightColor="rightColor"
   @listen-home="goToHome"
   @listen-notifications="goToNotifications"
  />
  <center-infomation :info="info" v-show="show" class="info-missing" />
  <ul class="list-group" ref="scrollComponent">
    <li
      v-for="(notification, index) in notifications"
      :key="notification.id"
      class="list-group-item"
    >
      <notification-item
        :notification="notification"
        :index="index"
        @listen-post-details="goToPostDetails"
        @listen-comment-details="goToCommentDetailsPage"
        @listen-user-profile="goToUserProfile"
      />
    </li>
  </ul>
</template>
<script>
import axios from "axios";
import NotificationItem from "@/views/pages/main/notifications/NotificationItem.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import PostPagesTopComponent from "@/components/PostPagesTopComponent.vue"
import { inject, ref, onMounted, onUnmounted, onActivated } from "vue";

export default {
  name: "NotificationSection",
  components: {
    TitleComponent,
    NotificationItem,
    CenterInfomation,
    PostPagesTopComponent
  },
  props: {
    new_notifications: Boolean,
  },
  setup(props, { emit }) {
    const url_v3 = inject("url_v3");
    const show = ref(true);
    const notifications = ref([]);
    const info = "No notifications yet";
    const count = ref(0);
    const total = ref(0);
    const limit = 10;
    const loadMore = ref(false);
    const note_id = ref(0);
    const scrollComponent = ref(null);
    const componentName = "Notifications";


   onActivated(() => {
      count.value = 0;
          note_id.value = 0;
          notifications.value = [];
          refreshNotifications();
    });

    onMounted(() => {
      document.title = "Places | Notifications";
      console.log("NOTIFICATIONS ONMOUNTED");
      window.addEventListener("scroll", handleScroll);
      getNotifications();
    });

    onUnmounted(() => {
      console.log("NOTIFICATIONS ONUNMOUNTED");
      window.removeEventListener("scroll", handleScroll);
    });

    const getNotifications = () => {
      let page_url = url_v3 + "/get_notifications";

      if (count.value > 0) {
        note_id.value = notifications.value[notifications.value.length - 1];
      }

      const data = {
        notification_id: "" + 0,
      };

      axios
        .post(page_url, data)
        .then((response) => {
          console.log("NOTIFICATIONS", response);
          let newNotifications = response.data.notifications;
          if (newNotifications.length > 0) {
            show.value = false;
            notifications.value.push(...newNotifications);
            count.value += limit;
            total.value = response.data.total;
            if (count.value >= total.value) {
              loadMore.value = false;
            } else {
              loadMore.value = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const refreshNotifications = () => {
      let page_url = url_v3 + "/get_notifications";

      const data = {
        notification_id: "" + 0,
      };

      axios
        .post(page_url, data)
        .then((response) => {
          console.log("NOTIFICATIONS", response);
          let newNotifications = response.data.notifications;
          if (newNotifications.length > 0) {
            show.value = false;
            notifications.value = newNotifications;
            count.value += limit;
            total.value = response.data.total;
            if (count.value >= total.value) {
              loadMore.value = false;
            } else {
              loadMore.value = true;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleScroll = () => {
      let element = scrollComponent.value;
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        loadMore.value
      ) {
        loadMore.value = false;
        getNotifications();
      }
    };

    const componentTitle = "Notifications";

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    const goToHome = () => {
      emit("listen-home");
    };

    const goToNotifications = () => {
      emit("listen-notifications");
    };


    return {
      notifications,
      info,
      show,
      scrollComponent,
      componentName,
      componentTitle,
      goToUserProfile,
      goToHome,
      goToNotifications
    };
  },
  data(){
    return {
      leftColor: "1px solid #80808026",
      rightColor: "1px solid #288c7f"
    }
  },
  methods: {
    goToPostDetails(post_id) {
      this.$emit("listen-post-details", post_id);
    },
    goToCommentDetailsPage(comment_id) {
      this.$emit("listen-comment-details", comment_id);
    },
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}
</style>