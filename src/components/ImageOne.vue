<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img class="post-one-image" :src="this.url + image_one" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ImageOne",
  props: {
    image_one: String,
  },
};
</script>
<style scoped>
.post-one-image {
  height: auto;
}
.col {
  padding: 0px;
}
</style>