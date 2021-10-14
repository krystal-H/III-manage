import React, { Component, Fragment } from 'react'
import { Card, Steps } from 'antd'
import BasicParamsFrom from './BasicParamsFrom';
import FunctionParamsForm from './FunctionParamsForm';
import './AddModule.less';
import { connect } from 'react-redux';
import { actionCreators } from './store';
const { Step } = Steps;
const { Meta } = Card;

class AddModule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            current: 1,
        }
    }

    componentWillUnmount() {
        this.props.clearModuleInfo({})
    }

    componentDidMount() {
        const { brandItems } = this.props;
        let params = this.props.match.params
        if (params && params.moduleId) {
            this.props.getModuleInfo(params.moduleId, "edit");
            if (brandItems && brandItems.length === 0) {
                const { getBindSceneList, getAllModuleBrandList, getModuleTypeMenuAction } = this.props;
                // 获取厂家菜单
                getAllModuleBrandList();
                // 获取绑定场景
                getBindSceneList();
                // 获取模组公共菜单
                getModuleTypeMenuAction();
            }
        } 
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    goBack = () => {
        this.props.history.goBack();
    }

    getCurStepContent() {
        return [
            {
                title: '基本参数',
                content: <BasicParamsFrom
                    changeCurrent={this.next}
                    goBack={this.goBack} />,
            },
            {
                title: '功能参数',
                content: <FunctionParamsForm
                    changeCurrent={this.prev}
                    goBack={this.goBack} />,
            },
        ];
    }

    render() {
        let steps = this.getCurStepContent();
        const { current } = this.state;
        return (
            <Fragment>
                <Card >
                    <Meta title="添加模组" description="" />
                </Card>

                <Card style={{ marginTop: 10 }}>
                    <div>
                        <Steps className="antd-pro-pages-form-step-form-style-steps" current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                    </div>
                </Card>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        brandItems: state.getIn(['moduleManager', 'brandItems']).toJS(),
        moduleInfo: state.getIn(['moduleManager', 'moduleInfo']).toJS(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllModuleBrandList() {
            const action = actionCreators.getAllModuleBrandList();
            dispatch(action);
        },
        getBindSceneList() {
            const action = actionCreators.getBindSceneList();
            dispatch(action);
        },
        getModuleTypeMenuAction(value) {
            const action = actionCreators.getModuleTypeMenuAction(value);
            dispatch(action);
        },
        clearModuleInfo(value) {
            const action = actionCreators.moduleInfoChangeAcion(value);
            dispatch(action);
        },
        getModuleInfo(value, type) {
            const action = actionCreators.getModuleInfo(value, type);
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModule);
