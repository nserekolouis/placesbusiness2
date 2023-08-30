<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
               <sidebar-dashboard/>
            </div>
            <div class="col-md-8">
                <component
                :is="current"
                :places_id="placesid"
                :main_text="maintext"
                ></component>
            </div>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import SidebarDashboard from "@/components/SidebarDashboard.vue";
import DashboardMessages from "@/views/pages/main/dashboard/messages/DashboardMessages.vue";

//const TAG = "D_M";

export default {
    name: "DashboardMain",
    components: {
        SidebarDashboard,
        DashboardMessages
    },
    props:{
        places_id: String,
        main_text: String
    },
    setup(props) {
        //console.log(TAG+"_places_id",props.places_id);
        //console.log(TAG+"_main_text",props.main_text);
        const current = "DashboardMessages";
        const maintext = ref(props.main_text);
        const placesid = ref(props.places_id);

        return {
            current,
            maintext,
            placesid
        }
    },
}
</script>