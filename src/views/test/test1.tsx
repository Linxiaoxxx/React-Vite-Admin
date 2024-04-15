import { Button } from 'antd'

export default function Test1() {
  const navigate = useNavigate()
  return (
    <div>
      test1
      <Button type="primary" onClick={() => { navigate('/test2/123') }}>jump test2</Button>
    </div>
  )
}
