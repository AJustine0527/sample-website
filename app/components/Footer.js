import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'

export default function Footer(props){

    const [headerClass,setHeaderClass] = useState("")

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    const handleScroll=()=>{
        if(window.scrollY >= 50){
            setHeaderClass("sm")
        }else{
            setHeaderClass("")
        }
    }

    return(
        <footer>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                        <div className='row'>
                            <div className='col-12 col-sm-4'>
                                <img src={logo} className='logo'/>
                                <a href='javascript:void(0)'>Facebook</a>
                                <a href='javascript:void(0)'>Instagram</a>
                                <a href='javascript:void(0)'>Pinterest</a>
                                <a href='javascript:void(0)'>TikTok</a>
                            </div>
                            <div className='col-12 col-sm-4'>
                                <a href='javascript:void(0)'>All Wines</a>
                                <a href='javascript:void(0)'>Red Wines</a>
                                <a href='javascript:void(0)'>White Wines</a>
                                <a href='javascript:void(0)'>Store Locator</a>
                                <a href='javascript:void(0)'>Privacy Policy</a>
                            </div>
                            <div className='col-12 col-sm-4'>
                                <a href='javascript:void(0)'>About Us</a>
                                <a href='javascript:void(0)'>Contact Us</a>
                                <a href='javascript:void(0)'>Blog</a>
                                <a href='javascript:void(0)'>Events</a>
                                <a href='javascript:void(0)'>Refer a Friend!</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <p>WARNING: Drinking distilled spirits, beer, coolers, wine and other alcoholic beverages may increase cancer risk, and, during pregnancy, can cause birth defects. For more information go to www.P65Warnings.ca.gov/alcohol</p>
                                <p>REMINDER, all packages must be signed for by someone 21 years of age or older per FedEx & UPS</p>
                            </div>
                            <div className='col-12 col-md-6'>
                                <p className='font-weight-bold'>Web accessibility policy</p>
                                <p>Wine Times remains committed to serving persons with disabilities and we are actively updating our site to ensure that everyone has full and equal enjoyment of our products, and their ability to purchase these online.</p>
                                <p>© 2023 Wine Time. Part of O'Neill Vintners & Distillers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}