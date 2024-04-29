import React from 'react'
import { Space } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { AlipayCircleOutlined, LockOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { userUpdate } from '@/redux/modules/user/action'
import request from '@/request'

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const res = await request.Post<any>('/userlogin', { ...values })
    if (res) {
      dispatch(
        userUpdate({
          loginStatus: true,
          userInfo: res
        })
      )
      const first: any = null
      navigate(first?.path ?? '/')
    }
  }

  return (

    <div className="wh-full flex-center">

      <LoginForm
        title="WELCOME"
        containerStyle={{ justifyContent: 'center' }}
        subTitle="打开新世界"
        actions={(
          <Space>
            其他登录方式
            <AlipayCircleOutlined />
            <TaobaoCircleOutlined />
            <WeiboCircleOutlined />
          </Space>
        )}
        onFinish={onFinish}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className="prefixIcon" />
          }}
          placeholder="用户名: admin or user"
          rules={[
            {
              required: true,
              message: '请输入用户名!'
            }
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className="prefixIcon" />
          }}
          placeholder="密码: 123456"
          rules={[
            {
              required: true,
              message: '请输入密码！'
            }
          ]}
        />
      </LoginForm>
    </div>
  )
}

export default Login
