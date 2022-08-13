<template>
    <div class="">
      <img :src="this.url+user.user_photo" 
        class="profile-picture"
      />
      <div class="row">
          <p>{{ user.username }}</p>
          <p>{{ user.userhandle}}</p>
          <p>{{ user.userbio }}</p>
          <p>{{ user.created_at }}</p>
          <div class="row">
              <p>Followers: {{ user.followers }}</p>
              <p>Following: {{ user.following }}</p>
              <button
              type="button"
              @click="followAction"
              >{{ follow }}</button>
          </div>
      </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "UserProfile",
    props: {
        user_id: String
    },
    watch: {
        user_id:{
             immediate:true,
             handler(user_id){
                console.log("WATCH USER DETAILS");
                 this.getUserDetails(user_id);
             }
         }
    },
    data(){
        return {
            user: {},
            follow: "",
        }
    },
    methods: {
        getUserDetails(user_id){
            let page_url = this.url+'api/get_user_details';
            const data = { 
                user_id: ""+user_id
            };
            axios.post(page_url,data)
                .then(response => {
                   console.log("USER DETAILS",response.data);
                   this.user = response.data.user_details;
                   if(response.data.user_details.follow_status == true){
                       this.follow = "Unfollow";
                   }else{
                       this.follow = "Follow"
                   }
                }).catch(error => {
                    console.log(error);
                });
        },
        followAction(){
            let page_url = this.url+'api/user_follow';
            const data = { 
                followed_id: ""+this.user.id
            };
            axios.post(page_url,data)
                .then(response => {
                    console.log("USER FOLLOW MESSAGE",response);
                    console.log("USER FOLLOW STATUS",response);
                    if(response.data.status == 1){
                        this.follow = "Unfollow";
                    }else{
                         this.follow = "Follow"
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
    },
}
</script>