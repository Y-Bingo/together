import React, { Component } from 'react';

import { List } from 'antd-mobile';
import Extra from './user_card_header_extra';
import Thumb from './user_card_header_thumb';
import {user_care} from '../../action/user.action'

const UserCard = (data) => {
    console.log("userCard",data);
    return (
        <div style={{padding:"8px 0"}}>
            {/* <List> */}
                <List.Item 
                    thumb={<Thumb head={data.user_head}/>}
                    extra={<Extra is_care={data.is_care} handleClick={user_care}/>}
                >
                    <div style={{}}>{data.user_name}</div>
                    {/* <List.Item.Brief>{data.user_name}</List.Item.Brief> */}
                </List.Item>
            {/* </List> */}
        </div>
    )
}

export default UserCard ;