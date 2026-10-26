import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/components/IndexPage.vue'
import EducationPage from '../pages/EducationPage.vue'
import ExperiencePage from '../pages/ExperiencePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import ExtraPage from '../pages/ExtraPage.vue'
import ContactPage from '../pages/ContactPage.vue'

const routes = [
  { path: '/', name: 'Home', component: IndexPage },
  { path: '/education', name: 'Education', component: EducationPage },
  { path: '/experience', name: 'Experience', component: ExperiencePage },
  { path: '/projects', name: 'Project', component: ProjectPage },
  { path: '/extras', name: 'Extra', component: ExtraPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
]

const router = createRouter({
  history: createWebHistory('/portfolio-vue/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
