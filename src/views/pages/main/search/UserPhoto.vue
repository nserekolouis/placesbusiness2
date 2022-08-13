<template>
<div class="row">
    <img :src="this.url+post.userphoto" 
        class="profile-picture"
        @click="goToProfile"
    />
</div>
</template>
<script>
import router from '@/router';
export default {
    name: 'PostProfilePicture',
    props: {
        post:{}
    },
    methods: {
        goToProfile(){
             router.push({ name: 'UserProfileAndPosts', params: {
                user_id: this.post.user_id,
            }});
        }
    }
}
</script>