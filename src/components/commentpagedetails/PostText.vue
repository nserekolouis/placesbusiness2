<template>
  <div class="row">
    <div class="col">
      {{post.post_text}}
    </div>
  </div>
</template>
<script>
export default {
  name: "PostText",
  props: {
    post: {},
  },
} 
</script>
<style scoped>
p {
  margin-bottom: 0px;
  font-size: 14px;
  white-space: pre-line;
  overflow-wrap: break-word;
}

.span-p-text{
  white-space: pre-line;
  overflow-wrap: break-word;
}

.dots {
  color: #288c7f;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 575.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 767.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 991.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 1199.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 1399.98px) {
  p {
    font-size: 14px;
  }
}
</style>