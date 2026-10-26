<template>
  <div class="page">
    <div class="container">
      <header class="section-header">
        <h1>{{ t(messages.experience, 'title') }}</h1>
        <p>{{ t(messages.experience, 'subtitle') }}</p>
      </header>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t(messages.common, 'loading') }}</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>{{ t(messages.common, 'errorLoad') }}</p>
      </div>

      <div v-else class="timeline">
        <article
          v-for="(exp, i) in list"
          :key="exp.id"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="dot"></div>
            <div v-if="i < list.length - 1" class="line"></div>
          </div>
          <div class="card timeline-card">
            <div class="exp-header">
              <h3>{{ exp.position }}</h3>
              <span class="exp-dates">
                {{ exp.month_of_income }}/{{ exp.year_of_income }}
                –
                {{ formatEgress(exp) }}
              </span>
            </div>
            <p class="exp-company">{{ exp.company }}</p>
            <p class="exp-desc">{{ exp.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getExperience } from '@/api/client'
import { useLocale, onLangChange } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { lang, t } = useLocale()
const list = ref([])
const loading = ref(true)
const error = ref(false)

function formatEgress(exp) {
  if (!exp.year_of_egress || exp.year_of_egress === 0) {
    return t(messages.experience, 'present')
  }
  return `${exp.month_of_egress}/${exp.year_of_egress}`
}

async function load() {
  loading.value = true
  error.value = false
  try {
    const data = await getExperience(lang.value)
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
.timeline {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 1.25rem;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.4rem;
}

.timeline-marker .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  flex-shrink: 0;
}

.timeline-marker .line {
  width: 2px;
  flex: 1;
  background: var(--border);
  margin-top: 0.5rem;
}

.timeline-card {
  margin-bottom: 1.5rem;
}

.exp-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.exp-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
}

.exp-dates {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 500;
}

.exp-company {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.exp-desc {
  font-size: 0.925rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
</style>
