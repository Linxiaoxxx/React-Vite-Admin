import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable, TableDropdown } from '@ant-design/pro-components'
import { Button, Dropdown, Space, Tag } from 'antd'
import { useRef } from 'react'
import request from '@/request'
import '@/assets/style/table.less'

interface UserItem {
  id: number
  name: string
  age: number
  status: string
  address: string

}

const columns: ProColumns<UserItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48
  },
  {
    title: '姓名',
    dataIndex: 'name',
    copyable: true,
    width: 160,
    ellipsis: true,
    tooltip: '标题过长会自动收缩'
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'status',
    width: 160,
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      已登记: {
        text: '已登记',
        status: '1'
      },
      已提交: {
        text: '已提交',
        status: '2'
      },
      已审核: {
        text: '已审核',
        status: '3'
      }
    }
  },
  {
    disable: true,
    title: '年龄',
    dataIndex: 'age',
    width: 160,
    search: false,
    render: (_, record) => (
      record.age
        ? (
          <Tag color={`${record.age < 40 ? 'green' : record.age < 30 ? 'volcano' : 'geekblue'}`}>
            { record.age}
            {' '}
          </Tag>
          )
        : '--'
    )
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address',
    hideInSearch: true
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    width: 160,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id)
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>

    ]
  }
]

export default () => {
  const actionRef = useRef<ActionType>()
  const [params, setParams] = useState({
    pageSize: 10,
    current: 1
  })
  return (
    <div className="wh-full overflow-x-hidden overflow-y-auto p-16">
      <ProTable<UserItem>
        // className="fix-table"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (p) => {
          const res = await request.Get<any>('/table/page', { params: p })
          return {
            data: res.list,
            success: true,
            total: res.total
          }
        }}

        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true }
          },
          onChange(value) {
            console.log('value: ', value)
          }
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto'
        }}
        // scroll={{
        //   x: true,
        //   // y: 'calc(100% - 48px)'
        //   y: 600
        // }}
        options={false}
        pagination={{
          pageSize: params.pageSize,
          // pageSize: 5,
          onChange: (page, pageSize) => {
            console.log(page, pageSize)
            setParams((prev) => {
              return {
                ...prev,
                pageSize,
                current: page
              }
            })
          }
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload()
            }}
            type="primary"
          >
            新建
          </Button>

        ]}
      />
    </div>
  )
}
