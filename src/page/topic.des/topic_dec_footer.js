import React from 'react';
import {Flex} from 'antd-mobile';
const Footer = (props)=>{
    const { good, collect, comment } = props;
    const {is_good,is_collect,is_join} = props;
    const { good_nums, comment_nums, menber_nums, collect_nums} = props;
    const icon_good = !is_good ? "good": "good-active" ;
    const icon_collect = !is_collect ? "collection" : "collection-active";    
    const icon_join = !is_join ? "menber" : "menber" ;
    const icon_comment = "comment" ;
    return (
        <Flex style={{ textAlign: "center"}}>
            <Flex.Item onClick={collect}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_collect}.png`)} alt="collection" />
                </div>
                <span>{collect_nums}</span>
            </Flex.Item>
            <Flex.Item onClick={good}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_good}.png`)} alt="good" />
                </div>
                <span>{good_nums}</span>
            </Flex.Item>
            <Flex.Item onClick={comment}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_comment}.png`)} alt="comment" />
                </div>
                <span>{comment_nums}</span>
            </Flex.Item>
        </Flex>
    )
}

export default Footer ;