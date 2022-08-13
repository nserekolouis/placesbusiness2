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
                <images-two :image_one="post.image_one" :image_two="post.image_two"/>
                <reaction-component :post="post"/>
            </div>
        </div>
    </div>
</template>
<script>
import ReactionComponent from '@/components/PostReaction.vue'
import ImagesTwo from '@/components/ImagesTwo.vue'
import PostUserInfo from '@/components/PostUserInfo.vue'
import PostText from '@/components/PostText.vue'
import PostProfilePicture from '@/components/PostProfilePicture.vue'
import PostPlaceName from '@/components/PostPlaceName.vue'
export default {
    name:'OnlyText',
    props: {
        post: {},
        index: Number
    },
    components: {
        ReactionComponent,
        ImagesTwo,
        PostUserInfo,
        PostText,
        PostProfilePicture,
        PostPlaceName
    }
}
</script>