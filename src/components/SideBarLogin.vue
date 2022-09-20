<template>
  <button
    class="btn d-md-none humberger"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasResponsive"
    aria-controls="offcanvasResponsive"
  >
    <font-awesome-icon icon="fa-solid fa-bars" />
  </button>
  <div
    class="offcanvas-md offcanvas-start"
    tabindex="-1"
    id="offcanvasResponsive"
    aria-labelledby="offcanvasResponsiveLabel"
  >
    <div class="offcanvas-body">
      <button
        type="button"
        class="btn-close btn-close-left"
        data-bs-dismiss="offcanvas"
        data-bs-target="#offcanvasResponsive"
        aria-label="Close"
        style="border: 1px solid black"
      ></button>
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-white sb">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img :src="placesLogo" class="places-logo" />
        </a>
        <!-- <hr /> -->
        <!-- <ul class="nav nav-pills flex-column mb-auto">
          <li
            class="nav-item"
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            @click="goToHome"
          >
            <a href="#" class="nav-link link-dark" aria-current="page">
              <div class="" style="position: relative">
                <font-awesome-icon icon="fa-solid fa-house" />
                <span
                  class="position-absolute top-0 start-1 translate-middle p-1 bg-places border border-light rounded-circle"
                  :style="{ backgroundColor: indicator }"
                >
                  <span class="visually-hidden">New alerts</span>
                </span>
                <p>Home</p>
              </div>
            </a>
          </li>
          <li
            data-bs-dismiss="offcanvas"
            data-bs-target="#offcanvasResponsive"
            @click="goToNotifications"
          >
            <a href="#" class="nav-link link-dark">
              <font-awesome-icon icon="fa-solid fa-bell" />
              <p>Notifications</p>
              <span class="badge bg-places" style="margin-left: 10px">{{
                noteCount
              }}</span>
            </a>
          </li>
        </ul> -->
        <hr />
        <GoogleLogin :callback="callback" prompt class="btn-google" />
      </div>
    </div>
  </div>
</template>
<script>
//import axios from "axios";
import placesLogo from "@/assets/images/placeslogo.png";
//import Auth from "@/Auth.js";
//import { inject, ref, watch } from "vue";
//import { getToken, onMessage } from "firebase/messaging";
import { ref } from "vue";

