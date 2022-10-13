<template>
  <!-- <div class="row"> -->
  <!-- <div class="col-sm-12"> -->
  <div class="row">
    <div class="col-12">
      <textarea
      class="form-control form-control-sm"
      v-model="post_text"
      maxlength="640"
      rows="5"
      placeholder="What is really happening?"
    ></textarea>
    </div>
  </div>
  <div class="row">
    <div v-if="image_one" class="col-md-3">
      <img :src="image_one" class="post-image" />
    </div>
    <div v-if="image_two" class="col-md-3">
      <img :src="image_two" class="post-image" />
    </div>
    <div v-if="image_three" class="col-md-3">
      <img :src="image_three" class="post-image" />
    </div>
    <div v-if="image_four" class="col-md-3">
      <img :src="image_four" class="post-image" />
    </div>
  </div>
  <div class="row">
    <div class="col" style="position:relative">
      <!-- ................. -->
      <div class="post-item">
        <label for="chooseFiles">
          <font-awesome-icon icon="fa-solid fa-image" />
        </label>
        <input
          aria-label="Choose Files"
          class="choose-files"
          id="chooseFiles"
          type="file"
          accept="image/*"
          @change="uploadPostImages($event)"
          multiple
        />
      </div>
      <!-- ........................ -->
      <div class="post-item post-item-dropdown">
        <div class="dropdown emoji-menu">
          <a
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle caret-off"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-bs-auto-close="false"
          >
            <font-awesome-icon class="emoji" icon="fa-solid fa-face-smile" />
          </a>
          <div class="dropdown-menu dropdown-menu-left">
            <EmojiPicker :native="false" @select="onSelectEmoji"/>
          </div>
        </div>
      </div>
      <!-- ........................ -->
      <div class="post-item-right">
        <input v-model="counter" class="input-counter" />
        <!-- ... -->
        <div
          v-show="loading"
          class="spinner-border spinner-border-sm"
          role="status"
          style="margin-right: 5px"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <!-- ... -->
        <label for="make-post" :style="{ color: activeColor }">
          <font-awesome-icon icon="fa-solid fa-paper-plane" />
        </label>
        <input
          aria-label="Make Post"
          class="make-post"
          id="make-post"
          type="submit"
          accept="image/*"
          @click="makepost"
          multiple
        />
      </div>
    </div>
  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>
<script>
import axios from "axios";
import Auth from "@/Auth.js";
import Constants from "@/constants/index.js";

const bColor = "#288c7f";
const aColor = "#fff";

//const TAG = "MAKE POST";

export default {
  name: "MakePostComponent",
  props: {
    place: {},
  },
  data() {
    return {
      profile_picture: this.url + Auth.user.user_photo,
      post_text: "",
      counter: "0",
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
      this.counter = Math.round((currentValue.length/160)) + "/" + "4";
      if (currentValue.length > 0 && Object.keys(this.place).length != 0) {
        this.activeColor = bColor;
      } else {
        this.activeColor = aColor;
      }
    },
  },
  methods: {
    uploadPostImages(event) {
      var count = 0;
      this.loading = true;
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
          console.log("RESPONSE POST IMAGES ", response.data.images.length);

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
    makepost() {
      this.loading = true;
      console.log("place", Object.keys(this.place).length);
      if (this.post_text.length === 0 && this.image_one.length === 0) {
        this.loading = false;
        alert("Post has no information");
      } else if (Object.keys(this.place).length === 0) {
        this.loading = false;
        alert("Select a Place");
      } else {
        console.log("PLACE ID", this.place);
        let page_url = this.url + "api/v2/make_post";
        let data = new FormData();
        data.append("place_id", this.place.places_id);
        data.append("post_text", this.post_text);
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
            console.log("RESPONSE MAKE POST ", response);
            this.loading = false;
            this.activeColor = aColor;
            this.$emit("listen-post");
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      }
    },
    onSelectEmoji(emoji) {
      console.log(emoji);
      this.post_text += emoji.i;
    },
    closeSelectEmoji(){
      console.log("CLOSE EMOJI");
    }
  },
};
</script>
<style scoped>
.div-post-icon {
  display: inline-block;
  width: 50px;
}

.post-item .choose-files {
  display: none;
  cursor: pointer;
}

.post-item .choose-files + label {
  display: inline-block;
  cursor: pointer;
}

.post-item-right .make-post {
  display: none;
}

.post-item-right .make-post + label {
  display: inline-block;
  cursor: pointer;
}

label {
  font-size: 20px;
  margin-right: 5px;
  color: #288c7f;
  cursor: pointer;
}

.emoji {
  display: inline;
  color: #288c7f;
  font-size: 18px;
}

.emoji-menu {
  width: 50px;
  display: inline-block;
  cursor: pointer;
}

.post-item {
  width: 15px;
  display: inline;
}

.caret-off::before {
  display: none;
}
.caret-off::after {
  display: none;
}

.post-item-right {
  /* display: inline-block;
  position: absolute;
  right: 0px; */
  float: right;
}

.post-item-dropdown {
  position: absolute;
  bottom: -1px;
}
</style>