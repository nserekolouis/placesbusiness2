<template>
    <div>
        <div class="post-menu">
            <div class="col-md-6 div-right">
                <div class="dropdown">
                    <a href="#" 
                    class="d-flex 
                    align-items-center
                    link-dark
                    text-decoration-none
                    dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                ...
                </a>
                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div> 
        </div>
            <!-- <CDropdown>
                <CDropdownToggle>
                </CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem href="#"
                    v-if="user_id != post.user_id"
                    @click="followAction"
                    >
                    {{ follow }}</CDropdownItem>
                    <CDropdownItem href="#"
                    @click="userBlocked"
                    >
                    Block User</CDropdownItem>
                    <CDropdownItem href="#"
                    @click="reportPost"
                    >
                    Report Comment</CDropdownItem>
                    <CDropdownItem href="#"
                    v-if="user_id == post.user_id"
                    @click="deletePost"
                    >
                    Delete Comment</CDropdownItem>
                </CDropdownMenu>
            </CDropdown> -->
        </div>
    </div>
</template>
<script>
import { toRefs} from "vue";
import Auth from '@/Auth.js';
import axios from "axios";
export default {
    name: 'CommentPlaceName',
    props: {
        post:{},
        index: Number
    },
    setup(props){
      let { post } = toRefs(props);
      console.log("POST PLACE NAME: ",post.value);
    },
    data (){
        return {
            user_id: Auth.user.id,
            follow: ""
        }
    },
    watch: {
        post: {
            immediate: true, 
            handler (val, oldVal) {
                console.log("New Value",val);
                console.log("Old Value",oldVal);
                if(Object.keys(val).length != 0){
                    if(val.follow_status == 1){
                        this.follow = "UnFollow User";
                    }else{
                        this.follow = "Follow User";
                    }
                }
            }
        }
    },
    methods: {
        userBlocked(){
            console.log("USER BLOCKED 1");
            this.$emit('listen-userblocked',this.index);
        },
        reportPost(){
            console.log("REPORT POST 1");
            this.$emit('listen-reportpost',this.index);
        },
        deletePost(){
            console.log("DELETE POST 1");
            this.$emit('listen-deletepost',this.index);   
        },
        followAction(){
            let page_url = this.url+'api/user_follow';
            const data = { 
                followed_id: ""+this.post.user_id
            };
            axios.post(page_url,data)
                .then(response => {
                    console.log("USER FOLLOW MESSAGE",response);
                    console.log("USER FOLLOW STATUS",response);
                }).catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>
<style scoped>
.dropdown{
    width: 36px;
    height: 30px;
    display: inline-block;
    margin-left: auto;
    /* background-color: #c1c1c12e; */
    text-align: center;
    border-radius: 50%;
}

.dropdown-toggle::after {
    display: none;
}
</style>