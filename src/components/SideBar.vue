<template>
  <button
    class="btn d-md-none humberger mt-1"
    style="height:30px;"
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
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
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
              <span class="badge bg-places ml-10"
              :style="{ color: noteColor }"
              >{{
                noteCount
              }}</span>
            </a>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="profile_picture"
              alt="Profile Picture"
              class="rounded-circle"
              width="40"
              height="40"
            />
            <p style="font-weight:400">{{ username }}</p>
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              @click="goToProfile"
            >
              <a class="dropdown-item" href="#">Profile</a>
            </li>
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              @click="goToAccounts"
            >
              <a class="dropdown-item" href="#">Accounts</a>
            </li>
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              @click="goToPrivacyAndSafety"
            >
              <a class="dropdown-item" href="#">Privacy and Safety</a>
            </li>
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
              @click="goToAboutPlaces"
            >
              <a class="dropdown-item" href="#">About Places</a>
            </li>
            <li
              data-bs-dismiss="offcanvas"
              data-bs-target="#offcanvasResponsive"
            >
              <a class="dropdown-item" href="#" @click="logout">Sign out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import placesLogo from "@/assets/images/placeslogo.png";
import Auth from "@/Auth.js";
import { inject, ref, watch } from "vue";
import { getToken, onMessage } from "firebase/messaging";


const TAG = "SIDEBAR";

export default {
  name: "SideBar",
  props: {
    indicatorbg: String,
  },
  setup(props, { emit }) {
    const messaging = inject("messaging");
    const vapidKey = inject("vapidKey");
    const url_v3 = inject("url_v3");
    const noteCount = ref(0);
    const indicator = ref(props.indicatorbg);
    const deleted_post_id = ref("");
    const noteColor = ref("#fff");

    watch(
      () => props.indicatorbg,
      (newVal, oldVal) => {
        console.log(TAG + "NEW-INDICATOR", newVal);
        console.log(TAG + "OLD-INDICATOR", oldVal);
        indicator.value = newVal;
      }
    );

    const requestPermission = () => {
      console.log(TAG + "REQUESTING_PERMISSION ...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("NOTIFICATION_PERMISSION_GRANTED");
          getToken(messaging, { vapidKey: vapidKey })
            .then((currentToken) => {
              if (currentToken) {
                console.log(TAG + "CURRENT_TOKEN", currentToken);
                webOnline(currentToken);
              } else {
                console.log(TAG,"TOKEN NOT AVAILABLE");
              }
            })
            .catch((err) => {
              console.log(TAG,
                "AN ERROR OCCURED WHILE RETREIVING THE TOKEN",
                err
              );
            });
        } else {
          console.log(TAG,"NOTIFICATION PERMISSION NOT GRANTED");
        }
      });
    };
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log(TAG + "MESSAGE_RECEIVED", payload);
      if (payload.data.payload === "9") {
        indicator.value = "#288c7f";
        emit("listen-indicator-color", indicator.value);
      } else if (payload.data.payload === "6") {
        deleted_post_id.value = payload.data.post_id;
        emit("listen-delete-post-id", deleted_post_id.value);
      } else {
        noteColor.value = "#000";
        noteCount.value++;
        emit("listen-notification-count", noteCount.value);
      }
    });

    const webOnline = (currentToken) => {
      let page_url = url_v3 + "/web_online";
      let data = new FormData();
      data.append("token", currentToken);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE WEB ONLINE", response);
          if (response.data.success) {
           
            noteCount.value = response.data.count;
            if(noteCount.value > 0){
              noteColor.value = "#000";
            }else{
               noteColor.value = "#fff";
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const goToNotifications = () => {
      noteColor.value = "#fff";
      noteCount.value = 0;
      emit("listen-notifications",noteCount.value);
    };

    return {
      noteColor,
      noteCount,
      placesLogo,
      indicator,
      goToNotifications,
    };
  },
  data() {
    return {
      places: [],
      profile_picture: Auth.user.user_photo,
      username: Auth.user.username,
    };
  },
  methods: {
    logout() {
      Auth.logout();
    },
    goToHome() {
      this.$emit("listen-home");
    },
    goToProfile() {
      console.log("Go to profile 3");
      this.$emit("listen-profile");
    },
    goToAccounts() {
      this.$emit("listen-accounts");
    },
    goToPrivacyAndSafety() {
      this.$emit("listen-privacy-safety");
    },
    goToAboutPlaces() {
      this.$emit("listen-about-places");
    },
  },
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
  background-color: #fff;
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
    border: 1px solid #ced4da;
    padding: 4px 8px 5px 10px;
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