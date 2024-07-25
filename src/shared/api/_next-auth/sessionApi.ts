import axios, { AxiosInstance } from 'axios'

const nextSessionInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

class NextSessionApi {
  constructor(private _instance: AxiosInstance) {
    this._instance = _instance
  }

  public getSessionToken() {
    return this._instance.get('/auth/session')
  }

  public makeSession(credentials: string) {
    return this._instance.post('/auth/session', { credentials })
  }
}

export const nextSessionApi = new NextSessionApi(nextSessionInstance)
