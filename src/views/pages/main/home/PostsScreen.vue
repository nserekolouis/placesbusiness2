<template>
    <div class="">
        <h6>Home</h6>
    </div>
    <div class="div-select">
        <select class="form-select form-select-sm"
            aria-label="Default select examples"
            @change="selectPlace($event,$event.target.selectedIndex)"
            >
            <option>ALL Places</option>
            <option v-for="place in places" :key="place.sub_id"> 
            <div class="">
                <p>{{ place.main_text }}</p>
            </div>
            </option>
        </select>
    </div>
   <div>
       <nav-app-header-search
       :selected_place="place"
       @listen-post="newPost"
       />
   </div>
   <div>
        <center-infomation
        :info="alert"
        v-show="show"
        class="info-missing"
        />
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
              :index="post.id"
              />
              <three-images
              v-else-if="post.image_three != null"
              :post="post"
              :index="post.id"
              />
              <two-images
              v-else-if="post.image_two != null"
              :post="post"
              :index="post.id"
              />
              <one-image
              v-else-if="post.image_one != null"
              :post="post"
              :index="post.id"
              />
              <only-text
              v-else
              :post="post"
              :index="index"
              :places="places"
              @listen-userblocked="userBlocked"
              @listen-reportpost="reportPost"
              @listen-unsubplace="unsubPlace"
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
import NavAppHeaderSearch from '@/components/NavAppHeaderSearch.vue'
import PostExtras from '@/components/PostExtras.vue'
import CenterInfomation from '@/components/CenterInformation.vue';


export default {
  name: 'PostsScreen',
  components: {
      OnlyText,
      OneImage,
      TwoImages,
      ThreeImages,
      FourImages,
      NavAppHeaderSearch,
      PostExtras,
      CenterInfomation
  },
  props: {
      initPlace:{}
  },
  watch: {
      initPlace: {
          immediate: true, 
          handler (val) {
              console.log("PostScreen",val);
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
          posts:[],
          places: [],
          place: {},
          info: "",
          show: true,
          alert: "No posts yet"
      }
  },
  created(){
      console.log("Created");
      this.getPosts();
      this.getPlaceSubscriptions();
  },
  methods: {
      getPosts: function(){
          let page_url = this.url+'api/v2/get_posts';
          axios.post(page_url,null)
           .then(response => {
              console.log("Response Posts: ",response);
              if((response.data.posts).length > 0){
                   this.show = false;
                   this.posts = response.data.posts;
              }else{
                   this.posts = [];
              }
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
                 this.posts = (response.data.place_posts).reverse();
             }).catch(error => {
                console.log(error);
             });
      },
      newPost(){
          console.log("LOAD NEW POSTS")
          this.getPosts();
      },
      getPlaceSubscriptions: function(){
      let page_url = this.url+'api/v2/get_place_subs';
      const data = { 
        userplacesub_id: "0"
      };
      axios.post(page_url,data)
          .then(response =>{
            console.log("Response Places: ",response);
            this.places = response.data.place_subs;
          }).catch(error => {
            console.log(error);
          });
    },
     selectPlace(event,selectedIndex){
      if(selectedIndex == 0){
          this.getPosts();
      }else{
          console.log(this.places[selectedIndex-1]);
          this.place = this.places[selectedIndex-1];
          this.getPlacePosts(this.places[selectedIndex-1]);
      }
    },
    selectAllPosts(){
     console.log("Select all places");
     this.getPosts();
    },
    userBlocked(index){
        let page_url = this.url+'api/block_user';
        const data = { 
            blocked_id: this.posts[index].user_id
        };
        axios.post(page_url,data)
             .then(response => {
                     console.log(response);
                     this.info = "User Blocked";
                     this.updateArray(index);
             }).catch(error => {
                console.log(error);
             });
    },
    reportPost(index){
        let page_url = this.url+'api/report_post';
        const data = { 
            post_id: this.posts[index].id,
            reason_index: 1,
            reason: "I am not interested"
        };
        axios.post(page_url,data)
             .then(response => {
                     console.log(response);
                     this.info = "This post has been reported";
                     this.updateArray(index);
             }).catch(error => {
                console.log(error);
             });
    },
    unsubPlace(index){
        let page_url = this.url+'api/remove_user_place_subscription';
        const data = { 
            place_id: this.posts[index].place_id
        };
        axios.post(page_url,data)
             .then(response => {
                 console.log(response);
                 this.info = "You have unsubscribed from this place so you will nolonger see posts from this place";
                 this.updateArray(index);
             }).catch(error => {
                console.log(error);
             });
    },
    deletePost(index){
        let page_url = this.url+'api/delete_post';
        const data = { 
            post_id: this.posts[index].id
        };
        axios.post(page_url,data)
             .then(response => {
                 console.log(response);
                 this.info = "Post Deleted";
                 this.updateArray(index);
             }).catch(error => {
                console.log(error);
             });
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
        this.posts.splice(index, 1, data);
    }
  },
}
</script>
<style scoped>
h6 {
    display: inline-block;
    font-size: 0.900rem;
}

.div-select {
    margin-top: 10px;
}

.form-select{
    /* position: absolute;
    width: 200px;
    z-index: 1;
    top: 157px;
    left: 335px; */
}
</style>
