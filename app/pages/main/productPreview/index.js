import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import cs_large from '../../../images/products/cabernet-sauvignon_large.webp'
import { products } from '../products/Products'
import NumberCounter from '../../../components/NumberCounter';
import { useDispatch } from 'react-redux';
import { loadHeader } from '../../../types';
import { toast } from 'react-toastify';

export default function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [productInfo, setProductInfo] = useState({})
    const [qty, setQty] = useState(1)

    useEffect(()=>{
        window.scrollTo(0,0)
        let prodName = props.params.prodname.replace("-"," ")
        let info = _.find(products, (o)=>{return o.name == prodName})
        if(info){
            setProductInfo(info)
        }
    },[])

    const handleQtyChange=(newQty)=>{
        setQty(newQty)
    }

    const handleAddToCart=()=>{
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            let index = _.findIndex(cart,(o)=>{return o._id === productInfo._id})
            if(index>=0){
                cart[index].qty = cart[index].qty + qty
                localStorage.setItem('cart',JSON.stringify(cart))
            }else{
                let new_cart = cart
                let cartObj = {
                    ...productInfo,
                    qty: qty
                }
                new_cart.push(cartObj)
                localStorage.setItem('cart',JSON.stringify(new_cart))
            }
        }else{
            localStorage.setItem('cart',JSON.stringify([{ ...productInfo, qty: qty }]))
        }
        dispatch(loadHeader())
        toast.success("Item successfully added to cart")
    }

    return (
        <div id='prod-preview'>
            <div className='container'>
                <div className='prod-details'>
                    <div className='row'>
                        <div className='col-12 col-md-5'>
                            <div className='img-ctr'>
                                <img src={cs_large} height="100%"/>
                            </div>
                        </div>
                        <div className='col-12 col-md-7'>
                            <h6>Bottle 750ML</h6>
                            <h1>{productInfo?.name}</h1>
                            <div className='row'>
                                <div className='col-12 col-lg-8'>
                                    <h3 className='font-weight-bold'>You did it.</h3>
                                    <h3>You’re where you should be—about to pick up a bottle of Wine Time. You’re in for a full-flavored, clean, great-tasting wine with no added nonsense. Low sugar Cabernet, no flavor additives, notes of lavender, currants, and oak shine through. Wine as you are.</h3>
                                    <p><span className='text-danger'>*</span> Average analysis per 5oz glass against the top 10 wine brands in the US. Low-sugar Cabernet Sauvignon doesn't get better than this.</p>
                                </div>
                                <div className='col-12 col-lg-4'>
                                    <h3 className='font-weight-bold'>Per 5oz glass:</h3>
                                    <ul className='contents'>
                                        <li>
                                            <label>Sugar</label>
                                            <strong>0.12g</strong>
                                        </li>
                                        <li>
                                            <label>Calories</label>
                                            <strong>121</strong>
                                        </li>
                                        <li>
                                            <label>Carbohydrates</label>
                                            <strong>4.8g</strong>
                                        </li>
                                        <li>
                                            <label>Alcohol</label>
                                            <strong>13.5%</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='buttons-ctr'>
                                <button className='btn primary-btn' onClick={handleAddToCart}>Add to cart</button>
                                <div style={{width: 20, height: 20}}/>
                                <NumberCounter value={qty} onChange={handleQtyChange}/>
                                <div style={{width: 20, height: 20}}/>
                                <p className='price'>₱{Number(productInfo?.price * qty).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}