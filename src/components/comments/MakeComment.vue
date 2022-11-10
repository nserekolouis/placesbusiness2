<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <textarea
          class="form-control form-control-sm"
          v-model="post_text"
          maxlength="320"
          rows="5"
          placeholder="Type comment..."
        ></textarea>
        <div class="row">
          <div v-if="image_one" class="col-sm-3">
            <button 
            type="button" 
            class="btn-close" 
            aria-label="Close"
            style="float:right;"
            @click="deleteImageOne(image_one)"
            ></button>
            <img :src="image_one" class="post-image" />
          </div>
          <div v-if="image_two" class="col-sm-3">
            <button 
            type="button" 
            class="btn-close" 
            aria-label="Close"
            style="float:right;"
            @click="deleteImageTwo(image_two)"
            ></button>
            <img :src="image_two" class="post-image" />
          </div>
          <div v-if="image_three" class="col-sm-3">
            <button 
            type="button" 
            class="btn-close" 
            aria-label="Close"
            style="float:right;"
            @click="deleteImageThree(image_three)"
            ></button>
            <img :src="image_three" class="post-image" />
          </div>
          <div v-if="image_four" class="col-sm-3">
            <button 
            type="button" 
            class="btn-close" 
            aria-label="Close"
            style="float:right;"
            @click="deleteImageFour(image_four)"
            ></button>
            <img :src="image_four" class="post-image" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
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
            @change="uploadCommentImages($event)"
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
            >
              <font-awesome-icon class="emoji" icon="fa-solid fa-face-smile" />
            </a>
            <div class="dropdown-menu dropdown-menu-left">
              <EmojiPicker :native="true" @select="onSelectEmoji" />
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
            @click="makeComment"
            multiple
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//import Auth from "@/Auth.js";
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
      profile_picture: "",
      post_text: "",
      counter: "",
      image_one: window.localStorage.getItem('comment_image_one') ? JSON.parse(window.localStorage.getItem('comment_image_one')) : '',
      image_two: window.localStorage.getItem('comment_image_two') ? JSON.parse(window.localStorage.getItem('comment_image_two')) : '',
      image_three: window.localStorage.getItem('comment_image_three') ? JSON.parse(window.localStorage.getItem('comment_image_three')) : '',
      image_four: window.localStorage.getItem('comment_image_four') ? JSON.parse(window.localStorage.getItem('comment_image_four')) : '',
      activeColor: aColor,
      loading: false,
    };
  },
  watch: {
    post_text(currentValue) {
      console.log("Post Text", currentValue.length);
      //this.counter = currentValue.length + "/" + "320";
      this.counter = Math.round((currentValue.length/160)) + "/" + "2";
      if (currentValue.length > 0) {
        this.activeColor = bColor;
      } else {
        this.activeColor = aColor;
      }
    },
  },
  methods: {
    uploadCommentImages(event) {
      this.loading = true;
      var count = 0;

      let page_url = this.url_v3 + "/upload_comment_images";
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
            window.localStorage.setItem("comment_image_one",response.data.images[0]);
          }

          if (response.data.images[1].length > 0) {
            this.image_two = response.data.images[1];
            window.localStorage.setItem("comment_image_two",response.data.images[1]);
          }

          if (response.data.images[2].length > 0) {
            this.image_three = response.data.images[2];
            window.localStorage.setItem("comment_image_three",response.data.images[2]);
          }

          if (response.data.images[3].length > 0) {
            this.image_four = response.data.images[3];
            window.localStorage.setItem("comment_image_four",response.data.images[3]);
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
        let page_url = this.url_v3 + "/make_comment";

        const data = {
          post_id: "" + this.post.id,
          comment_text: this.post_text,
          image_one: this.image_one,
          image_two: this.image_two,
          image_three: this.image_three,
          image_four: this.image_four,
        };

        console.log(TAG + "COMMENT DATA", data);
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
            window.localStorage.setItem("comment_image_one","");
            window.localStorage.setItem("comment_image_two","");
            window.localStorage.setItem("comment_image_three","");
            window.localStorage.setItem("comment_image_four","");
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

    deleteImageOne(path){
      let page_url = this.url_v3 + "/delete_image";
      let data = new FormData();
      data.append("path",path);
      axios
          .post(page_url, data)
          .then((response) => {
            console.log(response);
            if(response.data.success === true){
              this.image_one = "";
              window.localStorage.setItem("comment_image_one","");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    deleteImageTwo(path){
      let page_url = this.url_v3 + "/delete_image";
      let data = new FormData();
      data.append("path",path);
      axios
          .post(page_url, data)
          .then((response) => {
            console.log(response);
            if(response.data.success === true){
              this.image_two = "";
              window.localStorage.setItem("comment_image_two","");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    deleteImageThree(path){
      let page_url = this.url_v3 + "/delete_image";
      let data = new FormData();
      data.append("path",path);
      axios
          .post(page_url, data)
          .then((response) => {
            console.log(response);
            if(response.data.success === true){
              this.image_three = "";
              window.localStorage.setItem("comment_image_three","");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    deleteImageFour(path){
      let page_url = this.url_v3 + "/delete_image";
      let data = new FormData();
      data.append("path",path);
      axios
          .post(page_url, data)
          .then((response) => {
            console.log(response);
            if(response.data.success === true){
              this.image_four = "";
              window.localStorage.setItem("comment_image_four","");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },
};
</script>
<style scoped>
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
  float:right
}

.post-item-dropdown {
  position: absolute;
  bottom: 7px;
}

.input-counter {
  width: 50px;
  border: 1px solid;
  font-size: 12px;
  color: #b1b7c1;
  text-align: center;
  border-radius: 10px;
  font-weight: bold;
  margin-right: 5px;
}
</style>