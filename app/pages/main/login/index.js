import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import ButtonWithLoader from '../../../components/ButtonWithLoader';

export function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [loadState, setLoadState] = useState("")

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const handleRegister=()=>{
        history.push('/register')
    }

    const handleLogin=()=>{
        setLoadState("login")
        setTimeout(() => {
            setLoadState("login success")
        }, 1000);
    }

    useEffect(()=>{
        if(loadState == "login success"){
            let sample_user = {
                _id: 0,
                email: "testuser1@email.com",
                fname: "test",
                lname: "user1",
                fullname: "test user1"
            }
            localStorage.setItem("userinfo", JSON.stringify(sample_user))
            history.push('/account')
        }
    },[loadState])

    return (
        <div id='login'>
            <div className='container'>
                <div className='form-ctr'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h1>Login</h1>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='form-group'>
                                <input type="text"
                                    className='form-control'
                                    placeholder='Email'/>
                            </div>
                            <div className='mb-2'>
                                <a href='javascript:void(0)'>Forgot your password?</a>
                            </div>
                            <div className='form-group'>
                                <input type="password"
                                    className='form-control'
                                    placeholder='Password'/>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <span>New Customer? <a href='javascript:void(0)' onClick={handleRegister}>Sign up <i className='far fa-long-arrow-right'/></a></span>
                            </div>
                            <ButtonWithLoader isLoading={loadState=="login"} classNames='btn btn-block primary-btn' loaderColor="#cfad61" onClick={handleLogin}>Sign In</ButtonWithLoader>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index