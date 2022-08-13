<template>
     <div class="row">
        <div class="row">
            <post-place-name 
            :post="post"
            :index="index"
            @listen-userblocked="userBlocked"
            @listen-reportpost="reportPost"
            @listen-deletepost="deletePost"
            />
        </div>
        <div class="row">
            <div class="col-md-1">
                <post-profile-picture :post="post"/>
            </div>
            <div class="col-sm-11">
                <post-user-info :post="post"/>
                <post-text :post="post"/>
                <reaction-component :post="post"/>
            </div>
        </div>
    </div>
</template>
<script>
import ReactionComponent from '@/components/CommentReaction.vue'
import PostUserInfo from '@/components/PostUserInfo.vue'
import PostText from '@/components/PostText.vue'
import PostProfilePicture from '@/components/PostProfilePicture.vue'
import PostPlaceName from '@/components/CommentPlaceName.vue'
export default {
    name:'OnlyText',
    props: {
        post: {},
        index: Number
    },
    components: {
        ReactionComponent,
        PostUserInfo,
        PostText,
        PostProfilePicture,
        PostPlaceName
    },
    methods: {
        userBlocked(index){
            console.log("USER BLOCKED");
            this.$emit('listen-userblocked',index);
        },
        reportPost(index){
            console.log("REPORT POST");
            this.$emit('listen-reportpost',index);
        },
        deletePost(){
            console.log("DELETE POST 2");
            this.$emit('listen-deletepost',this.index);   
        }
    }
}
</script>