<template>
  <title-component :title="componentTitle" />
  <hr>
  <div class="row col card accounts-card">
    <p>{{ email }}</p>
    <p>{{ userhandle }}</p>
    <p>{{ username }}</p>
  </div>
</template>
<script>
import Auth from "@/Auth.js";
import TitleComponent from "@/components/TitleComponent.vue";
import { onMounted } from "vue";

export default {
  name: "AccountsSection",
  components: {
    TitleComponent,
  },
  setup() {
    const componentTitle = "Accounts";

    onMounted(() => {
      document.title = "Places | Accounts";
    });

    return {
      componentTitle,
    };
  },
  data() {
    return {
      email: Auth.user.email,
      userhandle: Auth.user.userhandle,
      username: Auth.user.username,
    };
  },
};
</script>
<style scoped>
h6 {
  display: inline-block;
  margin-left: 10px;
}

.btn-home {
  margin-top: 5px;
  text-align: center;
  margin-bottom: 10px;
}

.accounts-card{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}
</style>