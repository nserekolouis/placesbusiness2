<template>
  <div class="row">
    <div class="col">
      <p><span 
      class="span-p-text"
      v-html="postText"></span></p>
    </div>
  </div>
</template>
<script>
import { 
  ref,
  watch
 } from "vue";

const TAG = "POST_TEXT";

export default {
  name: "PostText",
  props: {
    post: {},
  },
  setup(props){
    console.log(TAG + ' 1 ',props.post.post_text);
    const postText = ref(props.post.post_text);
    console.log(TAG + ' 2 ',postText.value);
    const pT = ref("");

    

    if(postText.value != null){
      const words = postText.value.split(/\r?\n/);
      console.log(TAG + ' 3 ',words);
      words.forEach((word) => {
          if (word.charAt(0) === "#"){
            postText.value = postText.value.replace(word,'<span style="color:#288c7f">'+word+'</span>');
          }
      });
    }

    watch(
      () => props.post,
      (newVal, oldVal) => {
        console.log("CHANGE-3-",newVal);
        console.log("CHANGE-3-",oldVal);
        postText.value = props.post.post_text;
        if(postText.value != null){
          const words = postText.value.split(/\r?\n/);
          console.log(TAG + ' 3 ',words);
          words.forEach((word) => {
              if (word.charAt(0) === "#"){
                postText.value = postText.value.replace(word,'<span style="color:#288c7f">'+word+'</span>');
              }
          });
    }
      }
    );

    return {
      pT,
      postText
    }
}
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