interface IAction {
    type: string
    list?: INotice[]
    pager?: IPager
    loading?: boolean
    notice?: INotice
}

interface INotice {
    noticeId: number
    noticeType: number
    noticeTypeName: string
    noticeTitle: string
    sendTime?: number
    sendTo: number
    sendToUserId: string | null
    sendToUserNames: string | null
    receive_users: string
    noticeStatus: number
    noticeContent: string
    updateTime?: number
    version?: number
}

interface IPager {
    totalRows: number
    pageIndex: number
}

interface IPagerParams {
    noticeTitle?: string
    noticeType?: number
    noticeStatus?: number
    sendTo?: number
    pageIndex?: number
    pageRows?: number
    version?: number
}

interface INoticeAdd {
    noticeTitle: string
    noticeType: number
    noticeContent: string
    sendTo: number
    receive_users?: string
}