<template>
<div class="container">
    <div class="row">
    <div class="col-sm-6">
        <CAvatar :src="this.url+post.user_photo" size="md" />
        <p class="p-username">{{ post.username }}</p>
        <p class="p-userhandle">{{ post.userhandle }}</p>
        <p class="p-timestamp">3s</p>
    </div>
</div>
</div>
</template>
<script>

export default {
    name: 'PostUserInfo',
    props: {
        post:{}
    }
}
</script>
