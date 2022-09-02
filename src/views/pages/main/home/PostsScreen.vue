<template>
  <title-component :title="componentTitle" />
  <div class="div-select">
    <select
      class="form-select form-select-sm"
      aria-label="Default select examples"
      @change="selectPlace($event, $event.target.selectedIndex)"
    >
      <option>All Places</option>
      <option v-for="place in places" :key="place.sub_id">
        <div class="">
          <p>{{ place.main_text }}</p>
        </div>
      </option>
    </select>
  </div>
  <div>
    <nav-app-header-search
      :selected_place="place"
      @listen-post="newPost"
      @listen-place="searchedPlace"
    />
  </div>
  <div ref="scrollComponent">
    <center-infomation :info="alert" v-show="show" class="info-missing" />
    <ul class="list-group">
      <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
        <post-extras v-if="post.post_extras == 1" :info="info" />
        <four-images
          v-else-if="post.image_four != null"
          :post="post"
          :index="post.id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
        />
        <three-images
          v-else-if="post.image_three != null"
          :post="post"
          :index="post.id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
        />
        <two-images
          v-else-if="post.image_two != null"
          :post="post"
          :index="post.id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
        />
        <one-image
          v-else-if="post.image_one != null"
          :post="post"
          :index="post.id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
        />
        <only-text
          v-else
          :post="post"
          :index="index"
          :places="places"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import OnlyText from "@/components/PostOnlyText.vue";
import OneImage from "@/components/PostImagesOne.vue";
import TwoImages from "@/components/PostImagesTwo.vue";
import ThreeImages from "@/components/PostImagesThree.vue";
import FourImages from "@/components/PostImagesFour.vue";
import NavAppHeaderSearch from "@/components/NavAppHeaderSearch.vue";
import PostExtras from "@/components/PostExtras.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import TitleComponent from "@/components/TitleComponent.vue";

import { inject, ref, onMounted, watch, onUnmounted } from "vue";

export default {
  name: "PostsScreen",
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    NavAppHeaderSearch,
    PostExtras,
    CenterInfomation,
    TitleComponent,
  },
  props: {
    new_posts: Boolean,
  },
  setup(props, { emit }) {
    const show = ref(true);
    const posts = ref([]);
    const places = ref([]);
    const scrollComponent = ref(null);
    const url = inject("url");
    const place = ref({});
    const id = ref(0);
    const loadMore = ref(true);
    const count = ref(0);
    const total = ref(0);

    watch(
      () => props.new_posts,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        id.value = 0;
        getPosts();
      }
    );

    onMounted(() => {
      document.title = "Places | Home";
      window.addEventListener("scroll", handleScroll);
      id.value = 0;
      getPosts();
      getPlaceSubscriptions();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const getPosts = () => {
      let page_url = url + "api/v2/get_posts";
      const data = {
        id: "" + id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("POSTS", response);
          loadMore.value = true;
          let newPosts = response.data.posts;
          if (newPosts.length > 0) {
            show.value = false;
            if (id.value == 0) {
              newPosts.push(...posts.value);
              posts.value = newPosts;
            } else {
              posts.value.push(...newPosts);
            }
            count.value += newPosts.length;
            total.value = response.data.total;
            console.log("POSTS count", count.value);
            console.log("POSTS total", total.value);
          }
        })
        .catch((error) => {
          console.log(error);
          loadMore.value = true;
        });
    };

    const getPlaceSubscriptions = () => {
      let page_url = url + "api/v2/get_place_subs";
      const data = {
        userplacesub_id: "0",
      };
      axios
        .post(page_url, data)
        .then((response) => {
          places.value = response.data.place_subs;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const newPost = () => {
      if (place.value == null) {
        id.value = 0;
        getPosts();
      } else {
        count.value = 0;
        total.value = 0;
        id.value = 0;
        getPlacePosts();
      }
    };

    const goToComments = (post) => {
      console.log("comment clicked", post);
      emit("listen-comment", post);
    };

    const goToUserProfile = (post) => {
      emit("listen-user-profile", post);
    };

    const selectPlace = (e, selectedIndex) => {
      console.log("EVENT", e);
      console.log("EVENT", selectedIndex);
      if (selectedIndex == 0) {
        place.value = "";
        id.value = 0;
        getPosts();
      } else {
        console.log(places.value[selectedIndex - 1]);
        place.value = places.value[selectedIndex - 1];
        count.value = 0;
        total.value = 0;
        id.value = 0;
        getPlacePosts();
      }
    };

    const getPlacePosts = () => {
      let page_url = url + "api/v2/get_place_posts";
      const data = {
        id: "" + id.value,
        place_id: "" + place.value.places_id,
      };
      console.log("POSTS PLACE", data);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("POSTS Places", response);
          loadMore.value = true;
          let newPosts = response.data.posts;
          if (newPosts.length > 0) {
            show.value = false;
            if (id.value == 0) {
              posts.value = newPosts;
            } else {
              posts.value.push(...newPosts);
            }
            count.value += newPosts.length;
            total.value = response.data.total;
            console.log("POSTS count", count.value);
            console.log("POSTS total", total.value);
          } else {
            posts.value = [];
            show.value = true;
          }
        })
        .catch((error) => {
          console.log(error);
          loadMore.value = true;
        });
    };

    const handleScroll = () => {
      let element = scrollComponent.value;
      if (
        element.getBoundingClientRect().bottom < window.innerHeight &&
        loadMore.value &&
        count.value < total.value
      ) {
        loadMore.value = false;
        id.value = posts.value[posts.value.length - 1].id;
        console.log("POSTS ID", posts.value[posts.value.length - 1].id);
        if (place.value == null) {
          getPosts();
        } else {
          getPlacePosts(place.value);
        }
      }
    };

    const componentTitle = "Home";

    return {
      show,
      posts,
      place,
      places,
      scrollComponent,
      newPost,
      goToComments,
      goToUserProfile,
      componentTitle,
      selectPlace,
    };
  },
  data() {
    return {
      info: "",
      alert: "No posts yet",
    };
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  font-size: 0.9rem;
}

.div-select {
  margin-top: 10px;
}

@media (max-width: 575.98px) {
  h6 {
    position: absolute;
    top: 10px;
    left: 50px;
  }
}
</style>