import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import ButtonWithLoader from '../../../components/ButtonWithLoader';
import callApi from '../../../utils/apiCaller';

const initForm = {
    email_address: "",
    password: ""
}

const initErr = {
    field: "",
    message: ""
}

export function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [loadState, setLoadState] = useState("")
    const [formdata, setForm] = useState(initForm)
    const [err, setError] = useState(initErr)

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const handleRegister=()=>{
        history.push('/register')
    }
    
    const handleChange=(e)=>{
        let new_form = Object.assign({},formdata,{
            [e.target.name]: e.target.value
        })
        setForm(new_form)
        setError(initErr)
    }

    const handleLogin=async(e)=>{
        try {
            e.preventDefault()
        }
        catch(error){
            console.log(error)
        }
        if(_.isEmpty(formdata.email_address.trim())){
            setError({field: "email_address", message:"Please enter your email address"})
        }else if(_.isEmpty(formdata.password.trim())){
            setError({field: "password", message:"Please enter your password"})
        }else{
            setLoadState("login")
            try {
                const ret = await callApi('customer/login', 'post', formdata);
                if (ret.status === 1) {
                    setLoadState("login success")
                    localStorage.setItem('token', ret.token)
                    localStorage.setItem("userinfo", JSON.stringify(ret.userdata))
                } else {
                    setLoadState("login failed")
                    setError({field: "", message: ret.message})
                }
            } catch (error) {
                console.log(error);
                setLoadState("login failed")
                setError({field: "", message: error})
            }
        }
    }

    useEffect(()=>{
        if(loadState == "login success"){
            history.push('/account')
        }
    },[loadState])

    let errorMessage = <span className='err-msg'>{err.message}</span>

    return (
        <div id='login'>
            <div className='container'>
                <form className='form-ctr' onSubmit={handleLogin}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <h1>Login</h1>
                        </div>
                        <div className='col-12 col-md-6'>
                            {err.field === ''?<div className='form-group'>{errorMessage}</div>:null}
                            <div className='form-group'>
                                <input type="text"
                                    className={err.field === 'email_address'?'form-control error':'form-control'}
                                    placeholder='Email'
                                    name="email_address"
                                    value={formdata.email_address}
                                    onChange={handleChange}/>
                                {err.field === 'email_address'?errorMessage:null}
                            </div>
                            <div className='mb-2'>
                                <a href='javascript:void(0)'>Forgot your password?</a>
                            </div>
                            <div className='form-group'>
                                <input type="password"
                                    className={err.field === 'password'?'form-control error':'form-control'}
                                    placeholder='Password'
                                    name="password"
                                    value={formdata.password}
                                    onChange={handleChange}/>
                                {err.field === 'password'?errorMessage:null}
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                                <span>New Customer? <a href='javascript:void(0)' onClick={handleRegister}>Sign up <i className='far fa-long-arrow-right'/></a></span>
                            </div>
                            <ButtonWithLoader isLoading={loadState=="login"} classNames='btn btn-block primary-btn' loaderColor="#cfad61" type="submit" onClick={()=>{}}>Sign In</ButtonWithLoader>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index