import { defineMock } from '@alova/mock'
import Mock from 'mockjs'

// 模拟生成表格数据
function generateTableData(page: number, pageSize: number) {
  const data = []
  const totalCount = 100 // 假设总数据条数为100条
  const totalPages = Math.ceil(totalCount / pageSize)

  if (page > totalPages) {
    return {
      code: 400,
      message: 'Page number exceeds total pages',
      data: null
    }
  }

  for (let i = 0; i < pageSize; i++) {
    const index = (page - 1) * pageSize + i + 1
    data.push({
      key: index,
      id: index,
      name: Mock.Random.cname(),
      age: Mock.Random.integer(20, 50),
      address: Mock.mock('@county(true)')
    })
  }

  return {
    code: 1,
    msg: 'success',
    data: {
      total: totalCount,
      totalPages,
      list: data
    }
  }
}

export default defineMock({
  '/table/page': ({ query }) => {
    const { page = 1, pageSize = 10 } = query
    return generateTableData(Number(page), Number(pageSize))
  }
}, true)
