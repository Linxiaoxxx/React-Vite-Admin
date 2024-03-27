import { defineMock } from '@alova/mock'
import dayjs from 'dayjs'

// 取 min-max 随机数，包括整数，指定小数位
function getRandomInt(min: number, max: number, decimal = 0) {
  return decimal ? (Math.random() * (max - min + 1)).toFixed(decimal) : Math.floor(Math.random() * (max - min + 1)) + min
}

export default defineMock(
  {
    // 捕获get请求
    '/userlogin': [1, 2, 3, 4],
    '/line/data': ({ query }) => {
      const { day } = query
      console.log('day', day)
      const arr = []
      for (let i = 0; i < day; i++) {
        arr.push({
          day: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
          value: getRandomInt(10, 100)
        })
      }
      return {
        code: 1,
        data: arr.reverse()
      }
    },
    '/bar/data': ({ query }) => {
      const { rank } = query
      const arr = []
      for (let i = 0; i < rank; i++) {
        arr.push({
          name: `name${i + 1}`,
          value: getRandomInt(10, 100)
        })
      }
      return {
        code: 1,
        data: arr
      }
    }

    // 捕获post请求
    // '[POST]/todo': ({ query, data }) => {
    //   return { success: true }
    // },

    // // 返回更详细的信息
    // '[POST]/todo': ({ query, data }) => {
    //   return {
    //     status: 403,
    //     statusText: 'unknown error',
    //     responseHeaders: {

    //     },
    //     body: {
    //       success: true
    //     }
    //   }
    // },

    // // 模拟网络错误
    // '[POST]/todo': ({ query, data }) => {
    //   throw new Error('network error')
    // },

  },
  true
) // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
