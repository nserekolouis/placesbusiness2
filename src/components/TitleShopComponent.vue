<template>
    <div class="container" style="margin-top: 2px;">
        <div class="row">
        <div class="col-3">
            <div class="title">
                <h6>{{ title }}</h6>
            </div>
        </div>
        <div class="col-6">
            <select class="form-select form-select-sm" aria-label="Default select example" v-model="selected">
                <option 
                v-for="status in statuses"
                :key="status.id"
                :value="status.id"
                >{{ status.description }}</option>
            </select>
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-danger btn-sm">
                Orders <span class="badge text-bg-secondary">4</span>
            </button>
        </div>
    </div>
    </div>
  </template>
  <script>
  import {ref,
          inject,
          watch,
          onMounted} from "vue";
  import axios from "axios";
  const TAG = "T_S_C";

  export default {
    name: "TitleShopComponent",
    props: {
        title: String,
        places_id: String,
    },
    setup(props) {
        const url_v3 = inject('url_v3');
        const statuses = ref([]);
        const selected = ref();
        const placesid = ref(props.places_id);
        console.log(TAG + '_placesid',selected.value);

        watch(selected,async(newValue,oldValue) => {
            console.log(TAG+"_newValue",newValue);
            console.log(TAG+"_oldValue",oldValue);
            set_business_status();
        });


        onMounted(() => {
            load_business_statuses();
            get_retail_business_status();
        });

        const load_business_statuses = () => {
            let page_url = url_v3 + "/load_business_statuses";
            axios
                .get(page_url)
                .then((response) => {
                    console.log(TAG + "_response_lbs", response.data.statuses);
                    statuses.value = response.data.statuses;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const set_business_status = () => {
            let page_url = url_v3 + "/set_retail_business_status";
            const data = {
                places_id:placesid.value,
                status_id:selected.value
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_sbs", response.data);
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        const get_retail_business_status = () => {
            let page_url = url_v3 + "/get_retail_business_status";
            const data = {
                places_id:placesid.value,
            }
            axios
                .post(page_url,data)
                .then((response) => {
                    console.log(TAG + "_response_grbs", response.data);
                    selected.value = response.data.status;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }

        return {
            statuses,
            selected
        }
    },
  }
  </script>
  <style scoped>
  @media (max-width: 767.98px) {
    .title {
      position: absolute;
      top: 8px;
      left: 50px;
    }
  }
  </style>