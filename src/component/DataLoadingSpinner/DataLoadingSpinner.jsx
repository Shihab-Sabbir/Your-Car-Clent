import React from 'react'
import loaderGif from '../../asset/loderGif.gif'
function DataLoadingSpinner() {
    return (
        <div className='flex justify-center items-center mt-[100px]'>
            <img src={loaderGif} alt="" />
        </div>
    )
}

export default DataLoadingSpinner;