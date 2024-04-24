import { ConfigProvider, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { ReduxType } from 'redux-type'
import { updateTagList } from '@/redux/modules/app/action'
import { configMap } from '@/router/generateByMeta'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

export default function Tabbar() {
  const { tagList } = useSelector((state: ReduxType) => state.app)
  console.log('tagList', tagList)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items = useMemo(() => (
    tagList.map((item) => {
      return {
        label: item.title,
        key: item.path,
        closable: item.path !== '/'
      }
    })
  ), [tagList])

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      const currentIndex = tagList.findIndex(item => item.path === targetKey)
      const newTagList = tagList.filter(item => item.path !== targetKey)
      dispatch(updateTagList(newTagList))
      if (targetKey === location.pathname) {
        // 跳转到上一个标签
        const nextTag = newTagList[currentIndex - 1]
        navigate(nextTag.path)
      }
    }
  }

  useEffect(() => {
    if (tagList.find(item => item.path === location.pathname)) return
    const config = configMap[location.pathname]
    if (config.isLayout) return
    const newTagList = [...tagList]
    newTagList.push({
      title: config?.title ?? location.pathname,
      path: location.pathname
    })
    dispatch(updateTagList(newTagList))
  }, [location])

  return (
    <div className="w-full pt-8">
      <ConfigProvider theme={{
        components: {
          Tabs: {
            horizontalMargin: '0px'
          }
        }
      }}
      >
        <Tabs
          activeKey={location.pathname}
          type="editable-card"
          hideAdd
          onChange={(key) => {
            console.log('key', key)
            navigate(key)
          }}
          tabPosition="top"
          items={items}
          onEdit={onEdit}
        />
      </ConfigProvider>
    </div>
  )
}
