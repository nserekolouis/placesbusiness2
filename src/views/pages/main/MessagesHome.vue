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
                <home-message-item :receiver="message" />
                </li>
            </ul>
        </div>
        <div class="col-md-4 border-left">
            <sidebar-right :place_id="p_id" :trend_places="true" :trend_place="false"/>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {inject, ref, onActivated} from "vue";
import HomeMessageItem from "@/components/HomeMessageItem.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import PostPagesTopComponent from "@/components/PostPagesTopComponent.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import SidebarRight from "@/components/SidebarRight";

const TAG = "M_H";
export default {
    name: "MessagesHome",
    components:{
        HomeMessageItem,
        TitleComponent,
        PostPagesTopComponent,
        CenterInfomation,
        SidebarRight
    },
    props: {
        new_notifications: Boolean,
        p_id: String
    },
    setup() {
        const messages = ref([]);
        const url_v3 = inject('url_v3');
        const componentTitle = "Messages";

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
            messages,
            componentTitle
        }
    },
}
</script>