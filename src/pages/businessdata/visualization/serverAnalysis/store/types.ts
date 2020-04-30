export interface listItemProps {
  name?: string;
  count: number | string;
}

export interface actionProps {
  type: string;
  tabData?: any;
  headData?: any;
}

export interface headDataItemProps {
  day7Count: string | number;
  day1Count: string | number;
}

export interface headDataProps {
  isLoading: boolean;
  isError: boolean;
  data: headDataObjProps;
}

export interface headDataObjProps {
  requertCollect: headDataItemProps;
  uplinkCollect: headDataItemProps;
  downlinkCollect: headDataItemProps;
}

export interface serverProps {
  isLoading: boolean;
  isError: boolean;
  data: serverDataProps;
}

export interface serverDataProps {
  appResponse: serverDataObjProps;
  appFlow: serverDataObjProps;
  appSucess: serverDataObjProps;
  appRequest: serverDataObjProps;
}

export interface serverDataObjProps {
  app: listItemProps[];
  service: listItemProps[];
}

export interface messageProps {
  isLoading: boolean;
  isError: boolean;
  data: messageDataProps;
}

export interface messageDataProps {
  uplink: listItemProps[];
  downlink: listItemProps[];
}

export interface SystemState {
  headData: headDataProps;
  server: serverProps;
  message: messageProps;
}
