import React from 'react'
import './index.less'
import TreeNode from './TreeNode'

export type OnCheckFun = (data: {
  key: React.Key
  checked: boolean
  level?: number
}) => void

interface TreeProps {
  checkable?: boolean
  treeData: any[]
  defaultExpandAll?: boolean
  checkedKeys?: React.Key[]
  onCheck?: OnCheckFun
}

interface TreeContextProps {
  checkable?: boolean
  defaultExpandAll?: boolean
  checkedKeys?: React.Key[]
  onChildCheck?: OnCheckFun
}

export const TreeContext = React.createContext<TreeContextProps>({})
function Tree(props: TreeProps) {
  const { treeData, checkable, defaultExpandAll, checkedKeys, onCheck } = props

  const handleCheck: OnCheckFun = (data) => {
    onCheck && onCheck(data)
  }

  return (
    <div className="w-full">
      {treeData.map(item => (
        <TreeContext.Provider
          key={item.key}
          value={{
            checkable,
            defaultExpandAll,
            checkedKeys
          }}
        >
          <TreeNode data={item} level={0} onCheck={handleCheck} />
        </TreeContext.Provider>
      ))}
    </div>
  )
}

export default Tree
