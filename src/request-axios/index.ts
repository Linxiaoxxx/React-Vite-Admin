import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router'
import { AxiosCanceler } from './axiosCancel'
import { store } from '@/redux'
import { userLogout, userUpdate } from '@/redux/modules/user/action'

export interface RS<T = any> {
  err_no: number
  msg: string
  data: T
  total?: number
}

const axiosCanceler = new AxiosCanceler()

const CONTENT_TYPE = 'Content-Type'
enum ContentTypeEnum {
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  APPLICATION_JSON = 'application/json;charset=UTF-8',
  EXT_PLAIN = 'text/plain;charset=UTF-8'
}
const instance = axios.create({
  baseURL: '/api',
  timeout: 10 * 60 * 1000
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<RS>) => {
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = ContentTypeEnum.APPLICATION_JSON
    }
    // * 将当前请求添加到 pending 中
    axiosCanceler.addPending(config)
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
instance.interceptors.response.use(
  (response: AxiosResponse<RS>): AxiosResponse<RS> => {
    const { data, config } = response
    const { msg, err_no: code } = data
    // * 在请求结束后，移除本次请求
    axiosCanceler.removePending(config)

    // 文件类型处理
    if (data instanceof Blob) {
      // 捕获blob数据类型中返回的错误信息
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string)
          if (result.err_no) {
            // 存在错误信息
            message.error(result.msg)
          }
        }
        catch (e) {}
      }
      reader.readAsText(data as unknown as Blob)
    }
    if ([401].includes(code)) {
      console.log(axiosCanceler.checkPending())
      // 未登录
      // * 清除所有请求
      axiosCanceler.removeAllPending()
      store.dispatch(userLogout(false))
      throw new Error(msg || '请求失败，未知异常')
    }
    return response
  },
  (error) => {
    return Promise.reject(
      new Error(error.message || '服务器异常，请稍后重试…')
    )
  }
)

class CAxios {
  static async get<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<RS<T>> {
    const params = Object.assign(data || {}, {})
    const response = await instance.get<RS<T>>(url, { ...config, params })
    if (!response.data.err_no || response.config.responseType === 'blob') {
      return response.data
    }
    throw new Error(response.data.msg)
  }

  static async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<RS<T>> {
    const response = await instance.post<RS<T>>(url, data, config)

    if (!response.data.err_no) {
      return response.data
    }
    throw new Error(response.data.msg)
  }

  static async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<RS<T>> {
    const response = await instance.put<RS<T>>(url, data, config)
    if (!response.data.err_no) {
      return response.data
    }
    throw new Error(response.data.msg)
  }

  static async patch<T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<RS<T>> {
    const response = await instance.patch<RS<T>>(url, data, config)
    if (!response.data.err_no) {
      return response.data
    }
    throw new Error(response.data.msg)
  }

  static async delete<T>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<RS<T>> {
    !config && (config = { data: {} })
    data && (config.data = data)
    const response = await instance.delete<RS<T>>(url, config)

    return response.data
  }
}

export const { get, post, put, patch, delete: remove } = CAxios

export default instance
