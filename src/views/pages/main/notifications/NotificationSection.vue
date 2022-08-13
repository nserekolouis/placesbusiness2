<template>
     <ul class="ul-post">
           <li v-for="(post, index) in notifications" :key="post.id"
              class="li-bar-post post-card"
              >
              <notification-item
              :post="post"
              :index="index"
              />
           </li>
       </ul>
</template>
<script>
import axios from "axios";
import NotificationItem from '@/views/pages/main/notifications/NotificationItem.vue'

export default {
    name: 'NotificationSection',
    components: {
        NotificationItem,
    },
    created(){
        this.getNotifications();
    },
    data(){
        return {
            notifications: []
        }
    },
    methods: {
        getNotifications(){
            let page_url = this.url+'api/v2/get_notifications';
            axios.get(page_url)
              .then(response =>{
                  console.log("NOTIFICATIONS",response.data.notifications);
                  this.notifications = response.data.notifications
              }).catch(error => {
                console.log(error);
              });
        }
    }
}
</script>