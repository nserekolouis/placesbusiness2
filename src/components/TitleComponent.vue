<template>
  <div class="title">
    <h6>{{ title }}</h6>
  </div>
</template>
<script>
export default {
  name: "TitleComponent",
  props: {
    title: String,
  },
};
</script>
<style scoped>
@media (max-width: 767.98px) {
  .title {
    position: absolute;
    top: 8px;
    left: 50px;
  }
}
</style>