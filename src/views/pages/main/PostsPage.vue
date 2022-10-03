<template>
  <title-component :title="componentTitle" />
  <div>
    <nav-app-header-search
      :selected_place="place"
      @listen-post="newPost"
      @listen-place="searchedPlace"
    />
  </div>
  <div id="container" ref="scrollComponent">
    <div class="div-select">
      <div class="row">
        <div class="col">
          <select
            class="form-select form-select-sm"
            aria-label="Default select examples"
            @change="selectPlace($event, $event.target.selectedIndex)"
          >
            <option :selected="false" class="select-option">
              <div>Recent Places</div>
            </option>
            <option v-for="place in places" :key="place.sub_id">
              <div>{{ place.main_text }}</div>
            </option>
          </select>
        </div>
        <!-- <div class="col place-details" @click="goToPlacePage">
          <font-awesome-icon
            class="icon-color"
            icon="fa-solid fa-location-pin"
          />
        </div> -->
      </div>
    </div>
    <center-infomation :info="alert" v-show="show" class="info-missing" />
    <ul class="list-group" style="margin-top: 10px">
      <li v-for="(post, index) in posts" :key="post.id" class="list-group-item">
        <four-images
          v-if="post.image_four != null"
          :post="post"
          :index="post.id"
          :deleted_post_id="d_post_id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
          @listen-place-page="goToPlacePage"
        />
        <three-images
          v-else-if="post.image_three != null"
          :post="post"
          :index="post.id"
          :deleted_post_id="d_post_id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
          @listen-place-page="goToPlacePage"
        />
        <two-images
          v-else-if="post.image_two != null"
          :post="post"
          :index="post.id"
          :deleted_post_id="d_post_id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
          @listen-place-page="goToPlacePage"
        />
        <one-image
          v-else-if="post.image_one != null"
          :post="post"
          :index="post.id"
          :deleted_post_id="d_post_id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
          @listen-place-page="goToPlacePage"
        />
        <only-text
          v-else
          :post="post"
          :index="index"
          :places="places"
          :deleted_post_id="d_post_id"
          @listen-comment="goToComments"
          @listen-user-profile="goToUserProfile"
          @listen-place-page="goToPlacePage"
          @listen-promote-post="promotePost"
        />
      </li>
      <li v-show="showSpin" class="list-group-item">
        <spinner-component :spin="spin" :info="spinInfo" />
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import OnlyText from "@/components/posts/PostOnlyText.vue";
import OneImage from "@/components/posts/PostImagesOne.vue";
import TwoImages from "@/components/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/posts/PostImagesThree.vue";
import FourImages from "@/components/posts/PostImagesFour.vue";
import NavAppHeaderSearch from "@/components/NavAppHeaderSearch.vue";
import CenterInfomation from "@/components/CenterInformation.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import { inject, ref, onMounted, watch, onActivated, onDeactivated } from "vue";

const TAG = "POSTS_PAGE";

