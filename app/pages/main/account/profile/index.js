import React, { useEffect, useState } from 'react'
import ButtonWithLoader from '../../../../components/ButtonWithLoader';
import { validateEmail } from '../../../../components/CustomFunctions';
import callApi from '../../../../utils/apiCaller';
import _ from 'lodash';
import toast from 'react-hot-toast';

const initForm = {
    first_name: "",
    last_name: "",
    email_address: "",
    old_password: "",
    new_password: "",
    confirm_password: ""
}

const initErr = {
    field: "",
    message: ""
}

export function Index(props) {

    const [user, setUser] = useState({})
    const [formdata, setForm] = useState(initForm)
    const [err, setError] = useState(initErr)
    const [loadState, setLoadState] = useState("")
    const [shownPwds, setShownPwds] = useState([])

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
                var new_form = {
                    ...ret.userdata,
                    old_password: "",
                    new_password: "",
                    confirm_password: ""
                }
                setForm(new_form)
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
                const ret = await callApi('customer/info/update', 'put', formdata);
                if (ret.status === 1) {
                    setLoadState("update success")
                    localStorage.setItem("userinfo", JSON.stringify(ret.userdata))
                    toast.success("Personal information successfully updated")
                } else {
                    setLoadState("update failed")
                    setError({field: "personal_info", message: ret.message})
                }
            } catch (error) {
                console.log(error);
                setLoadState("update failed")
                setError({field: "personal_info", message: error})
            }
        }
    }

    const handleChangePassword=async()=>{

        if(_.isEmpty(formdata.old_password.trim())){
            setError({field: "old_password", message:"Please enter your old password"})
        }else if(_.isEmpty(formdata.new_password.trim())){
            setError({field: "new_password", message:"Please enter your new password"})
        }else if(formdata.new_password.length < 8){
            setError({field: "new_password", message:"Password must be at least 8 characters long"})
        }else if(_.isEmpty(formdata.confirm_password.trim())){
            setError({field: "confirm_password", message:"Please confirm your new password"})
        }else if(formdata.confirm_password !== formdata.new_password){
            setError({field: "confirm_password", message:"Password didn't match"})
        }else{
            setLoadState("update")
            try {
                const ret = await callApi('customer/password/update', 'put', formdata);
                if (ret.status === 1) {
                    setLoadState("update success")
                    toast.success("Password successfully changed")
                } else {
                    setLoadState("update failed")
                    setError({field: "change_pwd", message: ret.message})
                }
            } catch (error) {
                console.log(error);
                setLoadState("update failed")
                setError({field: "change_pwd", message: error})
            }
        }
    }

    const handleShowPwd=(field)=>{
        if(shownPwds.includes(field)){
            var new_fields = _.filter(shownPwds,(o)=>{return o !== field})
            setShownPwds(new_fields)
        }else{
            var new_fields = [
                ...shownPwds
            ]
            new_fields.push(field)
            setShownPwds(new_fields)
        }
    }

    useEffect(()=>{
        if(loadState === "update success"){
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
                        {err.field === 'personal_info' && err.message?<div className='mb-1'>{errorMessage}</div>:null}
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
                            <ButtonWithLoader isLoading={loadState=="update"} 
                                className='btn btn-block primary-btn' 
                                loaderColor="#cfad61" 
                                onClick={handleUpdate}>Update</ButtonWithLoader>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <p className='title'>Change Password</p>
                        {err.field === 'change_pwd' && err.message?<div className='mb-1'>{errorMessage}</div>:null}
                        <div className='form-group'>
                            <div className='input-group'>
                                <input type={shownPwds.includes("old")?"text":"password"}
                                    className={err.field === 'old_password'?'form-control error':'form-control'}
                                    placeholder='Old Password'
                                    name="old_password"
                                    value={formdata.old_password}
                                    onChange={handleChange}/>
                                <div className='input-group-append'>
                                    <button className='btn input-group-text' onClick={()=>handleShowPwd("old")}>
                                        <i className={shownPwds.includes("old")?'far fa-eye':'far fa-eye-slash'}/>
                                    </button>
                                </div>
                            </div>
                            {err.field === 'old_password'?errorMessage:null}
                        </div>
                        <div className='form-group'>
                            <div className='input-group'>
                                <input type={shownPwds.includes("new")?"text":"password"}
                                    className={err.field === 'new_password'?'form-control error':'form-control'}
                                    placeholder='New Password'
                                    name="new_password"
                                    value={formdata.new_password}
                                    onChange={handleChange}/>
                                <div className='input-group-append'>
                                    <button className='btn input-group-text' onClick={()=>handleShowPwd("new")}>
                                        <i className={shownPwds.includes("new")?'far fa-eye':'far fa-eye-slash'}/>
                                    </button>
                                </div>
                            </div>
                            {err.field === 'new_password'?errorMessage:null}
                        </div>
                        <div className='form-group'>
                            <div className='input-group'>
                                <input type={shownPwds.includes("confirm")?"text":"password"}
                                    className={err.field === 'confirm_password'?'form-control error':'form-control'}
                                    placeholder='Confirm Password'
                                    name="confirm_password"
                                    value={formdata.confirm_password}
                                    onChange={handleChange}/>
                                <div className='input-group-append'>
                                    <button className='btn input-group-text' onClick={()=>handleShowPwd("confirm")}>
                                        <i className={shownPwds.includes("confirm")?'far fa-eye':'far fa-eye-slash'}/>
                                    </button>
                                </div>
                            </div>
                            {err.field === 'confirm_password'?errorMessage:null}
                        </div>
                        <div className='buttons-ctr'>
                            <ButtonWithLoader isLoading={loadState=="update"} 
                                className='btn btn-block primary-btn outlined' 
                                loaderColor="#cfad61" 
                                onClick={handleChangePassword}>Change Password</ButtonWithLoader>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index