import React, { Component, Fragment } from "react";
import { Button, Popover, Icon, message } from "antd";
import TopSearch from "../../comm/TopSearch";
import CommSelect from "../../../../components/CommSelect";
import CommRegion from "../../../../components/CommRegion";
import EventChoose from "../../comm/EventChoose";
import { selectItemProps } from "../store/types";
import { hiddenLen } from "../../util/tools";

let chooseListId: number = 0;

interface SearchProps {
  isLoading: boolean;
  allAppList: selectItemProps[];
  allAppMap: object;
  eventListMap: object;
  eventMap: object;
  propertyListMap: object;
  propertyMap: object;
  timeList: selectItemProps[];
  timeMap: string[];
  timeListMap: string[];
  statsTypeList: selectItemProps[];
  statsTypeMap: string[];
  getEventList: Function;
  getPropertyList: Function;
  changeSearchData: Function;
  setSearchData: Function;
  getData: Function;
}
interface chooseListItemProps {
  id: number;
  eventId: undefined | number | string;
  propertyId: undefined | string;
  propertyName: undefined | string;
  propertyRemark: undefined | string;
  propertiesValue: string[];
  statsType: number;
}
interface SearchStateProps {
  applicationId: number | string | undefined;
  timeType: number;
  chooseList: chooseListItemProps[];
}
interface regionValueProps {
  province: string | number;
  city: string | number;
  provinceName: string;
  cityName: string;
}

class Search extends Component<SearchProps, SearchStateProps> {
  intSty = { height: "5px" };
  state = {
    applicationId: undefined,
    timeType: 2, //默认前7天
    chooseList: [
      {
        id: ++chooseListId,
        eventId: undefined,
        propertyId: undefined,
        propertyName: undefined,
        propertyRemark: undefined,
        propertiesValue: [],
        statsType: 1
      },
      {
        id: ++chooseListId,
        eventId: undefined,
        propertyId: undefined,
        propertyName: undefined,
        propertyRemark: undefined,
        propertiesValue: [],
        statsType: 1
      }
    ]
  };
  QAContent = (
    <div className="page-card-qa">
      {this.props.statsTypeList.map(({ id, value, content }) => {
        return (
          <p key={id}>
            <b>{value}：</b>
            {content}
          </p>
        );
      })}
    </div>
  );
  setAppClear = () => {};
  _setAppClear = () => {
    return (_setAppClear: () => {}) => {
      this.setAppClear = _setAppClear;
    };
  };
  getAppValue = (): any => ({
    appId: undefined,
    userAgent: "",
    appVersion: "",
    channelId: ""
  });
  _getAppValue = () => {
    return (_getAppValue: () => any) => {
      this.getAppValue = _getAppValue;
    };
  };

  // 重新选择应用id后执行
  onAppChange = (applicationId: number | string | undefined) => {
    if (applicationId) {
      this.props.getEventList(applicationId);
    }
    // 重置事件选择
    this.setState({
      applicationId,
      chooseList: [
        {
          id: ++chooseListId,
          eventId: undefined,
          propertyId: undefined,
          propertyName: undefined,
          propertyRemark: undefined,
          propertiesValue: [],
          statsType: 1
        },
        {
          id: ++chooseListId,
          eventId: undefined,
          propertyId: undefined,
          propertyName: undefined,
          propertyRemark: undefined,
          propertiesValue: [],
          statsType: 1
        }
      ]
    });
  };
  changeTime = (timeType: number) => {
    this.setState({ timeType });
  };
  getRegionValue = (): regionValueProps => ({
    province: "",
    city: "",
    provinceName: "",
    cityName: ""
  });
  _getRegionValue = () => {
    return (_getRegionValue: () => regionValueProps) => {
      this.getRegionValue = _getRegionValue;
    };
  };
  setRegionValue: (state: object) => void = () => {};
  _setRegionValue = () => {
    return (_setRegionValue: (state: object) => void) => {
      this.setRegionValue = _setRegionValue;
    };
  };

