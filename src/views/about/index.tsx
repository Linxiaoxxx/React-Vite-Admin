import { GithubOutlined, MailOutlined } from '@ant-design/icons'
import { Card, Divider, Tag, Typography } from 'antd'

export default function About() {
  const { Title, Paragraph, Link, Text } = Typography
  return (
    <div className="wh-full px-24 py-16">
      <Typography>
        <Title>
          关于本站
        </Title>
        <Paragraph>
          本站是一个学习、模仿各大优秀站点，并转化和集成为个人认为最有价值的轻量级别、适合中小型中台管理系统的框架。
        </Paragraph>
        <Title level={2}>设计资源</Title>
        <Paragraph>
          乐于使用、学习最新的技术方向，并集成在框架中。
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              <Link href="https://unocss.dev/">UnoCSS</Link>
            </li>
            <li>
              <Link href="https://alova.js.org/zh-CN/">alova.JS</Link>
            </li>
            <li>
              <Link href="https://procomponents.ant.design/">ProComponents</Link>
            </li>
            <li>
              <Link href="https://github.com/Linxiaoxxx/React-Vite-Admin">源码</Link>
            </li>
          </ul>
        </Paragraph>
        <Divider />
        <Title>
          关于我
        </Title>
        <Paragraph>
          在深圳发展的一个小前端一枚，锲而不舍的学习中💪💪💪
        </Paragraph>
        <Paragraph>
          <Tag color="green">Vue</Tag>
          <Tag color="blue">React</Tag>
          <Tag color="purple">Electron</Tag>
          <Tag color="lime">UniApp</Tag>
          <Tag color="geekblue">Taro</Tag>
          <Tag color="magenta">跨端</Tag>
        </Paragraph>
        <Paragraph>
          有合作机会、交流学习，欢迎联系我👇👇👇
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              <Text copyable>
                942104125@qq.com
              </Text>
            </li>
            <li>
              <Link href="https://github.com/Linxiaoxxx">
                <GithubOutlined className="mr-4" />
                个人主站
              </Link>
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </div>
  )
}
