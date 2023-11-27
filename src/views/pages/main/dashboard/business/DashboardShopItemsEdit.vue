<template>
    <div class="row">
        <div class="col">
            <back-navigation-vue :info="info" @listen-move-back="moveBack"/>
            <hr>
            <div class="">
                <h6>{{name}}</h6>
                <label for="price">Price</label>
                <input
                class="form-control form-control-sm"  
                v-model="price" 
                type="number" 
                placeholder="Price"/>
                <label for="quantity">Min Quantity</label>
                <input
                class="form-control form-control-sm"  
                v-model="quantity" 
                type="number" 
                placeholder="minimum quantity"/>
                <button 
                type="submit" 
                class="btn btn-primary btn-sm"
                @click="edit_item"
                >Submit</button>
            </div>
            <hr>
            <button v-if="availability == 1"
            @click="change_stock_status()"
            >Stock Available Click to Change</button>
            <button v-else
            @click="change_stock_status()"
            >Stock not available click to change</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {ref,inject} from "vue";
import BackNavigationVue from '@/components/BackNavigation.vue';

const TAG = "D_S_I_E";
export default {
    name: "DashboardShopItemEdit",
    components:{
        BackNavigationVue
    },
    props:{
        item:Object
    },
    setup(props,{emit}) {
        console.log(TAG+"_props",props.item);
        const info = "Edit Item";
        const name = ref(props.item.name);
        const price = ref(props.item.price);
        const quantity = ref(props.item.quantity);
        const client_item_id = ref(props.item.id);
        const url_v3 = inject('url_v3');
        const availability = ref(props.item.availability);

        const edit_item = () => {
            let page_url = url_v3 + "/edit_item";
            const data = {
                item_id: client_item_id.value,
                price: price.value,
                quantity: quantity.value
            };
            console.log(TAG + "_DATA",data);
            axios
                .post(page_url, data)
                .then((response) => {
                    console.log(TAG + "_response_aci", response.data.client_item);
                    price.value = response.data.client_item.price;
                    quantity.value = response.data.client_item.quantity;
                    alert('updated');
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const change_stock_status = () => {
            let page_url = url_v3 + "/change_stock_status";
            const data = {
                item_id: client_item_id.value,
            };
            axios
                .post(page_url, data)
                .then((response) => {
                    console.log(TAG + "_response_css", response.data.availability);
                    availability.value = response.data.availability;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const moveBack = () => {
            emit("listen-move-back");
        };

        return{
            info,
            name,
            price,
            quantity,
            edit_item,
            availability,
            change_stock_status,
            moveBack
        }
    },
}
</script>