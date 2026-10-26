<template>
  <div class="page">
    <div class="container contact-layout">
      <header class="section-header">
        <h1>{{ t(messages.contact, 'title') }}</h1>
        <p>{{ t(messages.contact, 'subtitle') }}</p>
      </header>

      <form class="card contact-form" @submit.prevent="submit">
        <div class="form-row">
          <div class="field">
            <label for="full_name">{{ t(messages.contact, 'fullName') }}</label>
            <input id="full_name" v-model="form.full_name" type="text" required />
          </div>
          <div class="field">
            <label for="phone">{{ t(messages.contact, 'phone') }}</label>
            <input id="phone" v-model="form.phone" type="tel" required />
          </div>
        </div>

        <div class="field">
          <label for="email">{{ t(messages.contact, 'email') }}</label>
          <input id="email" v-model="form.email" type="email" required />
        </div>

        <div class="field">
          <label for="subject">{{ t(messages.contact, 'subject') }}</label>
          <input id="subject" v-model="form.subject" type="text" required />
        </div>

        <div class="field">
          <label for="message">{{ t(messages.contact, 'message') }}</label>
          <textarea id="message" v-model="form.message" rows="5" required></textarea>
        </div>

        <div v-if="feedback.show" class="feedback" :class="feedback.type">
          {{ feedback.text }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="sending">
          {{ sending ? t(messages.contact, 'sending') : t(messages.contact, 'send') }}
          <i v-if="!sending" class="bi bi-send"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { postContact } from '@/api/client'
import { useLocale } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { t } = useLocale()

const form = reactive({
  full_name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
})

const sending = ref(false)
const feedback = reactive({ show: false, text: '', type: '' })

function reset() {
  form.full_name = ''
  form.phone = ''
  form.email = ''
  form.subject = ''
  form.message = ''
}

async function submit() {
  sending.value = true
  feedback.show = false
  try {
    await postContact({ ...form })
    feedback.text = t(messages.contact, 'success')
    feedback.type = 'success'
    feedback.show = true
    reset()
  } catch (e) {
    console.error(e)
    feedback.text = t(messages.contact, 'error')
    feedback.type = 'error'
    feedback.show = true
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-layout {
  max-width: 640px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.field input,
.field textarea {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.7rem 0.9rem;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color var(--transition);
  outline: none;
  width: 100%;
}

.field input:focus,
.field textarea:focus {
  border-color: var(--accent);
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

.feedback {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
}

.feedback.success {
  background: rgba(34, 197, 94, 0.12);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.feedback.error {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  .contact-form {
    padding: 1.35rem;
  }
}
</style>
