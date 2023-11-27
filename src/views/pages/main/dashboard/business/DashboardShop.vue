<template>
    <div class="row">
        <div class="col">
            <title-component class="d-none d-sm-block" :title="componentTitle" />
            <hr>
            <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Business Details
            </button>
            </p>
            <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <div>
                    <!-- <div class="form-group">
                        <label for="timepicker">Opening Time:</label>
                        <div class="cs-form">
                            <input type="time" class="form-control" value="08:00 AM" />
                        </div>
                        <label for="timepicker">closing Time:</label>
                        <div class="cs-form">
                            <input type="time" class="form-control" value="09:00 PM" />
                        </div>
                    </div> -->
                    <div class="form-group">
                        <label for="phone">Enter your phone number:</label>
                        <input type="tel" v-model="phonenumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="decription">Description</label>
                        <input type="text" v-model="description" class="form-control">
                    </div>
                    <button 
                    type="submit" 
                    class="btn btn-primary"
                    @click="add_retail_business_details"
                    >Submit</button>
                </div>
            </div>
            </div>
            <hr>
            <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                Working Hours
            </button>
            </p>
            <div class="collapse" id="collapseExample2">
            <div class="card card-body">
                <div>
                    <div class="row">
                        <div class="col-6">
                            <h6>Monday</h6>
                            <input type="checkbox" v-model="mondayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="mondayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Tuesday</h6>
                            <input type="checkbox" v-model="tuesdayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="tuesdayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Wednesday</h6>
                            <input type="checkbox" v-model="wednesdayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="wednesdayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Thursday</h6>
                            <input type="checkbox" v-model="thursdayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="thursdayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Friday</h6>
                            <input type="checkbox" v-model="fridayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="fridayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Saturday</h6>
                            <input type="checkbox" v-model="saturdayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="saturdayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <h6>Sunday</h6>
                            <input type="checkbox" v-model="sundayOff">
                            <label for="monday">Closed</label><br>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col">
                                    <VueDatePicker v-model="sundayTime" time-picker disable-time-range-validation range placeholder="Select Time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <button 
                    type="submit" 
                    class="btn btn-primary"
                    @click="add_retail_business_timestamp"
                    >Submit</button>
                </div>
            </div>
            </div>
            <hr>
            <div>
                <h6>ADD ITEM</h6>
                <div>
                    <input
                    class="form-control form-control-sm"  
                    v-model="search_item"
                    @input="search_item_name"
                    type="text" 
                    placeholder="Search Item"/>
                    <div style="position:relative">
                        <ul class="list-group" 
                        style="position:absolute; 
                               width:100%;
                               top:-4px;
                               z-index:1
                               "
                        >
                            <li 
                            class="list-group-item"
                            style="cursor:pointer"
                            v-for="item in items"
                            :key="item.id"
                            @click="select_item(item)"
                            >
                            <p>{{ item.name }}</p>
                            <p v-if="item.selected" style="color:red"> Item already added </p>
                            </li>
                        </ul>
                    </div>
                    <input
                    class="form-control form-control-sm"  
                    v-model="price" 
                    type="number" 
                    placeholder="Price"/>
                    <input
                    class="form-control form-control-sm"  
                    v-model="quantity" 
                    type="number" 
                    placeholder="minimum quantity"/>
                    <button 
                    type="submit" 
                    class="btn btn-primary btn-sm"
                    @click="add_client_item"
                    >Submit</button>
                </div>
            </div>
            <hr>
            <div class="row"
            v-for=" category in categories"
            :key="category.id"
            >
            <hr style="margin:5px;">
            <h6>{{ category.category[0].name }}</h6>
            <div class="col-6"
            style="margin-top: 10px;"
            v-for="sub in  category.sub_category"
            :key="sub.id"
            >
            <div class="card" style="width: 18rem;"
            @click="goToItems(sub[0])"
            >
                <img :src="url+sub[0].image" class="card-img-top" alt="..." width="100" height="200"
                style="object-fit: contain;"
                >
                <div class="card-body">
                    <h5 class="card-title">{{ sub[0].name }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import TitleComponent from "@/components/TitleComponent.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import {ref,
       watch,
       onMounted,
       inject} from "vue";

const TAG = "D_S";

