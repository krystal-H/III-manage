export interface IUser {
    userId: number
    userName: string
    regTime: string
    status: number
    lastLoginTimer: string
    roleName: string
    roleId: number
    roleStatus: number
    remark: string
    userCategory: number
    modifyTime: number
    ipWhiteList: string
    parentId: number
}

export interface IPager {
    totalRows: number
    pageIndex: number
}

export interface IQuery {
    userName?: string
    userId?: number
    status?: number
}

export interface IQueryPager extends IQuery {
    pageIndex: number
    pageRows?: number
}

export interface IAction {
    type: string
    list?: IUser[]
    pager?: IPager
    loading?: boolean
    userItem?: IUser
    userDetail?: IUserDetail
    authList?: IAuthList[]
    target?: string[][]
    roleList?: IRole[]
    developerInfo?: IDeveloperInfo
    status: boolean
}

export interface IUserDetail {
    userId: number
    userName: string
    regTime: string
    status: number
    lastLoginTimer: string
    roleName: string
    roleId: number
    roleStatus: number
    parentRoleId: number
    remark: string
    userCategory: number
    secretId: string
    secretKey: string
    modifyTime: number
    ipWhiteList?: string[]
    uuid?: number
}

export interface IAuthList{
    menuCode: string
    menuName: string
    checkBoxGroupList: IAuthItem[]
}

export interface IAuthItem{
    boxId: number
    boxName: string
    boxColumn: string
    columnId: number
    checked: boolean
    subBoxs: IAuthItem[]
    groupName: string
    groupCode: string
    display: boolean
}

export interface IAddUser{
    userNameList?: string[]
    userName?: string
    roleId: number
    password?: string | null
    ipWhiteList?: string
    remark: string
    userId?: number
}

export interface IRole{
    roleId: number
    roleName: string
}

export interface IDeveloperInfo{
    developerId: number
}