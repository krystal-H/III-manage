import React, { Component } from "react";
import { Result, Button, Typography, Icon } from "antd";
import { withRouter } from "react-router";

const { Paragraph, Text } = Typography;

@withRouter
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
  }

  goHome = () => {
    this.props.history.replace("/home");
    try {
      window.location.reload();
    } catch (e) {}
  };

  refresh = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      return (
        <Result
          status="error"
          title="代码出错啦~"
          subTitle="请联系相关开发人员进行调测，注意保存下方的报错信息"
          extra={[
            <Button type="primary" key="console" onClick={this.goHome}>
              返回首页
            </Button>,
            <Button key="refresh" onClick={this.refresh}>
              刷新本页
            </Button>
          ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16
                }}
              >
                您所看的页面出现以下报错信息:
              </Text>
            </Paragraph>
            <Paragraph>
              {error && error.toString()}
              <pre
                dangerouslySetInnerHTML={{
                  __html: error && error.stack
                }}
              ></pre>
            </Paragraph>
          </div>
        </Result>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
