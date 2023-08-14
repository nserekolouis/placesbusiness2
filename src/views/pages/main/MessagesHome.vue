<template>
    <div class="row">
        <div class="col-md-8">
            <title-component class="d-none d-sm-block" :title="componentTitle" />
            <post-pages-top-component 
            class="d-md-none"
            :indicator="color"
            :noteCount="nCount"
            :LeftColor="leftColor"
            :RightColor="rightColor"
            @listen-home="goToHome"
            @listen-notifications="goToNotifications"
            />
            <center-infomation :info="info" v-show="show" class="info-missing" />
            <ul class="list-group">
                <li class="list-group-item"
                v-for="(message) in messages"
                :key="message.id"
                >
                {{ message }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {inject, ref, onActivated} from "vue";
const TAG = "M_H";
export default {
    setup() {
        const messages = ref([]);
        const url_v3 = inject('url_v3');

        onActivated(() => {
            getMessages();
        });

        const getMessages = () => {
            let page_url = url_v3 + "/get_home_messages";
            axios
            .get(page_url)
            .then((response) => {
                console.log(TAG + "_resp",response);
                messages.value = response.data.messages;
            })
            .catch((error) => {
                console.log(TAG + "_error",error);
            });
        }

        return{
            messages
        }
    },
}
</script>