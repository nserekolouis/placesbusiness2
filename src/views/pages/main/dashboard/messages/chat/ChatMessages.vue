<template>
    <back-navigation-vue :info="info" @listen-move-back="moveBack"/>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <ul ref="chatScroll" class="list-group chat-list">
                    <li class="list-group-item"
                    v-for="(message) in messages"
                    :key="message.id"
                    >
                    <chat-item-right-vue v-if="message.from ==='admin' " :message="message"/>
                    <chat-item-left-vue  v-else :message="message"/>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Chat here..." aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="chatInput">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="sendAdminMessage">Send</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BackNavigationVue from '@/components/BackNavigation.vue';
import { ref, inject, onMounted, 
//onActivated 
} from 'vue';
import axios from "axios";
import ChatItemRightVue from './ChatItemRight.vue';
import ChatItemLeftVue from './ChatItemLeft.vue';

const TAG = "C_M";

export default {
    name: "ChatMessages",
    components:{
        BackNavigationVue,
        ChatItemRightVue,
        ChatItemLeftVue
    },
    props:{
        message:Object
    },
    setup(props,{emit}) {
        console.log(TAG + "_props",props.message);

        
        const url_v3 = inject('url_v3');
        const senders_id = ref(props.message.sender_id);
        const places_id = ref(props.message.places_id);
        //const username = ref(props.message.username);
        const userhandle = ref(props.message.userhandle);
        const messages = ref([]);
        const chatInput = ref();
        const chatScroll = ref(null);

        const info = "Chat with "+userhandle.value;

        //onActivated(() => {
            //getAdminChatMessages();
        //});

        onMounted(() => {
            getAdminChatMessages();
        })

        const getAdminChatMessages = () => {
            let page_url = url_v3 + "/get_admin_chat_messages";
            const data = {
                senders_id: senders_id.value,
                places_id: places_id.value
            };
            axios
            .post(page_url,data)
            .then((response) => {
                console.log(TAG + "_resp",response);
                messages.value = response.data.messages;
                scrollToEnd();
            })
            .catch((error) => {
                console.log(TAG + "_error",error);
            });
        }

        const sendAdminMessage = () => {
            if(typeof chatInput.value === "undefined"){
                alert("Put text");
            }else{
                let page_url = url_v3 + "/send_admin_message";
                const data = {
                    places_id: places_id.value,
                    receiver_id: senders_id.value,
                    text:chatInput.value,
                    from:"admin"
                };
                console.log(TAG + "_data",data);
                axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_resp",response);
                    messages.value.push(...response.data.messages)
                    chatInput.value = "";
                    scrollToEnd();
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
            }
        }

        const scrollToEnd = () => {
            chatScroll.value.scrollTop = chatScroll.value.lastElementChild.offsetTop + 2000;
            console.log(TAG + "_scroll",chatScroll.value.scrollTop);
        }

        const moveBack = () => {
            emit("listen-move-back");
        };

        return {
            info,
            moveBack,
            messages,
            sendAdminMessage,
            chatInput,
            chatScroll,
            scrollToEnd
        }
    },
}
</script>
<style scoped>
.chat-list{
    height: 80vh;
    overflow: hidden;
    overflow-y: auto;
    padding-bottom: 80px;
}
</style>