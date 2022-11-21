<template>
    <div class="row" style="
    border-top:1px solid #dfdfdf; 
    margin-top:2px; 
    border-bottom:1px solid #dfdfdf;">
        <div class="col">
            <p class="mt-1 mb-1"
            style="
            width:fit-content;
            padding-top:0px;
            padding-bottom:0px;
            padding-left:8px;
            padding-right:8px;
            border-radius:5px;
            font-size:13px;
            border: 1px solid #dfdfdf;
            cursor: pointer;
            color: gray;
            "
            @click="followUser"
            >{{followSign}}</p>
        </div>
    </div>
</template>
<script>
import { 
  ref, 
  watch, 
  inject,
  onMounted
  } from "vue";

import Auth from "@/Auth.js";
import axios from "axios";

const TAG = "Follow_Component";

export default {
  name: "FollowComponent",
  props: {
    post: {},
    followObject: {}
  },
  setup(props,{emit}){
    const followSign = ref("follow user");
    const url_v1 = inject("url_v1");
    const pst = ref(props.post);
    const user_id = Auth.user.id;
    const resp = ref("");
    const followers = ref(0);

    

    onMounted(() => {
      console.log("++++",pst.value);
      if(pst.value.follow_status == 1){
          followSign.value = "following";
      }
    });

    watch(
      () => props.post,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        if(newVal.follow_status == 1){
          followSign.value = "following";
        }
      });

    watch(
      () => props.followObject,
      (newVal, oldVal) => {
        console.log(TAG + "-FollowObj-New-Value", newVal);
        console.log(TAG + "-FollowObj-Old-Value", oldVal);

        if(newVal.followed_id == pst.value.user_id){
          if(newVal.follow_sign == 'follow user'){
            followSign.value = "following | followers: "+followers.value; 
          }else{
            followSign.value = "follow user";
          }
        }
      });

    const followUser = () => {
      let page_url = url_v1 + "/user_follow";
      const data = {
        followed_id: pst.value.user_id
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("user-follow-response", response);
          resp.value = response.data;
          followers.value = response.data.count;

        //   if (response.data.status === 1) {
        //     followSign.value = "following | followers: "+fo; 
        //   } else {
        //      followSign.value = "follow";
        //   }

          const followObj = {
            followed_id: pst.value.user_id,
            follow_sign: followSign.value,
          }

          emit("listen-follow-object",followObj);
          

        })
        .catch((error) => {
          console.log(error);
        });
    }

    return {
      followSign,
      followUser,
      user_id,
      resp
      //show,
      //followers
    }
  },
};
</script>
