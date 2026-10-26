<template>
  <div class="page">
    <div class="container">
      <header class="section-header">
        <h1>{{ t(messages.education, 'title') }}</h1>
        <p>{{ t(messages.education, 'subtitle') }}</p>
      </header>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t(messages.common, 'loading') }}</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ t(messages.common, 'errorLoad') }}</p>
      </div>

      <div v-else class="edu-grid">
        <article
          v-for="edu in list"
          :key="edu.id"
          class="card edu-card"
          @click="selected = edu"
        >
          <div class="edu-image" v-if="edu.image">
            <img :src="edu.image" :alt="edu.title" loading="lazy" />
          </div>
          <div class="edu-body">
            <span class="edu-year">{{ edu.year }}</span>
            <h3>{{ edu.title }}</h3>
            <p class="edu-institute">{{ edu.institute }}</p>
            <p v-if="edu.description" class="edu-desc">{{ truncate(edu.description, 120) }}</p>
          </div>
        </article>
      </div>
    </div>

    <!-- Simple modal -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="selected" class="modal-backdrop" @click.self="selected = null">
          <div class="modal card">
            <button class="modal-close" @click="selected = null">&times;</button>
            <img v-if="selected.image" :src="selected.image" :alt="selected.title" class="modal-img" />
            <span class="edu-year">{{ selected.year }}</span>
            <h2>{{ selected.title }}</h2>
            <p class="edu-institute">{{ selected.institute }}</p>
            <p v-if="selected.description" class="modal-desc">{{ selected.description }}</p>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getEducation } from '@/api/client'
import { useLocale, onLangChange } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, t } = useLocale()
const list = ref([])
const loading = ref(true)
const error = ref(false)
const selected = ref(null)

function truncate(text, n) {
  if (!text) return ''
  return text.length > n ? text.slice(0, n) + '…' : text
}

async function load() {
  loading.value = true
  error.value = false
  try {
    const data = await getEducation(lang.value)
    list.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(load)
onLangChange(load)
</script>

<style scoped>
.edu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.edu-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}

.edu-image {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--bg-elevated);
}

.edu-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.edu-card:hover .edu-image img {
  transform: scale(1.05);
}

.edu-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.edu-year {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
}

.edu-body h3 {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
}

.edu-institute {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.edu-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.35rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal {
  position: relative;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  font-size: 1.5rem;
  color: var(--text-muted);
  line-height: 1;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-img {
  width: 100%;
  border-radius: var(--radius-md);
  margin-bottom: 1.25rem;
  max-height: 220px;
  object-fit: cover;
}

.modal h2 {
  font-size: 1.35rem;
  margin: 0.4rem 0;
}

.modal-desc {
  margin-top: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
