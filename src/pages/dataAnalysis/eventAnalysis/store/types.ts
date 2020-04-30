// import { selectItemProps } from "../../../../types";

export interface anyProps {
  [props: string]: any;
}

export interface SystemState {
  isLoading: boolean;
  isError: boolean;
  dataObject: anyProps | null;
  listObj: anyProps | null;
}

export {
  AppState,
  selectItemProps,
  actionProps,
  pagerPorps
} from "../../../../types";
