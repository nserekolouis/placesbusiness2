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
        <!-- <button type="button" class="btn btn-outline-primary btn-sm"
        style="height:24px; padding-top:0px;"
        >
          Following
        </button> -->
        <!-- <button type="button" class="btn btn-outline-primary btn-sm ml-2"
        @click="copyPlaceLink"
        >
          Share Link
        </button> -->
      </div>
    </div>
  </div>
</template>
<script>
import {
  onMounted,
  //onUnmounted,
  inject,
  ref,
} from "vue";
import axios from "axios";

const TAG = "PLACE_PROFILE";
export default {
  name: "PlaceProfile",
  props: {
    id: String,
  },
  setup(props) {
    console.log(TAG + 'place_profile',props.id);

    const url_v3 = inject("url_v3");
    const place_id = ref(props.id);
    const placeDetails = ref({});
    const numFollowers = ref(0);

    //check if user object is empty, put follow
    //

    onMounted(() => {
      placeDetails.value = ref({});
      place_id.value = props.id;
      getPlacePageDetails();
    });

    const getPlacePageDetails = () => {
      let page_url = url_v3 + "/get_place_page_details";
      const data = {
        place_id: "" + place_id.value,
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

    const copyPlaceLink = () => {
      var link = window.location.origin + "/place/" + place_id.value;
      console.log(TAG, place_id.value);
      navigator.clipboard.writeText(link);
      alert("Done");
    };

    return {
      placeDetails,
      numFollowers,
      copyPlaceLink
    };
  },
};
</script>