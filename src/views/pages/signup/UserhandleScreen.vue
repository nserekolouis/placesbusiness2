<template>
  <div class="container-fluid">
  <app-header />
  <div class="row">
    <div class="col-6 userhandle">
      <p :style="{ color: activeColor }" class="p-response">
        {{ response_handle }}
      </p>
      <div class="form-item">
        <label>@userhandle</label>
        <input
          class="form-control"
          placeholder="userhandle"
          v-model="userhandle"
          @input="onChange"
          type="text"
          maxlength="32"
        />
      </div>
      <div class="form-item" style="position:relative">
        <button
          type="button"
          class="btn btn-primary btn-next"
          @click="next"
          >
          Next
        </button>
         <div 
         class="spinner-border spinner-border-sm  next-spinner-pos" 
         role="status"
         :style="{ display: nextSpin }"
          >
          <span class="visually-hidden">Loading...</span>
         </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Auth from "@/Auth.js";
import router from "@/router";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: "UserHandle",
  components: {
    AppHeader,
  },
  props: {},
  data() {
    return {
      userhandle: "",
      response_handle: "",
      status_code: 0,
      activeColor: "",
      nextSpin: "none"
    };
  },
  mounted() {
    console.log("TOKEN", Auth);
  },
  methods: {
    onChange() {
      if (this.userhandle.indexOf(" ") >= 0) {
        //nospace
        this.response_handle = "No space";
        this.activeColor = "red";
      } else if (this.userhandle.indexOf("@") >= 0) {
        // no @
        this.response_handle = "remove @ symbol";
        this.activeColor = "red";
      } else if (this.userhandle.length < 3) {
        //minimumcharacter
        this.response_handle = "3 characters minimum";
        this.activeColor = "red";
      } else {
        this.nextSpin = "block";
        const data = {
          user_handle: "@" + this.userhandle,
          app_token: "web-platform",
          user_agent: "web",
        };
        let page_url = this.url_v3 + "/user_handle";
        axios
          .post(page_url, data)
          .then((response) => {
            console.log("Response", response);
            this.nextSpin = "none";
            if (response.data.success) {
              this.status_code = response.data.status_code;
              if (this.status_code == 1) {
                this.response_handle = "Userhandle is available";
                this.activeColor = "green";
              } else {
                this.response_handle = "Userhandle is not available";
                this.activeColor = "red";
              }
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            this.nextSpin = "none";
            console.error("There was an error!", error);
          });
      }
    },
    next() {
      console.log("profilescreen");
      if (this.status_code == 1) {
        router.push({ name: "UploadProfile" });
      } else {
        alert("Put correct userhandle");
      }
    },
  },
};
</script>
<style scoped>
.p-response {
  margin-left: auto;
  margin-right: auto;
  width: 180px;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
}

.btn-next{
  margin-left: auto;
  display: block;
  font-weight: bold;
  height: 35px;
  font-size: 15px;
}

.userhandle{
  min-width: 200px;
  margin-top: 140px;
}

.next-spinner-pos {
  position: absolute;
  right: 11%;
  top: 11px;
}
</style>