<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <button
                class="modal-default-button btn-close"
                @click="closeModal"
                style="padding: 5px"
              ></button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="row">
                <div
                  id="carouselExampleIndicators"
                  class="carousel slide"
                  data-bs-ride="false"
                >
                  <div class="carousel-indicators">
                    <button
                      v-if="post.image_one != null"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      class="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      v-if="post.image_two != null"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      v-if="post.image_three != null"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                    <button
                      v-if="post.image_four != null"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="3"
                      aria-label="Slide 4"
                    ></button>
                  </div>
                  <div class="carousel-inner">
                    <div
                      class="carousel-item active"
                      v-if="post.image_one != null"
                    >
                      <img
                        :src="this.url + post.image_one"
                        class="d-block w-100"
                        alt="African Male"
                      />
                    </div>
                    <div class="carousel-item" v-if="post.image_two != null">
                      <img
                        :src="this.url + post.image_two"
                        class="d-block w-100"
                        alt="Church"
                      />
                    </div>
                    <div class="carousel-item" v-if="post.image_three != null">
                      <img
                        :src="this.url + post.image_three"
                        class="d-block w-100"
                        alt="People"
                      />
                    </div>
                    <div class="carousel-item" v-if="post.image_four != null">
                      <img
                        :src="this.url + post.image_four"
                        class="d-block w-100"
                        alt="Travel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </slot>
          </div>

          <!-- <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="closeModal">
                close
              </button>
            </slot>
          </div> -->
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import africanMale from "@/assets/images/login/african_male.jpeg";
import church from "@/assets/images/login/church.jpg";
import people from "@/assets/images/login/people.jpeg";
import travel from "@/assets/images/login/travel.jpg";
import { ref, watch } from "vue";

export default {
  name: "ModalImages",
  props: {
    showModal: Boolean,
    post: {},
  },
  setup(props) {
    const show = ref(props.showModal);

    watch(
      () => props.showModal,
      (newVal, oldVal) => {
        console.log(newVal);
        console.log(oldVal);
        show.value = true;
      }
    );

    console.log("SHOW IMAGES", show.value);

    const closeModal = () => {
      show.value = false;
    };

    return {
      africanMale,
      church,
      people,
      travel,
      closeModal,
      show,
    };
  },
};
</script>
<style scoped>
.modal-body {
  height: auto;
  overflow: hidden;
}

.modal-container {
  width: 60%;
  min-width: 280px;
  padding: 5px;
  background-color: black;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  background-color: white;
}

.carousel-indicators {
  position: absolute;
  right: 0px;
  bottom: -22px;
  left: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 15%;
  margin-bottom: 1rem;
  margin-left: 15%;
  list-style: none;
}
</style>