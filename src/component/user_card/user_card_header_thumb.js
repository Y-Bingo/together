import React from 'react';

const Thumb = ({head}) => {
    return (
        <div style={{width:"2.6rem",height:"2.6rem"}}>
            <img src={head} alt="header" style={{width:"100%",height:"100%"}}/>
        </div>
    )
}
export default Thumb;