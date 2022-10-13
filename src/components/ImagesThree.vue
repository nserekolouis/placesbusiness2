<template>
  <div class="container" @click="showImages">
    <div class="row">
      <div class="col">
        <img class="post-one-image" :src="post.image_three" />
      </div>
    </div>
  </div>

  <Teleport to="body">
    <modal-images :showModal="show" :post="post"></modal-images>
  </Teleport>
</template>
<script>
import { ref } from "vue";
import ModalImages from "@/components/ModalImages.vue";

export default {
  name: "ImageOne",
  components: {
    ModalImages,
  },
  props: {
    post: {},
  },
  setup(props) {
    console.log("Image_One", props.post);
    const show = ref(false);

    const showImages = () => {
      show.value = !show.value;
      console.log("SHOW IMAGES", show.value);
    };

    return {
      show,
      showImages,
    };
  },
};
</script>
<style scoped>
.post-one-image {
  height: auto;
}
.col {
  padding: 0px;
}

@media (max-width: 575.98px) {
  .post-one-image {
    height: auto;
  }
}

@media (max-width: 767.98px) {
  .post-one-image {
    height: auto;
  }
}

@media (max-width: 991.98px) {
  .post-one-image {
    height: auto;
  }
}

@media (max-width: 1199.98px) {
  .post-one-image {
    height: auto;
  }
}

@media (max-width: 1399.98px) {
  .post-one-image {
    height: auto;
  }
}
</style>