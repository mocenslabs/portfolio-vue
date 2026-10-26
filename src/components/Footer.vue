<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p class="copyright">
        &copy; {{ year }} Mauro Vicens. {{ t(messages.footer, 'rights') }}.
      </p>
      <div class="socials">
        <a href="https://github.com/blackeagledhs" target="_blank" rel="noopener" aria-label="GitHub">
          <i class="bi bi-github"></i>
        </a>
        <a href="https://linkedin.com/in/mauro-andres-vicens" target="_blank" rel="noopener" aria-label="LinkedIn">
          <i class="bi bi-linkedin"></i>
        </a>
        <a href="mailto:mauro.vicens@gmail.com" aria-label="Email">
          <i class="bi bi-envelope"></i>
        </a>
        <a href="https://t.me/Black_Eagle_DHS" target="_blank" rel="noopener" aria-label="Telegram">
          <i class="bi bi-telegram"></i>
        </a>
        <a href="https://wa.me/5493471630170" target="_blank" rel="noopener" aria-label="WhatsApp">
          <i class="bi bi-whatsapp"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocale } from '@/composables/useLocale'
import { messages } from '@/i18n/messages'

const { t } = useLocale()
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  padding: 1.25rem 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.copyright {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.socials {
  display: flex;
  gap: 0.75rem;
}

.socials a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  border: 1px solid var(--border);
  transition: all var(--transition);
  font-size: 1rem;
}

.socials a:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}

@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
