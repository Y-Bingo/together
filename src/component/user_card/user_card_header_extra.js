import React from 'react';
import {Button} from 'antd-mobile';

const Extra = (props) => {
    const {is_care , handleClick} = props
    console.log(is_care);
    return (
        <div  onClick={handleClick}>
            { is_care 
                ? <Button type="ghost" size="small">已关注</Button> 
                : <Button type="primary" size="small">关注</Button>  }
        </div>
    )
}
export default Extra;