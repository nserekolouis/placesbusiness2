<template>
<Transition name="modal">
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
                <h6>Promote Post</h6>
                <button
                class="modal-default-button btn-close"
                @click="closeModal"
                style="padding: 5px"
              ></button>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <!-- <div class="container"> -->
                    <div class="row">
                        <div class="col">
                            <four-images
                            v-if="post.image_four != null"
                            :post="post"
                            :index="post.id"
                            :deleted_post_id="d_post_id"
                            @listen-comment="goToComments"
                            @listen-user-profile="goToUserProfile"
                            @listen-place-page="goToPlacePage"
                            />

                            <three-images
                            v-else-if="post.image_three != null"
                            :post="post"
                            :index="post.id"
                            :deleted_post_id="d_post_id"
                            @listen-comment="goToComments"
                            @listen-user-profile="goToUserProfile"
                            @listen-place-page="goToPlacePage"
                            />

                            <two-images
                            v-else-if="post.image_two != null"
                            :post="post"
                            :index="post.id"
                            :deleted_post_id="d_post_id"
                            @listen-comment="goToComments"
                            @listen-user-profile="goToUserProfile"
                            @listen-place-page="goToPlacePage"
                            />

                            <one-image
                            v-else-if="post.image_one != null"
                            :post="post"
                            :index="post.id"
                            :deleted_post_id="d_post_id"
                            @listen-comment="goToComments"
                            @listen-user-profile="goToUserProfile"
                            @listen-place-page="goToPlacePage"
                            />

                            <only-text
                            v-else
                            :post="post"
                            :index="index"
                            :places="places"
                            :deleted_post_id="d_post_id"
                            @listen-comment="goToComments"
                            @listen-user-profile="goToUserProfile"
                            @listen-place-page="goToPlacePage"
                            />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <h6>Account Balance : {{ accountBalance }}</h6>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <p>Billable Action</p>
                        </div>
                        <div class="col-3">
                            <p>Unit Cost(UGX)</p>
                        </div>
                        <div class="col-3">
                            <p>Target Count</p>
                        </div>
                        <div class="col-3">
                            <p>Total Cost(UGX)</p>
                        </div>
                    </div>
                    <form @submit="onSubmit">
                      <div class="row">
                        <div class="col-3">
                            <p>Post Views</p>
                        </div>
                        <div class="col-3">
                            <p>{{ unitCost }}</p>
                        </div>
                        <div class="col-3">
                        <input 
                        class="form-control form-control-sm" 
                        type="number"
                        v-model="targetCount"
                        @input="calculateCost"
                        min="0"
                        />
                        </div>
                        <div class="col-3">
                            <p>{{ total }}</p>
                        </div>
                      </div>

                      <div class="row">
                          <div class="col-3">
                              <label>Start Date & Time</label>
                          </div>
                          <div class="col-9">
                              <input 
                              class="form-control form-control-sm" 
                              type="datetime-local"
                              v-model="startDateTime"
                              />
                          </div>
                      </div>

                      <div class="row">
                          <div class="col-3">
                              <label>Stop Date & Time</label>
                          </div>
                          <div class="col-9">
                              <input 
                              class="form-control form-control-sm" 
                              type="datetime-local"
                              v-model="stopDateTime"
                              />
                          </div>
                      </div>
                    
                      <div class="row">
                          <div class="col">
                              <button class="btn btn-primary btn-sm btn-sub">Submit</button>
                          </div>
                      </div>
                    </form>
                <!-- </div> -->
            </slot>
          </div>
          <!-- <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="closeModal">
                close
              </button>
            </slot>
          </div> -->
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import axios from "axios";
import { ref, watch, onMounted, inject } from "vue";
import OnlyText from "@/components/promoted/posts/PostOnlyText.vue";
import OneImage from "@/components/promoted/posts/PostImagesOne.vue";
import TwoImages from "@/components/promoted/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/promoted/posts/PostImagesThree.vue";
import FourImages from "@/components/promoted/posts/PostImagesFour.vue";

 

const TAG = "PROMOTE_POST";

