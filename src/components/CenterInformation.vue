<template>
  <!-- <div class="container-fluid"> -->
    <!-- <div class="row"> -->
      <!-- <div class="col"> -->
          <div style="text-align:center;">
            <div
            class="alert alert-secondary"
            role="alert"
            style="font-size: 0.875rem"
            >{{ info }}</div>
           </div>
          <!-- </div> -->
    <!-- </div> -->
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    info: String,
  },
};
</script>
<style scoped>
.info {
}
</style>