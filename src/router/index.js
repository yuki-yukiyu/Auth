import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// Containers
const Container = () => import('@/containers/Container')

// Views
const Overview = () => import('@/views/pages/Overview')

const routes = [
  {
      path: '/',
      redirect: '/Overview',
      name: 'Home',
      component: Container,
      children: [
        {
          path: 'Overview',
          name: 'Overview',
          component: Overview,
          meta: {
            authRequired: true
          }
        },
      ]
  },
  {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render() {
          return h(resolveComponent('router-view'))
        },
      },
      children: [
          {
              path: '404',
              name: 'Page404',
              component: () => import('@/views/pages/Page404'),
          },
          {
              path: '500',
              name: 'Page500',
              component: () => import('@/views/pages/Page500'),
          },
          {
              path: 'login',
              name: 'Login',
              component: () => import('@/views/pages/Login'),
          },
          {
              path: 'register',
              name: 'Register',
              component: () => import('@/views/pages/Register'),
          }
      ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  updateAccessToken()
  let currentToken = localStorage.getItem('accessToken')
  if (to.name !== 'Login' && (currentToken === null || currentToken === undefined)) {
    router.push({
      name: 'Login'
    })
  }
  return next()
})

function updateAccessToken () {
  let currentToken = localStorage.getItem('accessToken')
  let cookies = document.cookie
    let cookieMap = new Map()
    if (document.cookie.includes('accessToken')) {
      cookies = cookies.split(';')
      cookies.forEach(item => {
        item = item.split('=')
        cookieMap.set(item[0].trim(), item[1])
      })
      let tagetToken = cookieMap.get('accessToken')
      if (currentToken === null || currentToken === undefined || currentToken !== tagetToken) {
        localStorage.setItem('accessToken', cookieMap.get('accessToken'))
        localStorage.setItem('username', cookieMap.get('username'))
        localStorage.setItem('displayName', cookieMap.get('displayName'))
      }
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('username')
      localStorage.removeItem('displayName')
    }
}

export default router
