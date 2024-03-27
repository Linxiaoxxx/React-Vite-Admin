import { Card, Space, Typography } from 'antd'

export default function Icon() {
  const { Paragraph } = Typography
  return (
    <>
      <Card title="className 使用">
        <Space direction="vertical">
          <Typography>
            <Paragraph>
              <blockquote> 将图标名称作为className使用，className的规则是 "i-icon-[素材组]-[图标名称]"，可自定义大小和颜色等样式 </blockquote>
              <blockquote>
                <a href="https://icones.js.org/">
                  图标资源网站
                </a>
              </blockquote>
              <blockquote>
                <a href="https://unocss.dev/presets/icons">
                  使用文档
                </a>
              </blockquote>
            </Paragraph>
          </Typography>

          <Space className="text-24 text-[#ff8900]">
            <div className="i-carbon-airline-passenger-care"></div>
            <div className="i-tabler-bell-plus-filled"></div>
            <div className="i-carbon-airline-passenger-care"></div>
          </Space>
        </Space>
      </Card>
      <Card title="Hook 使用" className="mt-24">
        <Space direction="vertical">
          <Typography>
            <Paragraph>
              <blockquote> 使用本地文件夹 assets/icons 中的图标 </blockquote>
            </Paragraph>
            <Paragraph>
              借助uno的presetIcons插件设置自定义的前缀和文件夹路径，即可通 className="i-[自定义前缀]-[图标名称]" 使用本地图标
            </Paragraph>
          </Typography>
          <Space className="text-24 text-[#0037ff] font-bold">
            <div className="i-custom-react" />
            <div className="i-custom-time" />
          </Space>
        </Space>
      </Card>

    </>
  )
}
