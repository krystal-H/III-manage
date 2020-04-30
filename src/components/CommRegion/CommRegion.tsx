import React, { Component, Fragment } from "react";
import CommSelect from "../CommSelect";
import { selectItemProps } from "../../types";

interface CommRegionProps {
  getProvinceList: () => {};
  getCityList: (provinceId: number, cityMap: object) => {};
  provinceList: selectItemProps[];
  cityMap: object;
  setValue?: Function;
  getValue?: Function;
  onChange?: Function;
  disabled?: boolean;
  width?: number;
  style?: object;
}
interface CommRegionStateProps {
  province: string | number;
  provinceName: string | number;
  city: string | number;
  cityName: string | number;
}

class CommRegion extends Component<CommRegionProps, CommRegionStateProps> {
  sty1 = { width: "130px", marginRight: "6px" };
  normalOption: selectItemProps[] = [{ id: "", value: "全国" }];
  normalOption2: selectItemProps[] = [{ id: "", value: "全部" }];
  state = {
    province: "",
    provinceName: "",
    city: "",
    cityName: ""
  };
  componentDidMount() {
    const { getProvinceList, setValue, getValue } = this.props;
    getProvinceList(); // 首先获取省列表
    if (setValue) {
      setValue()(this.setValue);
    }
    if (getValue) {
      // 如果有需要，则设置取值函数
      getValue()(this.getValue);
    }
  }
  setValue = (state: object) => {
    this.setState(state);
  };
  getValue = () => {
    return { ...this.state };
  };
  setProvince = (value: number | string, _name: string) => {
    const { getCityList, cityMap } = this.props;
    this.setState(
      {
        province: value,
        provinceName: value === "" ? "" : _name,
        city: "",
        cityName: ""
      },
      this.onChange
    );
    if (typeof value === "number") {
      // 只有不选中全国的时候，才需要查询当前省下的市列表
      getCityList(value, cityMap);
    }
  };
  setCity = (value: number | string, _name: string) => {
    this.setState(
      {
        city: value,
        cityName: value === "" ? "" : _name
      },
      this.onChange
    );
  };
  onChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...this.state });
    }
  };
  /**
   *    *.provinceList      :      上层提供的省列表
   *    *.cityMap           :      上层提供的省市级映射列表
   *    *.width             :      选项的宽度
   *    *.style             :      选项的样式
   *    *.disabled          :      禁用选项
   *    *.setValue          :      设置存值函数
   *    *.getValue          :      设置取值函数
   */
  render() {
    const { province, city } = this.state;
    const { provinceList, cityMap, disabled, width, style = {} } = this.props;
    const provinces = this.normalOption.concat(provinceList),
      cities =
        province && cityMap[province]
          ? this.normalOption2.concat(cityMap[province])
          : this.normalOption2,
      sty = width
        ? { ...this.sty1, ...{ width: width + "px" }, ...style }
        : this.sty1;
    return (
      <Fragment>
        <CommSelect
          list={provinces}
          loading={provinces.length === 1}
          placeholder="选择省份"
          notFoundContent="未找到符合的省份"
          style={sty}
          onlyList={true}
          onChange={this.setProvince}
          value={province}
          disabled={disabled}
        />
        {province ? (
          <CommSelect
            list={cities}
            loading={cities.length === 1}
            placeholder="选择城市"
            notFoundContent="未找到符合的城市"
            style={sty}
            onlyList={true}
            onChange={this.setCity}
            value={city}
            disabled={disabled}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default CommRegion;
