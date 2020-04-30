import React from 'react';
import './index.less';

interface IOption{
    children?: any
    label?: string
    align?: string
}

export const TitleOption = ({children, label, align = 'left'}: IOption) => {
    return (
        <div className={`${align === 'left' ? "title-tab-item": "title-tab-item-right"}`}>
            <span className={label ? "title-table-label" : "title-table-label-non"}>{label ? label+':': ''}</span>
            {children}
        </div>
    );
};

interface ITitle{
    children?: any
    title: string
}

class TitleTab extends React.Component<ITitle> {
    static Option = TitleOption;

    render(){
        const {children, title} = this.props;
        return (
            <div className="title-tab">
                <div className="title-tab-option">
                    <span className="title-tab-title">{title}</span>
                </div>
                <div className="title-tab-option">
                    {children}
                </div>
            </div>
        );
    }
}

export default TitleTab;