// /src/services/dataService.js

// Leer un archivo JSON (.txt) desde /public/data/
export async function readTxtFile(relativePath) {
  try {
    const response = await fetch(relativePath)
    if (!response.ok) {
      throw new Error(`Error al cargar archivo: ${relativePath}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error al leer archivo:', error)
    return []
  }
}

// Leer datos desde localStorage
export function readFromStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error(`Error al leer "${key}" de localStorage`, error)
    return null
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Guardar datos en localStorage
export function writeToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error al guardar "${key}" en localStorage`, error)
  }
}

// Eliminar datos de localStorage
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error al eliminar "${key}" de localStorage`, error)
  }
}

// Verificar si el usuario existe
export async function verifyUser(email, password) {
  const usuarios = await readTxtFile('/data/usuarios.txt')
  const usuario = usuarios.find(user => user.email === email && user.password === password)
  return usuario || null
}