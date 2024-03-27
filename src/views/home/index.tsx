import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Select, Statistic, Tabs } from 'antd'
import CountUp from 'react-countup'
import { useWatcher } from 'alova'
import LineChart from './components/Charts/Line'
import BarChart from './components/Charts/Bar'
import http from '@/request'

export default function Home() {
  const formatter = (value: number) => <CountUp end={value} separator="," />

  const [day, setDay] = useState(7)
  const { data: lineData = [], send: getLineData } = useWatcher(http.Get('/line/data', { params: { day } }), [day])
  const [rank, setRank] = useState(5)
  const { data: barData = [], send: getBarData } = useWatcher(http.Get('/bar/data', { params: { rank } }), [rank])

  useEffect(() => {
    getLineData()
    getBarData()
  }, [])

  return (

    <>
      <div className="grid grid-cols-3 wh-full gap-16 overflow-auto">

        <Card className="col-span-3" title="核心指标" extra={<a href="#">查看详情</a>}>
          <div className="grid grid-cols-5 gap-32">
            <Statistic
              title="Active Users"
              value={56.89}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              formatter={v => formatter(v as number)}
              className="normal-border border-r-1 border-r-solid"
            />
            <Statistic
              title="Active Users"
              value={12.59}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
              formatter={v => formatter(v as number)}
              className="normal-border border-r-1 border-r-solid"
            />
            <Statistic title="Active Users" value={153} className="normal-border border-r-1 border-r-solid" />
            <Statistic title="Active Users" value={112893} className="normal-border border-r-1 border-r-solid" />
            <Statistic title="Active Users" value={112893} />
          </div>
        </Card>
        <Card
          className="col-span-2"
          title="趋势"
          extra={(
            <Select
              value={day}
              style={{ width: 120 }}
              options={[
                { value: 7, label: '一周' },
                { value: 15, label: '半个月' },
                { value: 30, label: '一个月' }
              ]}
              onChange={(v) => { setDay(v) }}
            />

          )}
        >
          <LineChart data={lineData} />
        </Card>
        <Card
          className="col-span-1"
          title="排名"
          extra={(
            <Select
              value={rank}
              style={{ width: 120 }}
              options={[
                { value: 5, label: '前五' },
                { value: 8, label: '前八' },
                { value: 10, label: '前十' }
              ]}
              onChange={(v) => { setRank(v) }}
            />
          )}
        >
          <BarChart data={barData} />
        </Card>
        <Card title="用户来源"></Card>
        <Card title="产品使用分布"></Card>
        <Card title="用户占比"></Card>
        <Card
          className="col-span-3"
          title={
            <Tabs items={[{ key: '1', label: '用户' }, { key: '2', label: '产品' }, { key: '3', label: '设备' }]} />
        }
        >
          222
        </Card>

      </div>
    </>

  )
}
