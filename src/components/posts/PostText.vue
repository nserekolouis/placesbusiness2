<template>
  <div class="row">
    <div class="col">
      <p v-if="readMoreClicked">
      <small>
        <span class="span-p-text" v-html="postText"></span>
      </small>
      </p>
      <p v-if="hasMoreText">
       <small>
        <span class="span-p-text">
          <span v-html="postTextOne"></span>
          <span class="dots" :style="{ display: displayDots }" @click="showMore">Read More</span>
          <!-- <span v-html="postTextTwo" :style="{display: displayMore}"></span> -->
        </span>
       </small>
      </p>
      <p v-else>
        <small>
          <span class="span-p-text" v-html="postText"></span>
        </small>
      </p>
    </div>
  </div>
</template>
<script>
import { 
  ref,
  watch
  //onActivated,
  //onMounted
 } from "vue";

const TAG = "POST_TEXT";

export default {
  name: "PostText",
  props: {
    post: {},
  },
  setup(props){
    console.log(TAG + '-1-',props.post);
    const postText = ref(props.post.post_text);
    const pT = ref("");
    const displayMore = ref("none");
    const displayDots = ref("block");
    const hasMoreText = ref(false);
    const readMoreClicked = ref(false);
    const postTextOne = ref("");


    watch(
      () => props.post,
      (newVal, oldVal) => {
        console.log("NEW",newVal);
        console.log("OLD",oldVal);
        postText.value = props.post.post_text;
        if(postText.value != null){
          if(postText.value != null){
            const words = postText.value.split(/\r?\n/);
            words.forEach((word) => {
              if (word.charAt(0) === "#"){
                postText.value = postText.value.replace(word,' <span style="color:#288c7f">'+word+'</span> ');
              }else if(word.startsWith("https",0)){
                postText.value = postText.value.replace(word,' <span style="color:#288c7f; text-decoration:underline">'+word+'</span> ');
              }
        });

        if(postText.value.length <= 320){
          hasMoreText.value = false;
          postTextOne.value = postText.value;
          
        }else{
          hasMoreText.value = true;
          postTextOne.value = postText.value.substring(0,319);
        }
      }
    }
    }
    );


    const showMore = () => {
      displayMore.value = "block";
      displayDots.value = "none";
      readMoreClicked.value = true;
    };

    return {
      pT,
      postText,
      hasMoreText,
      postTextOne,
      displayMore,
      displayDots,
      showMore,
      readMoreClicked
    }
},
};
</script>
<style scoped>
p {
  margin-bottom: 0px;
  font-size: 14px;
  white-space: pre-line;
  overflow-wrap: break-word;
}

.span-p-text{
  white-space: pre-line;
  overflow-wrap: break-word;
}

.dots{
    color: white;
    cursor: pointer;
    font-weight: bold;
    background-color: #288c7f;
    padding: 1px;
    font-size: 10px;
    text-transform: uppercase;
    margin-top: 10px;
    border-radius: 0px;
    width: 65px;
}

@media (max-width: 575.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 767.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 991.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 1199.98px) {
  p {
    font-size: 14px;
  }
}

@media (max-width: 1399.98px) {
  p {
    font-size: 14px;
  }
}
</style>