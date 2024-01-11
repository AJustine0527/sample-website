import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [user, setUser] = useState("")

    useEffect(() => {
        window.scrollTo(0,0)
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        if(userinfo){
            setUser(userinfo)
        }
    }, [])


    return (
        <div className='profile'>
            <div className='p-header'>
                <p className='name'>{user?.fname} {user?.lname}</p>
                <p className='email'>{user?.email}</p>
            </div>
            <div className='p-details'>
                <div className='row'>
                    <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                        <p className='title'>Personal Information</p>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control'
                                placeholder='First Name'/>
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control'
                                placeholder='Last Name'/>
                        </div>
                        <div className='form-group'>
                            <input type="text"
                                className='form-control'
                                placeholder='Email'/>
                        </div>
                        <div className='buttons-ctr'>
                            <button className='btn primary-btn ml-auto ml-lg-0'>Update</button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <p className='title'>Change Password</p>
                        <div className='form-group'>
                            <input type="password"
                                className='form-control'
                                placeholder='New Password'/>
                        </div>
                        <div className='form-group'>
                            <input type="password"
                                className='form-control'
                                placeholder='Confirm Password'/>
                        </div>
                        <div className='buttons-ctr'>
                            <button className='btn ml-auto mt-auto primary-btn outlined'>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index