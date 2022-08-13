<template>
     <div class="row">
        <div class="row">
            <post-place-name :post="post"/>
        </div>
        <div class="row">
            <div class="col-md-1">
                <post-profile-picture :post="post"/>
            </div>
            <div class="col-sm-11">
                <post-user-info :post="post"/>
                <post-text :post="post"/>
                <image-one :image_one="post.image_one" />
                <reaction-component :post="post"/>
            </div>
        </div>
    </div>
</template>
<script>
import ReactionComponent from '@/components/CommentReaction.vue'
import ImageOne from '@/components/ImageOne.vue'
import PostUserInfo from '@/components/PostUserInfo.vue'
import PostText from '@/components/PostText.vue'
import PostProfilePicture from '@/components/PostProfilePicture.vue'
import PostPlaceName from '@/components/CommentPlaceName.vue'
export default {
    name:'OnlyText',
    props: {
        post: {}
    },
    components: {
        ReactionComponent,
        ImageOne,
        PostUserInfo,
        PostText,
        PostProfilePicture,
        PostPlaceName
    }
}
</script>