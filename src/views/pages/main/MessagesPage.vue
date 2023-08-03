<template>
    <div class="row">
        <div class="col-md-8">
            <div class="row">
                <div class="col">
                    <back-navigation :info="componentName" @listen-move-back="moveBack" />
                    <div class="mt-2">
                    <section style="background-color: #eee; height:100vh;">
                        <div class="container py-2">

                            <div class="row d-flex justify-content-center">
                            <div class="col-md-10 col-lg-8 col-xl-6">
                                <div class="card" id="chat2">
                                    <div
                                    ref="bottomEl" 
                                    class="card-body" 
                                    data-mdb-perfect-scrollbar="true" 
                                    style="position: relative; overflow-y: auto;">
                                    <ul>
                                        <li
                                        v-for="message in messages"
                                        :key="message.id"
                                        class="list-group-item"
                                        >
                                            <div v-if="message.from == 'place'">
                                                <div v-if="message.from =='place'" class="d-flex flex-row justify-content-start">
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                                    alt="avatar 1" style="width: 45px; height: 100%;">
                                                    <div>
                                                        <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">Hi</p>
                                                        <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">How are you ...???
                                                        </p>
                                                        <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">What are you doing
                                                        tomorrow? Can we come up a bar?</p>
                                                        <p class="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
                                                    </div>
                                                </div>
                                                <div class="divider d-flex align-items-center mb-4">
                                                    <p class="text-center mx-3 mb-0" style="color: #a2aab7;">Today</p>
                                                </div>
                                            </div>
                                            <div v-else class="">
                                                <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                                                    <div>
                                                        <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{{ message.text }}</p>
                                                        <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">00:06</p>
                                                        </div>
                                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                                            alt="avatar 1" style="width: 45px; height: 100%;">
                                                    </div>
                                            </div>
                                        </li>
                                    </ul>
                                    </div>
                                    <div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                        <img :src="profile_picture"
                                            alt="Profile Picture" 
                                            class="rounded-circle"
                                            width="40"
                                            height="40">

                                        <input type="text" 
                                            class="form-control form-control-lg" 
                                            id="exampleFormControlInput1"
                                            placeholder="Type message"
                                            v-model="text_message"
                                            >
                                            <a class="ms-1 text-muted" href="#!"><i class="fas fa-paperclip"></i></a>
                                            <a class="ms-3 text-muted" href="#!"><i class="fas fa-smile"></i></a>
                                            <a class="ms-3" @click="sendMessage()"><i class="fas fa-paper-plane"></i></a>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </section>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4  border-left">
            <sidebar-right :place_id="p_id" :trend_places="true" :trend_place="false"/>
        </div>
    </div>
</template>
<script>
import SidebarRight from "@/components/SidebarRight";
import BackNavigation from "@/components/BackNavigation.vue";
import Auth from "@/Auth.js";
import { ref,inject,onActivated } from "vue";
import axios from "axios";

const TAG = "M_P"

export default {
    name: 'MessagesPage',
    components: {
        SidebarRight,
        BackNavigation
    },
    props: {
        place: Object
    },
    setup(props,{emit}) {
         console.log(TAG + "_props:", props.place);
         const place = ref(props.place);
         const componentName = "Messages For "+place.value.main_text;
         const text_message = ref();
         const messages = ref([]);
         const profile_picture = Auth.user.user_photo;
         const url_v3 = inject("url_v3");
         const bottomEl = ref();
        

         onActivated(()=>{
             getMessages();
         });
          
         const moveBack = () => {
             emit("listen-move-back");
         };

         const sendMessage = () => {
            console.log(TAG + "_place:",place.value);
            
            let page_url = url_v3 + "/send_message";
            let data = new FormData();
            data.append("places_id", place.value.places_id);
            data.append("text", text_message.value);
            data.append("from", "user");

            axios
            .post(page_url, data)
            .then((response) => {
                console.log(TAG + "_send_message_response", response);
                text_message.value = "";
                const message = response.data.place_message;
                messages.value.push(...message);
                scrollToBottom();
                console.log(TAG + "_message",messages.value);
            })
            .catch((error) => {
                console.log(TAG + "_send_message_error", error);
            });
         };

         const getMessages = () => {
            let page_url = url_v3 + "/get_messages";
            axios
            .get(page_url)
            .then((response) => {
                console.log(TAG + "_get_messages_response", response);
                const message = response.data.messages;
                messages.value.push(...message);
                scrollToBottom();
                console.log(TAG + "_message",messages.value);
            })
            .catch((error) => {
                console.log(TAG + "_send_message_error", error);
            });
         };

         const scrollToBottom = () => {
            console.log(TAG + "_scroll_to_bottom");
            const lastChildElement = bottomEl.value.lastElementChild;
            lastChildElement?.scrollIntoView({
                behavior: 'smooth',
            });
         };

         return {
             componentName,
             moveBack,
             text_message,
             sendMessage,
             messages,
             profile_picture,
             bottomEl,
             scrollToBottom
         }
    },
}
</script>
<style>
#chat2 .form-control {
border-color: transparent;
}

#chat2 .form-control:focus {
border-color: transparent;
box-shadow: inset 0px 0px 0px 1px transparent;
}

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
</style>