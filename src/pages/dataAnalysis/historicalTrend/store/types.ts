export interface dataItemProps {
  name: string;
  count: number | string | null;
  [props: string]: number | string | null;
}

export interface dataProps {
  isError: boolean;
  isLoading: boolean;
  list: dataItemProps[];
}

export enum KeepTabMap {
  PERCENT = "percent",
  DATA = "data"
}

export enum KeepChartTabMap {
  DAY1 = "day1CountRate",
  DAY2 = "day2CountRate",
  DAY3 = "day3CountRate",
  DAY4 = "day4CountRate",
  DAY5 = "day5CountRate",
  DAY6 = "day6CountRate",
  DAY7 = "day7CountRate",
  DAY14 = "day14CountRate",
  DAY30 = "day30CountRate"
}
export enum KeepChartReverseTabMap {
  day1CountRate = "DAY1",
  day2CountRate = "DAY2",
  day3CountRate = "DAY3",
  day4CountRate = "DAY4",
  day5CountRate = "DAY5",
  day6CountRate = "DAY6",
  day7CountRate = "DAY7",
  day14CountRate = "DAY14",
  day30CountRate = "DAY30"
}
export enum KeepChartTextTabMap {
  DAY1 = "1天后留存率",
  DAY2 = "2天后留存率",
  DAY3 = "3天后留存率",
  DAY4 = "4天后留存率",
  DAY5 = "5天后留存率",
  DAY6 = "6天后留存率",
  DAY7 = "7天后留存率",
  DAY14 = "14天后留存率",
  DAY30 = "30天后留存率"
}

export interface keepDetailProps {
  isError: boolean;
  isLoading: boolean;
  tab: KeepTabMap;
  chartTab: KeepChartTabMap;
  pageIndex: number; // 留存率/留存数的页码
  list: dataItemProps[];
}

export enum TabMap {
  NULL = -1,
  NEWUSERS = "newUsers",
  ACTIVEUSERS = "activeUsers",
  STARTUSERS = "startUsers",
  KEEPUSERSFORNEW = "keepUsersForNew",
  KEEPUSERSFORACTIVE = "keepUsersForActive",
  TIMEFORPERPERSON = "timeForPerPerson",
  CRASH = "crash"
}

export enum TabReverseMap {
  NULL = -1,
  newUsers = "NEWUSERS",
  activeUsers = "ACTIVEUSERS",
  startUsers = "STARTUSERS",
  keepUsersForNew = "KEEPUSERSFORNEW",
  keepUsersForActive = "KEEPUSERSFORACTIVE",
  timeForPerPerson = "TIMEFORPERPERSON",
  crash = "CRASH"
}

export enum TabTextMap {
  NULL = -1,
  NEWUSERS = "新增用户",
  ACTIVEUSERS = "活跃用户",
  STARTUSERS = "启动次数",
  KEEPUSERSFORNEW = "新增用户次日留存（昨日）",
  KEEPUSERSFORACTIVE = "活跃用户次日留存（昨日）",
  TIMEFORPERPERSON = "人均使用时长（昨日）",
  CRASH = "崩溃数",
  TOTALUSER = "累计用户数"
}

export interface TotalProps {
  userTotal: number | string | undefined;
  [props: string]: number | string | undefined;
}

export interface SystemState {
  isLoading: boolean;
  isError: boolean;

  start: any;
  end: any;

  total: TotalProps;

  tab: TabMap;

  isShowTableList: boolean;
  pageIndex: number;

  newUsers: dataProps;
  activeUsers: dataProps;
  startUsers: dataProps;
  keepUsersForNew: dataProps;
  keepUsersForActive: dataProps;
  timeForPerPerson: dataProps;
  crash: dataProps;

  keepDetailForNew: keepDetailProps;
  keepDetailForActive: keepDetailProps;
}

export {
  AppState,
  selectItemProps,
  actionProps,
  pagerPorps
} from "../../../../types";
