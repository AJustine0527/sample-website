import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export function Index(props) {

    const location = props.location.pathname
    const history = browserHistory
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0,0)
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        if(userinfo){

        }else{
            history.replace({pathname: "/home"})
        }
    }, [])

    const handleNav=(path)=>{
        history.push(path)
    }

    const renderClass=(path)=>{
        if (location == path) {
            return "active"
        } else {
            return ""
        }
    }

    const handleLogout=()=>{
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div id='account'>
            <div className='container'>
                <div className='account-ctr'>
                    <ul className='acc-navs'>
                        <li>
                            <a href='javascript:void(0)' className={renderClass('/account/profile')} onClick={()=>handleNav('/account/profile')}>Profile</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className={renderClass('/account/addresses')} onClick={()=>handleNav('/account/addresses')}>Addresses</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className={renderClass('/account/order-history')} onClick={()=>handleNav('/account/order-history')}>Order History</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                    <div className='contents'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index