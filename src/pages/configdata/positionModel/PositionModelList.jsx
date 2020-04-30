import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Card, Input, Button, Tooltip, Modal } from 'antd';
import TableCom from '../../../components/Table'
import * as actionCreators from './store/actionCreators'
import TitleTab from '../../../components/TitleTab'

const TitleOption = TitleTab.Option;

export class PositionModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modelName: "",
      query: {}
    };
  }

  changeModelName = (e) => {
    console.log(e.target.value);
    this.setState({
      modelName: e.target.value
    })
  }

  // 查询
  handleFilter = () => {
    const { modelName } = this.state;
    this.setState({
      query: { modelName }
    }, this.onChange)
  }

  // 重置
  handleReset = () => {
    this.setState({
      modelName: "",
      query: {}
    }, () => {
      this.refInpt.setState({ value: "" });
    })
  }

  // 翻页
  onChange = (pageIndex) => {
    this.setState({ loading: true })
    this.props.getLocationList({ pageIndex, ...this.state.query }).then(() => {
      this.setState({ loading: false })
    })
  }

  // 跳转编辑页
  onEdit = (id) => {
    this.props.history.push(`/config/positionmodel/${id}`);
  }

  // 删除位置数据
  handleDel = (id) => {
    Modal.confirm({
      title: "确定删除数据",
      centered: true,
      onOk: () => {
        this.props.deleteModel(id)
      }
    })
  }

  componentDidMount() {
    this.onChange();
  }

  render() {
    const { locationModelList, pager } = this.props;
    const { loading } = this.state;

    const columns = [
      { title: '模型ID', dataIndex: 'modelId', key: 'modelId', width: '100px' },
      { title: '名称', dataIndex: 'modelName', width: '30%', key: 'modelName', render: (text) => <span title={text}>{text}</span> },
      { title: '描述', dataIndex: 'modelDesc', width: '40%', key: 'modelDesc', render: (text) => <span title={text}>{text}</span> },
      {
        title: '操作', width: '120px', key: '操作',
        render: (item) => (
          <span>
            <Tooltip placement="top" title="管理模型">
              <Button shape="circle" size="small" icon="container" key={0} onClick={this.onEdit.bind(this, item.modelId)} />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="top" title="删除模型">
              <Button shape="circle" size="small" icon="delete" key={1} onClick={this.handleDel.bind(this, item.modelId)} />
            </Tooltip>
          </span>
        ),
      },];

    return (
      <div className="LocationDataModel_Content">
        <TitleTab title="数据位置模型">
          <TitleOption>
            <Input style={{ width: 240 }} placeholder="请输入模型名称查询" onChange={this.changeModelName.bind(this)}
              onPressEnter={this.handleFilter.bind(this)} ref={(refInpt) => this.refInpt = refInpt}></Input>
          </TitleOption>
          <TitleOption>
            <Button className="modelSearch" type="primary" onClick={this.handleFilter.bind(this)}>查询</Button>
          </TitleOption>
          <TitleOption>
            <Button className="modelSearch" type="primary" onClick={this.handleReset.bind(this)}>重置</Button>
          </TitleOption>
          <TitleOption align="right">
            <Button className="modelCreate" type="primary" onClick={this.onEdit.bind(this, 0)}>新建</Button>
          </TitleOption>
        </TitleTab>

        <Card className="LocationDataModel_bottomCard" >
          <TableCom
            rowKey={"modelId"}
            columns={columns}
            dataSource={locationModelList}
            pager={pager}
            loading={loading}
            onPageChange={this.onChange}
          />
        </Card>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  locationModelList: state.getIn(['positionModel', 'locationModelList']).toJS(),
  pager: state.getIn(['positionModel', 'pager']).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
  getLocationList: (pager) => dispatch(actionCreators.getLocationList(pager)),
  deleteModel: (id) => dispatch(actionCreators.deleteLocation(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionModel);
