<template>
    <div class="row">
        <div class="col">
            <title-component class="d-none d-sm-block" :title="componentTitle" />
            <hr>
        </div>
    </div>
</template>
<script>
import TitleComponent from "@/components/TitleComponent.vue";

export default {
    name: "DashboardBusiness",
    components:{
        TitleComponent,
    },
    setup() {
        const componentTitle = "Choose Business Types";
        return{
            componentTitle
        }
    },
}
</script>