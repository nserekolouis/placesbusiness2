<template>
    <div class="row">
    <div class="col-6 center-image">
        <img 
        class="post-one-image"
        :src="this.url+image_one" /> 
    </div>
    <div class="col-6 center-image">
        <img 
        class="post-one-image"
        :src="this.url+image_two" /> 
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
