<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CLoading :active="isLoading"
        :can-cancel="true"
        :is-full-page="false"></CLoading>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <h1>Login</h1>
                <p class="text-medium-emphasis">Sign In to your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    v-model="username"
                    placeholder="Username"
                    autocomplete="username"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    v-model="password"
                    placeholder="Password"
                    autocomplete="current-password"
                  />
                </CInputGroup>
                <CRow style="margin-top:5px">
                  <CCol md="12">
                    <CAlert color="danger" :visible="showAlert">
                      {{alertMessage}}
                    </CAlert>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol :xs="6">
                    <CButton color="primary" class="px-4" @click="loginWithPassword()"> Login </CButton>
                  </CCol>
                  <CCol :xs="6" class="text-right">
                    <CButton color="link" class="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
                <div style="display: flex;align-items: center;" @click="loginWithWechat()">
                <CIcon icon="cib-wechat" />
                wechat
                </div>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="loginWithPassword()">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: 'admin',
      password: 'admin',
      alertMessage: '',
      showAlert: false,
      isLoading: false
    }
  },
  methods: {
    loginWithPassword() {
      if (!this.username || !this.password) {
        this.alertMessage = 'Username and password should not be empty'
        this.showAlert = true
      } else {
        var that = this
        this.isLoading = true
        this.$axios.post('/users/login', {
          username: that.username,
          password: that.password
        }).then(() => {
          that.$router.push({
            name: 'Overview'
          })
        }).catch(err => {
          that.alertMessage = err.response.data
          that.showAlert = true
        }).finally(() => {
          that.isLoading = false
        })
      }
    },
    loginWithWechat() {
      var that = this
        // this.isLoading = true
        this.$axios.get('/users/login/wechat').then((res) => {
          window.open(res.data)
          // that.$router.push({
          //   name: 'Overview'
          // })
        }).catch(err => {
          that.alertMessage = err.response.data
          that.showAlert = true
        }).finally(() => {
          that.isLoading = false
        })
    }
  }
}
</script>