export default {
    name: 'PromotePost',
    components: {
        OnlyText,
        OneImage,
        TwoImages,
        ThreeImages,
        FourImages,
        
    },
    props: {
        post: {},
        show: Boolean
    },
    setup(props) {
        const accountBalance = ref(0);
        const showModal = ref(false);
        const targetCount = ref(0);
        const unitCost = ref(25.0);
        const total = ref(0);
        const startDateTime = ref(0);
        const stopDateTime = ref(0);
        //const url = inject('url');

        //const url_v1 = inject("url_v1");
        const url_v3 = inject("url_v3");

        const pst = ref(props.post);

        watch(() => props.show,
        (newVal, oldVal) => {
        console.log(TAG,newVal);
        console.log(TAG,oldVal);
        showModal.value = true;
        });

        onMounted(() => {
          getAccountBalance();
        });

        const getAccountBalance = () => {
          let page_url = url_v3 + "/get_account_details";
          axios
            .get(page_url)
            .then((response) => {
              console.log(TAG,response);
              accountBalance.value = response.data.account.amount;
            })
            .catch((error) => {
              console.log(error);
            });
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const calculateCost = () => {
            total.value = unitCost.value * targetCount.value
        };

      
        const onSubmit = (e) => {
          e.preventDefault();
          console.log(TAG,"0");
          if(targetCount.value === 0){
            console.log(TAG,"1");
            alert('Please put your target reach')
          }else if(startDateTime.value === ""){
            console.log(TAG,"2");
            alert('Please put a start date')
          }else if(stopDateTime.value === ""){
            console.log(TAG,"3");
            alert('Please put a stop date');
          }else if(total.value > accountBalance.value){
            console.log(TAG,"4");
            alert('Please top up your account');
          }else{
            let page_url = url_v3 + "/promote_post";
            const data = {
              post_id: ""+pst.value.post_id,
              target_count: targetCount.value,
              total: total.value,
              start_datetime: startDateTime.value,
              stop_datetime: stopDateTime.value
            };
            console.log(TAG,data);
            axios
              .post(page_url,data)
              .then((response) => {
                console.log(TAG,response);
                
              })
              .catch((error) => {
                console.log(TAG,error);
              });
          }
        };

        return {
            accountBalance,
            showModal,
            closeModal,
            targetCount,
            unitCost,
            total,
            startDateTime,
            stopDateTime,
            calculateCost,
            onSubmit
        }
    },
    // data(){
    //     return {
    //         target_count: 0,
    //         unit_cost: 25,
    //         total: 0.0,
    //         date: null,
    //         account_balance: 0,
    //         start_datetime: "",
    //         stop_datetime: "",
    //         showModal: false,
    //     }
    // },
    //methods: {
        // calculateCost(){
        //     this.total = this.unit_cost * this.target_count;
        // },
        // onSubmit(e){
        //   e.preventDefault()
        //   console.log(TAG);
        //   if(this.target_count === 0){
        //     alert('Please put your target reach')
        //   }else if(this.start_datetime === ""){
        //     alert('Please put a start date')
        //   }else if(this.stop_datetime === ""){
        //     alert('Please put a stop date');
        //   }else if(this.total <= this.account_balance){
        //     alert('Please top up your account');
        //   }else{
        //     let page_url = this.url + "api/v2/promote_post";
        //     const data = {
        //       reach: this.target_count,
        //       total: this.total,
        //       start_datetime: this.start_datetime,
        //       stop_datetime: this.stop_datetime
        //     };
        //     axios
        //       .post(page_url,data)
        //       .then((response) => {
        //         console.log(TAG,response);
                
        //       })
        //       .catch((error) => {
        //         console.log(TAG,error);
        //       });
        //   }
        // },
        // getAccountBalance(){
        //   let page_url = this.url + "api/v2/get_account_details";
        //   axios
        //     .get(page_url)
        //     .then((response) => {
        //       console.log(TAG,response);
        //       this.account_balance = response.data.account.amount;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // }
    //}
}
</script>
<style scoped>
.modal-body {
  height: auto;
  overflow: hidden;
}

.modal-container {
  width: 80%;
  min-width: 280px;
  padding: 5px;
  background-color: white;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  background-color: white;
}

.carousel-indicators {
  position: absolute;
  right: 0px;
  bottom: -22px;
  left: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0;
  margin-right: 15%;
  margin-bottom: 1rem;
  margin-left: 15%;
  list-style: none;
}

p{
    font-size: 13px;
    margin-bottom: 0px;
    padding-top: 5px;
}

label{
    font-size: 13px;
}

.btn-sub{
    float: right;
}

.modal-mask {
  background-color: black;
}

@media (max-width: 575.98px) {
}

@media (max-width: 767.98px) {
}

@media (max-width: 991.98px) {
  .modal-container {
    width: 30%;
  }
}

@media (max-width: 1199.98px) {
  .modal-container {
    width: 30%;
  }
}

@media (max-width: 1399.98px) {
  .modal-container {
    width: 30%;
  }
}
</style>