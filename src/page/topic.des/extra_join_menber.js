import React from 'react';

const ExtraMenber = (props) => {
    const { menber_nums, is_join } = props ;
    const icon_join = !is_join ? "menber" : "menber";
    return (
        <div className="card-footer">
            <div className="card-footer-btn">
                <div className="card-footer-icon">
                    <img src={require(`./img/${icon_join}.png`)} alt="menber" />
                </div>
                <span>{menber_nums}</span>
            </div>
        </div>
    )
}

export default ExtraMenber;