<template>
    <div class="alert alert-secondary" role="alert" style="font-size:0.875rem">
      {{ info }}
   </div>
</template>
<script>
export default {
    props:{
        info: String
    },
}
</script>