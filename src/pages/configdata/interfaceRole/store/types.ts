export interface IRole{
    roleId: number
    roleName: string
    remark?: string
    createTime: number
    modifyTime: number
    userCategory: number
}

export interface IPager{
    totalRows: number
    pageIndex: number
}

export interface IAction{
    type: string
    list?: IRole[]
    pager?: IPager
    authList?: IAuthList[]
    roleDetail?: IRole
    target: string[][]
    params: { roleName?: string, remark?: string }
}

export interface IAuthList{
    menuCode: string
    menuName: string
    groupName?: string
    groupCode?: string
    checkBoxGroupList: IAuthItem[]
}

export interface IAuthItem{
    boxId: number
    boxName: string | null
    boxColumn: string
    columnId: number
    checked: boolean
    subBoxs: IAuthItem[]
    groupName: string
    groupCode: string
    display: boolean
}

export interface IRoleState{
    roleList: IRole[]
    pager: IPager
    authList: IAuthItem[]
}

export interface IPagerParam{
    pageIndex?: number
    pageRows?: number
    roleName?: string
}

export interface IRoleParam{
    roleName: string
    remark: string
    roleId?: number
    dataJson: IAuthItem[]
}

export enum SearchTypes {
    Label = 1,   // 标签
    App = 2,     // App应用
    AppWeChat = 3,     // 微信小程序
    Product = 4   // 产品
}
