import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
/*客户端所有程序 */
import ClientIndex from '@/components/client/ClientIndex'
import Home from '@/components/client/pages/Home'
import Series from '@/components/client/pages/Series'
import Historylist from '@/components/client/pages/Historylist'
import Record from '@/components/client/pages/Record'
import Aboutme from '@/components/client/pages/Aboutme'
/*服务端所有程序 */
import AdminIndex from '@/components/admin/AdminIndex'
import Loginpage from '@/components/admin/pages/Login'
import Registerpage from '@/components/admin/pages/Register'
import adminHome from '@/components/admin/pages/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ClientIndex',
      redirect: { name: 'home' },
      component: ClientIndex,
      children: [
        { path: 'home', component: Home, name: 'home' },
        { path: 'series', component: Series },
        { path: 'historylist', component: Historylist },
        { path: 'record', component: Record },
        { path: 'aboutme', component: Aboutme }]
    },
    {
      path: '/zetalogin',
      name: 'Loginpage',
      component: Loginpage
    },
    {
      path: '/zetaregister',
      name: 'Loginpage',
      component: Registerpage
    },
    {
      path: '/admin',
      name: 'AdminIndex',
      component: AdminIndex,
      children: [
        { path: 'home', component: adminHome, name: 'adminHome' }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  debugger
  const token = localStorage.getItem('eleToken')
  // 不是登录和注册,并且token存在
  if (to.fullPath !== '/zetalogin' && to.fullPath !== '/zetaregister' && !token) {
    next({ path: '/zetalogin' })
  } else if (to.fullPath !== '/zetalogin' && to.fullPath !== '/zetaregister' && token) {
    axios.post('/api/checktoken', { token }).then((data) => {
      var data = data.data
      if (data && data.token_errcode === 0) {
        next()
      } else {
        next({ path: '/zetalogin' })
      }
    })
  } else {
    next()
  }
});

export default router