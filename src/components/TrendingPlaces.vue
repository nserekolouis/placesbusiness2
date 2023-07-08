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
            <p class="place-name">{{ place.main_text }}</p>
            <p>
              <small>Trending Words</small>
            </p>
            <ul class="list-group">
              <li
              v-for="word in place.trending_words"
              :key="word.id"
              class="list-group-item">
                <p>
                    {{ word.words}}
                </p>
                <p>
                  <small>              
                    posts: {{ word.trend_count }}
                  </small>
                </p>
              </li>
            </ul>
            <p>
              <small>
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

          window.setInterval(function () {
            console.log('interval......');
            getTrendingPlaces();
          }, 60000);
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
.place-name {
  width: 220px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
}

small {
  font-size: 10px;
  font-weight: bold;
  color:lightgray
}

p{
    margin-bottom: 0px;
    font-size: 12px;
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