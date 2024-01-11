import React from 'react'
import { ClipLoader } from 'react-spinners';

export default function ButtonWithLoader(props){

    const {classNames, isLoading, isDisabled, loaderColor} = props

    const handleClick=()=>{
        props.onClick()
    }

    return(
        <button className={classNames} disabled={isLoading || isDisabled} onClick={handleClick}>
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