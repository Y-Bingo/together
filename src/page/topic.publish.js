import React, { Component } from 'react';
import {
    NavBar,
    List,
    Icon,
    InputItem,
    Button,
    WhiteSpace,
    WingBlank,
    DatePicker,
    ImagePicker,
    
} from 'antd-mobile';
class TopicPublish extends Component {
    render() {
        return (
            <div>
                <NavBar 
                     icon = { < Icon type = "left" / > }
                     onLeftClick = {
                         () => console.log(this.props)
                     }
                >发布</NavBar>
                <WhiteSpace size="lg"/>
                <WingBlank size="md">
                    <List>
                        <InputItem />
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default TopicPublish;