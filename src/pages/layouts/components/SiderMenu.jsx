import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// 导入需要的 Ant Design 组件
import { Menu, Icon } from "antd";
const { SubMenu } = Menu;

export class SiderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: "",
      firstHide: true,
      openKeys:[]
    };
  }

  componentWillMount() {
    let  menuTreeNode = this.renderMenu(this.props.menuList);
    menuTreeNode = menuTreeNode.filter(item => item);

    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    var arr = currentKey.split("/");
    let openMenuPath = ["/" + arr[1]];

    currentKey = "/"+arr[1]+"/"+arr[2];
	if(arr[2]==="visualization"){
		openMenuPath.push("/" + arr[1]+"/"+arr[2]);
		currentKey = "/"+arr[1]+"/"+arr[2]+"/"+arr[3];
	}

    // console.log(currentKey);
    // console.log(openMenuPath);

    this.setState({
      menuTreeNode,
      selectedKey:currentKey,
      openKeys:openMenuPath
    });
  }

  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
     
      // 2.初始化每个栏目的子元素
      if(item.meta && item.meta.hideInMenu === true){
        return null;
      } else if (item.routes) {
        // 1.根据路由数据创建子项
        return (
          <SubMenu
            title={
              <span>
                <Icon type={item.icon} /> {item.name}
              </span>
            }
            key={item.path}
          >
            {this.renderSubItem(item.routes)}
          </SubMenu>
        );
      }
     
      return null;
    });
  };

  renderSubItem = data => {
    return data.map(item => {
       // 2.初始化每个栏目的子元素
       if(item.meta && item.meta.hideInMenu === true){
        return null;
      }
	  if(item.routesForThird){
        return (
			<SubMenu
				title={
				  <span>
					<Icon type={item.icon} /> {item.name}
				  </span>
				}
				key={item.path}
			>
				{this.renderSubItem(item.routesForThird)}
            </SubMenu>
		);
      }
       return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    });
      
  }

  // 3.对Menu.Item 添加link
  getMenuItemPath = item => {
    // 对路由地址处理
    const itemPath = this.conversionPath(item.path);
    return (
      <Link to={itemPath}>
        <span>{item.name}</span>
      </Link>
    );
  };

  // 4.对路由地址处理
  conversionPath = path => {
    if (path && path.indexOf("http") === 0) {
      return path;
    }
    return `/${path || ""}`.replace(/\/+/g, "/");
  };

  menuClick = item => {
    this.setState({
      selectedKey: item.key
    });
  };

  openMenu = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    const rootSubmenuKeys = this.props.menuList.map(item => item.path);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <div>
        <Menu
          selectedKeys={[this.state.selectedKey]}
          openKeys={this.state.openKeys}
          onOpenChange={this.openMenu} // SubMenu 展开/关闭的回调,返回字符串数组
          onClick={this.menuClick} 	// SubMenu 展开/关闭的回调,返回点击 MenuItem 调用此函数	function({ item, key, keyPath, domEvent })
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={["/config"]}
        >
          {/* 1.根据路由数据创建子项 */}
          {this.renderMenu(this.props.menuList)}
        </Menu>
      </div>
    );
  }
}

SiderMenu.propTypes = {
  menuList: PropTypes.array
};

export default SiderMenu;
