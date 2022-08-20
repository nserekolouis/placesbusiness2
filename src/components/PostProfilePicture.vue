<template>
<div class="div-pp"
     style="border:0px solid black">
    <img :src="this.url+post.user_photo" 
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
<style scoped>
.div-pp{
    text-align: center;
}
</style>