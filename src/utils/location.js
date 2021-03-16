function addParamUrl(key, value) {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  window.history.replaceState(null, null, url)
}

function deleteParamUrl(key) {
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  window.history.replaceState(null, null, url)
}

function getParamUrl(key) {
  const url = new URL(window.location.href)
  return url.searchParams.get(key)
}

export { addParamUrl, deleteParamUrl, getParamUrl }
