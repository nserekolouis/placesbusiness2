<template>
   <div class="container-fluid">
       <div v-show="initPlace.main_text != null">
           <p>{{ initPlace.main_text }}</p>
       </div>
       <ul class="ul-post">
           <li v-for="post in posts" :key="post.id"
              class="li-bar-post post-card"
              >
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
export default {
  name: 'PostsSection',
  components: {
      OnlyText,
      OneImage,
      TwoImages,
      ThreeImages,
      FourImages
  },
  props: {
      initPlace:{}
  },
  watch: {
      initPlace: {
          immediate: true, 
          handler (val, oldVal) {
              console.log("New Value",val);
              console.log("Old Value",oldVal);
              // do your stuff
              if(Object.keys(val).length != 0){
                  this.getPlacePosts(val)
              }else{
                  this.getPosts();
              }
        }
    }
  },
  data() {
      return {
          posts:[]
      }
  },
  created(){
      console.log("Created");
      this.getPosts();
  },
  methods: {
      getPosts: function(){
          let page_url = this.url+'api/v2/get_posts';
          axios.post(page_url,null)
           .then(response =>{
              console.log("Response Posts: ",response.data.posts);
              this.posts = response.data.posts;
            }).catch(error => {
              console.log(error);
            });
      },
      getPlacePosts(place){
        let page_url = this.url+'api/get_place_posts';
        const data = { 
            place_id: ""+place.places_id,
            post_id:"0"
        };
        axios.post(page_url,data)
             .then(response => {
                 console.log("Response Place Posts ",response);
                 this.posts = response.data.place_posts;
             }).catch(error => {
                console.log(error);
             });
      }
  }
}
</script>
