import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'portfolio-lang'

function detectBrowserLang() {
  if (typeof navigator === 'undefined') return 'es'
  const raw = (navigator.language || navigator.userLanguage || 'es').toLowerCase()
  // es, es-AR, es-ES, es-MX, etc. → Spanish
  return raw.startsWith('es') ? 'es' : 'en'
}

function getInitialLang() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  }
  return detectBrowserLang()
}

const currentLang = ref(getInitialLang())

export function useLocale() {
  const lang = computed(() => currentLang.value)
  const isEs = computed(() => currentLang.value === 'es')
  const isEn = computed(() => currentLang.value === 'en')

  function setLang(newLang) {
    if (newLang !== 'es' && newLang !== 'en') return
    currentLang.value = newLang
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }

  function toggleLang() {
    setLang(currentLang.value === 'es' ? 'en' : 'es')
  }

  /**
   * Translate a key from a messages object: { es: '...', en: '...' }
   * or from a nested dict: messages[key][lang]
   */
  function t(messages, key) {
    if (!messages) return key
    if (messages.es !== undefined || messages.en !== undefined) {
      return messages[currentLang.value] || messages.es || key
    }
    const entry = messages[key]
    if (!entry) return key
    return entry[currentLang.value] || entry.es || key
  }

  return {
    lang,
    isEs,
    isEn,
    setLang,
    toggleLang,
    t,
  }
}

export function onLangChange(callback) {
  return watch(currentLang, callback)
}
