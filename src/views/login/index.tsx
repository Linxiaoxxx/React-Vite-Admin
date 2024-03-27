import React from 'react'
import { Button, Form, Input } from 'antd'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, login } from '@/request/apis/user'
import { userUpdate } from '@/redux/modules/user/action'
import { findFirstAuthRoute } from '@/router/uitls'

// import { findFirstAuthRoute, routerArray } from "@/router";

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // const { run } = useRequest(
  //   (values) => {
  //     return login(values)
  //   },
  //   {
  //     manual: true,
  //     onSuccess: () => {
  //       getAuth().then((res) => {
  //         dispatch(userUpdate({ loginStatus: true, userInfo: res.data }))
  //         navigate('/', { replace: true })
  //       })
  //     },
  //     onError: (e) => {
  //       console.log('e', e)
  //     }
  //   }
  // )

  const onFinish = () => {
    // run(values);
    // getAuth().then((res) => {
    const userPermission = ['per1', 'per2', 'per3']
    dispatch(
      userUpdate({
        loginStatus: true,
        userInfo: { permissionList: userPermission }
      })
    )
    const first: any = null
    // const first = findFirstAuthRoute(routerArray, userPermission);
    navigate(first?.path ?? '/')
    // })
  }

  return (
    <div className="wh-screen flex-center bg-[url(@/assets/images/loginBg.png)] bg-cover">
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="w-320 bg-[#fff] p-16 shadow-[0_2px_10px_2px_rgba(0,0,0,0.1)]"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="!bg-[#1677ff]">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
