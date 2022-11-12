<template>
  <back-navigation :info="componentName" @listen-move-back="moveBack" />
  <div class="row" style="margin-top:40px;">
    <div class="col">
      <four-images
      v-if="pst.image_four != null"
      :post="pst"
      :index="pst.id"
      :deleted_post_id="d_post_id"
      @listen-comment="goToComments"
      @listen-user-profile="goToUserProfile"
      @listen-place-page="goToPlacePage"
      />

      <three-images
      v-else-if="pst.image_three != null"
      :post="pst"
      :index="pst.id"
      :deleted_post_id="d_post_id"
      @listen-comment="goToComments"
      @listen-user-profile="goToUserProfile"
      @listen-place-page="goToPlacePage"
      />

      <two-images
      v-else-if="pst.image_two != null"
      :post="pst"
      :index="pst.id"
      :deleted_post_id="d_post_id"
      @listen-comment="goToComments"
      @listen-user-profile="goToUserProfile"
      @listen-place-page="goToPlacePage"
      />

      <one-image
      v-else-if="pst.image_one != null"
      :post="pst"
      :index="pst.id"
      :deleted_post_id="d_post_id"
      @listen-comment="goToComments"
      @listen-user-profile="goToUserProfile"
      @listen-place-page="goToPlacePage"
      />

      <only-text
      v-else
      :post="pst"
      :index="index"
      :places="places"
      :deleted_post_id="d_post_id"
      @listen-comment="goToComments"
      @listen-user-profile="goToUserProfile"
      @listen-place-page="goToPlacePage"
      />
    
      </div>
  </div>
  <hr>
  <div class="row">
      <div class="col">
          <h6 style="color:green">Account Balance : {{ accountBalance }}</h6>
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
            <button class="btn btn-primary btn-sm btn-sub" style="float:right">Submit</button>
        </div>
    </div>
  </form>
  <hr>
  <div class="row" style="text-align:center">
    <div class="col-1"><p>Count</p></div>
    <div class="col-3"><p>Remaining Time</p></div>
    <div class="col-3"><p>Reach/Cost</p></div>
    <div class="col-3"><p>Target/Cost</p></div>
    <div class="col-2"><p>Action</p></div>
  </div>
  <div class="row" v-for="(promo, index) in promos" :key="promo.id" style="text-align:center; margin-bottom:50px;">
    <div class="col-1" >
      {{ (index + 1) }}
    </div>
    <div class="col-3" >
    {{ promo.diff }}
    </div>
    <div class="col-3" >
    {{ promo.reach +" / "+promo.cost }}
    </div>
    <div class="col-3" >
    {{ promo.target_reach+" / "+promo.total }}
    </div>
    <div class="col-2" >like_post
    <button> Pause </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { 
ref,
watch, 
onMounted, 
inject,
//onActivated
} from "vue";
import OnlyText from "@/components/promoted/posts/PostOnlyText.vue";
import OneImage from "@/components/promoted/posts/PostImagesOne.vue";
import TwoImages from "@/components/promoted/posts/PostImagesTwo.vue";
import ThreeImages from "@/components/promoted/posts/PostImagesThree.vue";
import FourImages from "@/components/promoted/posts/PostImagesFour.vue";
import BackNavigation from "@/components/BackNavigation.vue";


const TAG = "PROMOTED_POST_PAGE"

export default {
  name: 'PromotedPostPage',
  components: {
        OnlyText,
        OneImage,
        TwoImages,
        ThreeImages,
        FourImages,
        BackNavigation
  },
  props: {
    post: {}
  },
  setup(props,{emit}) {
      const accountBalance = ref(0);
      const showModal = ref(false);
      const targetCount = ref(0);
      const unitCost = ref(25.0);
      const total = ref(0);
      const startDateTime = ref(0);
      const stopDateTime = ref(0);
      //const url = inject('url');
      //const url_v1 = inject('url_v1');
      const url_v3 = inject('url_v3');

      const pst = ref(props.post);
      const componentName = "Promote Post";
      const promos = ref([]);

      watch(() => props.post,
      (newVal, oldVal) => {
        console.log("CHANGE-1-",newVal);
        console.log("CHANGE-1-",oldVal);
        pst.value = newVal;
        getAccountBalance();
      });

      onMounted(() => {
        getAccountBalance();
      });

      // onActivated(() => {
      //   console.log(TAG + "-OnActivated-",props.post)
      //   pst.value = props.post;
      //   getAccountBalance();
      // });

      const getAccountBalance = () => {
        let page_url = url_v3 + "/get_account_details";
        axios
          .get(page_url)
          .then((response) => {
            console.log(TAG,response);
            accountBalance.value = response.data.account.amount;
            getPostPromotions();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const closeModal = () => {
          showModal.value = false;
      };

      const calculateCost = () => {
          total.value = (unitCost.value * targetCount.value)
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
              accountBalance.value = response.data.amount;
              getPostPromotions();
            })
            .catch((error) => {
              console.log(TAG,error);
            });
        }
      };

      const moveBack = () => {
        emit("listen-move-back");
      };

      const getPostPromotions = () => {
          let page_url = url_v3 + "/get_post_promos";
          const data = {
            post_id: ""+pst.value.post_id,
          };
          console.log(TAG,data);
          axios
            .post(page_url,data)
            .then((response) => {
              console.log(TAG,response);
              promos.value = response.data.post_promos;
            })
            .catch((error) => {
              console.log(TAG,error);
            });
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
          onSubmit,
          componentName,
          moveBack,
          promos,
          pst
      }
  },

}
</script>
<style scoped>
h6{
  font-size: 13px;
}
label{
  font-size: 13px;
}
</style>