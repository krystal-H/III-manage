import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Button } from "antd";
import CommSelect from "../../../components/CommSelect";
import { AppState, selectItemProps } from "../store/types";
import {
  getAllAppList,
  getVersionList,
  getChannelList,
  getUserAgentList
} from "../store/action";

interface TopSearchProps {
  getAllAppList: Function;
  getUserAgentList: Function;
  getVersionList: Function;
  getChannelList: Function;
  setClear?: Function;
  getValue?: Function;
  onAppChange?: Function;
  onSearch?: (data: object) => void;
  onInit?: (data: object) => void;
  allAppList: selectItemProps[] | null;
  userAgentMap: selectItemProps[];
  versionMap: object;
  channelMap: object;
  loading?: boolean;
  noSubmit?: boolean;
  label?: string | JSX.Element;
}

class TopSearch extends Component<TopSearchProps> {
  isInit = false;
  state = {
    appId: undefined,
    userAgent: "",
    appVersion: "",
    channelId: ""
  };
  check() {
    const { allAppList, onInit, getUserAgentList } = this.props;
    if (!this.isInit && allAppList && allAppList.length > 0) {
      this.isInit = true;
      const { id } = allAppList[0];
      onInit && onInit({ appId: id });
      getUserAgentList(id); // 拉取终端列表
      this.onAppChange(id);
      this.setState({ appId: id });
    }
  }
  componentDidMount() {
    const { allAppList, getAllAppList, setClear, getValue } = this.props;
    if (setClear) {
      setClear()(this.clear);
    }
    if (getValue) {
      // 如果有需要，则设置取值函数
      getValue()(this.getValue);
    }

    if (allAppList === null) {
      getAllAppList(true); // 初始化拉取全部应用列表
    } else {
      this.check();
    }
  }
  componentDidUpdate() {
    this.check();
  }

  getValue = () => {
    return { ...this.state };
  };

  /* 获取各种列表 */
  getUserAgentList = (appId: string | number) => {
    this.props.getUserAgentList(appId);
  };
  getVersionList = (appId: string | number, userAgent: string | number) => {
    this.props.getVersionList(appId, userAgent);
  };
  getChannelList = (appId: string | number, userAgent: string | number) => {
    this.props.getChannelList(appId, userAgent);
  };

  // 将本组件中的应用id变化时上报给外部
  onAppChange = (id: string | number | undefined) => {
    const { onAppChange } = this.props;
    if (onAppChange) {
      onAppChange(id);
    }
  };

  /* 数据绑定及关联赋值 */
  changeApplicationId = (value: string | number) => {
    const userAgent = ""; // 默认为所有终端

    // 拉取列表
    this.getUserAgentList(value); // 拉取终端列表
    this.getVersionList(value, userAgent); // 拉取版本列表
    this.getChannelList(value, userAgent); // 拉取渠道列表

    // 设置值
    this.setState(
      {
        appId: value,
        userAgent,
        appVersion: "",
        channelId: ""
      },
      () => {
        this.onAppChange(value);
      }
    );
  };
  changeApplicationType = (value: string | number) => {
    const { appId } = this.state;
    if (appId !== undefined) {
      // 拉取版本列表
      this.getVersionList(appId + "", value);
      // 拉取渠道列表
      this.getChannelList(appId + "", value);

      this.setState({
        userAgent: value,
        appVersion: "",
        channelId: ""
      });
    }
  };
  changeVersion = (value: string | number) => {
    this.setState({ appVersion: value });
  };
  changeChannelId = (value: string | number) => {
    this.setState({ channelId: value });
  };

  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch({ ...this.state });
    }
  };
  clear = () => {
    const { allAppList } = this.props;
    const appId =
      allAppList && allAppList.length > 0 ? allAppList[0].id : undefined;
    this.setState(
      {
        appId,
        userAgent: "",
        appVersion: "",
        channelId: ""
      },
      () => {
        this.onAppChange(appId);
      }
    );
  };
  render() {
    const {
      allAppList, // 全部应用列表

      userAgentMap, // 应用类型

      versionMap, // 版本列表映射缓存
      channelMap, // 渠道列表映射缓存

      loading = false, // 是否正在搜索中
      noSubmit = false, // 是否不需要提交操作
      label // 需要替换的标签
    } = this.props;
    const { appId, userAgent, appVersion, channelId } = this.state;
    const allAppListIsLoading = allAppList === null; // 全部应用列表是否在加载中
    const searching = loading; // 是否在搜索中
    const userAgentList = userAgentMap[appId + ""] || [];
    const userAgentListIsLoading = userAgentMap[appId + ""] === undefined;
    const key = appId + "-" + userAgent;
    const versionList = versionMap[key] || [];
    const versionListIsLoading = versionMap[key] === undefined; // 版本列表是否正在加载中
    const needUserAgent = /^android;?$/i.test(userAgent) || userAgent === "";
    const channelList = channelMap[key] || [];
    const channelListIsLoading = channelMap[key] === undefined; // 渠道列表是否正在加载中
    return (
      <Fragment>
        {label || <span>选择应用/站点：</span>}
        <CommSelect
          width={200}
          onlyList
          showSearch
          loading={allAppListIsLoading}
          list={allAppList || []}
          onChange={this.changeApplicationId}
          value={appId}
        />
        <CommSelect
          width={120}
          showSearch
          className="page-ml"
          normalOptionText="终端"
          loading={userAgentListIsLoading}
          list={userAgentList}
          onChange={this.changeApplicationType}
          value={userAgent}
        />
        <CommSelect
          width={120}
          showSearch
          className="page-ml"
          normalOptionText="版本"
          loading={versionListIsLoading}
          list={versionList}
          onChange={this.changeVersion}
          value={appVersion}
        />
        {needUserAgent ? (
          <CommSelect
            width={120}
            showSearch
            className="page-ml"
            normalOptionText="渠道"
            loading={channelListIsLoading}
            list={channelList}
            onChange={this.changeChannelId}
            value={channelId}
          />
        ) : null}
        {noSubmit ? null : (
          <Fragment>
            <Button
              className="page-ml"
              type="primary"
              icon="search"
              onClick={this.onSearch}
              disabled={allAppListIsLoading}
              loading={searching}
            >
              搜索
            </Button>
            <Button
              className="page-ml"
              disabled={allAppListIsLoading}
              onClick={this.clear}
            >
              重置
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { allAppList, userAgentMap, versionMap, channelMap } = state.get(
    "dataAnalysis"
  );
  return {
    allAppList,
    userAgentMap,
    versionMap,
    channelMap
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getAllAppList: () => dispatch(getAllAppList()),
  getUserAgentList: (appId: string | number) =>
    dispatch(getUserAgentList(appId)),
  getVersionList: (appId: string | number, userAgent: string | number) =>
    dispatch(getVersionList(appId, userAgent)),
  getChannelList: (appId: string | number, userAgent: string | number) =>
    dispatch(getChannelList(appId, userAgent))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
