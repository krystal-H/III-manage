export interface provinceItemProps {
  provinceId: number;
  provinceName: string;
}

export interface cityItemProps {
  cityId: number;
  cityName: string;
}

export interface cityDataProps {
  provinceId: number;
  list: Array<cityItemProps>;
}

export interface actionProps {
  type: string;
  provinceId?: number;
  list: Array<object>;
}
