<template>
  <div class="container" style="margin-top: 100px">
    <div class="row row-top">
      <div class="col">
        <p>Trending in {{ placeName }}</p>
        <p v-if="!hasMore">
          <small>
            No trending words yet.
          </small>
        </p>
        <ul class="list-group" 
            style="min-width:240px;"
            >
            <li
                v-for="trend in trends"
                :key="trend.id"
                class="list-group-item"
                style="padding:5px; cursor:pointer"
            >
                <p>
                    {{ trend.words }}
                </p>
                <p>
                    <small>
                        posts: {{ trend.trend_count }}
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
import { 
  ref, 
  inject,
  watch,
  onMounted } from "vue";

const TAG = "trending_place";

export default {
  name: "TrendingPlace",
  components: {},
  props:{
      place_id: String
  },
  setup(props){
      const url_v3 = inject('url_v3');
      const trends = ref([]);
      const placeName = ref('');
      const p_id = ref(props.place_id);
      const hasTrends = ref(false);

      onMounted(() => {
          getPlaceTrends();
          // window.setInterval(function () {
          //   console.log('interval......');
          //   getPlaceTrends();
          // }, 60000);
      });

      watch(
      () => props.place_id,
      (newVal, oldVal) => {
        console.log("newVal",newVal);
        console.log("oldVal",oldVal);
        p_id.value = newVal;
        getPlaceTrends();
      }
    );

      const getPlaceTrends = () => {
        let page_url = url_v3 + "/get_place_trends";

        const data = {
            place_id: p_id.value
        }

        axios
          .post(page_url,data)
          .then((response) => {
            console.log(TAG, response.data.place_trends.trending_words);
            placeName.value = response.data.place_trends.main_text;
            trends.value = response.data.place_trends.trending_words;
            if(trends.value > 0){
              hasTrends.value = true;
            }else{
              hasTrends.value = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      return {
          trends,
          placeName,
          hasTrends
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