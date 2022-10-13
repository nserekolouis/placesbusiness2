<template>
  <div class="top-class">
        <div class="row">
          <div class="col-2 col-sm-1" style="min-width:45px;">
            <select
              class="form-select form-select-sm sel-recent-places"
              aria-label="Default select examples"
              @change="dropDownSelectPlace($event, $event.target.selectedIndex)"
              >
              <option :selected="false" class="select-option">
                <p>Recent Places</p>
              </option>
              <option v-for="place in sub_places" :key="place.sub_id" class="select-option">
                <p>{{ place.main_text }}</p>
              </option>
            </select>
          </div>
          <div class="col-10 col-sm-11">
            <div class="input-group">
              <input
              class="form-control form-control-sm"
              type="search"
              placeholder="Search for place"
              aria-label="Search"
              v-model="search_place"
              @input="searchPlace"
              />
              <div class="input-group-append">
                <button 
                class="btn btn-outline-light btn-sm" 
                type="button"
                @click="goToPlacePage"
                >GO</button>
              </div>
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
          //this.$emit("listen-place", place);
           this.getPlaceSubscriptions();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPlaceSubscriptions(){
      let page_url = this.url + "api/v2/get_place_subs";
      const data = {
        userplacesub_id: "0",
      };
      axios
        .post(page_url, data)
        .then((response) => {
          console.log("PLACE SUBSCRITIONS", response.data.place_subs);
          this.sub_places = response.data.place_subs;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    dropDownSelectPlace: function(e, selectedIndex){
      console.log("EVENT", e);
      console.log("EVENT", selectedIndex);
      if (selectedIndex == 0) {
        this.place = "";
      } else {
        console.log(TAG, this.sub_places[selectedIndex - 1]);
        this.place = this.sub_places[selectedIndex - 1];
        this.search_place = this.place.main_text;
      }
    },
    goToPlacePage(){
      if(Object.keys(this.place).length != 0){
        this.$emit("listen-place-page", this.place);
      }else{
        alert("Please select a place");
      }
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
  /* position: relative; */
  background-color: #b3b3b3;
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