<template>
    <!-- <div class="div-main"> -->
        <div class="col-md-6 div-left">
            <u><p class="p-place-name">{{ post.main_text }}</p></u>
        </div>
        <div class="col-md-6 div-right">
            <div class="dropdown">
                <a href="#" 
                class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
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
    <!-- </div> -->
    <!-- <div style="border: 1px solid black">
        <div class="place-name">
            <u><p class="p-place-name"
                >{{ post.main_text }}</p>
            </u>
        </div>
        <div class="dropdown">
            <a href="#" 
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            ...
            </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> -->
        <!-- <div class="post-menu"> -->
            <!-- </div> -->
            <!--<CDropdown>
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
                    Report Post</CDropdownItem>
                    <CDropdownItem href="#"
                    @click="unSubPlace"
                    >
                    Unsub from Place</CDropdownItem>
                    <CDropdownItem href="#"
                    v-if="user_id == post.user_id"
                    @click="deletePost"
                    >
                    Delete Post</CDropdownItem>
                    </CDropdownMenu>
            </CDropdown> -->
        <!-- </div> -->
    <!-- </div> -->
</template>
<script>
import { toRefs} from "vue";
import Auth from '@/Auth.js';
import axios from "axios";
export default {
    name: 'PostPlaceName',
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
            user_id: Auth.user.id
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
            console.log("Report Post");
            this.$emit('listen-reportpost',this.index);
        },
        unSubPlace(){
            console.log("Unsub Place");
            this.$emit('listen-unsubplace',this.index);
        },
        deletePost(){
            console.log("delete post");
            this.$emit('listen-deletepost',this.index);   
        },
        followAction(){
            let page_url = this.url+'api/uinline-blockser_follow';
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
.div-main{}

.div-left{}

.div-right{
  text-align: right;
}



.place-name{
    width: 100px;
}

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
.p-place-name{
    margin-bottom: 0px;
    padding-top: 5px;
    font-size: 0.875rem;
}
</style>