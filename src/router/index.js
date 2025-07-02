import { createRouter, createWebHistory } from 'vue-router'
import { readFromStorage } from '@/services/dataService'

// Importación de vistas
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import SpecialistsView from '@/views/SpecialistsView.vue'
import StoreView from '@/views/StoreView.vue'
import CartView from '@/views/CartView.vue'
import ProfileView from '@/views/ProfileView.vue'
import DonateView from '@/views/DonateView.vue'
import CambiarPasswordView from '@/views/CambiarPasswordView.vue'
import RecuperarView from '@/views/RecuperarView.vue'
import HistoryView from '@/views/HistoryView.vue'

// Definir las rutas
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/registro', name: 'Registro', component: RegisterView },
  { path: '/especialistas', name: 'Especialistas', component: SpecialistsView, meta: { requiresAuth: true } },
  { path: '/tienda', name: 'Tienda', component: StoreView, meta: { requiresAuth: true } },
  { path: '/carrito', name: 'Carrito', component: CartView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'Perfil', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/donaciones', name: 'Donaciones', component: DonateView, meta: { requiresAuth: true } },
  { path: '/historial', name: 'Historial', component: HistoryView, meta: { requiresAuth: true } },
  { path: '/cambiar-password', name: 'CambiarPassword', component: CambiarPasswordView, meta: { requiresAuth: true } },
  { path: '/recuperar-password', name: 'RecuperarPassword', component: RecuperarView},
  { path: '/:pathMatch(.*)*', redirect: '/' } // Redirección en caso de error
]

// Guardar el router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const usuario = readFromStorage('usuario')

  // Si la ruta requiere autenticación y el usuario no está logueado
  if (to.meta.requiresAuth && !usuario) {
    next('/login') // Redirige al login
  } else {
    next() // Permite la navegación
  }
})

export default router