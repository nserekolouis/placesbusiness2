<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
               <!-- <sidebar-dashboard/> -->
               <side-bar-vue />
            </div>
            <div class="col-md-8">
                <component
                :is="current"
                :places_id="placesid"
                :main_text="maintext"
                :message = "message"
                @listen-chat-messages="goToChatMessages"
                @listen-move-back="moveBack"
                ></component>
            </div>
        </div>
    </div>
</template>
<script>
import {ref,onMounted} from "vue";
import SidebarDashboard from "@/components/SidebarDashboard.vue";
import DashboardMessages from "@/views/pages/main/dashboard/messages/messages/DashboardMessages.vue";
import ChatMessages from '../messages/chat/ChatMessages.vue';
import SideBarVue from '../../sidebar/SideBar.vue';

const TAG = "D_M";

export default {
    name: "DashboardMain",
    components: {
        SidebarDashboard,
        DashboardMessages,
        ChatMessages,
        SideBarVue
    },
    props:{
        places_id: String,
        main_text: String
    },
    setup(props) {
        const current = ref("DashboardMessages");
        const maintext = ref(props.main_text);
        const placesid = ref(props.places_id);
        const loadedComponents = ref([]);
        const message = ref({});

        onMounted(() => {
            loadedComponents.value.push(current.value);
            document.title = "Places Business";
        });

        const goToChatMessages = (msg) => {
            message.value = msg;
            loadedComponents.value.push(current.value);
            current.value = "ChatMessages";
        }

        const moveBack = () => {
            current.value = loadedComponents.value.pop();
            console.log(TAG +"_moveback",loadedComponents.value.pop());
        }

        return {
            current,
            maintext,
            placesid,
            goToChatMessages,
            moveBack,
            message
        }
    },
}
</script>