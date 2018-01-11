import React from 'react';

const style = {
    logo : {
        width: "100%",
        // padding: "3rem 0"
    },
    container : {
        width: "100%",
        height: "8rem",
        backgroundColor: 'skyblue',
        margin : "auto"
    }
}
export default function Logo(){
    return (
        <div style={style.logo}>
            <div style={style.container}>
                {/* <img src={""} alt="logo"/> */}
            </div>
        </div>
    )
}