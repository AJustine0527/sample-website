import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const handleLogin=()=>{
        history.push('/login')
    }

    return (
        <div id='login'>
            <div className='container'>
                <div className='form-ctr'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h1>Create Account</h1>
                        </div>
                        <div className='col-12 col-md-6'>
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
                            <div className='form-group'>
                                <input type="password"
                                    className='form-control'
                                    placeholder='Password'/>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <span>Returning Customer? <a href='javascript:void(0)' onClick={handleLogin}>Sign in <i className='far fa-long-arrow-right'/></a></span>
                            </div>
                            <button className='btn btn-block primary-btn'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index