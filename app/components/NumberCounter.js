import React from 'react'
import { ClipLoader } from 'react-spinners';

export default function NumberCounter(props){

    const {value} = props

    const handleIncrement=()=>{
        props.onChange(value + 1)
    }

    const handleDecrement=()=>{
        let new_value = value - 1
        if(new_value>0){
            props.onChange(new_value)
        }
    }

    return(
        <div className='input-group qty-input'>
            <div className="input-group-prepend">
                <button className="btn" type="button" onClick={handleDecrement}><i className='far fa-minus'/></button>
            </div>
            <input type="text" className="form-control bg-transparent" placeholder='1' value={value} readOnly/>
            <div className="input-group-append" onClick={handleIncrement}>
                <button className="btn" type="button"><i className='far fa-plus'/></button>
            </div>
        </div>
    )
}