<template>
  <title-component :title="componentTitle" />
  <hr>
  <div class="row col card accounts-card">
    <p>Places</p>
    <p>App version 2.8(19)</p>
    <p>@2021 -2022 Placesint</p>
    <p>Licenses</p>
  </div>
</template>
<script>
import TitleComponent from "@/components/TitleComponent.vue";
import { onMounted } from "vue";

export default {
  name: "AboutSection",
  setup() {
    const componentTitle = "About Places";

    onMounted(() => {
      document.title = "Places | About Places";
    });

    return {
      componentTitle,
    };
  },
  components: {
    TitleComponent,
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.accounts-card{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}
</style>