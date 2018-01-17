import React from 'react';

const Extra = (props) => {
    const {is_care , handleClick} = props
    // const display = ! is_care ? 
    return (
        <div className="btn-add" onClick={handleClick}>
            <a>
                <div className="btn-add-img">
                    <img src={require("./img/add.png")} alt="concern" />
                </div>
                <span>关注</span>
            </a>
        </div>
    )
}
export default Extra;