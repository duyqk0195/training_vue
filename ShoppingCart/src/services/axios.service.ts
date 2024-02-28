import { ENV_CONFIG } from '@/core/constants/app'
import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: ENV_CONFIG.API_URL
})

instance.interceptors.request.use(
  async (config: any) => {
    const token = null
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const statusCode = response?.data?.status_code

    switch (statusCode) {
      case 400:
        return
      case 401:
        return

      case 500:
        return

      default:
      // return
    }

    return response?.data
  },
  (error) => {
    return error
  }
)

const api = {
  get(url: string, config?: AxiosRequestConfig) {
    return instance.get(url, config)
  },
  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post(url, data, config)
  }
}

export default api
