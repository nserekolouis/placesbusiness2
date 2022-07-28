<template>
<div class="container image-margin-top">
     <div class="row">
        <img 
        class="post-one-image"
        :src="this.url+image_one" /> 
    </div>
</div>
</template>
<script>

export default {
    name: 'ImageOne',
    props: {
        image_one:String
    }
}
</script>
