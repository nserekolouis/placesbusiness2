<template>
  <div class="col-12" style="border: 0px solid black">
    <p class="p-username">{{ post.username }}</p>
    <p class="p-userhandle">{{ post.userhandle }}</p>
  </div>
</template>
<script>
export default {
  name: "PostUserInfo",
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