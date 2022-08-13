<template>
  <div class="container-fluid">
    <app-header/>
    <div class="row" style="height:100vh">
      <div class="col-sm-6 userhandle">
        <p :style="{ color: activeColor }">{{ response_handle }}</p>
        <input
          class="form-control"
          placeholder="@userhandle"
          v-model="userhandle"
          @input="onChange"
          type="text"
        />
        <button 
        type="button"
        class="btn btn-light btn-userhandle"
        @click="next">Next</button>
      </div>
      
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Auth from '@/Auth.js';
import router from '@/router';
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'UserHandle',
  components:{
    AppHeader,
  },
  props: {
   
  },
  data () {
    return {
      userhandle: "",
      response_handle: "",
      status_code: 0,
      activeColor: '',
    }
  },
  mounted () {
    console.log('TOKEN',Auth);
  },
  methods: {
    onChange(){
      const data = { 
          user_handle: '@'+this.userhandle,
          app_token: "web-platform",
          user_agent: "web"
      };
      axios.post("http://192.168.43.79:8000/api/v2/user_handle", data)
      .then(response => {
          console.log("Response", response);
          if(response.data.success){
            this.status_code = response.data.status_code;
            if(this.status_code == 1){
              this.response_handle = "Userhandle is available";
              this.activeColor = 'green';
            }else{
              this.response_handle = "Userhandle is not available";
              this.activeColor = 'red';
            }
          }
      })
      .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
      });
    },
    next(){
      console.log("profilescreen");
      if(this.status_code == 1){
        router.push({name: 'ProfileScreen'});
      }else{
        alert("Put correct userhandle");
      }
  }
  },
}
</script>