<template>
<!-- <div class="container"> -->
    <div class="row">
        <div class="place-name">
            <u><p style="display:inline">{{ post.main_text }}</p></u>
        </div>
        <div class="post-menu">
            <CDropdown>
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
            </CDropdown>
        </div>
        </div>
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