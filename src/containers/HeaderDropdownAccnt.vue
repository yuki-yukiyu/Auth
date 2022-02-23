<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <div class="d-flex align-items-center">
        <div>username</div>
        <CAvatar :src="avatar" size="md" />
      </div>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Settings
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout()"> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/logo.png'
export default {
  name: 'AppHeaderDropdownAccnt',
  data() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    logout() {
      let that = this
      this.$axios.get('/users/logout').then(function () {
        // console.log('success', response)
      }).catch(function () {
        // console.log('failed', ex)
      }).finally(function () {
        that.$router.push({
          name: 'Login'
        })
      })
    }
  }
}
</script>
