<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <u><p>{{ post.main_text }}</p></u>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'PostPlaceName',
    props: {
        post:{}
    }
}
</script>