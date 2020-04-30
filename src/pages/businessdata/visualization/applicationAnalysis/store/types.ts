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
  data: userDataObjProps;
}

export interface userDataObjProps {
  addDeviceCollect: headDataItemProps;
  activeDeviceCollect: headDataItemProps;
  errorDeviceCollect: headDataItemProps;
}

export interface userProps {
  isLoading: boolean;
  isError: boolean;
  data: userDataProps;
}
export interface applicationProps {
  isLoading: boolean;
  isError: boolean;
  data: applicationDataProps;
}
export interface deviceProps {
  isLoading: boolean;
  isError: boolean;
  data: deviceDataProps;
}

export interface userDataProps {
  register: listItemProps[];
  accessCount: listItemProps[];
  userLogin: listItemProps[];
  userAccess: listItemProps[];
}
export interface applicationDataProps {
  userRegister: listItemProps[];
  userLogin: listItemProps[];
  userStart: listItemProps[];
  userActive: listItemProps[];
}
export interface deviceDataProps {
  product: listItemProps[];
  addDevice: listItemProps[];
  activeDevice: listItemProps[];
  onlineDevice: listItemProps[];
  errorDevice: listItemProps[];
}

export interface SystemState {
  headData: headDataProps;
  user: userProps;
  application: applicationProps;
  device: deviceProps;
}
