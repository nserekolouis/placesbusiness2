<template>
  <div class="top-class">
        <div class="row">
          <div class="col" style="height:35px">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="goToPlacePage"> P </button>
                <button class="btn btn-outline-secondary dropdown-toggle btn-sm" 
                type="button" 
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"></button>
                <div class="dropdown-menu" style="width:95%;">
                  <p 
                      v-for="place in sub_places"
                      :key="place.id"
                      class="dropdown-item"
                      style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-bottom: 0px;
                      "
                      @click="dropDownSelectPlace(place)"
                      >
                      {{ place.main_text }} <br>
                      <small class="text-muted">{{ place.secondary_text }}</small>
                  </p>
                  </div>
              </div>
            <input 
            type="search" 
            class="form-control form-control-sm" 
            aria-label="Text input with dropdown button"
            v-model="search_place"
            @input="searchPlace"
            placeholder="Search for any place in the world"
            >
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <ul class="list-group">
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
          </div>
        </div>
    <make-post-component :place="place" @listen-post="newPost" />
  </div>
</template>
<script>
import axios from "axios";
import MakePostComponent from "@/components/posts/MakePost.vue";

const TAG = "NavAppHeaderSearch";

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
      sub_places:[]
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
  mounted(){
    this.getPlaceSubscriptions();
  },
  methods: {
    searchPlace: function () {
      let page_url = this.url_v3 + "/search_places";
      const data = {
        query: this.search_place,
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG + "USER_PLACE_SUBSCRIPTIONS", response.data.predictions);
          this.places = response.data.predictions;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectPlace: function (place) {
      console.log("SELECT-PLACE",place);

      this.search_place = place.main_text;
      this.places = [];
      this.place = place;
      this.addPlaceSubscription(place);
    },
    newPost() {
      this.$emit("listen-post");
    },
    addPlaceSubscription: function (place) {
      console.log("ADD Sub place", place);
      let page_url = this.url_v3 + "/add_user_place_subscription";
      const data = {
        place_id: "" + place.places_id,
      };

      console.log("SELECT-PLACE-DATA",data);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("SELECT-PLACE-RESPONSE", response);
          //this.$emit("listen-place", place);
           this.getPlaceSubscriptions();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPlaceSubscriptions(){
      let page_url = this.url_v3 + "/get_place_subs";
      const data = {
        userplacesub_id: "",
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("PLACE_SUBSCRITIONS", response);
          this.sub_places = response.data.place_subs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToPlacePage(){
      if(Object.keys(this.place).length != 0){
        this.$emit("listen-place-page", this.place);
      }else{
        alert("Please select a place");
      }
    },
    dropDownSelectPlace(place){
      console.log(TAG+'-DROP-DOWN', place);
      this.place = place;
      this.search_place = place.main_text;
    }
  },
};
</script>
<style scoped>
.dropdown-places {
  position: absolute;
  width: 98%;
  z-index: 1;
}

.top-class {
  background-color: white;
  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
}

.sel-recent-places {
  width: 50%;
  min-width: 30px;
  height: 31px;
  background-color: white;
}
</style>