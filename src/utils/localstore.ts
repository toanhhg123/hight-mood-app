export class LocalStorage {
  get<T>(key: string): T | null {
    try {
      console.log(JSON.parse(localStorage.getItem(key)!))
      return JSON.parse(localStorage.getItem(key)!) as T
    } catch (error) {
      return null
    }
  }

  getStringLocal(key: string) {
    return localStorage.getItem(key)
  }

  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      return false
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      return false
    }
  }
}

export default new LocalStorage()
