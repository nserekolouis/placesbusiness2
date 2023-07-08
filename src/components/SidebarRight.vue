<template>
   <div>
    <button
        class="btn d-md-none btn-menu-right mt-1"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasResponsive2"
        aria-controls="offcanvasResponsive2"
        style="height:30px;">
        <font-awesome-icon icon="fa-solid fa-ellipsis" />
    </button>

    <div
    class="offcanvas-md offcanvas-end"
    tabindex="-1"
    id="offcanvasResponsive2"
    aria-labelledby="offcanvasResponsiveLabel2"
    >
    <div class="offcanvas-body">
        <button
        type="button"
        class="btn-close btn-close-right"
        data-bs-dismiss="offcanvas"
        data-bs-target="#offcanvasResponsive2"
        aria-label="Close"
        style="border: 1px solid black"
        ></button>
        <div class="">
            <search-users @listen-search-user-profile="searchUserProfile" />

            <trending-places
            v-show="trending_places"
            />

            <trending-place
            v-show="trending_place"
            :place_id="place_id"
            />
        </div>
    </div>
    </div>
   </div>
</template>
<script>
import SearchUsers from "@/views/pages/main/search/SearchUsers.vue";
import TrendingPlaces from "@/components/TrendingPlaces.vue";
import TrendingPlace from "@/components/TrendingPlace.vue";
import {ref} from "vue";

export default {
    name: 'SidebarRight',
    components: {
        SearchUsers,
        TrendingPlaces,
        TrendingPlace
    },
    props: {
        place_id: String,
        trend_places: Boolean,
        trend_place: Boolean
    },
    setup(props) {
        console.log("aaaaaaaaa---aaaaaaa",props);
        const trending_places = ref(props.trend_places);
        const trending_place = ref(props.trend_place);
        return {
            trending_places,
            trending_place
        }
    }
}
</script>
<style scoped>
html:not([dir="rtl"]) .offcanvas.offcanvas-start {
  transform: translateX(0%);
}

.btn-close {
  display: none;
}

@media (max-width: 1199.98px) {
  .btn-close {
    display: none;
  }
}

@media (max-width: 991.98px) {
  html:not([dir="rtl"]) .offcanvas-sm.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: none;
    position: absolute;
    top: 1px;
  }

  .btn {
    border: 1px solid #ced4da;
    padding: 4px 8px 5px 10px;
  }

  .btn-menu-right {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .offcanvas-md.offcanvas-start {
    width: 330px;
  }

  .componentTitle .btn-close-right {
    position: absolute;
    left: 1px;
    top: 1px;
  }

  .btn-close-left {
    position: absolute;
    right: 2px;
    top: 1px;
  }

  .main {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (max-width: 767.98px) {
  html:not([dir="rtl"]) .offcanvas-md.offcanvas-start {
    transform: translateX(0%);
  }

  .btn-close {
    display: block;
    position: absolute;
    top: 1px;
  }

  .offcanvas-sm.offcanvas-start {
    width: 330px;
  }
}
</style>