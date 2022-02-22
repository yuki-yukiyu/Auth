<template>
  <CHeader position="sticky">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="toggleSideBar()">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem class="px-3">
          <CNavLink href="/#/Overview"> Overview </CNavLink>
        </CNavItem>
        <CNavItem  class="px-3">
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
        <CNavItem  class="px-3">
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>
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
