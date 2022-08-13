<template>
<div class="container">
    <div class="row">
        <p>{{ post.body }}</p>
    </div>
</div>
</template>
<script>
export default {
    name: 'PostText',
    props: {
        post:{}
    }
}
</script>