import React from 'react'
import { ClipLoader } from 'react-spinners';

export default function ButtonWithLoader(props){

    const {className, isLoading, isDisabled, loaderColor, type} = props

    const handleClick=()=>{
        props.onClick()
    }

    return(
        <button type={type?type:"button"} className={className} disabled={isLoading || isDisabled} onClick={handleClick}>
            {
                isLoading?
                <div className='mr-2'>
                    <ClipLoader color={loaderColor?loaderColor:'#757575'} size={10} loading={true}/>
                </div>
                :null
            }
            {props.children}
        </button>
    )
}