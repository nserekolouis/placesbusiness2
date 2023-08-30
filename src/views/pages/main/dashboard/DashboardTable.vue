<template>
    <div class="row" style="justify-content:center;">
        <div class="col-md-10">
            <h6>Admin requests</h6>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Place</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(request,index) in requests" :key="request.id">
                <th scope="row">{{index+1}}</th>
                <td>{{request.main_text}}</td>
                <td>
                    <p v-if="request.status === 1">
                    Approved
                    </p>
                    <p v-else>Pending</p>
                </td>
                <td>
                    <button
                    @click="goToMainPage(request)"
                    >Details</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import {inject,ref,onMounted} from "vue";
import axios from "axios";
//import AppHeader from "@/components/AppHeader.vue";
import router from "@/router";

const TAG = 'D_T';
export default {
    name:"DashboardTable",
    components:{
        //AppHeader
    },
    setup() {
        const requests = ref([]);
        const url_v3 = inject('url_v3');

        onMounted(() => {
            getAdminRequests();
        });

        const getAdminRequests = () => {
            let page_url = url_v3 + "/get_admin_requests";
            axios
                .get(page_url)
                .then((response) => {
                    console.log(TAG + "_req_resp", response);
                    requests.value = response.data.requests;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const goToMainPage = (request) => {
            if(request.status === 0){
                alert("Wait for approval");
            }else{
                router.push({ name: "DashboardMain", params: {places_id: request.places_id, main_text: request.main_text} });
            }
        }

        return {
            requests,
            goToMainPage
        }
    },
}
</script>