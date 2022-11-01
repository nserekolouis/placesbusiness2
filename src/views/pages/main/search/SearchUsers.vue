<template>
  <div class="container" style="margin-top: 10px">
    <div class="row">
      <div class="col">
        <!-- <input
          class="form-control form-control-sm"
          type="search"
          placeholder="Search for users"
          aria-label="Search User"
          v-model="search_user"
          @input="searchUser"
          style="min-width: 240px"
        /> -->
        <div class="input-group"
        style="min-width:240px"
        >
          <div class="input-group-prepend">
            <span class="input-group-text p-1 mt-1 span-prepend" id="basic-addon1">@</span>
          </div>
          <input type="text" 
          class="form-control form-control-sm mt-1" 
          placeholder="Search for User" 
          aria-label="Search for User" 
          aria-describedby="basic-addon1"
          @input="searchUser"
          v-model="search_user"
          >
        </div>
      </div>
      <div class="col">
        <ul class="list-group" 
            style="min-width:240px;"
            v-if="usersFound">
          <li
            v-for="user in users"
            :key="user.id"
            class="list-group-item"
            @click="selectUser(user)"
            style="padding:5px; cursor:pointer"
          >
            <user-item :post="user" />
          </li>
        </ul>
        <ul class="list-group" v-else>
          <li class="list-group-item">
            <p>No Users Founder</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UserItem from "@/views/pages/main/search/UserItem.vue";

export default {
  name: "SearchUsers",
  components: {
    UserItem,
  },
  data() {
    return {
      search_user: "",
      users: [],
      searching: false,
      usersFound: true,
    };
  },
  methods: {
    searchUser() {
      if (this.searching == false) {
        this.searching = true;
        let page_url = this.url_v1 + "/search_people";

        const data = {
          query: this.search_user,
        };

        axios
          .post(page_url, data)
          .then((response) => {
            console.log("RESPONSE USERS", response);
            let newUsers = response.data.predictions;
            this.searching = false;
            if (newUsers.length === 0) {
              this.usersFound = false;
              this.users = [];
            } else {
              this.usersFound = true;
              this.users = newUsers;
            }
          })
          .catch((error) => {
            console.log(error);
            this.searching = false;
            this.users = [];
            this.usersFound = true;
          });
      }
    },
    focusChanged() {
      console.log("Focus changed");
      this.users = [];
    },
    selectUser(user) {
      console.log("selectUser...", user);
      this.search_user = "";
      this.users = [];
      this.$emit("listen-search-user-profile", user.app_user_id);
    },
  },
};
</script>
<style scoped>
.row {
  text-align: center;
  margin-left: 1px;
  margin-right: 1px;
}
.list-group {
  padding: 0px;
}
.span-prepend{
  height: 31px;
  margin-right: -4px;
  width: 31px;
}
</style>