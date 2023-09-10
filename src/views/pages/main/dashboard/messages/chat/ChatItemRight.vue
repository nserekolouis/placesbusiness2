<template>
    <div class="container-fluid">
        <div class="row left-chat">
            <div class="col-md-12">
                <p class="p-msg bg-info p-2 rounded-3">{{message.text}}</p>
                <p style="text-align:right;">{{timestamp}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
const TAG = "C_I_R";
export default {
    name: "ChatItem",
    props:{
        message: Object
    },
    setup(props) {
        const timestamp = ref(props.message.created_at);
        const convertTime = (timestamp) => {
          let diffTime = Math.abs(Date.now() - new Date(timestamp.value));
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
          console.log(TAG,days + "d", hours + "h", minutes + "m", secs + "s");
          if (days > 0) {
            timestamp.value = days + "d";
          } else if (hours > 0) {
            timestamp.value = hours + "h";
          } else if (minutes > 0) {
            timestamp.value = minutes + "m";
          } else {
            timestamp.value = secs + "s";
          }
        };
        convertTime(timestamp);
        return{
            timestamp
        }
    },
}
</script>
<style scoped>
.left-chat{
 float: right
}

.p-msg{
  /* width: 50%; */
  margin-bottom: 0px;
  font-size: 13px;
  white-space: pre-line;
  /* overflow-wrap: break-word; */
}
</style>