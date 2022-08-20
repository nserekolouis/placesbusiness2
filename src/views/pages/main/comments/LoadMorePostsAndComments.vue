<template>
    <div style="margin-top:5px; margin-bottom:5px">
    <font-awesome-icon icon="fa-solid fa-long-arrow-left "
     @click="$router.back()"
    />
    <h6>Comments</h6>
   </div>
   <div class="" ref="scrollComponent">
        <ul class="list-group">
           <li class="list-group-item">
               <four-images
               v-if="post.image_four != null"
               :post="post"
               />
               <three-images
               v-else-if="post.image_three != null"
               :post="post"
               />
               <two-images
               v-else-if="post.image_two != null"
               :post="post"
               />
               <one-image
               v-else-if="post.image_one != null"
               :post="post"
               />
               <only-text
               v-else
               :post="post"
               />
           </li>
           <li class="list-group-item">
               <make-comment
               :post="post"
               @listen-comment="newComment"
               />
           </li>
           <li v-for="(post, index) in comments" :key="post.id"
              class="list-group-item"
              >
              <post-extras
              v-if="post.post_extras == 1"
              :info="info"
              />
              <c-four-images
              v-else-if="post.image_four != null"
              :post="post"
              />
              <c-three-images
              v-else-if="post.image_three != null"
              :post="post"
              />
              <c-two-images
              v-else-if="post.image_two != null"
              :post="post"
              />
              <c-one-image
              v-else-if="post.image_one != null"
              :post="post"
              />
              <c-only-text
              v-else
              :post="post"
              :index="index"
              @listen-userblocked="userBlocked"
              @listen-reportpost="reportPost"
              @listen-deletepost="deletePost"
              />
           </li>
       </ul>
   </div>
</template>
<script>
import axios from "axios";
import OnlyText from '@/components/PostOnlyText.vue' 
import OneImage from '@/components/PostImagesOne.vue' 
import TwoImages from '@/components/PostImagesTwo.vue'
import ThreeImages from '@/components/PostImagesThree.vue'
import FourImages from '@/components/PostImagesFour.vue'

import COnlyText from '@/components/CommentOnlyText.vue' 
import COneImage from '@/components/CommentOneImage.vue' 
import CTwoImages from '@/components/CommentTwoImages.vue'
import CThreeImages from '@/components/CommentThreeImages.vue'
import CFourImages from '@/components/CommentFourImages.vue'

import MakeComment from '@/components/MakeComment.vue'

import PostExtras from '@/components/PostExtras.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { inject } from 'vue'

export default {
    name: 'LoadMorePostsAndComments',
    props: {
        id: String
    },
    setup(props){
        console.log("id",props);
        const url = inject('url')
        const post_id = ref(props.id);
        const post = ref({});
        const count = ref(0);
        const comments = ref([]);
        const comment_id_mine = ref(0);
        const comment_id_others = ref(0);
        const return_mine = ref(0);
        const totalMine = ref(0);
        const totalOthers = ref(0);
        const loadMore = ref(true);

        const scrollComponent = ref(null)

        onMounted(() => {
            console.log("LMPAC ON")
            window.addEventListener("scroll", handleScroll)
            getPost();
        })
        
        onUnmounted(() => {
            console.log("LMPAC OFF")
            window.removeEventListener("scroll", handleScroll)
        })

        //methods
        const handleScroll = () => {
             let element = scrollComponent.value
             //console.log("LMPAC SCROLLING")
             //console.log("LMPAC SCROLLING BOTTOM", element.getBoundingClientRect().bottom)
             //console.log("LMPAC SCROLLING WH", window.innerHeight)
             //console.log("LMPAC SCROLLING COUNT", count.value)
             //console.log("LMPAC SCROLLING TOTAL COMMENTS",(totalMine.value + totalOthers.value))

             if ((element.getBoundingClientRect().bottom < window.innerHeight)
             && (count.value < (totalMine.value + totalOthers.value))
             && loadMore.value) {
                    loadMore.value = false;
                    getComments()
                    console.log("LMPAC INSIDE")
            }
        }

        const getPost = () => {
            console.log("LMPAC GET POST DETAILS");
            let page_url = url+'api/v2/get_post';
            const data = {
                post_id: post_id.value
            }
            axios.post(page_url,data)
                .then(response => {
                    console.log("LMPAC POST DETAILS",response);
                    post.value = response.data.post;
                    //getComments()
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const getComments = () => {
            let page_url = url+'api/v2/get_comments';
            if(count.value != 0){
                if(return_mine.value < totalMine.value){
                     comment_id_mine.value = comments.value[(comments.value.length)-1].id
                }else if(return_mine.value == totalMine.value){
                    comment_id_others.value = 0
                }else{
                    comment_id_others.value = comments.value[(comments.value.length)-1].id
                }
            }

            const data = {
                post_id: ""+post_id.value,
                comment_id_mine: comment_id_mine.value,
                comment_id_others: comment_id_others.value,
                return_mine: return_mine.value
            }

            console.log("LMPAC DATA",data)

            axios.post(page_url,data)
                .then(response => {
                    loadMore.value = true;
                    console.log("LMPAC COMMENTS ",response);
                    let newComments = response.data.comments;
                    comments.value.push(...newComments)
                    let newTotalMine = response.data.total_mine;
                    totalMine.value = newTotalMine;
                    let newTotalOthers = response.data.total_others;
                    totalOthers.value = newTotalOthers;
                    count.value += 5;
                    let newReturnMine = response.data.return_mine;
                    return_mine.value += newReturnMine;
                })
                .catch(error => {
                    loadMore.value = true;
                    console.log("LMPAC",error);
                });
        }

        return {
            comments,
            post,
            scrollComponent
        }
    },
    components: {
        OnlyText,
        OneImage,
        TwoImages,
        ThreeImages,
        FourImages,
        COnlyText,
        COneImage,
        CTwoImages,
        CThreeImages,
        CFourImages,
        MakeComment,
        PostExtras
    },
}
</script>
<style scoped>
h6 {
    display: inline-block;
    margin-left:10px;
}
</style>