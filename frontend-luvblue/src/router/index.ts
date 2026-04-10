import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '@/services/authService'

// Public layout components
import HomeView from '../views/HomeView.vue'
// import Primar

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    // ==================
    // Public Routes
    // ==================
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'LUVBLU - Home',
        layout: 'public',
      },
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: () => import('../views/GalleryView.vue'),
      meta: {
        title: 'Gallery - Blue Moments',
        layout: 'public',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About - One Heart, 500 Stories',
        layout: 'public',
      },
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/CommunityView.vue'),
      meta: {
        title: 'Community - United by Blue',
        layout: 'public',
      },
    },
    {
      path: '/diary',
      name: 'BlueDiary',
      component: () => import('../views/DiaryView.vue'),
      meta: {
        title: 'Blue Diary',
        layout: 'public',
      },
    },
    {
      path: '/note',
      name: 'BlueNote',
      component: () => import('../views/NoteView.vue'),
      meta: {
        title: 'Blue Note',
        layout: 'public',
      },
    },
    {
      path: '/blue-heart',
      name: 'BlueHeart',
      component: () => import('../views/BlueHeartView.vue'),
      meta: {
        title: 'Blue Heart - 500 Moments',
        layout: 'public',
      },
    },

    // ==================
    // Admin Routes (TailAdmin Dashboard)
    // ==================
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('../views/Ecommerce.vue'),
      meta: { title: 'eCommerce Dashboard' },
    },
    {
      path: '/admin/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: { title: 'Calendar' },
    },
    {
      path: '/admin/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: { title: 'Profile' },
    },
    {
      path: '/admin/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: { title: 'Form Elements' },
    },
    {
      path: '/admin/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: { title: 'Basic Tables' },
    },
    {
      path: '/admin/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
      meta: { title: 'Line Chart' },
    },
    {
      path: '/admin/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
      meta: { title: 'Bar Chart' },
    },
    {
      path: '/admin/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: { title: 'Alerts' },
    },
    {
      path: '/admin/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: { title: 'Avatars' },
    },
    {
      path: '/admin/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: { title: 'Badge' },
    },
    {
      path: '/admin/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: { title: 'Buttons' },
    },
    {
      path: '/admin/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: { title: 'Images' },
    },
    {
      path: '/admin/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: { title: 'Videos' },
    },
    {
      path: '/admin/instagram',
      name: 'Instagram Management',
      component: () => import('../views/Instagram/InstagramManagement.vue'),
      meta: { title: 'Instagram Management' },
    },
    {
      path: '/admin/diary',
      name: 'Diary Management',
      component: () => import('../views/Diary/DiaryManagement.vue'),
      meta: { title: 'Diary Management' },
    },
    {
      path: '/admin/blue-notes',
      name: 'Blue Note Management',
      component: () => import('../views/BlueNote/BlueNoteManagement.vue'),
      meta: { title: 'Blue Note Management' },
    },
    {
      path: '/admin/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: { title: 'Blank' },
    },

    // ==================
    // Auth Routes (Full Screen)
    // ==================
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: { title: 'Signin' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: { title: 'Signup' },
    },

    // ==================
    // Error Routes
    // ==================
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: { title: '404 Error' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'LUVBLU'} | LuvBlue`

  const isLoggedIn = authService.isLoggedIn()
  const requiresAuth = to.path.startsWith('/admin')
  const isAuthPage = to.path === '/signin' || to.path === '/signup'

  if (requiresAuth && !isLoggedIn) {
    next('/signin')
  } else if (isAuthPage && isLoggedIn) {
    next('/admin')
  } else {
    next()
  }
})

export default router
