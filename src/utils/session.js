export function setItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key) {
  return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : ''
}
