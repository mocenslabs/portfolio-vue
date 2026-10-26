<template>
  <div class="page">
    <div class="container">
      <header class="section-header">
        <h1>{{ t(messages.projects, 'title') }}</h1>
        <p>{{ t(messages.projects, 'subtitle') }}</p>
      </header>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t(messages.common, 'loading') }}</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ t(messages.common, 'errorLoad') }}</p>
      </div>

      <div v-else class="projects-grid">
        <article
          v-for="project in list"
          :key="project.id"
          class="card project-card"
        >
          <div class="project-image" v-if="project.image">
            <img :src="project.image" :alt="project.project_name" loading="lazy" />
          </div>
          <div class="project-body">
            <h3>{{ project.project_name }}</h3>
            <p>{{ project.description }}</p>
            <a
              v-if="project.project_url"
              :href="project.project_url"
              target="_blank"
              rel="noopener"
              class="btn btn-ghost"
            >
              {{ t(messages.projects, 'viewProject') }}
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '@/api/client'
import { useLocale, onLangChange } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, t } = useLocale()
const list = ref([])
const loading = ref(true)
const error = ref(false)

async function load() {
  loading.value = true
  error.value = false
  try {
    const data = await getProjects(lang.value)
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
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-image {
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--bg-elevated);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s;
}

.project-card:hover .project-image img {
  transform: scale(1.04);
}

.project-body {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.project-body h3 {
  font-size: 1.15rem;
  font-weight: 600;
}

.project-body p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
  flex: 1;
}

.project-body .btn {
  align-self: flex-start;
  margin-top: 0.5rem;
}
</style>
