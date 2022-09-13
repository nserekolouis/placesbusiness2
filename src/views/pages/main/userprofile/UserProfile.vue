<template>
  <!-- <div style="margin-top:5px; margin-bottom:5px">
        <font-awesome-icon icon="fa-solid fa-long-arrow-left"
        @click="$router.back()"
        />
    <h6>User Profile</h6>
   </div> -->
  <div class="row">
    <div class="col-6">
      <img :src="this.url + user.user_photo" class="profile-picture" />
    </div>
    <div class="col-6" style="text-align: right">
      <button
        type="button"
        class="btn btn-primary btn-follow"
        @click="followAction"
      >
        {{ follow }}
      </button>
    </div>
    <div class="row">
      <p>{{ user.username }}</p>
      <p>{{ user.userhandle }}</p>
      <p>{{ user.userbio }}</p>
      <p>{{ user.created_at }}</p>
      <!-- <div class="row">
        <p style="display: inline-block; width: 120px">
          Followers: {{ user.followers }}
        </p>
        <p style="display: inline-block; width: 120px">
          Following: {{ user.following }}
        </p>
      </div> -->
    </div>
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-6">
            <p style="display: inline-block; width: 120px">
              Followers: {{ user.followers }}
            </p>
          </div>
          <div class="col-6">
            <p style="display: inline-block; width: 120px">
              Following: {{ user.following }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserProfile",
  props: {
    user_id: String,
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
    };
  },
  methods: {
    getUserDetails(user_id) {
      let page_url = this.url + "api/get_user_details";
      const data = {
        user_id: "" + user_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("USER DETAILS", response.data);
          this.user = response.data.user_details;
          if (response.data.user_details.follow_status == true) {
            this.follow = "Unfollow";
          } else {
            this.follow = "Follow";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    followAction() {
      let page_url = this.url + "api/user_follow";
      const data = {
        followed_id: "" + this.user.id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("USER FOLLOW MESSAGE", response);
          console.log("USER FOLLOW STATUS", response);
          if (response.data.status == 1) {
            this.follow = "Unfollow";
          } else {
            this.follow = "Follow";
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