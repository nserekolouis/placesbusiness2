<template>
  <div class="backNav" @click="moveBack">
    <font-awesome-icon icon="fa-solid fa-long-arrow-left"/>
    <p class="text-uppercase d-inline">{{ ' '+info }}</p>
  </div>
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "BackNavigation",
  props: {
    info: String,
  },
  setup(props, { emit }) {
    const moveBack = () => {
      emit("listen-move-back");
    };

    onMounted(() => {
      //  window.addEventListener('backbutton', function (e) {
      //   e.preventDefault();
      //   console.log('Back button prevented page from going back');
      //   // Put axios code here
      //   }, false);
      window.onpopstate = function() {
         //e.preventDefault();
         //alert('browser-back');
         //history.go(1);
         emit("listen-move-back");
      };
    });

    return {
      moveBack,
    };
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}

@media (max-width: 767.98px) {
  .backNav {
    background-color: white;
    position: absolute;
    top: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    cursor: pointer;
    width: auto;
  }
}
</style>