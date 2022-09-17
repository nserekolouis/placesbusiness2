<template>
  <div class="post-menu">
    <div class="col-md-12 div-right">
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          ...
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button" @click="loginAction">
            SignIn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

//const TAG = "COMMENT_PLACE_NAME";

export default {
  name: "CommentPlaceName",
  props: {
    post: {},
    index: Number,
  },
  methods: {
    loginAction(){
        this.$router.push({ name: 'LoginScreen'})
    }
  },
};
</script>
<style scoped>
.div-right {
  text-align: right;
}

.place-name {
  width: 100px;
}

.dropdown {
  width: 36px;
  height: 30px;
  display: inline-block;
  margin-left: auto;
  /* background-color: #c1c1c12e; */
  text-align: center;
  border-radius: 50%;
}

.dropdown-toggle::after {
  display: none;
}
.p-place-name {
  margin-bottom: 0px;
  padding-top: 5px;
  font-size: 0.875rem;
}
</style>