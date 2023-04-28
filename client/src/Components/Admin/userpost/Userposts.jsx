import React from 'react';

import './userpost.scss';



const Userposts = ({ data }) => {
    return (
        <div className="Postadmin">
            <img src={data.image} alt="" />
            <span style={{ color: "red", fontSize: '12px' }}>{data?.likes?.length} likes</span>
            <div className="detail">
                <span> {data.desc}</span>
            </div>
        </div>
    )
}

export default Userposts