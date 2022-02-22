<template>
  <CSidebar fixed
    :minimize="minimize"
    :visible="visible">
    <CSidebarBrand>
      <CIcon name="cil-speedometer" width="32" style = "margin-left: -40px;
    padding-right: 10px;"/>
      Dashboard</CSidebarBrand>
    <CSidebarNav>
      <CNavItem href="/#/Overview" active>
        <CIcon customClassName="nav-icon" icon="cil-home"/>
        Overview
      </CNavItem>
    </CSidebarNav>
    <CSidebarToggler/>
  </CSidebar>
</template>
<script>
export default {
  name: 'SidebarMenu',
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      minimize: false
    }
  }
}
</script>
