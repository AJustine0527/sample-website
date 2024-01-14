import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import { products } from './Products';
import { useDispatch } from 'react-redux';
import { loadHeader } from '../../../types';
import toast from 'react-hot-toast';

export default function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [wineType, setWineType] = useState(0)
    const [displayedProducts, setDisplayedProducts] = useState([])

    useEffect(()=>{
        window.scrollTo(0,0)
        setDisplayedProducts(products)
    },[])

    const handlePreviewProduct=(e, name)=>{
        if(e.target.id == "addBtn"){
            //input add to cart function
        }else{
            history.push('/product/preview/'+name.replace(" ","-"))
        }
    }

    const handleCategory=(i)=>{
        setWineType(i)
        if(i===0){
            setDisplayedProducts(products)
        }else{
            let new_products = _.filter(products,(o)=>{return o.wineType === i})
            setDisplayedProducts(new_products)
        }
    }

    const handleAddToCart=(item)=>{
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            let index = _.findIndex(cart,(o)=>{return o._id === item._id})
            if(index>=0){
                cart[index].qty = cart[index].qty + 1
                localStorage.setItem('cart',JSON.stringify(cart))
            }else{
                let new_cart = cart
                let cartObj = {
                    ...item,
                    qty: 1
                }
                new_cart.push(cartObj)
                localStorage.setItem('cart',JSON.stringify(new_cart))
            }
        }else{
            localStorage.setItem('cart',JSON.stringify([{ ...item, qty: 1 }]))
        }
        dispatch(loadHeader())
        toast.success("Item successfully added to cart")
    }

    const wineTypes = [
        "All Wines",
        "Red Wines",
        "White Wines"
    ]

    return (
        <div id='products'>
            <div className='container'>
                <div className='prods-ctr'>
                    <ul className='categories'>
                        <li>
                            <a href='javascript:void(0)' onClick={()=>handleCategory(0)} className={wineType==0?'active':''}>All Wines <small>({products.length})</small></a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' onClick={()=>handleCategory(1)} className={wineType==1?'active':''}>Red Wines <small>({_.filter(products,(o)=>{return o.wineType===1}).length})</small></a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' onClick={()=>handleCategory(2)} className={wineType==2?'active':''}>White Wines <small>({_.filter(products,(o)=>{return o.wineType===2}).length})</small></a>
                        </li>
                    </ul>
                    <div className='prod-list'>
                        <div className='heads'>
                            <h6>Products</h6>
                            <h1>{wineTypes[wineType]}</h1>
                            <h3>Great tasting wines for those looking for a better fit.</h3>
                            <div className='row mb-5'>
                                <div className='col-12 col-md-5'>
                                    <p>Wine Time’s red, white, and sparkling varietals are all gluten-free and vegan with no flavor additives and no compromise to compliment all</p>
                                </div>
                                <div className='col-12 col-md-5'>
                                    <p>lifestyles and walks of life. We simply wanted to make wines that people could enjoy and feel good about. Enjoy!</p>
                                </div>
                            </div>
                        </div>
                        <button className='btn primary-btn outlined mb-5'>Learn More</button>
                        <div className='row m-0'>
                            {
                                displayedProducts.map((item, index)=>{
                                    return(
                                        <div className='col-12 col-md-6 col-xl-3 p-0' key={index}>
                                            <div className='prod-box' onClick={(e)=>handlePreviewProduct(e,item.name)}>
                                                <img src={item.photo} width="100%"/>
                                                <p className='prod-name'>{item.name}</p>
                                                <p className='price'>₱{Number(item.price).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                                                <button className='btn btn-block primary-btn' id='addBtn' onClick={()=>handleAddToCart(item)}>Add to cart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}