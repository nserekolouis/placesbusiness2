<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 border-right">
               <!-- <sidebar-dashboard/> -->
               <side-bar-vue 
               @listen-messages-home="goToMessagesHome"
               @listen-shop="goToShop"
               />
            </div>
            <div class="col-md-6 border-right">
                <component
                :is="current"
                :places_id="placesid"
                :main_text="maintext"
                :message = "message"
                :sub = "sub_category"
                :item = "item"
                @listen-chat-messages="goToChatMessages"
                @listen-move-back="moveBack"
                @listen-go-to-items="goToItems"
                @listen-go-to-edit-item="goToEditItem"
                ></component>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>
<script>
import {ref,onMounted} from "vue";
import SidebarDashboard from "@/components/SidebarDashboard.vue";
import DashboardMessages from "@/views/pages/main/dashboard/messages/messages/DashboardMessages.vue";
import ChatMessages from '../messages/chat/ChatMessages.vue';
import SideBarVue from '../../sidebar/SideBar.vue';
import DashboardBusinessVue from '../business/DashboardBusiness.vue';
import DashboardShop from "../business/DashboardShop.vue";
import DashboardShopItemsVue from '../business/DashboardShopItems.vue';
import DashboardShopItemsEditVue from '../business/DashboardShopItemsEdit.vue';

const TAG = "D_M";

export default {
    name: "DashboardMain",
    components: {
        SidebarDashboard,
        DashboardMessages,
        ChatMessages,
        SideBarVue,
        DashboardBusinessVue,
        DashboardShop,
        DashboardShopItemsVue,
        DashboardShopItemsEditVue
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
        const sub_category = ref({}); 
        const item = ref({});

        onMounted(() => {
            loadedComponents.value.push(current.value);
            document.title = "Places Business";
        });

        const goToChatMessages = (msg) => {
            message.value = msg;
            loadedComponents.value.push(current.value);
            current.value = "ChatMessages";
        }

        const goToMessagesHome = () => {
            loadedComponents.value.push(current.value);
            current.value = "DashboardMessages";
        }
        
        const goToShop = () => {
            loadedComponents.value.push(current.value);
            current.value = "DashboardShop";
        }


        const moveBack = () => {
            current.value = loadedComponents.value.pop();
            console.log(TAG +"_moveback",loadedComponents.value.pop());
        }

        const goToItems = (sub) => {
            console.log(TAG + "_sub", sub);
            sub_category.value = sub;
            loadedComponents.value.push(current.value);
            current.value = "DashboardShopItemsVue";
        }

        const goToEditItem = (itm) => {
            item.value = itm;
            loadedComponents.value.push(current.value);
            current.value = "DashboardShopItemsEditVue";
        }

        return {
            current,
            maintext,
            placesid,
            goToChatMessages,
            goToMessagesHome,
            goToShop,
            moveBack,
            message,
            goToItems,
            sub_category,
            goToEditItem,
            item
        }
    },
}
</script>
<style>
.border-right{
    border-right: 1px solid #c8c9ca;
}
</style>