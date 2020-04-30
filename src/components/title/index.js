/**
 * 导航标题
 */
import React, { PureComponent } from 'react';

import './style.scss';

class Title extends PureComponent {

  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.handleButton();
  }

  render() {
    let title = this.props.title;
    let link = this.props.isShowButton ? (
      <a href='javascript:'
         className='commonButs commonButBox btn'
         onClick={() => this.handleClick()}>{this.props.buttonText}</a>
    ) : null;
    return (
      <div className='het-title'>
        <div className='title'>{title}</div>
        {link}
      </div>
    );
  }
}

export default Title;
