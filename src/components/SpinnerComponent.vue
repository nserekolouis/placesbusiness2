<template>
  <div class="row">
    <div v-if="spin" class="col" style="text-align: center">
      <div class="spinner-border spinner-border-sm text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else class="col" style="text-align: center; font-size:12px; font-weight:bold">
      {{ info }}
    </div>
  </div>
</template>
<script>
export default {
  name: "SpinnerComponent",
  props: {
    spin: Boolean,
    info: String,
  },
};
</script>