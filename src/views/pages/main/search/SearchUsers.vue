<template>
    <div class="row">
         <input 
          class="form-control search-people" 
          type="search" 
          placeholder="Search for User" 
          aria-label="Search User"
          v-model="search_user"
          @input="searchUser"
          @blur="focusChanged()"
          >
          <ul class="list-group">
            <li v-for="user in users" :key="user.id"
            class="list-group-item"
            @click="selectUser(user)"
            >
            <div class="row">
            <user-item
            :post="user"
            />
            </div>
            </li>
          </ul>
    </div>
</template>
<script>
import axios from "axios";
import UserItem from '@/views/pages/main/search/UserItem.vue'


export default {
    name: 'SearchUsers',
    components:{
        UserItem
    },
    data(){
        return {
            search_user: '',
            users: []
        }
    },
    methods:{
        searchUser(){
            let page_url = this.url+'api/search_people';
            const data = { 
                query: "@"+this.search_user
            };
            axios.post(page_url,data)
                .then(response => {
                    console.log("RESPONSE USER",response);
                    this.users = response.data.predictions;
                }).catch(error => {
                    console.log(error);
                });
        },
        focusChanged(){
            console.log("Focus changed");
            this.users = [];
        },
        selectUser(){
             console.log("Select User");
        }
    }
}
</script>