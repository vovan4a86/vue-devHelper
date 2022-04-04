import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from "@/views/auth/UserLogin";
import UserRegister from "@/views/auth/UserRegister";
import UserDashboard from "@/views/user/UserDashboard";
import AdminDashboard from "@/views/admin/AdminDashboard";
import UserFavorites from "@/views/user/UserFavorites";
import NoteCardSingle from "@/components/NoteCardSingle";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin,
    meta: {
      guest: true
    },
  },
  {
    path: '/register',
    name: 'register',
    component: UserRegister,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: UserDashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: UserFavorites,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      is_admin: true
    }
  },
  {
    path: '/note/',
    name: 'note',
    component: NoteCardSingle,
    meta: {
      requiresAuth: true,
    },
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem('jwt') == null) {
      next({
        name: 'login',
        // params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1) {
          next()
        } else {
          next({ name: 'dashboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'dashboard' })
    }
  } else {
    next()
  }
})

export default router