export default {
    name: "DashboardShop",
    components:{
        TitleComponent,
        VueDatePicker
    },
    props:{
        places_id:String
    },
    setup(props,{emit}) {
        const placesid = ref(props.places_id);
        const url_v3 = inject('url_v3');
        const url = inject('url');
        const componentTitle = "Create Shop";
        const search_item = ref('');
        const price = ref('');
        const items = ref([]);
        const selected_item = ref({});
        const categories = ref([]);
        const quantity = ref('1');
        const phonenumber = ref('');
        const description = ref('');
        const mondayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const tuesdayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const wednesdayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const thursdayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const fridayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const saturdayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const sundayTime = ref([{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]);
        const mondayOff = ref();
        const tuesdayOff = ref();
        const wednesdayOff = ref();
        const thursdayOff = ref();
        const fridayOff = ref();
        const saturdayOff = ref();
        const sundayOff = ref();


        watch(mondayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                mondayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                mondayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(tuesdayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                tuesdayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                tuesdayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(wednesdayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                wednesdayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                wednesdayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(thursdayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                thursdayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                thursdayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(fridayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                fridayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                fridayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(saturdayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                saturdayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                saturdayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        watch(sundayOff,async(newValue,oldValue)=>{
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            if(newValue){
                sundayTime.value = [{"hours": 0, "minutes": 0, "seconds": 0 }, { "hours": 0, "minutes": 0, "seconds": 0}]
            }else{
                sundayTime.value = [{"hours": 8, "minutes": 0, "seconds": 0 }, { "hours": 17, "minutes": 0, "seconds": 0}]
            }
        });

        onMounted(() => {
            get_client_items();
            get_retail_business_details();
        });

        const search_item_name = (newValue) => {
            console.log(TAG + "_newValue",newValue);
            let page_url = url_v3 + "/search_item_name";
            const data = {
                query: search_item.value,
            };
            axios
                .post(page_url, data)
                .then((response) => {
                    console.log(TAG + "_response", response.data.items);
                    items.value = response.data.items
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                    items.value = [];
                });
        };

        const select_item = (item) => {
            selected_item.value = item;
            search_item.value = item.name;
            items.value = [];
        }

        const add_client_item = () => {
            let page_url = url_v3 + "/add_client_item";
            const data = {
                item_id: selected_item.value.id,
                price: price.value,
                quantity: quantity.value
            };
            console.log(TAG + "_DATA",data);
            axios
                .post(page_url, data)
                .then((response) => {
                    console.log(TAG + "_response_aci", response.data.items);
                    search_item.value = '';
                    price.value = '';
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const get_client_items = () => {
            let page_url = url_v3 + "/get_client_items";
            axios
                .get(page_url)
                .then((response) => {
                    console.log(TAG + "_response_gci", response.data.categories);
                    categories.value = response.data.categories;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const goToItems = (sub) => {
            console.log(TAG + "_sub", sub);
            emit("listen-go-to-items",sub);
        };

        const add_retail_business_details = () => {
            let page_url = url_v3 + "/add_retail_business_details";
            const data = {
                places_id:placesid.value,
                phonenumber:phonenumber.value,
                description:description.value,
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_abd", response.data);
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const get_retail_business_details = () => {
            let page_url = url_v3 + "/get_retail_business_details";
            const data = {
                places_id: placesid.value
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_grbd", response.data);
                    phonenumber.value = response.data.business_details.phonenumber;
                    description.value = response.data.business_details.description;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const add_retail_business_timestamp = () => {
            let page_url = url_v3 + "/add_retail_business_timestamp";
            const data = {
                places_id:placesid.value,
                timestamp:[mondayTime.value,tuesdayTime.value,wednesdayTime.value,thursdayTime.value,fridayTime.value,saturdayTime.value,sundayTime.value]
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_arbt", response.data);
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const get_retail_business_timestamps = () => {
            let page_url = url_v3 + "/get_retail_business_timestamps";
            const data = {
                places_id:placesid.value,
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_grbt", response.data);
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }


        return{
            componentTitle,
            search_item,
            price,
            items,
            select_item,
            add_client_item,
            search_item_name,
            categories,
            goToItems,
            url,
            quantity,
            add_retail_business_details,
            get_retail_business_details,
            phonenumber,
            description,
            mondayTime,
            tuesdayTime,
            wednesdayTime,
            thursdayTime,
            fridayTime,
            saturdayTime,
            sundayTime,
            mondayOff,
            tuesdayOff,
            wednesdayOff,
            thursdayOff,
            fridayOff,
            saturdayOff,
            sundayOff,
            add_retail_business_timestamp,
            get_retail_business_timestamps
        }
    },
}
</script>