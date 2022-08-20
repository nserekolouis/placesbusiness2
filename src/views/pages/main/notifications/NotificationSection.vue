<template>
    <div style="margin-top:5px; margin-bottom:5px">
        <font-awesome-icon icon="fa-solid fa-long-arrow-left"
        @click="$router.back()"
        />
    <h6>Notifications</h6>
   </div>
   <center-infomation
   :info="info"
   v-show="show"
   class="info-missing"
   />
     <ul class="list-group">
           <li v-for="(post, index) in notifications" :key="post.id"
              class="list-group-item"
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
import CenterInfomation from '@/components/CenterInformation.vue';

export default {
    name: 'NotificationSection',
    components: {
        NotificationItem,
        CenterInfomation,
    },
    created(){
        this.getNotifications();
    },
    data(){
        return {
            notifications: [],
            info: "No notifications yet",
            show: true,
        }
    },
    methods: {
        getNotifications(){
            let page_url = this.url+'api/v2/get_notifications';
            axios.get(page_url)
              .then(response =>{
                  console.log("NOTIFICATIONS",response.data.notifications);
                  this.notifications = response.data.notifications
                  if((response.data.notifications) > 0){
                      this.show = false
                  }
              }).catch(error => {
                console.log(error);
              });
        }
    }
}
</script>
<style scoped>
h6 {
    display: inline-block;
    margin-left:10px;
}
</style>