<template>
    <div class="row">
      <div class="col">
       <div><p>Request to become an administrator of a place</p>
       <p>{{selected_place}}</p>
       </div>
       <input 
            type="search" 
            class="form-control form-control-sm" 
            aria-label="Text input with dropdown button"
            v-model="search_place"
            @input="searchPlace"
            placeholder="1. Search for a place"
        >
      </div>
      <div class="row">
          <div class="col">
            <ul class="list-group">
              <li
                v-for="place in places"
                :key="place.id"
                class="list-group-item"
                @click="selectPlace(place)"
              >
                <div class="row">
                  <div class="col-2 place-icon-center">
                    <font-awesome-icon icon="fa-solid fa-location-pin" />
                  </div>
                  <div class="col-10">
                    <p class="p-li-bar-place">{{ place.main_text }}</p>
                    <p class="p-li-bar-place">{{ place.secondary_text }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
      <div>
          <div class="col" style="float:right;">
              <button
                type="button"
                class="btn btn-primary btn-next"
                @click="requestAdmin"
                >
                Submit
              </button>
          </div>
      </div>
    </div>
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
        const places = ref([]);
        const search_place = ref();
        const selected_place = ref();
        const place = ref({});

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

        const searchPlace = () => {
        console.log(TAG,"running.....")
        let page_url = url_v3 + "/search_places";
        const data = {
            query: search_place.value
        };
        axios
            .post(page_url, data)
            .then((response) => {
            console.log(TAG + "_place_subscriptions", response.data.predictions);
            places.value = response.data.predictions;
            })
            .catch((error) => {
            console.log(error);
            });
      };

      const selectPlace = (p) => {
          console.log(TAG +'_place',p);
          place.value = p;
          selected_place.value = 'You are requesting to become an admin of '+place.value.main_text;
          search_place.value = "";
          places.value = [];
      };

      const requestAdmin = () => {
        console.log(TAG + "_btn_request_admin");
        let page_url = url_v3 + "/request_admin";
        const data = {
           places_id: place.value.places_id
        };
        console.log(TAG + "_btn_data",data);
        axios
            .post(page_url, data)
            .then((response) => {
             console.log(TAG + "_req_resp", response);
             if(response.data.success){
               //router.push({ name: "DashboardPage" });
               getAdminRequests();
             }
            })
            .catch((error) => {
             console.log(TAG + "_error",error);
            });
      }

        return {
            requests,
            goToMainPage,
            searchPlace,
            search_place,
            places,
            selectPlace,
            selected_place,
            requestAdmin
        }
    },
}
</script>