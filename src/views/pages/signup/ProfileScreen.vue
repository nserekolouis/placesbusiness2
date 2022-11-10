<template>
  <div class="container-fluid">
    <app-header />
    <div class="row">
      <div class="col-sm-6 profilescreen">
        <profile-component/>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileComponent from "@/components/ProfileComponent.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  name: 'ProfileScreen',
  components:{
    ProfileComponent,
    AppHeader
  }
}
</script>