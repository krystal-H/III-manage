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

export enum TabMap {
  NULL = -1,
  NEWUSERS = "newUsers",
  ACTIVEUSERS = "activeUsers",
  STARTUSERS = "startUsers",
  KEEPUSERS = "keepUsers"
}

export interface TotalProps {
  [props: string]: number | string | undefined;
}

export interface SystemState {
  isLoading: boolean;
  isError: boolean;
  updateTime: string;

  tab: TabMap;

  total: TotalProps;

  isShowTableList: boolean;
  pageIndex: number;

  newUsers: dataProps;
  activeUsers: dataProps;
  startUsers: dataProps;
  keepUsers: dataProps;
}

export {
  AppState,
  selectItemProps,
  actionProps,
  pagerPorps
} from "../../../../types";
