import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Table } from 'antd';
import LabelVisible from '../../../components/form-com/LabelVisible';
import { getDetailTable } from '../../../apis/physical'
import { getProfuctDetailRequest } from '../../../apis/schemeManagement'
import { actionCreators } from '../../businessdata/Product/store';
import TableCom from '../../businessdata/Product/TableCom'
import '../../businessdata/Product/ProductDetailInfo.less';

const { TabPane } = Tabs;

const productClassMap = {
    0: '普通设备',
    1: '网关设备'
}

const authorityMap = {
    0: '初级鉴权',
    1: '中级鉴权',
    2: '高级鉴权'
}

const LabelItem = ({ label, value, visible }) => {
    return (
        <div className="info-item" >
            <span className="label">{label}：</span>
            {
                visible ? <LabelVisible label={value} /> : <span>{value}</span>
            }
        </div>
    )
}


class ProductAuditDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPhysicalList: [], // 物模型
            currentPhysicalTab: '1', // 物模型协议切换
            dataSource: [], // 物模型table
            tableComloading: false,
            showProductDetail: {}, // 产品详情
            sessionListItem: JSON.parse(sessionStorage.getItem('listItem'))
        }
    }

    componentDidMount() {
        const { productId } = this.props;
        this.props.getProduct(productId);

        // 获取产品详情
        getProfuctDetailRequest({ productId }).then(res => {
            this.setState({
                showProductDetail: res.data.data
            })
            this.state.sessionListItem.physicalModelId && this.getPhysicalData(this.state.sessionListItem.physicalModelId)
        })


    }

    componentWillUnmount() {
        this.props.clearProductInfo();
    }

    oldColumns = [
        { title: "数据名称", dataIndex: "propertyName", width: "20%" },
        { title: "数据标识", dataIndex: "property", width: "20%" },
        { title: "数据单位", dataIndex: "unit", width: "10%" },
        {
            title: "数据类型", width: "10%", render: (item) => {
                let { functionDataType, propertyValueType, propertyValueDesc, javaType } = item;
                const types = ["字符型", "数值型", "枚举型", "布尔型", "绝对时间", "相对时间", "循环时间", "RGB颜色", "二进制"];

                if (functionDataType && types[functionDataType - 1]) {
                    return types[functionDataType - 1];
                } else if (javaType && (javaType === "STRING" || javaType === "HEXSTRING")) {
                    return javaType === "STRING" ? "字符型" : "十六进制";
                } else if (propertyValueType) {
                    return propertyValueType === "RANGE" ? "数值型" : "枚举型";
                } else if (propertyValueDesc) {
                    if (propertyValueDesc.indexOf('~') > -1 || propertyValueDesc.indexOf('～') > -1) {
                        return "数值型";
                    } else {
                        return "枚举型";
                    }
                }
            }
        },
        { title: "数据长度", dataIndex: "length", width: "10%" },
        {
            title: "数据属性", dataIndex: "propertyValueDesc", width: "20%", render: (item) => (
                <span title={item}>{item}</span>
            )
        },
        {
            title: "保留字", dataIndex: "ignore", width: "10%", render: (item) => {
                return item ? '是' : '否';
            }
        },
    ]

    //处理数据
    delaData = (data) => {
        let newData = []
        data.forEach(item => {
            if (!item.funcParamList || !item.funcParamList.length) return
            item.funcParamList.forEach(item2 => {
                let newItem = JSON.parse(JSON.stringify(item))
                newData.push({ ...newItem, ...item2 })
            })
        })
        newData.forEach((item, index) => {
            item.key = index
        })
        return newData
    }

    // 拉取物模型数据
    getPhysicalData = (id) => {
        this.setState({ tableComloading: true })
        getDetailTable({ id }).then(res => {
            if (res.data.code == 0) {
                let data = this.delaData(res.data.data.standard || [])
                this.setState({ showPhysicalList: data })
                this.tabcallback('1', data)
            }
        }).finally(() => this.setState({ tableComloading: false }))
    }

    // 切换过滤table数据
    tabcallback = (val, data) => {
        data = data || this.state.showPhysicalList
        this.setState({ currentPhysicalTab: val })
        let funcType = ['properties', 'events', 'services']
        let arr = data.filter(item => {
            if (item.funcType == funcType[val - 1]) {
                return item
            }
        })
        this.setState({ dataSource: arr })
    }

    render() {
        let { showPhysicalList, currentPhysicalTab, dataSource, tableComloading, showProductDetail, sessionListItem } = this.state
        let { productDetail, audit } = this.props;
        let { productName, allCategoryName, bindTypeName, productCode, productClassName, protocolFormatName, productClassId, productIdHex, deviceKey, ssid, ssidPassword,
            accessModeName, barCode, radiocastName, gatewayCommTypeName, isRelatedGateway, netTypeName, productId, accessModeId, authorityType } = productDetail.product || {};
        let { modulePicture, modulePictureName, hetModuleTypeName, originalModuleTypeName,
            sizeWidth, sizeHeight, sizeThickness, moduleTypeNameList, communicateSpeed, networkTypeNameList,
            burnFileName, burnFileVersion, burnFile, commFreq, supportSocProject, sourceCode, sourceCodeName, sourceCodeVersion } = productDetail.communicateModule || {};
        let { productPic, size, weight, introduction, productParam, instruction,
            supplier, contact, tel } = productDetail.productCommerceInfo || {};

        productPic = productPic && (/^\[.*\]$/).test(productPic.toString()) ? JSON.parse(productPic).filter(item => item) : [];
        instruction = instruction && (/^\[.*\]$/).test(instruction.toString()) ? JSON.parse(instruction).filter(item => item) : [];
        let authorityText = '';
        if (accessModeId === 0) {
            authorityText = authorityType === 2 ? '高级认证' : authorityType === 1 ? '中级认证' : '初级认证';
        } else if (accessModeId === 1) {
            authorityText = authorityType === 0 ? '无认证' : '有认证';
        } else {
            authorityText = '初级认证';
        }
        return (
            <div className="product-info">
                <div className="info-item product-info-detail">
                    <h3>产品信息</h3>
                    <div className="product-info-msg">
                        <LabelItem label="产品名称" value={showProductDetail.productName || ''} />
                        <LabelItem label="产品型号" value={showProductDetail.productCode || ''} />
                        <LabelItem label="产品ID" value={showProductDetail.productId || ''} />
                        <LabelItem label="所属分类" value={showProductDetail.deviceTypeName || ''} />
                        <LabelItem label="产品类型" value={productClassMap[showProductDetail.productClassId]} />
                    </div>
                </div>

                <div className="info-item technical-detail" style={{ display: `${audit ? "none" : "block"}` }}>
                    <h3>技术方案</h3>
                    <div className="product-info-msg">
                        <LabelItem label="通信方式" value={showProductDetail.bindTypeName} />
                        <LabelItem label="配网方式" value={showProductDetail.netTypeName} />
                        {/* 非网关设备才有此属性 */}
                        {
                            productClassId === 1 ? <LabelItem label="是否接入网关" value={isRelatedGateway && isRelatedGateway === 1 ? '是' : '否'} /> : null
                        }
                        <LabelItem label="产品编码" value={showProductDetail.productIdHex} />
                        <LabelItem label="产品密钥" value={showProductDetail.deviceKey} visible={true} />
                        <LabelItem label="安全认证级别" value={authorityMap[showProductDetail.authorityType]} />
                        <LabelItem label="通信模组" value={showProductDetail.moduleName} />
                        <LabelItem label="AP-SSID/广播名" value={radiocastName} />
                    </div>
                </div>
                {/* 新产品 */}
                {
                    sessionListItem.isOldProduct === 0 &&
                    <div className="info-item protocol-detail" style={{ display: `${audit ? "none" : "block"}` }}>
                        <h3>产品协议</h3>
                        {
                            showPhysicalList.length ?
                                <div>
                                    <Tabs activeKey={currentPhysicalTab} onChange={(activeKey) => this.tabcallback(activeKey)}>
                                        <TabPane tab="属性" key="1"></TabPane>
                                        <TabPane tab="事件" key="2"></TabPane>
                                        <TabPane tab="服务" key="3"></TabPane>
                                    </Tabs>
                                    <div>
                                        <TableCom dataSource={dataSource} pagination={false} loading={tableComloading} />
                                    </div>
                                </div> : null
                        }
                    </div>
                }
                {/* 老产品 */}
                {
                    sessionListItem.isOldProduct === 1 &&
                    <div className="info-item protocol-detail" style={{ display: `${audit ? "none" : "block"}` }}>
                        <h3>产品协议</h3>
                        <Tabs defaultActiveKey="1" size="large">
                            {
                                productDetail && productDetail.protocolList ?
                                    productDetail.protocolList.map((item) => (
                                        <TabPane tab={item.dataTypeName} key={item.dataTypeId}>
                                            <Table bordered pagination={false} rowKey={"property"} columns={this.oldColumns} dataSource={item.list} scroll={{ y: 300, x: 1000 }} />
                                        </TabPane>
                                    ))
                                    : undefined
                            }
                        </Tabs>
                    </div>
                }


                <div className="info-item module-detail" style={{ display: `${audit ? "none" : "block"}` }}>
                    <h3>通信模组</h3>
                    <div className="module-wrap img-wrap">
                        <img src={modulePicture} alt={modulePictureName} />
                        <span className="module-name">{hetModuleTypeName}</span>
                        <div>
                            <span>芯片：</span>
                            <span>{originalModuleTypeName}</span>
                        </div>
                        <div>
                            <span>尺寸：</span>
                            <span>{sizeWidth && sizeHeight && sizeThickness ? `${sizeWidth}*${sizeHeight}*${sizeThickness} mm` : ''}</span>
                        </div>
                    </div>
                    <div className="module-wrap list-wrap">
                        <h4>通信参数设置：</h4>
                        <table className="module-table">
                            <tbody>
                                <tr>
                                    <td className="left">支持通信</td>
                                    <td className="right">{moduleTypeNameList}</td>
                                </tr>
                                <tr >
                                    <td className="left">配网方式</td>
                                    <td className="right">{networkTypeNameList}</td>
                                </tr>
                                <tr>
                                    <td className="left">通信速率</td>
                                    <td className="right">{`${communicateSpeed || 0} bps`}</td>
                                </tr>
                                <tr>
                                    <td className="left">通信频率</td>
                                    <td className="right">{`${commFreq || 0} s`}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="module-version">
                            <div>
                                <span>固件程序：</span>
                                <span>{supportSocProject ? sourceCodeName : burnFileName}</span>
                            </div>
                            <div>
                                <span>固件版本：</span>
                                <span>{supportSocProject ? sourceCodeVersion : burnFileVersion}</span>
                            </div>
                        </div>
                        {audit ? undefined : <a className="ant-btn ant-btn-primary module-download" href={supportSocProject ? sourceCode : burnFile} target="_blank" rel="noopener noreferrer">下载固件程序</a>}
                    </div>
                </div>

                <div className="info-item business-detail">
                    <h3>商业化信息</h3>
                    <div className="info-item">
                        <span className="label">产品图片：</span>
                        <span>
                            {
                                productPic.map((item, index) =>
                                    <img key={index} className="product-img" src={item.filesrc} alt={item.filename || ''} />
                                )
                            }
                        </span>

                    </div>
                    <LabelItem label="尺寸" value={`${size || 0} mm`} />
                    <LabelItem label="重量" value={`${weight || 0} kg`} />
                    <div className="info-item">
                        <span className="label">产品参数：</span>
                        <span>{productParam}</span>
                    </div>
                    <LabelItem label="产品介绍" value={introduction} />
                    <div className="info-item">
                        <span className="label">说明书：</span>
                        {
                            instruction.map((item, index) => <a key={index} href={item.filesrc || ''} target="blank" style={{ marginRight: "5px" }}>{item.filename}</a>)
                        }
                    </div>
                    <LabelItem label="供应商" value={supplier} />
                    <LabelItem label="联系人" value={contact} />
                    <LabelItem label="电话" value={tel} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    productDetail: state.getIn(["product", "productDetail"]).toJS()
});

const mapDispatchToProps = (dispatch) => ({
    getProduct: (productId) => {
        dispatch(actionCreators.getProductDetail(productId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAuditDetail);