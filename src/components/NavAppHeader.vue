<template>
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <div>
      <img :src="places_logo" 
      width="50" 
      height="50" 
      class="d-inline-block align-center" alt="Logo">
      <p class="p-logo">Places</p>
    </div>
  </a>
</nav>
</template>
<script>
import logo from '@/assets/images/avatars/places_logo.png';
export default {
    name: 'NavAppHeader',
    props: {},
    setup() {
    return{
      places_logo: logo,
    }
  },
  }
</script>