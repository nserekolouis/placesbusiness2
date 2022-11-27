<template>
  <div class="container" style="margin-top: 100px">
    <div class="row row-top">
      <div class="col">
        <p>Trending Places</p>
        <ul class="list-group" 
            style="min-width:240px;"
            >
            <li
                v-for="place in places"
                :key="place.id"
                class="list-group-item"
                @click="selectUser(place)"
                style="padding:5px; cursor:pointer"
            >
            <p>{{ place.main_text }}</p>
            <p>
              <small
              style="color: teal;"
              >
              posts: {{ place.post_count }}
              </small>
              </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//import router from "@/router";
import { ref, inject, onMounted } from "vue";

const TAG = "trending_places";

export default {
  name: "TrendingPlaces",
  components: {},
  setup(){
      const url_v3 = inject('url_v3');
      const places = ref([]);

      onMounted(() => {
          getTrendingPlaces();
      });

      const getTrendingPlaces = () => {
        let page_url = url_v3 + "/get_trending_places";
        axios
        .get(page_url)
        .then((response) => {
          console.log(TAG, response);
          places.value = response.data.trending_places;
        })
        .catch((error) => {
          console.log(error);
        });
      };

      return {
          places
      }
  },
};
</script>
<style scoped>
p{
    margin-bottom: 0px;
}


.list-group {
  padding: 0px;
}

.span-prepend{
  height: 31px;
  margin-right: -4px;
  width: 31px;
}

.row-top{
    background-color: #e9ecef;
    text-align:left;
    padding-bottom: 10px;
    padding-top: 10px;
    border-radius: 1%;
    margin-right: 10px;
}
</style>