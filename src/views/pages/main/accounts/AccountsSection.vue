<template>
    <div style="margin-top:5px; margin-bottom:5px">
        <font-awesome-icon icon="fa-solid fa-long-arrow-left"
        @click="$router.back()"
        />
        <h6>Account Infomation</h6>
   </div>
    <div class="row card" style="margin-top: 50px;">
        <p>{{ email }}</p>
        <p>{{ userhandle }}</p>
        <p>{{ username }}</p>
    </div>
</template>
<script>
import Auth from '@/Auth.js';
export default {
    name: 'AccountsSection',
    data(){
        return {
            email: Auth.user.email,
            userhandle: Auth.user.userhandle,
            username: Auth.user.username
        }
    }
}
</script>
<style scoped>
h6 {
    display: inline-block;
    margin-left:10px;
}
</style>