<template>
    <div class="col-md-4">
        <user-photo :post="post"/>
    </div>
    <div class="col-md-6">
        <post-user-info :post="post"/>
    </div>
</template>
<script>
import PostUserInfo from '@/components/PostUserInfo.vue'
import UserPhoto from './UserPhoto.vue'

export default {
    name:'NotificationItem',
    props: {
        post: {},
        index: Number
    },
    setup(props) {
        console.log("NI",props.index)
    },
    created(){
        console.log("Notification Item")
    },
    components: {
        PostUserInfo,
        UserPhoto
    },
}
</script>