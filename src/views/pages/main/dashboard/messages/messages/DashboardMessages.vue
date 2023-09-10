<template>
    <div class="row">
        <div class="col">
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
                @click="goToChatMessages(message)"
                >
                <message-item :receiver="message" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {inject, ref, onMounted} from "vue";
import TitleComponent from "@/components/TitleComponent.vue";
import PostPagesTopComponent from "@/components/PostPagesTopComponent.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import MessageItem from "@/views/pages/main/dashboard/messages/messages/MessageItem.vue"


const TAG = "D_M";
export default {
    name: "DashboardMessages",
    components:{
        TitleComponent,
        PostPagesTopComponent,
        CenterInfomation,
        MessageItem
    },
    props: {
        new_notifications: Boolean,
        p_id: String,
        places_id: String,
        main_text: String
    },
    setup(props,{emit}) {
        console.log(TAG+"_props",props);
        const messages = ref([]);
        const url_v3 = inject('url_v3');
        const placesid = ref(props.places_id);
        const maintext = ref(props.main_text);

        const componentTitle = "Messages for "+maintext.value;

        onMounted(() => {
            console.log(TAG + "_onmounted");
            getPlaceMessages();
        });

        const getPlaceMessages = () => {
            let page_url = url_v3 + "/get_place_messages";
            const data = {
                places_id: placesid.value
            };
            axios
            .post(page_url,data)
            .then((response) => {
                console.log(TAG + "_resp",response);
                messages.value = response.data.messages;
            })
            .catch((error) => {
                console.log(TAG + "_error",error);
            });
        }

        const goToChatMessages = (message) => {
            emit("listen-chat-messages",message);
        }

        return{
            messages,
            componentTitle,
            goToChatMessages
        }
    },
}
</script>