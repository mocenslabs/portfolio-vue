import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'portfolio-lang'
const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const currentLang = ref(saved === 'en' ? 'en' : 'es')

export function useLocale() {
  const lang = computed(() => currentLang.value)
  const isEs = computed(() => currentLang.value === 'es')
  const isEn = computed(() => currentLang.value === 'en')

  function setLang(newLang) {
    if (newLang !== 'es' && newLang !== 'en') return
    currentLang.value = newLang
    localStorage.setItem(STORAGE_KEY, newLang)
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
    // messages is { es: 'texto', en: 'text' }
    if (messages.es !== undefined || messages.en !== undefined) {
      return messages[currentLang.value] || messages.es || key
    }
    // messages is { home: { es: '..', en: '..' }, ... }
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

// Allow watching from outside
export function onLangChange(callback) {
  return watch(currentLang, callback)
}
