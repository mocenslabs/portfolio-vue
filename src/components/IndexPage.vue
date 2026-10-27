<template>
  <div class="page home">
    <!-- Hero -->
    <section class="hero container" v-if="about">
      <div class="hero-photo">
        <div class="photo-ring">
          <img :src="about.selfie" :alt="`${about.name} ${about.surname}`" />
        </div>
      </div>

      <div class="hero-content">
        <h1 class="hero-name">{{ about.name }} {{ about.surname }}</h1>
        <p class="hero-role">{{ about.position }}</p>
        <p class="hero-bio">{{ about.description }}</p>

        <div class="hero-actions">
          <router-link to="/projects" class="btn btn-primary">
            {{ t(messages.home, 'viewProjects') }}
            <i class="bi bi-arrow-right"></i>
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            {{ t(messages.home, 'contactMe') }}
            <i class="bi bi-envelope"></i>
          </router-link>
        </div>
      </div>
    </section>

    <div v-else-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>{{ t(messages.common, 'loading') }}</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ t(messages.common, 'errorLoad') }}</p>
    </div>

    <!-- Badges / Stack -->
    <section class="badges-section container" v-if="badges.length">
      <div class="section-header">
        <h2>
          <span class="dot"></span>
          {{ t(messages.home, 'stackTitle') }}
        </h2>
        <p>{{ t(messages.home, 'stackSubtitle') }}</p>
      </div>

      <div class="badges-grid">
        <div
          v-for="badge in badges"
          :key="badge.id"
          class="badge-card"
        >
          <img :src="badge.badge" :alt="'Badge ' + badge.id" loading="lazy" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getAbout, getBadges } from '@/api/client'
import { useLocale, onLangChange } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, t } = useLocale()

const about = ref(null)
const badges = ref([])
const loading = ref(true)
const error = ref(false)

async function loadData() {
  loading.value = true
  error.value = false
  try {
    const [aboutData, badgesData] = await Promise.all([
      getAbout(lang.value),
      getBadges(),
    ])
    about.value = Array.isArray(aboutData) ? aboutData[0] : aboutData
    badges.value = Array.isArray(badgesData) ? badgesData : []
  } catch (e) {
    console.error('Error loading home data:', e)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

// Re-fetch about when language changes
onLangChange(() => {
  getAbout(lang.value).then((data) => {
    about.value = Array.isArray(data) ? data[0] : data
  }).catch(console.error)
})
</script>

<style scoped>
.home {
  padding-bottom: 5rem;
}

/* ── Hero ─────────────────────────────────────────────── */
.hero {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3.5rem;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 4rem;
  min-height: calc(100vh - var(--nav-height) - 8rem);
}

.hero-photo {
  flex-shrink: 0;
}

.photo-ring {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, var(--accent), transparent 60%);
  box-shadow: var(--shadow-glow);
}

.photo-ring img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg-primary);
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.6rem;
}

.hero-role {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  font-weight: 400;
}

.hero-bio {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
  max-width: 540px;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

/* ── Badges ───────────────────────────────────────────── */
.badges-section {
  padding-top: 1rem;
}

.section-header {
  text-align: left;
  margin-bottom: 1.75rem;
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.35rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.section-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
  padding-left: 1.1rem;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  /* evita que el zoom se corte en los bordes del contenedor */
  overflow: visible;
  padding: 0.5rem;
}

.badge-card {
  position: relative;
  z-index: 1;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease, z-index 0s;
  cursor: pointer;
}

.badge-card:hover {
  z-index: 20;
  border-color: var(--accent);
  background: var(--bg-card-hover);
  /* amplía el badge para verlo bien sin empujar el layout */
  transform: scale(1.85);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(249, 115, 22, 0.25);
}

.badge-card img {
  max-width: 72px;
  max-height: 72px;
  object-fit: contain;
  transition: transform 0.25s ease;
  pointer-events: none;
}

/* en móvil un poco menos de zoom para no tapar todo */
@media (max-width: 768px) {
  .badge-card:hover {
    transform: scale(1.45);
  }
}

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    min-height: auto;
    padding-top: 1rem;
  }

  .hero-photo {
    display: flex;
    justify-content: center;
  }

  .photo-ring {
    width: 180px;
    height: 180px;
  }

  .hero-bio {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .section-header {
    text-align: center;
  }

  .section-header h2 {
    justify-content: center;
  }

  .section-header p {
    padding-left: 0;
  }

  .badges-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
}
</style>
