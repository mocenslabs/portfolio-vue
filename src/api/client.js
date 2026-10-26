import axios from 'axios'

const API_BASE = 'https://portfolio-blackeagle.fly.dev/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Helper: appends ?lang= based on current locale.
 * Keeps endpoints exactly the same as before.
 */
export function withLang(path, lang = 'es') {
  const separator = path.includes('?') ? '&' : '?'
  return `${path}${separator}lang=${lang}`
}

export async function getAbout(lang = 'es') {
  const { data } = await api.get(withLang('/about/', lang))
  return data
}

export async function getBadges() {
  const { data } = await api.get('/badge/')
  return data
}

export async function getEducation(lang = 'es') {
  const { data } = await api.get(withLang('/education/', lang))
  return data
}

export async function getExperience(lang = 'es') {
  const { data } = await api.get(withLang('/experience/', lang))
  return data
}

export async function getProjects(lang = 'es') {
  const { data } = await api.get(withLang('/projects/', lang))
  return data
}

export async function getExtras(lang = 'es') {
  const { data } = await api.get(withLang('/extra/', lang))
  return data
}

export async function getOther(lang = 'es') {
  const { data } = await api.get(withLang('/other/', lang))
  return data
}

export async function postContact(payload) {
  const { data } = await api.post('/contact/', payload)
  return data
}

export default api
