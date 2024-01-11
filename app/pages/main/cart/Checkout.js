import React, { useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import cs from '../../../images/products/cabernet-sauvignon_medium.avif'
import _ from "lodash"

export default function Checkout(props) {

    const dispatch = useDispatch()
    const history = browserHistory

    const { cartItems } = props

    const handleBack=()=>{
        props.onBack()
    }

    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            boxShadow: state.isFocused?"0 0 0 0.2rem #9e742b69":"none",
            borderColor: state.isFocused?"#9e742b":"#ced4da",
            '&:hover': {
                borderColor: state.isFocused?"#9e742b":"#ced4da"
            },
            borderRadius: 0,
            height: 50,
            fontSize: 12,
            textTransform: "uppercase"
        }),
    }

    const handleLogin=()=>{
        history.push('/login')
    }

    function computeTotal(){
        let total = 0
        total = _.sumBy(cartItems,(o)=>{return o.qty * o.price})

        return total
    }

    return (
        <div className='checkout-ctr'>
            <div className='row'>
                <div className='col-12 col-md-7'>
                    <div className='p-3'>
                        <div className='d-flex justify-content-between mb-2'>
                            <p className='title m-0'>Contact</p>
                            <p className='title m-0'>Have an account? <a href="javascript:void(0)" onClick={handleLogin}>Log in</a></p>
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control'
                                placeholder='Email'/>
                        </div>
                        <p className='title'>Shipping Address</p>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <div className='form-group'>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='First Name'/>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='form-group'>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Last Name'/>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <textarea rows={3}
                                className='form-control'
                                placeholder='Address'/>
                        </div>
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <div className='form-group'>
                                    <Select options={[]}
                                        styles={selectStyles}
                                        placeholder="Province"/>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='form-group'>
                                    <Select options={[]}
                                        styles={selectStyles}
                                        placeholder="City"/>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='form-group'>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='ZIP Code'/>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control'
                                placeholder='Phone'/>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-5'>
                    <ul className='product-list'>
                        {
                            cartItems.map((item,index)=>{
                                return(
                                    <li key={item._id}>
                                        <div className='img-ctr'>
                                            <img src={cs} height="100%"/>
                                            <div className='qty'>{item.qty}</div>
                                        </div>
                                        <p className='prod-name'>{item.name}</p>
                                        <p className='price'>₱{Number(item.price * item.qty).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='totals-ctr'>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                            <span>Subtotal</span>
                            <span>₱{Number(computeTotal()).toLocaleString("en",{maximumFractionDigits: 2})}</span>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                            <span>Shipping</span>
                            <span>₱{Number(50).toLocaleString("en",{maximumFractionDigits: 2})}</span>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                            <span className='font-weight-bold'>Total</span>
                            <span>PHP<strong>₱{Number(computeTotal() + 50).toLocaleString("en",{maximumFractionDigits: 2})}</strong></span>
                        </div>
                    </div>
                    <div className='buttons-ctr'>
                        <button className='btn btn-block btn-link' onClick={handleBack}><i className='far fa-chevron-left'/> Return to cart</button>
                        <div style={{width: 20, height: 20}}/>
                        <button className='btn btn-block primary-btn'>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}