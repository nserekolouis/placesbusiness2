<template>
  <div class="btn-home">
    <h6>Notifications</h6>
  </div>
  <center-infomation :info="info" v-show="show" class="info-missing" />
  <ul class="list-group" ref="scrollComponent">
    <li
      v-for="(post, index) in notifications"
      :key="post.id"
      class="list-group-item"
    >
      <notification-item
        :post="post"
        :index="index"
        @listen-post-details="goToPostDetails"
      />
    </li>
  </ul>
</template>
<script>
import axios from "axios";
import NotificationItem from "@/views/pages/main/notifications/NotificationItem.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import { inject, ref, onMounted, watch, onUnmounted } from "vue";

export default {
  name: "NotificationSection",
  props: {
    new_notifications: Boolean,
  },
  setup(props) {
    const url = inject("url");
    const show = ref(true);
    const notifications = ref([]);
    const info = "No notifications yet";
    const count = ref(0);
    const total = ref(0);
    const limit = 10;
    const loadMore = ref(false);
    const note_id = ref(0);

    const scrollComponent = ref(null);

    watch(
      () => props.new_notifications,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        getNotifications();
      }
    );

    onMounted(() => {
      console.log("NOTIFICATIONS ONMOUNTED");
      window.addEventListener("scroll", handleScroll);
      getNotifications();
    });

    onUnmounted(() => {
      console.log("NOTIFICATIONS ONUNMOUNTED");
      window.removeEventListener("scroll", handleScroll);
    });

    const getNotifications = () => {
      let page_url = url + "api/v2/get_notifications";

      if (count.value > 0) {
        note_id.value = notifications.value[notifications.value.length - 1];
      }

      const data = {
        notification_id: "" + note_id.value,
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

    return {
      notifications,
      info,
      show,
      scrollComponent,
    };
  },
  components: {
    NotificationItem,
    CenterInfomation,
  },
  methods: {
    goToPostDetails(post_id) {
      this.$emit("listen-post-details", post_id);
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