export default {
  name: "PostsPage",
  components: {
    OnlyText,
    OneImage,
    TwoImages,
    ThreeImages,
    FourImages,
    NavAppHeaderSearch,
    CenterInfomation,
    TitleComponent,
    SpinnerComponent,
  },
  props: {
    new_posts: Boolean,
    deleted_post_id: Number,
  },
  setup(props, { emit }) {
    const show = ref(true);
    const showModal = ref(true);
    const posts = ref([]);
    const places = ref([]);
    const scrollComponent = ref(null);
    const url = inject("url");
    const place = ref({});
    const id = ref(0);
    const loadMore = ref(true);
    const count = ref(0);
    const total = ref(0);
    const d_post_id = ref(props.deleted_post_id);
    const scrollingPosition = ref(0);
    const active = ref(true);
    const spin = ref(false);
    const spinInfo = ref(null);
    const showSpin = ref(false);
    const first_post_id = ref(0);
    const last_post_id = ref(0);

    watch(
      () => props.new_posts,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        id.value = 0;
        getPosts();
      }
    );

    watch(
      () => props.deleted_post_id,
      (newVal, oldVal) => {
        console.log("New Value", newVal);
        console.log("Old Value", oldVal);
        console.log("DELETED POST ID 3", newVal);
        d_post_id.value = newVal;
      }
    );

    onActivated(() => {
      console.log(TAG + " Activated");
      document.title = "Places | Home";
      window.addEventListener("scroll", handleScroll);
      active.value = true;
      window.scrollTo(0, scrollingPosition.value);
    });

    onDeactivated(() => {
      active.value = false;
      window.removeEventListener("scroll", handleScroll);
      console.log("Deactivated", scrollingPosition.value);
    });

    onMounted(() => {
      console.log("Mounted");
      document.title = "Places | Home";
      id.value = 0;
      first_post_id.value = 0;
      last_post_id.value = 0;
      getPosts();
      getPlaceSubscriptions();
    });

    const getPosts = () => {
      let page_url = url + "api/v2/get_posts";
      const data = {
        id: "" + id.value,
        first_post_id: first_post_id.value,
        last_post_id: last_post_id.value,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG, response);
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
            console.log(TAG + " COUNT ", count.value);
            console.log(TAG + " TOTAL ", total.value);
            if (count.value < total.value) {
              spin.value = true;
              showSpin.value = true;
            }
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
          console.log("PLACE SUBSCRITIONS", response.data.place_subs);
          places.value = response.data.place_subs;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const newPost = () => {
      id.value = 0;
      count.value = 0;
      total.value = 0;
      first_post_id.value = 0;
      last_post_id.value = 0;
      getPosts();
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
      } else {
        console.log(TAG, places.value[selectedIndex - 1]);
        place.value = places.value[selectedIndex - 1];
      }
    };

    const handleScroll = () => {
      let element = scrollComponent.value;
      if (active.value) {
        scrollingPosition.value = window.scrollY;
      }

      console.log(
        TAG + " height ",
        element.getBoundingClientRect().bottom < window.innerHeight
      );

      console.log(TAG + " load more ", loadMore.value);

      console.log(TAG + " count ", count.value < total.value);

      if (count.value >= total.value) {
        spin.value = false;
        spinInfo.value = "NO MORE POSTS";
      }

      if (
        element.getBoundingClientRect().bottom < window.innerHeight + 10 &&
        loadMore.value &&
        count.value < total.value
      ) {
        loadMore.value = false;
        id.value = posts.value[posts.value.length - 1].id;
        console.log(TAG, "SCROLL LOAD MORE");
        first_post_id.value = posts.value[0].id;
        last_post_id.value = posts.value[posts.value.length - 1].id;
        console.log(TAG + "first post",first_post_id.value);
        console.log(TAG + "last post",last_post_id.value);
        getPosts();
      }
    };

    const componentTitle = "Home";

    const searchedPlace = (searched_place) => {
      console.log("SEARCHED_PLACE", searched_place);
      getPlaceSubscriptions();
    };

    const goToPlacePage = (p) => {
      emit("listen-place-page", p);
    };

     const promotePost = (pst) => {
      emit("listen-promote-post", pst);
    };

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
      searchedPlace,
      d_post_id,
      showModal,
      goToPlacePage,
      spin,
      spinInfo,
      showSpin,
      promotePost
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
  width: 40px;
  /* min-width: 200px; */
  /* position: absolute;
  top: 220.5px;
  width: 25%;
  min-width: 200px; */
}

.place-details {
  padding-top: 4px;
  border: 1px solid #ced4da;
  text-align: center;
  border-radius: 5px;
  height: 35px;
  cursor: pointer;
  display: none;
}

.icon-color {
  color: #288c7f;
}

@media (max-width: 575.98px) {
  h6 {
    position: absolute;
    top: 10px;
    left: 50px;
  }
}
</style>