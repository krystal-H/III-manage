import { pagerPorps } from "../../../../types";

export interface checkerListItemPorps {
  id: string;
  value: string;
}

export interface listItemProps {
  id: number;
  productId: number;
  type: number;
  statu: number;
  createTime: number;
}

export interface SystemState {
  checkerList: Array<checkerListItemPorps>;
  checkerMap: object;
  isLoading: boolean;
  isError: boolean;
  isSaving: boolean; // 提交保存操作时，是否正在进行的标识
  list: Array<listItemProps>;
  pager: pagerPorps;
  showDetailModal: boolean;
  detailData: object | null;
}

export interface listDataProps {
  list: Array<listItemProps>;
  pager: pagerPorps;
  code?: number | string;
}

export interface actionProps {
  type: string;
  list?: Array<listItemProps>;
  pager?: pagerPorps;
  detailData?: object | null;
}
