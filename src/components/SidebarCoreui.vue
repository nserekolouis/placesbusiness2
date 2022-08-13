<template>
<CSidebar visible>
  <CSidebarBrand>Places</CSidebarBrand>
  <CSidebarNav>
  <CNavItem href="/homeScreen">
    <CIcon  customClassName="nav-icon" icon="cil-home"/>
      Home
  </CNavItem>
  <CNavItem href="/notificationsscreen">
    <CIcon  customClassName="nav-icon" icon="cil-user"/>
      Notifications
  </CNavItem>
  <CNavItem href="/editprofilescreen">
    <CIcon  customClassName="nav-icon" icon="cil-user"/>
      Profile
  </CNavItem>
  <CNavGroup>
      <template #togglerContent>
        <CIcon  customClassName="nav-icon" icon="cil-settings"/> 
        Settings
      </template>
      <CNavItem href="/accounts">
        <CIcon  customClassName="nav-icon" icon="cil-puzzle"/> 
        Account
      </CNavItem>
      <CNavItem href="/privacyandsafety">
        <CIcon  customClassName="nav-icon" icon="cil-puzzle"/> 
        Privacy & Safety
      </CNavItem>
      <CNavItem href="/aboutplaces">
         <CIcon  customClassName="nav-icon" icon="cil-puzzle"/> 
         About Places
      </CNavItem>
    </CNavGroup>
  </CSidebarNav>
  <CSidebarFooter>
    <CDropdown>
        <CDropdownToggle>
              <img :src="profile_picture" 
              class="profile-picture"
              />
             <p class="h6 p-h6">{{ username }}</p>
        </CDropdownToggle>
        <CDropdownMenu>
            <CDropdownItem href="#"
            @click="logout"
            >
            <CIcon  icon="cil-account-logout"/>    
            Logout</CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
  </CSidebarFooter>
</CSidebar>
</template>
<script>
import Auth from '@/Auth.js';
import router from '@/router';
import { inject } from 'vue';
import { getToken, onMessage } from "firebase/messaging";


export default {
  name: 'SideBar',
  components:{},
  setup() {
    const messaging = inject('messaging')
    const vapidKey = inject('vapidKey')
    
    const requestPermission = () => {
      console.log('Requesting permission...');
      Notification.requestPermission()
      .then((permission) => {
        if(permission === 'granted'){
          console.log("Notification permision granted");
          getToken(messaging, { vapidKey: vapidKey })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Token",currentToken);
            } else {
              console.log('Token not available');
            }
          }).catch((err) => {
            console.log('Token An error occurred while retrieving token. ', err);
          });
        }else{
            console.log("Notification permision not granted");
        }
      })
    }
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  },
  data(){
    return {
      places: [],
      profile_picture: this.url+Auth.user.user_photo,
      username: Auth.user.username,
    }
  },
  methods: {
    logout(){
       Auth.logout;
       router.push({name: 'LoginScreen'});
    }
  },
}
</script>

