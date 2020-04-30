export interface ITreeNode {
    key?: string
    id: string
    name: string
    children: ITreeNode[] | undefined
}

export interface AuthTreeProps {
    dataSource: ITreeNode[]
    target: string[]
    searchStr?: string
    isCheck?: boolean
    isExpand?: boolean
    checkStrictly?: boolean
    onChange?: (keys: string[], e: any) => void
}

export interface AuthTreeState{
    expandedKeys: string[]
    selectedKeys: string[]
}


