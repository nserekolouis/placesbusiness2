<template>
  <div class="row">
    <div class="col">
      <p class="p-username">{{ post.username }}</p>
      <p class="p-userhandle">{{ post.userhandle }}</p>
      <p class="p-timestamp">{{ timestamp }}</p>
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
    };
  },
  watch: {
    post: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length != 0) {
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
</style>