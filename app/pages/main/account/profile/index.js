import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import ButtonWithLoader from '../../../../components/ButtonWithLoader';
import { validateEmail } from '../../../../components/CustomFunctions';
import { toast } from 'react-toastify';
import callApi from '../../../../utils/apiCaller';

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

    const [user, setUser] = useState({})
    const [formdata, setForm] = useState(initForm)
    const [err, setError] = useState(initErr)
    const [loadState, setLoadState] = useState("")

    useEffect(() => {
        window.scrollTo(0,0)
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        if(userinfo){
            setUser(userinfo)
            onInit(userinfo._id)
        }
    }, [])

    const onInit=async(id)=>{
        setLoadState("load")
        try {
            const ret = await callApi('customer/info/get/'+id);
            if (ret.status === 1) {
                setLoadState("load success")
                setForm(ret.userdata)
                setUser(ret.userdata)
            } else {
                setLoadState("load failed")
                setError({field: "", message: ret.message})
            }
        } catch (error) {
            console.log(error);
            setLoadState("load failed")
            setError({field: "", message: error})
        }
    }
    
    const handleChange=(e)=>{
        let new_form = Object.assign({},formdata,{
            [e.target.name]: e.target.value
        })
        setForm(new_form)
        setError(initErr)
    }

    const handleUpdate=async()=>{
        
        let isValidEmail = validateEmail(formdata.email_address)

        if(_.isEmpty(formdata.first_name.trim())){
            setError({field: "first_name", message:"Please enter your first name"})
        }else if(_.isEmpty(formdata.last_name.trim())){
            setError({field: "last_name", message:"Please enter your last name"})
        }else if(_.isEmpty(formdata.email_address.trim())){
            setError({field: "email_address", message:"Please enter your email address"})
        }else if(!isValidEmail){
            setError({field: "email_address", message:"Invalid email address"})
        }else{
            setLoadState("update")
            try {
                const ret = await callApi('customer/info/update', 'post', formdata);
                if (ret.status === 1) {
                    setLoadState("update success")
                    localStorage.setItem("userinfo", JSON.stringify(ret.userdata))
                } else {
                    setLoadState("update failed")
                    setError({field: "", message: ret.message})
                }
            } catch (error) {
                console.log(error);
                setLoadState("update failed")
                setError({field: "", message: error})
            }
        }
    }

    useEffect(()=>{
        if(loadState === "update success"){
            toast.success("Personal information successfully updated")
            onInit(user._id)
        }
    },[loadState])

    let errorMessage = <span className='err-msg'>{err.message}</span>

    return (
        <div className='profile'>
            <div className='p-header'>
                <p className='name'>{user?.first_name} {user?.last_name}</p>
                <p className='email'>{user?.email_address}</p>
            </div>
            <div className='p-details'>
                <div className='row'>
                    <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                        <p className='title'>Personal Information</p>
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
                        <div className='buttons-ctr'>
                            <ButtonWithLoader isLoading={loadState=="update"} classNames='btn btn-block primary-btn' loaderColor="#cfad61" onClick={handleUpdate}>Update</ButtonWithLoader>
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