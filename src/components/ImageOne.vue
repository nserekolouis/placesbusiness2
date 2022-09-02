<template>
<!-- <div class="container image-margin-top"> -->
     <div class="row col-12">
        <img 
        class="post-one-image"
        :src="this.url+image_one" /> 
    </div>
<!-- </div> -->
</template>
<script>

export default {
    name: 'ImageOne',
    props: {
        image_one:String
    }
}
</script>
<style scoped>
.post-one-image{
    height: auto;
}
</style>
