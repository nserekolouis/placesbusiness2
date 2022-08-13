<template>
   <div class="row" style="margin: 10px; cursor: pointer"
   @click="$router.back()"
   >
       <CIcon icon="cilArrowLeft" size="lg"/>
   </div>
   <div class="row">
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
   </div>
   <div class="row comments">
        <ul class="ul-post">
           <li class="">
               <make-comment
               :post="post"
               @listen-comment="newComment"
               />
           </li>
           <li v-for="(post, index) in all_comments" :key="post.id"
              class="li-bar-post post-card"
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

export default {
     name: 'PostAndComment',
     props: {
        id: String,
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
     data(){
        return{
            post: {},
            all_comments: [],
            info:""
        }
     },
     watch: {
        id: {
            immediate: true, 
            handler (val) {
                console.log("Id",val);
                if(Object.keys(val).length != 0){
                    this.getPost(val);
                    this.getComments(val);
                }
            }
        }
    },
    methods: {
        getPost(id){
            console.log("Id",id);
            let page_url = this.url+'api/v2/get_post';
            let data = new FormData();
            data.append('post_id', id);
            axios.post(page_url,data)
                .then(response => {
                    console.log("RESPONSE POST DETAILS",response);
                    this.post = response.data.post;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getComments(id){
            let page_url = this.url+'api/get_comments';
            let data = new FormData();
            data.append('post_id', id);
            data.append('comment_id', 0);
            data.append('type', 1);
            axios.post(page_url,data)
                .then(response => {
                    console.log("RESPONSE COMMENTS ",response);
                    const comments = response.data.comments;
                    const other_comments = response.data.other_comments;
                    this.all_comments = comments.concat(other_comments);
                    console.log("comments",comments);
                    console.log("other",other_comments);
                    console.log("All comments",this.all_comments);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        newComment(id){
            this.getComments(id);
        },
        userBlocked(index){
            console.log("COMMENT USER BLOCKED 2");
            this.info = "User Blocked";
            this.updateArray(index);
        },
        reportPost(index){
            console.log("COMMENT REPORT POST 2");
            this.info = "Post Reported";
            this.updateArray(index);
        },
        deletePost(index){
            console.log("COMMENT REPORT POST 2");
            this.info = "Comment Deleted";
            this.updateArray(index);
        },
        updateArray(index){
        console.log("UPDATE ARRAY ",index);
        let data = {
            id: "",
            main_text:"",
            user_photo:"",
            username: "",
            userhandle: "",
            created_at: "",
            post_text: "",
            image_one: "",
            image_two: "",
            image_three: "",
            image_four: "",
            num_comments: 0,
            num_likes: 0,
            post_extras: 1,
            liked:0,
        }
        this.all_comments.splice(index, 1, data);
       
    }
    }
}
</script>
