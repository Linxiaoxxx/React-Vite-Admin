import { createAlova } from 'alova'
import ReactHook from 'alova/react'
import GlobalFetch from 'alova/GlobalFetch'
import { message } from 'antd'
import { createAlovaMockAdapter } from '@alova/mock'
import mockGroup1 from './mock/group1'

interface IRequest<T = any> {
  code: number
  msg: string
  data: T
}

const mockAdapter = createAlovaMockAdapter([mockGroup1], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,
  delay: 100,
  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch()
})

const http = createAlova({
  baseURL: '/',
  timeout: 360000,
  //   requestAdapter: GlobalFetch(),
  requestAdapter: mockAdapter,
  statesHook: ReactHook,
  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    method.config.headers.token = 'token'
    // 除了登录接口，其他接口在用户未登录时中断请求
    //   if (someCondition) {
    //     method.abort();
    //   }
  },
  responded: {
    onSuccess: async (response) => {
      console.log('response', response)
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      const json = await response.json()
      console.log('json', json)
      if (json.code !== 1) {
        throw new Error(json.message)
      }

      return json.data as IRequest
    },
    onError: (err) => {
      message.error(err.message || '请求失败')
    }
  }
})

export default http
