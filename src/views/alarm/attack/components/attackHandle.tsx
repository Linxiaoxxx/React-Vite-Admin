import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Modal, Spin } from 'antd'
import type { TableData } from '@/types/global'
import { alarmStatus } from '@/utils/dict'

/**
 *! forwardRef 可单独传入 ref 属性，否则通过props传入会被默认忽略
 *! 同时设置两个类型参数，分别为 useImperativeHandle 对应的需要返回给父组件的数据类型、父组件传入的props类型
 *! 若不定义 AttackHandleRef 对应 useImperativeHandle 的类型，父组件中定义useRef时无法正确获取子组件的数据
 */
export interface AttackHandleRef {
  openModal: (record: TableData) => void
}
interface AttackHandleProps {
  update?: () => void
  show: boolean
  record?: TableData
  close: () => void
}

const FormItem = Form.Item
const TextArea = Input.TextArea

const AttackHandle = forwardRef<AttackHandleRef, AttackHandleProps>(
  (props, ref) => {
    const [form] = Form.useForm()

    const [visible, setVisible] = useState(false)

    const openModal = (record: TableData) => {
      setVisible(true)
      console.log('record', record)
    }

    useImperativeHandle(ref, () => {
      // 设置要返回给父组件的方法
      return {
        openModal
      }
    })

    const handleSubmit = () => {
      //   form.validate().then((fields: any) => {
      //     // 完成数据检验 回传更新结果至父组件
      //     props.update && props.update();
      //     setVisible(false);
      //   });
    }

    useEffect(() => {
      setVisible(props.show)
    }, [props.show])

    return (
      // 不添加空元素符，则弹窗在为打开时页面无法渲染此组件
      // 未渲染组件 则无法获取子组件内部方法
      <>
        <Modal
          visible={visible}
          title={<div style={{ textAlign: 'left' }}>状态处置</div>}
          style={{ width: '480px' }}
          onCancel={() => props.close()}
          onOk={handleSubmit}
        >
          <Spin className="w-full p-24px">
            <h2>{props.record?.id}</h2>
            <Form form={form} layout="vertical">
              {/* <FormItem
                label="处置状态"
                field="status"
                rules={[
                  {
                    required: true,
                    message: "请选择处置状态",
                  },
                  { type: "number" },
                ]}
              >
                <Select
                  placeholder="请选择"
                  style={{ width: "320px" }}
                  options={alarmStatus}
                  allowClear
                ></Select>
              </FormItem> */}
              {/* <FormItem field="remark" label="备注">
                <TextArea
                  style={{ height: "196px" }}
                  placeholder="请输入备注，长度不超过500字"
                  allowClear
                  showWordLimit
                  maxLength={500}
                />
              </FormItem> */}
            </Form>
          </Spin>
        </Modal>
      </>
    )
  }
)

export default AttackHandle
