<template>
  <div class="row">
    <div class="col-6">
      <img :src="user.user_photo" class="rounded-circle" width="50" height="50"/>
    </div>
    <div class="col-6" style="text-align: right"
    >
      <button
        v-if="showFollowButton"
        type="button"
        class="btn btn btn-outline-primary btn-sm btn-follow mt-0"
        @click="followAction"
      >
        {{ follow }}
      </button>
      <button
        v-if="showCopyButton"
        type="button"
        class="btn btn btn-outline-primary btn-sm btn-follow mt-0"
        @click="copyUserLink"
        style="margin-left:5px;"
      >
      Copy Link
      </button>
    </div>
    <div class="row">
      <p>{{ user.username }}</p>
      <p class="text-muted">{{ user.userhandle }}</p>
      <p class="text-muted">{{ user.userbio }}</p>
      <p class="text-muted">{{ user.created_at }}</p>
    </div>
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-6">
            <p style="display: inline-block; width: 120px">
              Followers: {{ followers }}
            </p>
          </div>
          <div class="col-6">
            <p style="display: inline-block; width: 120px">
              Following: {{ following }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Auth from "@/Auth";
import {ref} from "vue";

const TAG = "USER_PROFILE";

export default {
  name: "UserProfile",
  props: {
    user_id: String,
  },
  setup(props){
    console.log(TAG,Auth);
    const showFollowButton = ref(true);
    const showCopyButton = ref(true);
    
    //const user_id = ref(props.user_id);
    //if(Auth.user.id === user_id.value){
    //showButton.value = false;
    //}else

    if(Object.keys(Auth).length === 0){
        showFollowButton.value = false;
        showCopyButton.value = false;
    }

    const copyUserLink = () => {
      var link = window.location.origin + "/user/" + props.user_id;
      console.log(TAG, link);
      navigator.clipboard.writeText(link);
      alert("Done");
    };

    return {
      showFollowButton,
      showCopyButton,
      copyUserLink
    }

  },
  watch: {
    user_id: {
      immediate: true,
      handler(user_id) {
        console.log("WATCH USER DETAILS");
        this.getUserDetails(user_id);
      },
    },
  },
  data() {
    return {
      user: {},
      follow: "",
      followers: 0,
      following: 0
    };
  },
  methods: {
    getUserDetails(user_id) {
      let page_url = this.url_v1 + "/get_user_details";
      const data = {
        user_id: "" + user_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("USER DETAILS", response.data);
          this.user = response.data.user_details;
          if (response.data.user_details.follow_status == true) {
            this.follow = "Following";
          } else {
            this.follow = "Follow";
          }
          this.followers = response.data.user_details.followers;
          this.following = response.data.user_details.following;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    followAction() {
      let page_url = this.url_v1 + "/user_follow";
      const data = {
        followed_id: "" + this.user.id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("USER FOLLOW MESSAGE", response);
          console.log("USER FOLLOW STATUS", response);
          if (response.data.status == 1) {
            this.follow = "following";
          } else {
            this.follow = "follow";
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
h6 {
  display: inline-block;
  margin-left: 10px;
  font-size: 0.9rem;
}

p {
  margin-bottom: 0px;
}

.profile-picture {
  width: 60px;
  height: 60px;
}

.btn-follow {
  font-size: 12px;
  margin-top: 25px;
}

p {
  margin-bottom: 0px;
  font-size: 0.875rem;
}
</style>