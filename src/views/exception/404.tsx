import { Button, Result } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

const NoFound: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center">
      <Result status="404" title="404"></Result>
      <Button
        type="primary"
        style={{ width: '96px' }}
        onClick={() => {
          navigate('/')
        }}
      >
        返回首页
      </Button>
    </div>
  )
}

export default NoFound
