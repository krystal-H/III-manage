import * as React from 'react';
import ReactDOM from 'react-dom';

const ScrollTopHOC = (WrappedComponent: React.ComponentType<any>) => {
    return class extends React.Component<any>{
        componentDidMount() {
            let dom: any = ReactDOM.findDOMNode(this);
            if (dom && dom.parentElement && dom.parentElement.parentElement) {
                dom.parentElement.parentElement.scrollTop = 0;
            }
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    };
}

export default ScrollTopHOC;