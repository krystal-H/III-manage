import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';

interface IProps extends FormComponentProps {
    history: any
    getList: Function
}

// 页面跳转查询组件，刷新页面页码不变
function TableHOC<T extends IProps>(WrappedComponent: React.ComponentType<T>) {
    return class extends React.Component<T>{
        state = {
            pageIndex: 1,
        }

        // 翻页
        onChange = (pageIndex?: number) => {
            const page = this.state.pageIndex;
            this.setState({
                pageIndex: pageIndex || page || 1
            }, () => {
                const query = this.state;
                const paramsArr = [];
                for (let i in query) {
                    if (query[i]) {
                        paramsArr.push(`${i}=${query[i]}`);
                    }
                }
                this.props.history.replace('?' + paramsArr.join('&'));
                this.props.getList({ ...query });
            });
        }

        // 查询
        onFilter = (values: any) => {
            const { form } = this.props;
            if(form){
                values = form.getFieldsValue();
            }
            this.setState({
                ...values
            }, () => {
                this.onChange(1);
            });
        }

        // 重置
        onReset = () => {
            const { form } = this.props;
            if(form){
                form.resetFields();
            }
        }

        // 加载页码
        componentDidMount() {
            const obj = { pageIndex: 1 };
            // url中保存参数
            const { search } = this.props.history.location;
            if (search && search.length) {
                const urlParams = search.slice(1).split('&');
                urlParams.map((item: string) => {
                    if (/^(.+)=(.+)$/.test(item)) {
                        let str = item.split('=');
                        obj[str[0]] = decodeURI(str[1]);
                    }
                })
            }
            this.setState({
                ...obj
            }, () => {
                this.props.getList(obj);
            });
            // 根据url中参数设置form表单值
            const { form } = this.props;
            if (form) {
                const values = form.getFieldsValue();
                const keys = Object.keys(values);
                for (let i in obj) {
                    if (keys.includes(i)) {
                        form.setFieldsValue({
                            [i]: +obj[i] || obj[i]
                        })
                    }
                }
            }
        }

        render() {
            return <WrappedComponent
                {...this.props}
                onChange={this.onChange}
                onFilter={this.onFilter}
                onReset={this.onReset}
                query={this.state}
            />
        }
    };
};

export default TableHOC;