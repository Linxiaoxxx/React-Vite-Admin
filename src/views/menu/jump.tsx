import { Button } from 'antd'

export default function Jump() {
  const navigate = useNavigate()

  return (
    <div className="wh-full flex-col-center gap-24 p-16">
      <div className="text-36 text-#999">这是一个带参数跳转的示例</div>
      <Button type="primary" onClick={() => { navigate('/menu/123') }}>跳转</Button>
    </div>
  )
}
