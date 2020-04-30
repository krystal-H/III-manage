import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import { Button } from "antd";
import CommRegion from "../../../../components/CommRegion";
import CommSelect from "../../../../components/CommSelect";
import { AppState, selectItemProps } from "../../../../types";

interface SearchProps {
  onSearch: (data: object) => void;
  timeList: selectItemProps[];
  noRegion?: boolean;
  loading?: boolean;
}
interface regionValueProps {
  province: string | number;
  city: string | number;
}

class Search extends Component<SearchProps> {
  state = {
    timeType: this.props.timeList[0].id
  };
  changeTimeType = (value: string) => {
    this.setState({ timeType: value });
  };
  getRegionValue = (): regionValueProps => ({ province: "", city: "" });
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
  onSearch = () => {
    const { noRegion = false, onSearch } = this.props;
    const data: object = { ...this.state };
    if (noRegion) {
      onSearch(data);
      return;
    }
    const { province, city } = this.getRegionValue();
    onSearch({ ...data, provinceId: province, cityId: city });
  };
  clear = () => {
    const { noRegion = false } = this.props;
    if (!noRegion) {
      this.setRegionValue({
        province: "",
        provinceName: "",
        city: "",
        cityName: ""
      });
    }
    this.setState({ timeType: "1" });
  };
  render() {
    const { noRegion = false, timeList, loading = false } = this.props;
    const { timeType } = this.state;
    const searching = loading;
    return (
      <div>
        <span>时间：</span>
        <CommSelect
          width={130}
          onlyList={true}
          list={timeList}
          showSearch={false}
          onChange={this.changeTimeType}
          value={timeType}
        />
        {noRegion ? null : (
          <Fragment>
            <span className="page-ml">地域：</span>
            <CommRegion
              setValue={this._setRegionValue}
              getValue={this._getRegionValue}
            />
          </Fragment>
        )}
        <Button
          className="page-ml"
          type="primary"
          icon="search"
          onClick={this.onSearch}
          loading={searching}
        >
          搜索
        </Button>
        <Button className="page-ml" onClick={this.clear}>
          重置
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { timeList } = state.get("visualization");
  return { timeList };
};

export default connect(mapStateToProps)(Search);
