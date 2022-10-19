<template>
    <div v-show="isPromoted || isSponsored" style="border-top:1px solid #80808026; margin-top:5px;">
        <div class="row" style="padding-top:2px">
            <div class="col">
                <div v-show="isPromoted">
                    <p class="p-sponsor">AD</p>
                </div>
                <div v-show="isSponsored">
                    <p class="p-sponsor">SPONSOR: {{ post.sponsor }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";

export default {
    name: 'TagComponent',
    props: {
        post: {},
    },
    setup(props){
        const isPromoted = ref(false);
        const isSponsored = ref(false);
        const post = ref(props.post);
        const sponsor = ref("");

        if(post.value.promoted === 1){
            isPromoted.value = true;
        }

        if(post.value.sponsor != null){
            isSponsored.value = true;
            sponsor.value = post.value.sponsor;
        }

        return {
            isPromoted,
            isSponsored,
            sponsor
        }
    },
}
</script>
<style scoped>
p{
  margin-bottom: 0px;
  font-size: 10px;
  font-weight: bold;
  color: #288c7f;
}

.p-sponsor{
    text-transform: uppercase;
    color: gray;
}

/* .ad-label{
  position: absolute;
  bottom: 13px;
  left: 40px;
}

@media (max-width: 1199.98px) {
  .ad-label{
    left: 54px;
  }
} */
</style>
