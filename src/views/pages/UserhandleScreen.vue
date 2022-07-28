<template>
  <app-header/>
  <div class="container">
    <div class="row">
      <p>{{ response_handle }}</p>
      <input
        class="input-userhandle"
        placeholder="@userhandle"
        v-model="userhandle"
        @input="onChange"
        type="text"
      />
      <button @click="next">Next</button>
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
      status_code: 0
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
            }else{
              this.response_handle = "Userhandle is not available";
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>