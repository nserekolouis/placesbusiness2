<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
    <div class="profile-background">
       <p class="h6 p-header">Account</p>
    </div>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
      </CDropdownHeader>
      <CDropdownItem
      @click="logout"
      > 
        <CIcon icon="cil-lock-locked" /> Logout 
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>

import Auth from '@/Auth.js';
import router from '@/router';

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      username: Auth.user.name
    }
  },
  methods: {
    logout: function(){
      Auth.logout;
      router.push({name: 'LoginScreen'});
    }
  }
}
</script>
