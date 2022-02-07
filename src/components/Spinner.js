import React from 'react'
import loading from '../components/loading.gif';
const Spinner=()=>{    
    return (
        <div className="text-center my-3">
            <img src={loading} alt="loading" />
        </div>
    )
}
export default Spinner
