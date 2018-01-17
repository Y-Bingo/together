import React from 'react';

const Footer = (props)=>{
    const { good, collect, comment } = props;
    const {is_good,is_collect,is_join} = props;
    const { good_nums , comment_nums,menber_nums} = props;
    const icon_good = !is_good ? "good": "good-active" ;
    const icon_collect = !is_collect ? "collection" : "collection-active";    
    const icon_join = !is_join ? "menber" : "menber-active" ;
    const icon_comment = "comment" ;
    return (
        <div className="card-footer">
            <div className="card-footer-btn" onClick={collect}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_collect}.png`)} alt="collection" />
                </div>
            </div>
            <div className="card-footer-btn" onClick={good}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_good}.png`)} alt="good" />
                </div>
                <span>{good_nums}</span>
            </div>
            <div className="card-footer-btn" onClick={comment}>
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_comment}.png`)} alt="comment" />
                </div>
                <span>{comment_nums}</span>

            </div>
            <div className="card-footer-btn">
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_join}.png`)} alt="menber" />
                </div>
                <span>{menber_nums}</span>
            </div>
        </div>
    )
}

export default Footer ;