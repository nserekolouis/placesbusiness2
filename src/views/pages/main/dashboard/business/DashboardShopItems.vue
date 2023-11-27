<template>
    <div class="row">
        <div class="col">
            <back-navigation-vue :info="info" @listen-move-back="moveBack"/>
            <hr>
            <div class="row">
                <div class="col-6"
                v-for="item in items"
                :key="item.id"
                >
                <div class="card" style="width: 18rem;">
                <img class="card-img-top" :src="url+item.image" alt="Card image cap" width="100" height="200"
                style="object-fit: contain;"
                >
                <div class="card-body">
                    <h6 class="card-title">{{ item.name }}</h6>
                    <p class="card-text">{{ item.price }}.UGX</p>
                    <p class="card-text">Min: {{ item.quantity }}</p>
                    <p v-if="item.availability == 1">Stock Available</p>
                    <p v-else>Out of Stock</p>
                    <div class="edit"
                    @click="goToEditItem(item)"
                    >
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <!--<div>
                        <div style="float:right">
                            <button type="button" class="btn btn-primary btn-sm" style="margin-right:2px;">-</button>
                            <input type="number" min="1" value="1" style="width:50px;">
                            <button type="button" class="btn btn-primary btn-sm" style="margin-left:2px;">+</button><br>
                            <a href="#" class="btn btn-danger btn-sm" style="float:right;">Buy</a>
                        </div>
                    </div>-->
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {
    ref,
    inject,
    onMounted,
} from "vue";
import BackNavigationVue from '@/components/BackNavigation.vue';


const TAG = "D_S_I";
export default {
    name: 'DashboardShopItems',
    props:{
        sub: Object
    },
    components:{
        BackNavigationVue
    },
    setup(props,{emit}) {
       
        const sub = ref(props.sub);
        console.log(TAG,sub.value);
        const url_v3 = inject('url_v3');
        const url = inject('url');
        const info = sub.value.name;
        const items = ref([]);
        

        onMounted(() => {
            get_items();
        });

        const get_items = () => {
            let page_url = url_v3 + "/get_items";
            const data = {
                sub_category_id: sub.value.id
            };
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_gi", response.data.items);
                    items.value = response.data.items;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const moveBack = () => {
            emit("listen-move-back");
        };

        const goToEditItem = (item) => {
            console.log(TAG + "_gtei",item);
            emit("listen-go-to-edit-item",item);
        }

        return{
            info,
            items,
            url,
            moveBack,
            goToEditItem,
        }
    },
}
</script>
<style scoped>
.edit{
cursor: pointer;
}
</style>