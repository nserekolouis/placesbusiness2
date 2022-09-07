<template>
  <Transition name="modal">
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <ul class="list-group">
                <li
                  v-for="reason in reasons"
                  :key="reason.id"
                  class="list-group-item clickable"
                  @click="reportComment(reason)"
                >
                  <p>{{ reason.description }}</p>
                </li>
              </ul>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="closeModal">
                close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, watch, onMounted, inject } from "vue";
import axios from "axios";

export default {
  props: {
    show: Boolean,
    post: {},
  },
  setup(props, { emit }) {
    const showModal = ref(props.show);
    const url = inject("url");
    const reasons = ref([]);
    const comment_id = ref(props.post.id);

    watch(
      () => props.show,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        showModal.value = true;
      }
    );
    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(() => {
      getListReasons();
    });

    const getListReasons = () => {
      let page_url = url + "api/v2/get_reasons_for_reporting";
      axios
        .get(page_url)
        .then((response) => {
          console.log(response);
          let newReasons = response.data.reasons;
          reasons.value.push(...newReasons);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const reportComment = (reason) => {
      let page_url = url + "api/v2/report_comment";
      const data = {
        comment_id: "" + comment_id.value,
        reason_id: "" + reason.id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(response);
          showModal.value = false;
          emit("listen-report-comment");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      showModal,
      closeModal,
      reasons,
      reportComment,
    };
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0 0;
  height: 80vh;
  overflow-x: auto;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
p {
  margin-bottom: 0px;
  font-size: 0.875rem;
}

.clickable {
  cursor: pointer;
}
</style>
