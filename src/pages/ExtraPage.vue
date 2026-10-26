<template>
  <div class="page">
    <div class="container">
      <header class="section-header">
        <h1>{{ t(messages.extras, 'title') }}</h1>
      </header>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t(messages.common, 'loading') }}</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ t(messages.common, 'errorLoad') }}</p>
      </div>

      <template v-else>
        <!-- Activities -->
        <section v-if="extras.length" class="block">
          <h2 class="block-title">{{ t(messages.extras, 'activities') }}</h2>
          <div class="extras-list">
            <div v-for="item in extras" :key="item.id" class="card extra-row">
              <span class="extra-year">{{ item.year }}</span>
              <span class="extra-text">{{ item.activity }}</span>
            </div>
          </div>
        </section>

        <!-- Other -->
        <section v-if="others.length" class="block">
          <h2 class="block-title">{{ t(messages.extras, 'other') }}</h2>
          <div class="other-grid">
            <article v-for="item in others" :key="item.id" class="card other-card">
              <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" />
              <div class="other-body">
                <span class="extra-year">{{ item.year }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.institute }}</p>
              </div>
            </article>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getExtras, getOther } from '@/api/client'
import { useLocale, onLangChange } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, t } = useLocale()
const extras = ref([])
const others = ref([])
const loading = ref(true)
const error = ref(false)

async function load() {
  loading.value = true
  error.value = false
  try {
    const [extrasData, otherData] = await Promise.all([
      getExtras(lang.value),
      getOther(lang.value),
    ])
    extras.value = Array.isArray(extrasData) ? extrasData : []
    others.value = Array.isArray(otherData) ? otherData : []
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
.block {
  margin-bottom: 3rem;
}

.block-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
}

.extras-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 720px;
}

.extra-row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
}

.extra-year {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  min-width: 48px;
}

.extra-text {
  font-size: 0.95rem;
  color: var(--text-primary);
}

.other-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}

.other-card {
  padding: 0;
  overflow: hidden;
}

.other-card img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}

.other-body {
  padding: 1.1rem;
}

.other-body h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.25rem 0;
}

.other-body p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
</style>
