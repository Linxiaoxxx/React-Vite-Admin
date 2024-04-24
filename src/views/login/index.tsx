import React from 'react'
import { App, Button, Card, Checkbox, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@alova/scene-react'
import { userUpdate } from '@/redux/modules/user/action'
import { findFirstAuthRoute } from '@/router/uitls'
import http from '@/request'

// import { findFirstAuthRoute, routerArray } from "@/router";

const Login: React.FC = () => {
  const dispatch = useDispatch()
  // const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const res = await http.Post<any>('/userlogin', { ...values })
    if (res) {
      dispatch(
        userUpdate({
          loginStatus: true,
          userInfo: res
        })
      )
      const first: any = null
      // const first = findFirstAuthRoute(routerArray, userPermission);
      navigate(first?.path ?? '/')
    }
  }

  return (
    <App className="wh-screen flex items-center justify-center">

      <Card className="w-400 shadow-[0_2px_10px_2px_rgba(0,0,0,0.1)]" bordered={false}>
        <div className="mb-32 text-center text-24 font-bold">登录</div>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          onSubmitCapture={() => {
            return false
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input onPressEnter={e => e.preventDefault()} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </App>
  )
}

export default Login
