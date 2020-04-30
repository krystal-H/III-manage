import React, { Component } from "react";
import { dataItemProps, pagerPorps, TabMap } from "../../store/types";
import Pager from "../../../../../components/Table/Pager";

interface TableProps {
  setPage: Function;
  tab: TabMap;
  list: dataItemProps[];
  pager: pagerPorps;
}

class KeepTableDetail extends Component<TableProps> {
  setPage = (pageIndex: number) => {
    this.props.setPage(pageIndex);
  };
  public render(): JSX.Element | null {
    const { tab, list, pager } = this.props;
    return (
      <div className="page-chart-table-wrap com-table">
        <table className="page-chart-table">
          <thead>
            <tr>
              <th>日期</th>
              <th>
                {tab === TabMap.KEEPUSERSFORNEW ? "新增用户" : "活跃用户"}
              </th>
              <th>1天后</th>
              <th>2天后</th>
              <th>3天后</th>
              <th>4天后</th>
              <th>5天后</th>
              <th>6天后</th>
              <th>7天后</th>
              <th>14天后</th>
              <th>30天后</th>
            </tr>
          </thead>
          <tbody>
            {list.map(
              (
                {
                  name,
                  count,
                  day1,
                  day2,
                  day3,
                  day4,
                  day5,
                  day6,
                  day7,
                  day14,
                  day30
                },
                i
              ) => {
                return (
                  <tr key={i + "-" + name}>
                    <td>{name}</td>
                    <td>{count}</td>
                    <td className={day1 ? "active" : undefined}>{day1}</td>
                    <td className={day2 ? "active" : undefined}>{day2}</td>
                    <td className={day3 ? "active" : undefined}>{day3}</td>
                    <td className={day4 ? "active" : undefined}>{day4}</td>
                    <td className={day5 ? "active" : undefined}>{day5}</td>
                    <td className={day6 ? "active" : undefined}>{day6}</td>
                    <td className={day7 ? "active" : undefined}>{day7}</td>
                    <td className={day14 ? "active" : undefined}>{day14}</td>
                    <td className={day30 ? "active" : undefined}>{day30}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        {pager.totalPages > 1 && <Pager {...pager} onChange={this.setPage} />}
      </div>
    );
  }
}

export default KeepTableDetail;
