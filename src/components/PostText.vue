<template>
<div class="row">
    <p>{{ post.post_text }}</p>
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