<template>
    <div class="container" style="margin-top: 10px;">
        <div class="row">
            <input 
            class="form-control form-control-sm" 
            type="search" 
            placeholder="Search for users" 
            aria-label="Search User"
            v-model="search_user"
            @input="searchUser"
            >
            <ul class="list-group" style="padding-right:0px;">
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
    </div>
</template>
<script>
import axios from "axios";
import UserItem from '@/views/pages/main/search/UserItem.vue'
import router from '@/router';


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
            if(this.search_user.length === 0){
                this.users = []
            }else{
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
            }
        },
        focusChanged(){
            console.log("Focus changed");
            this.users = [];
        },
        selectUser(user){
            console.log("selectUser...",user);
            this.search_user = "";
            this.users = []
            router.push({ name: 'UserProfileAndPosts', params: {
                user_id: user.app_user_id,
            }});
        }
    }
}
</script>
<style scoped>
.row{
    text-align: center;
    margin-left: 1px;
    margin-right: 1px;
}
</style>