<template>
    <div class="container-fluid">
        <div class="row">
            <!-- <div class="col-md-4"> -->
               <!-- <sidebar-dashboard/> -->
            <!-- </div> -->
            <div class="col-md-12">
                <!-- <navbar-dashboard/> -->
                <app-header/>
                <dashboard-table/>
            </div>
        </div>
    </div>
</template>
<script>
//import SidebarDashboard from "@/components/SidebarDashboard.vue";
//import NavbarDashboard from "@/components/NavbarDashboard.vue";
import DashboardTable from "@/views/pages/main/dashboard/DashboardTable.vue";
import AppHeader from "@/components/AppHeader.vue";
export default {
    name: "DashboardPage",
    components: {
        //SidebarDashboard,
        //NavbarDashboard,
        DashboardTable,
        AppHeader
    },
    setup() {
        
    },
}
</script>