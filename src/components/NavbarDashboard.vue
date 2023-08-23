<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Expand at sm</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-bs-toggle="dropdown" aria-expanded="false">Choose Place</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown03">
              <li v-for="request in requests"
              :key="request.id"
              >
              <a class="dropdown-item" href="#">{{request.main_text}}</a>
              </li> 
            </ul>
          </li>
        </ul>
        <form>
          <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import {inject,ref,onMounted} from "vue";
import axios from "axios";

const TAG = 'N_D';
export default {
    name:"NavbarDashboard",
    setup() {
        const requests = ref([]);
        const url_v3 = inject('url_v3');

        onMounted(() => {
            getAdminRequests();
        });

        const getAdminRequests = () => {
            let page_url = url_v3 + "/get_admin_requests";
            axios
                .get(page_url)
                .then((response) => {
                    console.log(TAG + "_req_resp", response);
                    requests.value = response.data.requests;
                })
                .catch((error) => {
                    console.log(TAG + "_error",error);
                });
        }
        return {
            requests
        }
    },
}
</script>