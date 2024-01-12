import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import ButtonWithLoader from '../../../components/ButtonWithLoader';
import callApi from '../../../utils/apiCaller';
import { validateEmail } from '../../../components/CustomFunctions';

const initForm = {
    first_name: "",
    last_name: "",
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

    const [formdata, setForm] = useState(initForm)
    const [err, setError] = useState(initErr)
    const [loadState, setLoadState] = useState("")

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const handleLogin=()=>{
        history.push('/login')
    }

    const handleChange=(e)=>{
        let new_form = Object.assign({},formdata,{
            [e.target.name]: e.target.value
        })
        setForm(new_form)
        setError(initErr)
    }

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault()
        }
        catch(error){
            console.log(error)
        }

        let isValidEmail = validateEmail(formdata.email_address)

        if(_.isEmpty(formdata.first_name.trim())){
            setError({field: "first_name", message:"Please enter your first name"})
        }else if(_.isEmpty(formdata.last_name.trim())){
            setError({field: "last_name", message:"Please enter your last name"})
        }else if(_.isEmpty(formdata.email_address.trim())){
            setError({field: "email_address", message:"Please enter your email address"})
        }else if(!isValidEmail){
            setError({field: "email_address", message:"Invalid email address"})
        }else if(_.isEmpty(formdata.password.trim())){
            setError({field: "password", message:"Please enter your password"})
        }else if(formdata.password.length < 8){
            setError({field: "password", message:"Password must be at least 8 characters long"})
        }else{
            setLoadState("signup")
            try {
                const ret = await callApi('customer/signup', 'post', formdata);
                if (ret.status === 1) {
                    setLoadState("signup success")
                } else {
                    setLoadState("signup failed")
                    setError({field: "", message: ret.message})
                }
            } catch (error) {
                console.log(error);
                setLoadState("signup failed")
                setError({field: "", message: error})
            }
        }
    }

    let errorMessage = <span className='err-msg'>{err.message}</span>

    let content = <form className='form-ctr' onSubmit={handleSubmit}>
        <div className='row'>
            <div className='col-12 col-md-6'>
                <h1>Create Account</h1>
            </div>
            <div className='col-12 col-md-6'>
                {err.field === ''?<div className='form-group'>{errorMessage}</div>:null}
                <div className='form-group'>
                    <input type="text"
                        className={err.field === 'first_name'?'form-control error':'form-control'}
                        placeholder='First Name'
                        name="first_name"
                        value={formdata.first_name}
                        onChange={handleChange}/>
                    {err.field === 'first_name'?errorMessage:null}
                </div>
                <div className='form-group'>
                    <input type="text"
                        className={err.field === 'last_name'?'form-control error':'form-control'}
                        placeholder='Last Name'
                        name="last_name"
                        value={formdata.last_name}
                        onChange={handleChange}/>
                    {err.field === 'last_name'?errorMessage:null}
                </div>
                <div className='form-group'>
                    <input type="text"
                        className={err.field === 'email_address'?'form-control error':'form-control'}
                        placeholder='Email'
                        name="email_address"
                        value={formdata.email_address}
                        onChange={handleChange}/>
                    {err.field === 'email_address'?errorMessage:null}
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
                    <span>Returning Customer? <a href='javascript:void(0)' onClick={handleLogin}>Sign in <i className='far fa-long-arrow-right'/></a></span>
                </div>
                <ButtonWithLoader isLoading={loadState=="signup"} classNames='btn btn-block primary-btn' loaderColor="#cfad61" type='submit' onClick={()=>{}}>Sign Up</ButtonWithLoader>
            </div>
        </div>
    </form>

    if(loadState === "signup success"){
        content = <div>
            Sigup success
            <button className='btn btn-block primary-btn' onClick={handleLogin}>Sign in</button>
        </div>
    }

    return (
        <div id='login'>
            <div className='container'>
                {content}
            </div>
        </div>
    )
}

export default Index