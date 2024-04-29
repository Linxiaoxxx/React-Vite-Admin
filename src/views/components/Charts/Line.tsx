import type { LineConfig } from '@ant-design/charts'
import { Line } from '@ant-design/charts'
import { useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'

const LineChart: React.FC<{ data: any }> = (props) => {
  const { themeConfig } = useSelector((state: ReduxType) => state.app)

  const config: LineConfig = useMemo(() => {
    return {
      data: props.data,
      autoFit: true,
      marginLeft: 0,
      marginRight: 0,
      xField: 'day',
      yField: 'value',
      line: {
        style: {
          stroke: '#cadafc',
          strokeWidth: 1
        }
      },
      theme: themeConfig.theme === 'dark' ? 'classicDark' : 'classic'
    }
  }, [themeConfig, props.data])

  return (

    <div className="h-280">
      <Line {...config} />
    </div>
  )
}
export default LineChart
