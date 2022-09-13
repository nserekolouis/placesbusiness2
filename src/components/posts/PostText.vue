<template>
  <div class="row">
    <div class="col">
      <p>{{ post.post_text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PostText",
  props: {
    post: {},
  },
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
  font-size: 0.875rem;
}
</style>