export default {
  name: "SideBar2",
  props: {
    indicatorbg: String,
  },
  setup() {
    //const messaging = inject("messaging");
    //const vapidKey = inject("vapidKey");
    //const url = inject("url");
    //const noteCount = ref(0);
    //const indicator = ref("#fff");
    //const deletedArray = ref([]);
    //const deleted_post_id = ref("");
    const prompt = ref(false);

    // watch(
    //   () => props.indicatorbg,
    //   (newVal, oldVal) => {
    //     console.log("indicator", newVal);
    //     console.log("indicator", oldVal);
    //     indicator.value = newVal;
    //   }
    // );

    // const requestPermission = () => {
    //   console.log("Requesting permission...");
    //   Notification.requestPermission().then((permission) => {
    //     if (permission === "granted") {
    //       console.log("Notification permision granted");
    //       getToken(messaging, { vapidKey: vapidKey })
    //         .then((currentToken) => {
    //           if (currentToken) {
    //             console.log("Token", currentToken);
    //             webOnline(currentToken);
    //           } else {
    //             console.log("Token not available");
    //           }
    //         })
    //         .catch((err) => {
    //           console.log(
    //             "Token An error occurred while retrieving token. ",
    //             err
    //           );
    //         });
    //     } else {
    //       console.log("Notification permision not granted");
    //     }
    //   });
    // };
    // requestPermission();

    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    //   if (payload.data.payload === "9") {
    //     indicator.value = "#288c7f";
    //   } else if (payload.data.payload === "6") {
    //     //const data = {
    //     deleted_post_id.value = payload.data.post_id;
    //     console.log("DELETED POST ID 1", deleted_post_id.value);
    //     emit("listen-delete-post-id", deleted_post_id.value);
    //     //};
    //     //deletedArray.value.push(...[data]);
    //     //console.log("Deleted Array", deletedArray.value[0].post_id);
    //     //emit('listen-delete-array',deletedArray.value);
    //   } else {
    //     noteCount.value++;
    //   }
    // });

    // const webOnline = (currentToken) => {
    //   let page_url = url + "api/v2/web_online";
    //   let data = new FormData();
    //   data.append("token", currentToken);
    //   axios
    //     .post(page_url, data)
    //     .then((response) => {
    //       console.log("RESPONSE WEB ONLINE", response);
    //       if (response.data.success) {
    //         noteCount.value = response.data.count;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    // const goToNotifications = () => {
    //   noteCount.value = 0;
    //   emit("listen-notifications");
    // };

    return {
      //noteCount,
      //placesLogo,
      //indicator,
      //goToNotifications,
      prompt,
    };
  },
  data() {
    return {
      //places: [],
      //profile_picture: this.url + Auth.user.user_photo,
      //username: Auth.user.username,
    };
  },
  //   methods: {
  //     logout() {
  //       Auth.logout();
  //     },
  //     goToHome() {
  //       this.$emit("listen-home");
  //     },
  //     goToProfile() {
  //       console.log("Go to profile 3");
  //       this.$emit("listen-profile");
  //     },
  //     goToAccounts() {
  //       this.$emit("listen-accounts");
  //     },
  //     goToPrivacyAndSafety() {
  //       this.$emit("listen-privacy-safety");
  //     },
  //     goToAboutPlaces() {
  //       this.$emit("listen-about-places");
  //     },
  //   },
};
</script>
<script setup>
import { decodeCredential } from "vue3-google-login";
import router from "@/router";
import { inject } from "vue";
import axios from "axios";
import Auth from "@/Auth.js";

const url = inject("url");

const callback = (response) => {
  const userData = decodeCredential(response.credential);
  console.log("Handle the userData", userData.email);
  const data = {
    email: userData.email,
    password: "password",
    password_confirmation: "password",
    role: "Client",
  };
  let page_url = url + "api/v2/register";
  axios
    .post(page_url, data)
    .then((response) => {
      console.log("Response LOGIN", response.data.exist);
      console.log("Response LOGIN USER", response.data.user.userhandle);
      Auth.login(response.data.token, response.data.user);
      console.log("1");
      if (response.data.user.userhandle == null) {
        console.log("2");
        router.push({ name: "UserHandle" });
      } else if (response.data.user.username == null) {
        console.log("3");
        router.push({ name: "UploadProfile" });
      } else {
        console.log("4");
        router.push({ name: "SwitchScreen" });
        //router.push({ name: "UploadProfile" });
      }
    })
    .catch((error) => {
      console.error("There was an error!", error.message);
    });
};
</script>
<style scoped>
p {
  display: inline;
  margin-left: 10px;
  margin-bottom: 0px;
  font-size: 15px;
}

.bg-places {
  background-color: #288c7f;
}

.sb {
  width: 280px;
  height: 90vh;
  border: 0px;
}
html:not([dir="rtl"]) .offcanvas.offcanvas-start {
  transform: translateX(0%);
}

.btn-close {
  display: none;
}

@media (max-width: 1199.98px) {
  .btn-close {
    display: none;
  }
}

@media (max-width: 991.98px) {
  html:not([dir="rtl"]) .offcanvas-sm.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: none;
  }

  .btn {
    border: 0px solid black;
  }

  .btn-menu-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .offcanvas-md.offcanvas-start {
    width: 330px;
  }

  .btn-close-right {
    position: absolute;
    left: 1px;
    top: 1px;
  }

  .btn-close-left {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  .main {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (max-width: 767.98px) {
  html:not([dir="rtl"]) .offcanvas-md.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: block;
  }

  .offcanvas-sm.offcanvas-start {
    width: 330px;
  }
}
</style>