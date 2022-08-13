<template>
    <div class="row">
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