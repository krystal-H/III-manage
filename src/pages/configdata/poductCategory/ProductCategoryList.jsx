import React from 'react'

const ProductCategoryList = ({ list, type, active, name, id, onChange, sub }) => {
    if (list.length == 0) { return null; }
    const longest = list.reduce((a, b) => a[name].length > b[name].length ? a : b, list[0]);
    return (
        <div style={{display: "block", position: "relative", minWidth: "1200px"}}>
            <div className="list-category" style={{ height: `${type == "top" ?  longest[name].length * 36 : longest[name].length * 36 + 40}px` }}>
                {type !== "top" ? <span className="line-vertical"></span> : null}
                {type !== "top" ? <span className="line-horizontal"></span> : null}
                {
                    list.map((item, index) => (
                        <div className={`list-item ${index == active && sub && sub.length > 0 ? "active" : ""}`}
                            onClick={() => typeof onChange == "function" ? onChange(index) : null} key={index}>
                            {type !== "top" ? <span className="line-vertical"></span> : null}
                            <div className="list-name">
                                <span>{`${item[name]}`}<br/><b className="list-num">({item[id]})</b></span>
                            </div>
                        </div>
                    ))
                }
                {typeof active != "undefined" && sub && sub.length > 0 ? <span className={`line-horizontal bottom ${active >= list.length/2 ? "left" : "right"}`}
                     style={{width: Math.abs((list.length+1)/2 - active -1)*56 }}></span> : null}
            </div>
        </div>
    )
}

export default ProductCategoryList