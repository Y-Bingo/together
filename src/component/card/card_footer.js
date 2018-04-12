import React from 'react';

const Footer = (props)=>{
    const { _good, _collect, _comment } = props;
    const {is_good,is_collect,is_join} = props;
    const { topic_had_join , topic_comments,topic_collected, topic_love} = props;
    const icon_good = !is_good ? "good": "good-active" ;
    const icon_collect = !is_collect ? "collection" : "collection-active";    
    const icon_join = !is_join ? "menber" : "menber" ;
    const icon_comment = "comment" ;
    return (
        <div className="card-footer">
            <div className="card-footer-btn" onClick={(e)=>{_collect(e)}}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_collect}.png`)} alt="collection" />
                </div>
            </div>
            <div className="card-footer-btn" onClick={(e)=>{_good(e)}}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_good}.png`)} alt="good" />
                </div>
                <span>{topic_love}</span>
            </div>
            <div className="card-footer-btn" onClick={(e)=>{_comment(e)}}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_comment}.png`)} alt="comment" />
                </div>
                <span>{topic_comments}</span>

            </div>
            <div className="card-footer-btn">
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_join}.png`)} alt="menber" />
                </div>
                {/* <span>{topic_had_join.length}</span> */}
            </div>
        </div>
    )
}

export default Footer ;