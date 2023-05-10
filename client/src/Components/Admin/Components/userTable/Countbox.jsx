import React from 'react';
const Countbox = ({head,value}) => {
    return (
        <div className="countbox">
            <h2>{head}</h2>
            <h4>{value}</h4>
        </div>
    )
}

export default Countbox