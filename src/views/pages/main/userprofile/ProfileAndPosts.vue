<template>
    <div class="row">
        <user-profile
        :user_id="user_id"
        />
    </div>
    <div class="row" ref="scrollComponent">
        <ul class="list-group">
           <li v-for="(post, index) in posts" :key="post.id"
              class="list-group-item"
              >
              <post-extras
              v-if="post.post_extras == 1"
              :info="info"
              />
              <four-images
              v-else-if="post.image_four != null"
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
import OnlyText from '@/components/PostOnlyText.vue' 
import OneImage from '@/components/PostImagesOne.vue' 
import TwoImages from '@/components/PostImagesTwo.vue'
import ThreeImages from '@/components/PostImagesThree.vue'
import FourImages from '@/components/PostImagesFour.vue'

import UserProfile from '@/views/pages/main/userprofile/UserProfile.vue'
import PostExtras from '@/components/PostExtras.vue'

import axios from "axios";
import { ref } from 'vue'

export default {
     name: 'PostAndComment',
     created(){
         console.log("PAP ON")
         window.addEventListener("scroll", this.handleScroll)
     },
     unmounted() {
         console.log("PAP OFF")
         window.removeEventListener("scroll", this.handleScroll)
     },
     props: {
        user_id: String,
     },
     watch: {
        user_id:{
             immediate:true,
             handler(user_id){
                 console.log("GET USER POSTS");
                 this.getUserPosts(user_id);
             }
         }
    },
     components: {
      OnlyText,
      OneImage,
      TwoImages,
      ThreeImages,
      FourImages,
      PostExtras,
      UserProfile,
      },
     data(){
        return{
            posts: ref([]),
            post: {},
            info: "",
            scrollComponent: ref(null)
            
        }
     },
    methods: {
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
        getUserPosts(user_id){
            console.log("USER POSTS",user_id);
            let page_url = this.url+'api/get_user_posts';
            const data = { 
                user_id: ""+user_id,
                post_id: ""+0
            };
            axios.post(page_url,data)
                .then(response => {
                   console.log("USER POSTS",response.data.posts);
                   this.posts = [...response.data.posts];
                }).catch(error => {
                    console.log(error);
                });
        },
        handleScroll(){
            this.scrollComponent.value;
            console.log("PAP SCROLLING")
            //if (element.getBoundingClientRect().bottom < window.innerHeight) {
              //       console.log("PAP SCROLLING")
            //}
        }
    }
}
</script>
