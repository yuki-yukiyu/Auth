<template>
  <CHeader position="sticky">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="toggleSideBar()">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem class="px-3">
          <CNavLink href="/#/Overview" to="/Overview"> Overview </CNavLink>
        </CNavItem>
        <CNavItem  class="px-3">
          <CNavLink href="#" to="/Overview">Users</CNavLink>
        </CNavItem>
        <CNavItem  class="px-3">
          <CNavLink href="#" to="/Overview">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <HeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import HeaderDropdownAccnt from './HeaderDropdownAccnt'
export default {
  name: 'HeaderMenu',
  components: {
    HeaderDropdownAccnt
  },
  data () {
    return {
      log: ''
    }
  },
  methods: {
    toggleSideBar() {
      this.$emit('toggleSideBar', true)
    }
  }
}
</script>
