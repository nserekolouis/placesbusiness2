<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img class="post-one-image" :src="this.url + image_one" />
      </div>
      <div class="col">
        <img class="post-one-image" :src="this.url + image_two" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    image_one: String,
    image_two: String,
  },
};
</script>
<style scoped>
.col {
  padding: 0px;
}
</style>