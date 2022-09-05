<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="">
        <textarea
          class="form-control form-control-sm"
          v-model="post_text"
          :maxlength="320"
          rows="3"
          placeholder="What is really happening?"
        ></textarea>
      </div>
      <div class="row">
        <div v-if="image_one" class="col-sm-3">
          <img :src="this.url + image_one" class="post-image" />
        </div>
        <div v-if="image_two" class="col-sm-3">
          <img :src="this.url + image_two" class="post-image" />
        </div>
        <div v-if="image_three" class="col-sm-3">
          <img :src="this.url + image_three" class="post-image" />
        </div>
        <div v-if="image_four" class="col-sm-3">
          <img :src="this.url + image_four" class="post-image" />
        </div>
      </div>
      <div class="post-control">
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
</template>
<script>
import axios from "axios";
import Auth from "@/Auth.js";

const bColor = "#288c7f";
const aColor = "#c1c1c1";

export default {
  name: "MakePostComponent",
  props: {
    place: {},
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
      console.log("Images", event.target.files);
      let page_url = this.url + "api/v2/upload_post_images";
      let data = new FormData();
      if (event.target.files[0]) {
        data.append("image_one", event.target.files[0]);
      }
      if (event.target.files[1]) {
        data.append("image_two", event.target.files[1]);
      }
      if (event.target.files[2]) {
        data.append("image_three", event.target.files[2]);
      }
      if (event.target.files[3]) {
        data.append("image_four", event.target.files[3]);
      }
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE POST IMAGES ", response.data);
          if (response.data.images[0]) {
            this.image_one = response.data.images[0];
          }
          if (response.data.images[1]) {
            this.image_two = response.data.images[1];
          }
          if (response.data.images[2]) {
            this.image_three = response.data.images[2];
          }
          if (response.data.images[3]) {
            this.image_four = response.data.images[3];
          }

          if (response.data.images.length > 0) {
            this.activeColor = bColor;
          } else {
            this.activeColor = aColor;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makepost() {
      console.log("place", Object.keys(this.place).length);
      if (this.post_text.length === 0 && this.image_one.length === 0) {
        alert("Post has no information");
      } else if (Object.keys(this.place).length === 0) {
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
        axios
          .post(page_url, data)
          .then((response) => {
            console.log("RESPONSE MAKE POST ", response);
            this.post_text = "";
            this.image_one = "";
            this.image_two = "";
            this.image_three = "";
            this.image_four = "";
            this.activeColor = aColor;
            this.$emit("listen-post");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
.div-post-icon {
  display: inline-block;
  width: 50px;
}

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
  cursor: pointer;
}

.post-control .make-post {
  display: none;
}

.post-control .make-post + label {
  display: inline-block;
  cursor: pointer;
}

label {
  font-size: 20px;
  margin-right: 5px;
  color: #288c7f;
}
</style>