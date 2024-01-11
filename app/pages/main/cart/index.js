import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import _ from "lodash"
import cs from '../../../images/products/cabernet-sauvignon_medium.avif'
import hr from '../../../images/products/holiday-red_medium.avif'
import Checkout from './Checkout'
import NumberCounter from '../../../components/NumberCounter'
import { loadHeader } from '../../../types'
import { useDispatch } from 'react-redux'

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default function Index(props) {

    const dispatch = useDispatch()
    const forceUpdate = useForceUpdate()

    const history = browserHistory

    const [isCheckout, setCheckout] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(()=>{
        var cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            setCartItems(cart)
        }
    },[])

    const handleContinueShopping=()=>{
        history.push('/all-products')
    }

    const handleCheckout=()=>{
        setCheckout(true)
    }

    const handleBackToCart=()=>{
        setCheckout(false)
    }

    const handleQtyChange=(id, newQty)=>{
        let index = _.findIndex(cartItems,(o)=>{return o._id === id})
        if(index>=0){
            cartItems[index].qty = newQty
            localStorage.setItem('cart',JSON.stringify(cartItems))
            forceUpdate()
        }
    }

    const handleRemove=(id)=>{
        let index = _.findIndex(cartItems,(o)=>{return o._id === id})
        if(index>=0){
            cartItems.splice(index, 1)
            localStorage.setItem('cart',JSON.stringify(cartItems))
            dispatch(loadHeader())
            forceUpdate()
        }
    }

    function computeTotal(){
        let total = 0
        total = _.sumBy(cartItems,(o)=>{return o.qty * o.price})

        return total
    }

    let content = null
    
    if(isCheckout){
        content = <Checkout cartItems={cartItems} onBack={handleBackToCart}/>
    }else{
        content = <div className='order-list'>
            <div className='table-ctr'>
                {
                    cartItems.length>0?
                    <React.Fragment>
                        <table className='table table-borderless'>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th style={{width: 200, textAlign: "center"}}>Quantity</th>
                                    <th style={{width: 200, textAlign: "right"}}>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    
                                    cartItems.map((item,index)=>{
                                        return(
                                            <tr key={item._id}>
                                                <td>
                                                    <div className='prod-ctr'>
                                                        <img src={cs} width="100%"/>
                                                        <div className='details-ctr'>
                                                            <p className='prod-name'>{item.name}</p>
                                                            <a href='javascript:void(0)' onClick={()=>handleRemove(item._id)}>Remove</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex justify-content-center'>
                                                        <NumberCounter value={item.qty} onChange={(newQty)=>handleQtyChange(item._id, newQty)}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className='price'>₱{Number(item.price * item.qty).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan={3} className="pt-5 pb-4">
                                        <p className='total-price'><small>Total Price</small> ₱{Number(computeTotal()).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-block primary-btn outlined' onClick={handleContinueShopping}>Continue Shopping</button>
                            <div style={{width: 20, height: 20}}/>
                            <button className='btn btn-block primary-btn' disabled={cartItems.length<=0} onClick={handleCheckout}>Checkout</button>
                        </div>
                    </React.Fragment>
                    :
                    <div className='no-data-ctr'>
                        <span>There are no items in your cart</span>
                        <button className='btn btn-block primary-btn outlined' onClick={handleContinueShopping}>Continue Shopping</button>
                    </div>

                }
            </div>
        </div>
    }

    return (
        <div id='cart'>
            <div className='container'>
                {content}
            </div>
        </div>
    )
}