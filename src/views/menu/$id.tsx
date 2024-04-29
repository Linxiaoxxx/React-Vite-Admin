import { LeftOutlined } from '@ant-design/icons'
import { Divider } from 'antd'

export default function JumpDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="wh-full flex flex-col p-16">
      <div className="flex-center justify-start gap-x-8 border-b-1 border-b-#f5f5f5 border-b-solid p-24">
        <LeftOutlined className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-18 font-600">这是一个需要参数的子页面</h1>
        <Divider type="vertical" />
        <span className="text-#999">点击可返回上一层</span>
      </div>
      <div className="flex-center flex-1 text-56 text-#999">
        我获取的参数是：id--
        {' '}
        <strong>{id}</strong>
      </div>
    </div>
  )
}
