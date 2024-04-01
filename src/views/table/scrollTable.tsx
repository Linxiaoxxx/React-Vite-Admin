import { useRequest } from 'alova'
import type { TableProps } from 'antd'
import { Card, Space, Table, Tag } from 'antd'
import { usePagination } from '@alova/scene-react'
import http from '@/request'

export default function ScrollTable() {
  interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
  }
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>
            Invite
            {record.name}
          </a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  //   const { data } = useRequest(http.Get<any>('/table/page'))

  const {
    data,
    total
  } = usePagination(
    (page, pageSize) => http.Get<any>('/table/page', { params: { page, pageSize } }),
    {
      // 请求前的初始数据（接口返回的数据格式）
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // 初始页码，默认为1
      initialPageSize: 10 // 初始每页数据条数，默认为10
    }
  )

  return (

    <Card title="滚动加载更多表格" className="wh-full rounded-6" bordered={false}>
      {/* <Table columns={columns} dataSource={data} pagination={{ total }} /> */}
      {JSON.stringify(data)}
      {JSON.stringify(total)}
    </Card>
  )
}
