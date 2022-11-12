<template>
  <img
    :src="post.userphoto"
    class="profile-picture"
    @click="goToProfile"
  />
</template>
<script>
export default {
    name: 'PostProfilePicture',
    props: {
        post:{}
    },
    setup(props,{emit}){
        
        const goToProfile = () => {
            emit("listen-user-profile", props.post);
        }

        return {
            goToProfile
        }
    }
}
</script>