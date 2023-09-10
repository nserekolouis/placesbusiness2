<template>
    <div class="row">
        <div class="col-md-4">
            <img :src="url + receiver.user_photo" alt="Girl in a jacket" width="50" height="50">
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-4">
                    <p>{{receiver.username}}</p>
                </div>
                <div class="col-md-4">
                    <p>{{receiver.userhandle}}</p>
                </div>
                <div class="col-md-4">
                    <p>{{timestamp}}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <p>{{receiver.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    //watch,
    inject,
    ref} from "vue";

const TAG = "M_I";

export default {
    name: "MessageItem",
    props: {
        receiver: Object
    },
    setup(props) {
        console.log(TAG+"_props",props);
        const timestamp = ref(props.receiver.created_at);
        const url = inject('url');
        console.log(TAG + "_timestamp",timestamp);
        
        // watch(() => props.receiver, (first, second) => {
        //     console.log(
        //         TAG + "_props",
        //         first,
        //         second
        //     );
        // });
        const convertTime = (timestamp) => {
          //const created = new Date(val.created_at);
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
        return {
            timestamp,
            url
        }
    },
}
</script>