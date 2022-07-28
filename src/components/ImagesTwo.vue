<template>
<div class="container image-margin-top">
    <div class="row gx-4">
    <div class="col-sm-6 center-image">
        <img 
        class="post-one-image"
        :src="this.url+image_one" /> 
    </div>
        <div class="col-sm-6 center-image">
        <img 
        class="post-two-image"
        :src="this.url+image_two" /> 
    </div>
</div>
</div>
</template>
<script>
export default {
    props:{
        image_one: String,
        image_two: String
    }
}
</script>
