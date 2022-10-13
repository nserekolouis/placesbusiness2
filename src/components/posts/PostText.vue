<template>
  <div class="row">
    <div class="col">
      <p v-if="hasMoreText">
        <span class="span-p-text">
          <span v-html="postTextOne"></span>
          <span class="dots" :style="{display: displayDots}" @click="showMore"> ...More</span>
          <span v-html="postTextTwo" :style="{display: displayMore}"></span>
        </span>
      </p>
      <p v-else>
        <span class="span-p-text" v-html="postText"></span>
      </p>
    </div>
  </div>
</template>
<script>
import { ref, 
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
    const displayDots = ref("inline");
    const hasMoreText = ref(false);
    const postTextOne = ref("");
    const postTextTwo = ref("");

    if(postText.value != null){
      const words = postText.value.split(/\r?\n/);
     
      words.forEach((word) => {
          if (word.charAt(0) === "#"){
            postText.value = postText.value.replace(word,'<span style="color:#288c7f">'+word+'</span>');
          }
      });

      if(postText.value.length <= 320){
        hasMoreText.value = false;
      }else{
        hasMoreText.value = true;
      }

      postTextOne.value = postText.value.substring(0,319);
      postTextTwo.value = postText.value.substring(319,(postText.value.length-1));
    }

    // onActivated(() => {
    //   console.log(TAG + ' TEXT ',props.post);
    //   postText.value = props.post.post_text;
    //   if(postText.value != null){
    //     const words = postText.value.split(/\r?\n/);
    //     console.log(TAG + ' 3 ',words);
    //     words.forEach((word) => {
    //         if (word.charAt(0) === "#"){
    //           postText.value = postText.value.replace(word,'<span style="color:#288c7f">'+word+'</span>');
    //         }
    //     });

    //     if(postText.value.length <= 320){
    //       hasMoreText.value = false;
    //     }else{
    //       hasMoreText.value = true;
    //     }

    //     postTextOne.value = postText.value.substring(0,319);
    //     postTextTwo.value = postText.value.substring(319,(postText.value.length-1));
    //   }
    // });

    // onMounted(() => {
    //   console.log(TAG + ' TEXT ',props.post);
    //   postText.value = props.post.post_text;
    //   if(postText.value != null){
    //     const words = postText.value.split(/\r?\n/);
    //     console.log(TAG + ' 3 ',words);
    //     words.forEach((word) => {
    //         if (word.charAt(0) === "#"){
    //           postText.value = postText.value.replace(word,'<span style="color:#288c7f">'+word+'</span>');
    //         }
    //     });

    //     if(postText.value.length <= 320){
    //       hasMoreText.value = false;
    //     }else{
    //       hasMoreText.value = true;
    //     }

    //     postTextOne.value = postText.value.substring(0,319);
    //     postTextTwo.value = postText.value.substring(319,(postText.value.length-1));
    //   }
    // });
    
    
    const showMore = () => {
      displayMore.value = "block";
      displayDots.value = "none";
    };

    return {
      pT,
      postText,
      hasMoreText,
      postTextOne,
      postTextTwo,
      displayMore,
      displayDots,
      showMore
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

.dots {
  color: #288c7f;
  cursor: pointer;
  font-weight: bold;
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