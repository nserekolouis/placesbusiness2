<template>
  <div class="" style="position: relative">
    <input
      class="form-control form-control-sm"
      type="search"
      placeholder="Search for place"
      aria-label="Search"
      v-model="search_place"
      @input="searchPlace"
    />
    <ul class="list-group dropdown-places">
      <li
        v-for="place in places"
        :key="place.id"
        class="list-group-item"
        @click="selectPlace(place)"
      >
        <div class="row">
          <div class="col-2 place-icon-center">
            <font-awesome-icon icon="fa-solid fa-location-pin" />
          </div>
          <div class="col-10">
            <p class="p-li-bar-place">{{ place.main_text }}</p>
            <p class="p-li-bar-place">{{ place.secondary_text }}</p>
          </div>
        </div>
      </li>
    </ul>
    <make-post-component :place="place" @listen-post="newPost" />
  </div>
</template>
<script>
import axios from "axios";
import MakePostComponent from "@/components/posts/MakePost.vue";
export default {
  name: "NavAppHeaderSearch",
  props: {
    selected_place: {},
  },
  components: {
    MakePostComponent,
  },
  data() {
    return {
      places: [],
      place: {},
    };
  },
  watch: {
    selected_place: {
      immediate: true,
      handler(val, oldVal) {
        console.log("New Value", val);
        console.log("Old Value", oldVal);
        if (Object.keys(val).length != 0) {
          this.search_place = val.main_text;
          this.place = val;
        } else {
          this.search_place = "";
        }
      },
    },
  },
  methods: {
    searchPlace: function () {
      let page_url = this.url + "api/v2/search_places";
      const data = {
        query: this.search_place,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("RESPONSE SEARCH PLACES", response.data.predictions);
          this.places = response.data.predictions;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectPlace: function (place) {
      this.search_place = place.main_text;
      this.places = [];
      this.place = place;
      this.addPlaceSubscription(place);
    },
    newPost() {
      console.log("NAHS NEW POST");
      this.$emit("listen-post");
    },
    addPlaceSubscription: function (place) {
      console.log("ADD Sub place", place);
      let page_url = this.url + "api/v2/add_user_place_subscription";
      const data = {
        place_id: "" + place.places_id,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("Response ADD SUB: ", response);
          this.$emit("listen-place", place);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.dropdown-places {
  position: absolute;
  width: -webkit-fill-available;
  z-index: 1;
}
</style>