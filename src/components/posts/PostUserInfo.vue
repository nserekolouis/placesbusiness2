<template>
  <div class="row">
    <div class="col" style="height:20px;">
      <p class="d-inline-block username"
      >{{ username }}</p>
      <p class="d-inline-block text-muted userhandle"
      >
      {{ userhandle +' '+timestamp }}
      </p>
      <!-- <p class="d-inline-block text-muted timestamp">
      {{ timestamp }}</p> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "PostUserInfo",
  props: {
    post: {},
  },
  data() {
    return {
      timestamp: "",
      username: "",
      userhandle: "",
    };
  },
  watch: {
    post: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length != 0) {
          if(val.username){
            this.username = val.username.substring(0,10);
            this.userhandle = val.userhandle.substring(0,6);
          }
          

          const created = new Date(val.created_at);
          console.log("Created: ", created.toLocaleString());
          let diffTime = Math.abs(Date.now() - new Date(val.created_at));
          let days = diffTime / (24 * 60 * 60 * 1000);
          let hours = (days % 1) * 24;
          let minutes = (hours % 1) * 60;
          let secs = (minutes % 1) * 60;
          [days, hours, minutes, secs] = [
            Math.floor(days),
            Math.floor(hours),
            Math.floor(minutes),
            Math.floor(secs),
          ];
          console.log(days + "d", hours + "h", minutes + "m", secs + "s");
          console.log("Post Text", val.post_text);
          if (days > 0) {
            this.timestamp = days + "d";
          } else if (hours > 0) {
            this.timestamp = hours + "h";
          } else if (minutes > 0) {
            this.timestamp = minutes + "m";
          } else {
            this.timestamp = secs + "s";
          }
        }
      },
    },
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
  font-size: 0.875rem;
}

.username {
  margin-top: 0px;
  margin-left: 0px;
  /* max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip; */
  background-color: white;
} 

.userhandle {
  margin-top: 0px;
  margin-left: 0.25rem;
  /* display: inline-block;
  margin-left: 0.25rem;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: white; */
  font-size: 0.775rem;
}

.timestamp {
  display: inline-block;
  margin-left: 0.25rem;
  max-width: 40px;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  background-color: white;
  font-size: 0.800rem;
}
</style>