  // 修改事件选择的值
  changeChooseListByIndex = (val: any, index: number) => {
    const {
      eventId,
      propertyId,
      propertyName,
      propertyRemark,
      propertiesValue
    } = val;
    const { chooseList } = this.state;
    let copy: chooseListItemProps[] = [...chooseList];
    copy[index] = {
      id: copy[index].id,
      eventId,
      propertyId,
      propertyName,
      propertyRemark,
      propertiesValue: [...propertiesValue],
      statsType: copy[index].statsType
    };
    this.setState({ chooseList: [...copy] });
  };
  changeStatsType = (statsType: number, index: number) => {
    let { chooseList } = this.state;
    chooseList[index].statsType = statsType;
    this.setState({ chooseList: [...chooseList] });
  };
  addEvent = () => {
    let { chooseList } = this.state;
    let valid = chooseList.filter(d => d.eventId).length;
    if (valid !== chooseList.length) {
      message.warn("请先完善已添加的事件！");
      return;
    }
    valid = new Set(
      chooseList.map(
        d =>
          d.eventId +
          "-" +
          (d.propertyId || "") +
          "-" +
          d.propertiesValue.sort() +
          "-" +
          d.statsType
      )
    ).size;
    if (valid !== chooseList.length) {
      message.warn("请勿选择相同的事件与指标！");
      return;
    }
    chooseList.push({
      id: ++chooseListId,
      eventId: undefined,
      propertyId: undefined,
      propertyName: undefined,
      propertyRemark: undefined,
      propertiesValue: [],
      statsType: 1
    });
    this.setState({ chooseList: [...chooseList] });
  };
  delEvent = (index: number) => {
    let { chooseList } = this.state;
    chooseList.splice(index, 1);
    this.setState({ chooseList: [...chooseList] });
  };
  createEvent = (d: any, i: number) => {
    const {
      eventListMap,
      propertyListMap,
      propertyMap,
      getPropertyList
    } = this.props;
    const { applicationId, chooseList } = this.state;
    const eventList = eventListMap["" + applicationId] || null;
    const cl = chooseList.length,
      canDel = cl > 2;
    const { id, statsType, eventId, propertyId, propertiesValue } = d;
    return (
      <span key={"I" + id}>
        <EventChoose
          eventList={eventList}
          propertyMap={propertyMap}
          propertyListMap={propertyListMap}
          eventId={eventId}
          propertyId={propertyId}
          propertiesValue={propertiesValue}
          getPropertyList={getPropertyList}
          onChange={(v: chooseListItemProps) =>
            this.changeChooseListByIndex(v, i)
          }
        />
        <label>
          <b className="page-int-1em"></b>的<b className="page-int-1em"></b>
        </label>
        <CommSelect
          width={200}
          onlyList
          list={this.props.statsTypeList}
          showSearch={false}
          onChange={(v: number) => this.changeStatsType(v, i)}
          value={statsType}
        />
        {canDel ? (
          <Icon
            type="minus-circle"
            title="删除本行"
            className="page-event-del"
            onClick={() => this.delEvent(i)}
          />
        ) : (
          <Icon type="minus-circle" className="page-event-del disabled" />
        )}
      </span>
    );
  };
  clear = () => {
    this.setAppClear();
    this.setRegionValue({
      province: "",
      provinceName: "",
      city: "",
      cityName: ""
    });
    this.setState({ timeType: 2 });
  };
  onSearch = () => {
    const {
      changeSearchData,
      setSearchData,
      getData,
      allAppMap,
      eventMap,
      timeMap,
      timeListMap,
      statsTypeMap
    } = this.props;
    const { province, city, provinceName, cityName } = this.getRegionValue();
    const {
      appId: applicationId,
      userAgent,
      appVersion,
      channelId
    } = this.getAppValue();
    const { timeType, chooseList } = this.state;
    if (applicationId === undefined) {
      message.warn("请先选择应用！");
      return;
    }
    let valid = chooseList.filter(d => d.eventId).length;
    if (valid !== chooseList.length) {
      message.warn("请先完善选择事件！");
      return;
    }
    valid = new Set(
      chooseList.map(
        d =>
          d.eventId +
          "-" +
          (d.propertyId || "") +
          "-" +
          d.propertiesValue.sort() +
          "-" +
          d.statsType
      )
    ).size;
    if (valid !== chooseList.length) {
      message.warn("请勿选择相同的事件与指标！");
      return;
    }
    let data: any = {
        applicationId,
        appId: applicationId,
        userAgent,
        appVersion,
        channelId,
        timeType,
        statsTypes: chooseList.map(d => d.statsType).join(",")
      },
      moreData = "";
    chooseList.forEach(d => {
      const { eventId, propertyName, propertiesValue } = d;
      moreData +=
        "&Keys=" +
        window.encodeURIComponent(
          eventMap[eventId + ""].eventKey +
            "," +
            (propertyName || "") +
            "," +
            (propertiesValue.join(",") || "")
        );
    });
    province && (data.province = province);
    city && (data.city = city);
    data.moreData = moreData.replace(/^&/, "");

    let dataObject: any = {
      applicationId,
      appId: applicationId,
      applicationName: allAppMap[applicationId].applicationName,
      userAgent,
      appVersion,
      channelId,
      timeString: timeMap[timeType],
      time: timeListMap[timeType],
      locale:
        provinceName === ""
          ? "全国"
          : provinceName === cityName
          ? provinceName
          : provinceName + cityName,
      eventArr: [],
      eventKeyArr: chooseList.map(d => {
        const { eventId, propertyName, propertiesValue } = d;
        let s = eventMap[eventId + ""].eventKey;
        if (propertyName) s += "-" + propertyName;
        if (propertiesValue.length > 0) s += "-" + propertiesValue.join(",");
        return s + "-" + d.statsType;
      })
    };
    chooseList.forEach(d => {
      const { eventId, propertyName, propertyRemark, propertiesValue } = d;
      let s = eventMap[eventId + ""].eventName;
      if (propertyName)
        s += "(" + hiddenLen(propertyRemark || propertyName, 10) + ")";
      if (propertiesValue.length > 0)
        s += "(" + hiddenLen(propertiesValue.join(","), 12) + ")";
      s += statsTypeMap[d.statsType];
      if (dataObject.eventArr.indexOf(s) === -1) dataObject.eventArr.push(s);
      else dataObject.eventArr.push(eventMap[eventId + ""].eventKey + "-" + s);
    });
    setSearchData(dataObject);
    changeSearchData(data);
    getData();
  };

