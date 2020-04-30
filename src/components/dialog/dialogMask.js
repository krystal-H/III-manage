/**
 * Created by xiaodaoguang on 2019/8/16.
 */
import React, { PureComponent } from 'react';

import './style.scss';

class DialogMask extends PureComponent {

  render() {

    let zIndex = {
      zIndex: this.props.zIndex,
    };

    return (
      <div className="mui-widget-overlay" style={zIndex} />
    );
  }
}

export default DialogMask;
