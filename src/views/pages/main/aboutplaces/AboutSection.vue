<template>
    <div style="margin-top:5px; margin-bottom:5px">
        <font-awesome-icon icon="fa-solid fa-long-arrow-left"
        @click="$router.back()"
        />
        <h6>About Places</h6>
   </div>
    <div class="row card" style="margin-top: 50px">
      <p>Places</p>
      <p>App version 2.8(19)</p>
      <p>@2021 -2022 Placesint</p>
      <p>Licenses</p>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
h6 {
    display: inline-block;
    margin-left:10px;
}
</style>