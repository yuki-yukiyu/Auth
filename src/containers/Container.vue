<template>
  <div class="c-app">
    <Sidebar :visible="visible"/>
    <div class="c-wrapper">
      <Header v-on:toggleSideBar="visible = !visible"/>
      <div class="body flex-grow-1 px-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default {
  name: 'ContainerLayout',
  components: {
    Sidebar,
    Header,
    Footer
  },
  data () {
    return {
      visible: true
    }
  }
}
</script>
