<template>
<div class="container">
    <div class="row">
        <div class="col-sm-6 div-label">
            <CIcon icon="cilCommentSquare" size="m" />
            <p class="p-label">100</p> 
        </div>
        <div class="col-sm-6 div-label">
            <CIcon icon="cilHeart" size="m" />
            <p class="p-label">100</p> 
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'ReactionComponent',
    props: {
        post:{}
    }
}
</script>