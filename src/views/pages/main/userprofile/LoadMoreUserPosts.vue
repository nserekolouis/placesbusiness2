<template>
    <div class="row" style="margin: 10px; cursor: pointer"
    @click="$router.back()"
    >
    <CIcon icon="cilArrowLeft" size="lg"/>
    </div>
    <div class="row">
        <user-profile
        :user_id="user_id"
        />
    </div>
    <div class="" ref="scrollComponent">
        <ul class="ul-post">
           <li v-for="(post, index) in posts" :key="post.id"
              class="li-bar-post post-card"
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

import PostExtras from '@/components/PostExtras.vue'
import UserProfile from '@/views/pages/main/userprofile/UserProfile.vue'

import { ref, onMounted, onUnmounted } from 'vue'
import axios from "axios"
import { inject } from 'vue'


export default {
    props: {
        user_id: String,
    },
    components: {
      OnlyText,
      OneImage,
      TwoImages,
      ThreeImages,
      FourImages,
      PostExtras,
      UserProfile
    },
    setup(props) {
        const url = inject('url')
        console.log("LMUP WATCH",props.user_id);
        const u_id = ref(props.user_id);
        const length = ref(0);
        const count = ref(0);
        const post_id = ref(0);
        

        const posts = ref([])
        const scrollComponent = ref(null)

        const getUserPosts = () => {
            console.log("LMUP U_ID",u_id.value);
            console.log("LMUP URL",""+url);

            if(Object.keys(posts.value).length != 0){
                console.log("posts value",posts.value[(posts.value.length)-1].id);
                post_id.value = posts.value[(posts.value.length)-1].id
            }else{
                post_id.value = 0;
            }

            let page_url = url+'api/get_user_posts';
            const data = { 
                user_id: ""+u_id.value,
                post_id: ""+post_id.value
            };
            

            axios.post(page_url,data)
                .then(response => {
                   console.log("LMUP POSTS",response);
                   let newPosts = response.data.posts;
                   console.log("LMUP POSTS 2",newPosts);
                   posts.value.push(...newPosts)
                   let total = response.data.total
                   length.value = total;
                   count.value += 5;
                }).catch(error => {
                    console.log("LMUP",error);
                });
        }

        onMounted(() => {
            console.log("LMUP ON")
            window.addEventListener("scroll", handleScroll)
            getUserPosts();
        })
        
        onUnmounted(() => {
            console.log("LMUP SCROLLING")
            window.removeEventListener("scroll", handleScroll)
        })
        
        const handleScroll = () => {
             let element = scrollComponent.value
             console.log("LMUP SCROLLING",element.getBoundingClientRect().bottom)
             console.log("LMUP SCROLLING WH",element.getBoundingClientRect().bottom)
             if ((element.getBoundingClientRect().bottom < window.innerHeight)
             && (count.value < length.value)) {
                    getUserPosts();
            }
        }
        return {
            posts,
            scrollComponent
        }
    },
}
</script>