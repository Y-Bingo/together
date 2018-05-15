import React, { Component } from 'react';

import { List } from 'antd-mobile';
import Extra from './user_card_header_extra';
import Thumb from './user_card_header_thumb';
import {userCare} from '../../action/user.info.actions';
import {connect} from 'react-redux';
const UserCard = (props) => {
    let {care_to, userCare, is_care} = props ;
    return (
        <div style={{padding:"8px 0"}}>
            {/* <List> */}
                <List.Item p
                    thumb={<Thumb head={care_to.user_head}/>}
                    extra={<Extra is_care={is_care} handleClick={() => {userCare(care_to)}}/>}
                >
                    <div style={{}}>{care_to.user_name}</div>
                    {/* <List.Item.Brief>{data.user_name}</List.Item.Brief> */}
                </List.Item>
            {/* </List> */}
        </div>
    )
}

const mapDispatchToProps = {
    userCare
}

export default connect(null, mapDispatchToProps)(UserCard);
// export default UserCard ;