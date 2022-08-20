<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <post-profile-picture :post="post"/>
            </div>
            <div class="col-md-10">
                <post-user-info :post="post"/>
                <notification-text :post="post"/>
            </div>
        </div>
    </div>
</template>
<script>
import PostUserInfo from '@/components/PostUserInfo.vue'
import PostProfilePicture from '@/components/PostProfilePicture.vue'
import NotificationText from '@/views/pages/main/notifications/NotificationText.vue'
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
        PostProfilePicture,
        NotificationText
    },
}
</script>