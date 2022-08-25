<template>
<div class="container">
<div class="row">
    <!-- <div class="col-md-1">
        <img :src="profile_picture" 
        class="profile-picture"
    />
    </div> -->
    <div class="col-md-12">
        <textarea
        class="form-control form-control-sm"
        v-model="post_text"
        :maxlength="320"
        rows="4"
        placeholder="Type comment..."
        ></textarea>
        <div class="row">
            <div v-if="image_one" class="col-sm-3">
                <img :src="this.url+image_one" 
                class="post-image"
                />
            </div>
            <div v-if="image_two" class="col-sm-3">
                <img :src="this.url+image_two" 
                class="post-image"
                />
            </div>
            <div v-if="image-three" class="col-sm-3">
                <img :src="this.url+image_three" 
                class="post-image"
                />
            </div>
            <div v-if="image-four" class="col-sm-3">
                <img :src="this.url+image_four" 
                class="post-image"
                />
            </div>
        </div>
        <!-- <div class="row" style="margin-top: 5px">
            <input
            v-model="counter"
            class="input-counter"
            />
            <input
                class="choose-files"
                id="logo"
                type="file"
                accept="image/*"
                @change="uploadProfilePicture($event)"
                multiple
            />
            <button class="makepost"
            @click="makepost"
            >Comment</button>
        </div> -->
        <div class="post-control">
            <input
            v-model="counter"
            class="input-counter"
            />
            <label for="chooseFiles">
                 <font-awesome-icon 
                 icon="fa-solid fa-image"/>
            </label>
            <input
            aria-label="Choose Files"
            class="choose-files"
            id="chooseFiles"
            type="file"
            accept="image/*"
            @change="uploadProfilePicture($event)"
            multiple
            />

            <label for="makeComment">
                 <font-awesome-icon 
                 icon="fa-solid fa-paper-plane"/>
            </label>
            <input
            aria-label="Make Post"
            class="make-comment"
            id="makeComment"
            type="submit"
            accept="image/*"
            @click="makeComment"
            multiple
            />
            <!-- <button
            type="button" 
            class="makepost"
            @click="makepost"
            >Post</button> -->
        </div>
    </div>
</div>
</div>
</template>
<script>
import axios from "axios";
import Auth from '@/Auth.js';
export default {
    name: 'MakeComment',
    props: {
        post: {}
    },
    data(){
        return {
            profile_picture: this.url+Auth.user.user_photo,
            post_text: "",
            counter: "",
            image_one: "",
            image_two: "",
            image_three: "",
            image_four: ""
        }
    },
    watch: {
        post_text(currentValue){
            console.log("Post Text",currentValue.length);
            this.counter = (currentValue.length)+"/"+"320"
        }
    },
    methods: {
        uploadProfilePicture(event){
            console.log("Images",event.target.files);
            let page_url = this.url+'api/v2/upload_post_images';
            let data = new FormData();
            if(event.target.files[0]){
                 data.append('image_one', event.target.files[0]);
            }
            if(event.target.files[1]){
                 data.append('image_two', event.target.files[1]);
            }
            if(event.target.files[2]){
                 data.append('image_three', event.target.files[2]);
            }
            if(event.target.files[3]){
                 data.append('image_four', event.target.files[3]); 
            }
            axios.post(page_url,data)
            .then(response =>{
                console.log("RESPONSE POST IMAGES ",response.data);
                if(response.data.images[0]){
                   this.image_one = response.data.images[0];
                }
                if(response.data.images[1]){
                   this.image_two = response.data.images[1];
                }
                if(response.data.images[2]){
                    this.image_three = response.data.images[2]; 
                }
                if(response.data.images[3]){
                   this.image_four = response.data.images[3];
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        makeComment(){
            if(this.post_text === null && this.image_one === null){
                alert('Please add info to share');
            }else{
                let page_url = this.url+'api/v2/make_comment';
                let data = new FormData();
                data.append('post_id', this.post.id);
                //data.append('place_id', this.post.place_id);
                data.append('comment_text', this.post_text);
                data.append('image_one', this.image_one);
                data.append('image_two', this.image_two);
                data.append('image_three', this.image_three);
                data.append('image_four', this.image_four);
                axios.post(page_url,data)
                .then(response => {
                    console.log("RESPONSE MAKE COMMENT ",response);
                    this.post_text = "";
                    this.image_one = "";
                    this.image_two = "";
                    this.image_three = "";
                    this.image_four = "";
                    this.$emit('listen-comment',this.post.id);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
}
</script>
<style scoped>
.post-control{
    display: inline-block;
    height: 40px;
    width: 100%;
    text-align: end;
}

.post-control .choose-files {
    display: none;
}

.post-control .choose-files + label {
   display: inline-block;
  
}

label{
   font-size: 20px;
   margin-right: 5px;
   color: #babcbf;
}

.post-control .make-comment {
    display: none;
}

.post-control .make-comment + label {
   display: inline-block;
  
}

label{
   font-size: 20px;
   margin-right: 5px;
   color: #babcbf;
}

</style>
