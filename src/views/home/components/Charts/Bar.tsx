import type { BarConfig } from '@ant-design/charts'
import { Bar } from '@ant-design/charts'
import { useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'

const BarChart: React.FC<{ data: any }> = (props) => {
  const { themeConfig } = useSelector((state: ReduxType) => state.app)
  console.log('props', props)
  const config: BarConfig = useMemo(() => {
    return {
      autoFit: true, // 自动适应容器大小
      legend: false,
      data: props.data || [],
      marginLeft: 0,
      marginRight: 10,
      xField: 'name',
      yField: 'value',
      colorField: 'name',
      theme: themeConfig.theme === 'dark' ? 'classicDark' : 'classic'
    }
  }, [props.data, themeConfig.theme])

  return (
    <div className="h-280">
      <Bar {...config} />
    </div>
  )
}

export default BarChart
