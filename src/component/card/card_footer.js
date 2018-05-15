import React from 'react';

const Footer = (props)=>{
    const { _good, _collect, _comment } = props;
    const {is_good,is_collected,is_join} = props;
   
    const icon_good = !is_good ? "good": "good-active" ;
    const icon_collect = !is_collected ? "collection" : "collection-active";    
    console.log(props.uid, is_collected)
    const icon_join = !is_join ? "menber" : "menber" ;
    const icon_comment = "comment" ;

    const {topic_menber, topic_comments, topic_love} = props ;
    let topic_had_join = topic_menber.length ;
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
                <span>{topic_had_join}</span>
            </div>
        </div>
    )
}

export default Footer ;