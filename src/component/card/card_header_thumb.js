import React from 'react';
const Thumb = (props) => {
    let {head} = props ;
    console.log(head);
    return (
        <div className="header-photo">
            <img src={head} alt="header" />
        </div>
    )
}
export default Thumb;