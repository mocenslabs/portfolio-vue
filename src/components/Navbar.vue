<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner container">
      <!-- Logo -->
      <router-link to="/" class="logo" @click="closeMobile">
        <span class="logo-mark">MV</span>
      </router-link>

      <!-- Desktop nav -->
      <nav class="nav-links">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          active-class="active"
        >
          {{ t(messages.nav, item.key) }}
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="nav-actions">
        <!-- Language toggle -->
        <button class="lang-btn" @click="toggleLang" :title="lang === 'es' ? 'English' : 'Español'">
          {{ lang === 'es' ? 'EN' : 'ES' }}
        </button>

        <!-- CV download -->
        <a
          :href="cvUrl"
          class="btn btn-primary btn-cv"
          download
          target="_blank"
          rel="noopener"
        >
          {{ t(messages.nav, 'downloadCv') }}
          <i class="bi bi-download"></i>
        </a>

        <!-- Hamburger -->
        <button
          class="hamburger"
          :class="{ open: mobileOpen }"
          @click="mobileOpen = !mobileOpen"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="slide">
      <div v-if="mobileOpen" class="mobile-menu">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="mobile-link"
          @click="closeMobile"
        >
          {{ t(messages.nav, item.key) }}
        </router-link>
        <a :href="cvUrl" class="mobile-link accent" download target="_blank" @click="closeMobile">
          {{ t(messages.nav, 'downloadCv') }}
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, toggleLang, t } = useLocale()
const mobileOpen = ref(false)
const isScrolled = ref(false)

const baseUrl = import.meta.env.BASE_URL
const cvUrl = `${baseUrl}cv/CV-Mauro-A-Vicens.pdf`

const navItems = [
  { path: '/', key: 'home' },
  { path: '/education', key: 'education' },
  { path: '/experience', key: 'experience' },
  { path: '/projects', key: 'projects' },
  { path: '/extras', key: 'extras' },
  { path: '/contact', key: 'contact' },
]

function closeMobile() {
  mobileOpen.value = false
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  background: rgba(10, 10, 11, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}

.navbar.scrolled {
  border-bottom-color: var(--border);
  background: rgba(10, 10, 11, 0.92);
}

.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.35rem;
  color: var(--accent);
  letter-spacing: -0.03em;
}

/* Desktop links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition), background var(--transition);
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
}

.nav-link.active {
  color: var(--accent);
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.lang-btn {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  transition: all var(--transition);
}

.lang-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}

.btn-cv {
  padding: 0.55rem 1.1rem;
  font-size: 0.85rem;
}

.btn-cv i {
  font-size: 0.8rem;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: all 0.25s;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 1rem 1.5rem 1.5rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}

.mobile-link {
  padding: 0.9rem 0;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  transition: color var(--transition);
}

.mobile-link:hover,
.mobile-link.router-link-active {
  color: var(--accent);
}

.mobile-link.accent {
  color: var(--accent);
  border-bottom: none;
  margin-top: 0.5rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .btn-cv {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>
