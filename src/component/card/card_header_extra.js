import React from 'react';

const Extra = (props) => {
    const {is_care , handleClick} = props
    // const display = ! is_care ? 
    return (
        <div className="btn-add" onClick={handleClick}>
           {
               is_care ? 
                    <img src={require("../../localImg/care.png")} className="my-icon-md my-icon" /> :
                    <img src={require("../../localImg/uncare.png")} className="my-icon-md my-icon" />
            }
        </div>
    )
}
export default Extra;