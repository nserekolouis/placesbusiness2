<template>
  <div class="row">
    <div class="col-6">
      <div class="">
        <h6 class="">
          {{ placeDetails.main_text }}
          <small class="text-muted d-block">{{ placeDetails.secondary_text }}</small>
        </h6>
      </div>
      <div class="">
        <p class="text-muted">
          Followers: {{ numFollowers }}
        </p>
      </div>
      <!-- <div class="profile-item">Name: {{ placeDetails.main_text }}</div>
      <div class="profile-item">Address: {{ placeDetails.secondary_text }}</div> -->
      <!-- <div class="profile-item">Followers: {{ numFollowers }}</div> -->
     
    </div>
    <div class="col-6" style="text-align: right">
      <div class="profile-item">
        <button type="button" class="btn btn-outline-primary btn-sm">
          Following
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  // onMounted,
  onActivated,
  inject,
  ref,
} from "vue";
import axios from "axios";

const TAG = "PLACE_PROFILE";
export default {
  name: "PlaceProfile",
  props: {
    place: {},
  },
  setup(props) { bbb
    console.log(props.place);
    //const url = inject("url");
    //const url_v1 = inject("url_v1");
    const url_v3 = inject("url_v3");
    const place = ref(props.place);
    const placeDetails = ref({});
    const numFollowers = ref(0);

    // onMounted(() => {
    //   getPlacePageDetails();
    // });

    onActivated(() => {
      placeDetails.value = ref({});
      place.value = props.place;
      getPlacePageDetails();
    });

    const getPlacePageDetails = () => {
      let page_url = url + "api/v2/get_place_page_details";
      const data = {
        place_id: "" + place.value.places_id,
      };
      console.log(TAG, data);
      axios
        .post(page_url, data)
        .then((response) => {
          console.log(TAG, response);
          placeDetails.value = response.data.place;
          numFollowers.value = response.data.user_place_subscription;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      placeDetails,
      numFollowers,
    };
  },
};
</script>