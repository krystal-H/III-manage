export interface IRoleState {
  roleList: any[]
  pager: {
    totalRows: number,
    pageIndex: number
  }
  authList: any[]
}

export interface IPagerParam{
  totalRows: number,
  pageIndex: number
}

export interface IPager {
  pageIndex?: number
  pageRows?: number
  roleName?: string
}

export interface IRole {
  roleId: number
  roleName: string
  roleDesc: string
}

export interface IRoleParam {
  roleId?: number
  roleName: string
  roleDesc: string
  roleAccess: string
}

export interface IAction{
  type: string
  loading: boolean
  list?: any[]
  pager?: any
  authList?: any
  target?: string[]
  roleItem?: IRole
  params?: any
}

export interface IRoleAuthItem{
  isSelected: boolean
  resourceId: number
  resourceName: string
  resourcesVoList: IRoleAuthItem[]
}

export interface IRoleItem{
  roleId: number
  roleName: string
  remark: string
}