<template>
    <div class="contaainer-fluid">
        <div class="row">
            <div class="col-md-4">
               <sidebar-dashboard/>
            </div>
            <div class="col-md-8">
                <navbar-dashboard/>
            </div>
        </div>
    </div>
</template>
<script>
import SidebarDashboard from "@/components/SidebarDashboard.vue";
import NavbarDashboard from "@/components/NavbarDashboard.vue";
export default {
    name: "DashboardPage",
    components: {
        SidebarDashboard,
        NavbarDashboard
    },
    setup() {
        
    },
}
</script>