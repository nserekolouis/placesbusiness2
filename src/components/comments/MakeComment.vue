<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <textarea
          class="form-control form-control-sm"
          v-model="post_text"
          :maxlength="320"
          rows="4"
          placeholder="Type comment..."
        ></textarea>
        <div class="row">
          <div v-if="image_one" class="col-sm-3">
            <img :src="this.url + image_one" class="post-image" />
          </div>
          <div v-if="image_two" class="col-sm-3">
            <img :src="this.url + image_two" class="post-image" />
          </div>
          <div v-if="image - three" class="col-sm-3">
            <img :src="this.url + image_three" class="post-image" />
          </div>
          <div v-if="image - four" class="col-sm-3">
            <img :src="this.url + image_four" class="post-image" />
          </div>
        </div>
        <!-- <div class="post-control">
          <input v-model="counter" class="input-counter" />
          <label for="chooseFiles">
            <font-awesome-icon icon="fa-solid fa-image" />
          </label>
          <input
            aria-label="Choose Files"
            class="choose-files"
            id="chooseFiles"
            type="file"
            accept="image/*"
            @change="uploadProfilePicture($event)"
            multiple
          />
          <label for="makeComment" :style="{ color: activeColor }">
            <font-awesome-icon icon="fa-solid fa-paper-plane" />
          </label>
          <input
            aria-label="Make Comment"
            class="make-comment"
            id="makeComment"
            type="submit"
            accept="image/*"
            @click="makeComment"
            multiple
          />
        </div> -->
        <div class="post-control">
          <div class="row">
            <div class="col">
              <!-- 1 -->
              <div v-show="loading" style="position: absolute">
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <!-- 2 -->
              <input v-model="counter" class="input-counter" />
              <!-- 3 -->
              <label for="chooseFiles">
                <font-awesome-icon icon="fa-solid fa-image" />
              </label>
              <input
                aria-label="Choose Files"
                class="choose-files"
                id="chooseFiles"
                type="file"
                accept="image/*"
                @change="uploadProfilePicture($event)"
                multiple
              />
              <!-- 4 -->
              <label for="make-comment" :style="{ color: activeColor }">
                <font-awesome-icon icon="fa-solid fa-paper-plane" />
              </label>
              <input
                aria-label="Make Comment"
                class="make-comment"
                id="make-comment"
                type="submit"
                @click="makeComment"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Auth from "@/Auth.js";
import Constants from "@/constants/index.js";

const bColor = "#288c7f";
const aColor = "#c1c1c1";

const TAG = "Make Comment";

export default {
  name: "MakeComment",
  props: {
    post: {},
  },
  data() {
    return {
      profile_picture: this.url + Auth.user.user_photo,
      post_text: "",
      counter: "",
      image_one: "",
      image_two: "",
      image_three: "",
      image_four: "",
      activeColor: aColor,
      loading: false,
    };
  },
  watch: {
    post_text(currentValue) {
      console.log("Post Text", currentValue.length);
      this.counter = currentValue.length + "/" + "320";
      if (currentValue.length > 0) {
        this.activeColor = bColor;
      } else {
        this.activeColor = aColor;
      }
    },
  },
  methods: {
    uploadProfilePicture(event) {
      this.loading = true;
      var count = 0;

      let page_url = this.url + "api/v2/upload_post_images";
      let data = new FormData();

      if (event.target.files[0]) {
        if (event.target.files[0].size > Constants.FILE_SIZE) {
          alert(Constants.IMAGE_ONE);
        } else {
          count++;
          data.append("image_one", event.target.files[0]);
        }
      }

      if (event.target.files[1]) {
        if (event.target.files[1].size > Constants.FILE_SIZE) {
          alert(Constants.IMAGE_TWO);
        } else {
          data.append("image_two", event.target.files[1]);
        }
      }

      if (event.target.files[2]) {
        if (event.target.files[2].size > Constants.FILE_SIZE) {
          alert(Constants.IMAGE_THREE);
        } else {
          data.append("image_three", event.target.files[2]);
        }
      }

      if (event.target.files[3]) {
        if (event.target.files[3].size > Constants.FILE_SIZE) {
          alert(Constants.IMAGE_FOUR);
        } else {
          data.append("image_four", event.target.files[3]);
        }
      }

      if (count > 0) {
        this.activeColor = bColor;
      } else {
        this.activeColor = aColor;
      }

      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE COMMENT IMAGES ", response.data.success);
          this.loading = false;
          if (response.data.images[0].length > 0) {
            this.image_one = response.data.images[0];
          }
          if (response.data.images[1].length > 0) {
            this.image_two = response.data.images[1];
          }
          if (response.data.images[2].length > 0) {
            this.image_three = response.data.images[2];
          }
          if (response.data.images[3].length > 0) {
            this.image_four = response.data.images[3];
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },

    makeComment() {
      console.log(TAG, "COMMENTING");
      this.loading = true;
      if (this.post_text === null && this.image_one === null) {
        this.loading = false;
        alert("Please add info to share");
      } else {
        let page_url = this.url + "api/v2/make_comment";
        let data = new FormData();
        data.append("post_id", this.post.id);
        data.append("comment_text", this.post_text);
        data.append("image_one", this.image_one);
        data.append("image_two", this.image_two);
        data.append("image_three", this.image_three);
        data.append("image_four", this.image_four);
        this.post_text = "";
        this.image_one = "";
        this.image_two = "";
        this.image_three = "";
        this.image_four = "";
        axios
          .post(page_url, data)
          .then((response) => {
            this.loading = false;
            console.log("RESPONSE MAKE COMMENT ", response);
            this.$emit("listen-comment", this.post.id);
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
.post-control {
  display: inline-block;
  height: 40px;
  width: 100%;
  text-align: end;
}

.post-control .choose-files {
  display: none;
}

.post-control .choose-files + label {
  display: inline-block;
}

label {
  font-size: 20px;
  margin-right: 5px;
  color: #babcbf;
}

.post-control .make-comment {
  display: none;
}

.post-control .make-comment + label {
  display: inline-block;
}

label {
  font-size: 20px;
  margin-right: 5px;
  color: #288c7f;
}
</style>