<template>
<div class="container reaction-component">
    <div class="row">
        <div class="col-sm-6 div-comment"
         @click="commentClicked"
        >
            <CIcon icon="cilCommentSquare" size="m" />
            <p class="p-label">{{ post.num_comments}}</p> 
        </div>
        <div class="col-sm-6 div-like"
        @click="likeClicked"
        >
            <CIcon icon="cilHeart" size="m" :style="{ color: activeColor }"/>
            <p class="p-label" :style="{ color: activeColor }">{{ likes }}</p> 
        </div>
    </div>
</div>
</template>
<script>
import router from '@/router';
import axios from "axios";
export default {
    name: 'ReactionComponent',
    props: {
        post:{}
    },
    setup(props){
        console.log("PR",props);
    },
    watch: {
        post: {
            immediate: true, 
            handler (val) {
                if(Object.keys(val).length != 0){
                    if(val.liked == 1){
                        this.activeColor = 'red';
                    }else{
                        this.activeColor = '';
                    }
                    this.likes = val.num_likes;
                }
            }
        }
    },
    data(){
        return {
            activeColor: '',
        }
    },
    methods: {
        commentClicked(){
            console.log("comment clicked")
            router.push({ name: 'CommentScreen', params: {
                id: this.post.id,
            }});
        },
        likeClicked(){
            console.log("like clicked");
            let page_url = this.url+'api/like_post';
            let data = new FormData();
            data.append('post_id', this.post.id);
            axios.post(page_url,data)
            .then(response => {
                console.log("RESPONSE LIKE POST ",response.data.status_code);
                if(response.data.status_code == 1){
                    this.activeColor = 'red';
                    this.likes = response.data.likes;
                }else{
                    this.activeColor = '';
                    this.likes = response.data.likes;
                }
            })
            .catch(error => {
                console.log(error);
            });   
        }
    }
}
</script>