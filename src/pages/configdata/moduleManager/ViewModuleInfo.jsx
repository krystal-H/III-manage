import React, { Component } from 'react';
import { Button, Select, Upload, Card, Modal, Descriptions, Table } from "antd";
import './ViewModuleInfo.less';

export class ViewModuleInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: '',
        }
    }

    handleCancel = () => {
        this.props.viewModuleInfoCancle(false);
    }

    handlePreview = () => {
        const { moduleInfo } = this.props
        this.setState({
            previewImage: moduleInfo.historyObj.referenceCircuitDiagram,
            previewVisible: true,
        });
    };

    handleCancelPreview = () => {
        this.setState({
            previewVisible: false
        });
    }

    getDataSource =(moduleInfo)=>{
        if(moduleInfo.supportSocProject === 0){
            return [
                {
                    key: '1',
                    fileType: '烧录文件',
                    fileName: moduleInfo.burnFileName,
                    version: "" +moduleInfo.burnFileVersion,
                    fileUrl:moduleInfo.historyObj.burnFile
                }]
        }else{
            return [
                {
                    key: '1',
                    fileType: '源码',
                    fileName:moduleInfo.sourceCodeName,
                    version: "" +moduleInfo.sourceCodeVersion,
                    fileUrl:moduleInfo.historyObj.sourceCode
                },
                {
                    key: '2',
                    fileType: '库文件',
                    fileName:moduleInfo.libraryFileName,
                    version: "" +moduleInfo.libraryFileVersion,
                    fileUrl:moduleInfo.historyObj.libraryFile
                },
                {
                    key: '3',
                    fileType: '烧录文件',
                    fileName: moduleInfo.burnFileName,
                    version: "" +moduleInfo.burnFileVersion,
                    fileUrl:moduleInfo.historyObj.burnFile
                },
            ]
        }
    }


    render() {
        const { visible, moduleInfo } = this.props;
        // 表头格式
        const columns = [
            { title: "模板文件", key: "fileType", dataIndex: "fileType" },
            { title: "文件名", key: "fileName", dataIndex: "fileName",
                render: (text, record) => {
                    console.log('=====',record);
                    return (
                        <a href={record.fileUrl} target="_blank">{text}</a>
                    );
                }
            },
            { title: "版本号", key: "version", dataIndex: "version" }
        ];
        
        const dataSource = this.getDataSource(moduleInfo);
        return (
            <div>
                <Modal
                    style={{ top: 20 }}
                    width={800}
                    title="查看模组"
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={this.state.status ? [
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确定
                        </Button>,
                    ] : null}
                >
                    <Descriptions title="基础信息"  size="small">
                        <Descriptions.Item label="生产厂家" span={2}>{moduleInfo.brandName}</Descriptions.Item>
                        <Descriptions.Item label="模组所属库" span={2}>{moduleInfo.moduleAffiliation}</Descriptions.Item>
                        <Descriptions.Item label="模组型号" span={2}>{moduleInfo.hetModuleTypeName}</Descriptions.Item>
                        <Descriptions.Item label="模组IC型号" span={2}>{moduleInfo.originalModuleTypeName}</Descriptions.Item>
                        <Descriptions.Item label="使用范围" span={2}>{moduleInfo.applyScope}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions title="审核内容"  size="small">
                        <Descriptions.Item label="通信方式" span={2}>{moduleInfo.moduleTypeNameList}</Descriptions.Item>
                        <Descriptions.Item label="配网方式" span={2}>{moduleInfo.networkTypeNameList}</Descriptions.Item>
                        <Descriptions.Item label="支持协议" span={2}>{moduleInfo.supportProtocolTypeName}</Descriptions.Item>
                        <Descriptions.Item label="支持文件传输" span={2}>{moduleInfo.supportFileTransfer === 0 ? "否" : "是"}</Descriptions.Item>
                        <Descriptions.Item label="通信速率" span={2}>{moduleInfo.communicateSpeed}</Descriptions.Item>
                        <Descriptions.Item label="支持SOC方案" span={2}>{moduleInfo.supportSocProject === 0 ? "否" : "是"}</Descriptions.Item>
                        <Descriptions.Item label="数据上限" span={4}>{moduleInfo.dataLengthLimitName}</Descriptions.Item>
                        
                    </Descriptions>

                    <Descriptions.Item >
                            <Table
                                bordered columns={columns} dataSource={dataSource} size="small" pagination={false} 
                            />
                    </Descriptions.Item>
                    <Descriptions title="说明文档" size="small" style={{marginTop:10}}>
                        <Descriptions.Item label="参考电路" span={4}>
                            <div className="ReferenceCircuitPic"
                                style={{ background: "url(" + moduleInfo.historyObj.referenceCircuitDiagram + ") no-repeat center / contain", border: "1px solid #1890ff"}}
                                onClick={this.handlePreview}
                            >
                                &nbsp;
                                </div>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                            </Modal>
                        </Descriptions.Item>
                        <Descriptions.Item label="说明文档" span={4}>
                            <a href={moduleInfo.historyObj.readmePdf} target="_blank">{moduleInfo.readmePdfName}</a>
                        </Descriptions.Item>
                    </Descriptions>

                </Modal>
            </div>
        );
    }
}

export default ViewModuleInfo;
