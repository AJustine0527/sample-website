import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

function Header(props){

    const location = props.location.pathname
    const history = browserHistory

    const [headerClass, setHeaderClass] = useState("")
    const [cartCount, setCartCount] = useState(0)

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

    const handleNav=(path)=>{
        history.push(path)
    }

    const handleAccount=()=>{
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        if (userinfo) {
            history.push('/account')
        }else{
            history.push('/login?return_to=/account')
        }
    }

    const renderClass=(path)=>{
        if (location == path) {
            return "nav-link active"
        } else {
            return "nav-link"
        }
    }

    useEffect(()=>{
        var cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            setCartCount(cart.length)
        }
    },[props.headerLoaded])

    return(
        <div className={'header-nav '+headerClass}>
            <div className='container'>
                <nav className="navbar navbar-expand-xl">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"><i className='far fa-bars'/></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={renderClass("/all-products")} href="javascript:void(0)" onClick={()=>handleNav("/all-products")}>Our Products</a>
                            </li>
                            <li className="nav-item">
                                <a className={renderClass("/about-us")} href="javascript:void(0)" onClick={()=>handleNav("/about-us")}>About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0)">Store Locator</a>
                            </li>
                        </ul>
                        <a className="logo-ctr" href="javascript:void(0)" onClick={()=>handleNav("/home")}>
                            <img src={logo} className="logo" width="100%"/>
                        </a>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={renderClass("/contact-us")} href="javascript:void(0)" onClick={()=>handleNav("/contact-us")}>Contact Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0)">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0)">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="javascript:void(0)" onClick={handleAccount}>
                                    <i className='fas fa-user'/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link position-relative" style={{width: 'fit-content'}} href="javascript:void(0)" onClick={()=>handleNav("/cart")}>
                                    <i className='fas fa-shopping-cart'/>
                                    {
                                        cartCount>0?
                                        <div className='cart-count'>{cartCount}</div>
                                        :null
                                    }
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
	return {
		headerLoaded: state.headerLoaded
	};
}

export default connect(mapStateToProps, null)(Header) 