<template>
  <div class="backNav" @click="moveBack">
    <font-awesome-icon icon="fa-solid fa-long-arrow-left"/>
    <h6>{{ info }}</h6>
  </div>
</template>
<script>
export default {
  name: "BackNavigation",
  props: {
    info: String,
  },
  setup(props, { emit }) {
    const moveBack = () => {
      emit("listen-move-back");
    };

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