<template>
<nav class="navbar navbar-light" style="background-color: #fff;
border: 0px;"
>
  <a class="navbar-brand" href="#">
     <img :src="placesLogo"
             class="places-logo"
      />
  </a>
</nav>
</template>
<script>
import  placesLogo  from '@/assets/images/placeslogo.png'
export default {
  setup(){
    return{
      placesLogo
    }
  }
}
</script>