  public render(): JSX.Element {
    const { isLoading, timeList } = this.props;
    const { timeType, chooseList } = this.state;
    const cl = chooseList.length,
      canAdd = cl < 5;
    const searching = isLoading;
    const label = (
      <Fragment>
        <i className="page-int-1em" />
        选择应用：
      </Fragment>
    );
    return (
      <div className="page-long-search">
        <TopSearch
          label={label}
          onAppChange={this.onAppChange}
          setClear={this._setAppClear}
          getValue={this._getAppValue}
          noSubmit={true}
        />
        <div className="page-interval" />
        <span className="page-int-1em" />
        <span>选择时间：</span>
        <CommSelect
          width={130}
          onlyList={true}
          list={timeList}
          showSearch={false}
          onChange={this.changeTime}
          value={timeType}
        />
        <span className="page-int-2em" />
        <span className="page-ml-large">选择地域：</span>
        <CommRegion
          setValue={this._setRegionValue}
          getValue={this._getRegionValue}
        />
        <div className="page-interval" />
        <span>
          选择事件
          <Popover content={this.QAContent} placement="rightTop">
            <Icon type="question-circle" />
          </Popover>
          ：
        </span>
        {this.createEvent(chooseList[0], 0)}
        {chooseList.slice(1).map((d, i) => {
          return (
            <Fragment key={d.id}>
              <br />
              <b className="page-int-2em" />
              <b className="page-int-2em" />
              <b className="page-int-2em" />
              {this.createEvent(d, i + 1)}
            </Fragment>
          );
        })}
        <br />
        <b className="page-int-2em" />
        <b className="page-int-2em" />
        <b className="page-int-2em" />
        <Button
          icon="plus"
          type="link"
          className="page-btn-link"
          disabled={!canAdd}
          onClick={this.addEvent}
        >
          添加事件
        </Button>
        <span className="page-ml-large">(最多选择5个事件)</span>
        <div className="page-interval" />
        <b className="page-int-2em" />
        <b className="page-int-2em" />
        <b className="page-int-2em" />
        <Button
          icon="search"
          type="primary"
          loading={searching}
          onClick={this.onSearch}
        >
          查询
        </Button>
        <Button className="page-ml" onClick={this.clear}>
          重置
        </Button>
        <div className="page-interval" style={this.intSty} />
      </div>
    );
  }
}

export default Search;
