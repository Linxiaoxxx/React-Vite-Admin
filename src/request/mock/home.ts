import { defineMock } from '@alova/mock'
import dayjs from 'dayjs'

// 取 min-max 随机数，包括整数，指定小数位
function getRandomInt(min: number, max: number, decimal = 0) {
  return decimal ? (Math.random() * (max - min + 1)).toFixed(decimal) : Math.floor(Math.random() * (max - min + 1)) + min
}

export default defineMock(
  {
    // 用户登录
    '[POST]/userlogin': ({ data }) => {
      let permission: any[] = []
      if (data.username === 'admin' && data.password === '123456') {
        permission = ['*']
      }
      else if (data.username === 'user' && data.password === '123456') {
        permission = ['table']
      }
      else {
        return {
          code: 500,
          msg: '用户名或密码错误'
        }
      }
      return {
        code: 1,
        data: {
          name: data.username,
          permission
        }
      }
    },
    // 获取折线图数据
    '/line/data': ({ query }) => {
      const { day } = query
      return {
        code: 1,
        data: Array.from({ length: day }).map((_, i) => ({ day: dayjs().subtract(i, 'day').format('YYYY-MM-DD'), value: getRandomInt(10, 100) })).reverse()
      }
    },
    // 获取柱状图数据
    '/bar/data': ({ query }) => {
      const { rank } = query
      return {
        code: 1,
        data: Array.from({ length: rank }).map((_, i) => ({ name: `第${i + 1}`, value: getRandomInt(10, 100) }))
      }
    }

  },
  true
) // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
