import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Dialog from './Dialog';

export function Index(props) {

    const history = browserHistory
    const dispatch = useDispatch()

    const [user, setUser] = useState("")
    const [modalShown, showModal] = useState("")
    const [modalType, setModalType] = useState(0)

    useEffect(() => {
        window.scrollTo(0,0)
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        if(userinfo){
            setUser(userinfo)
        }
    }, [])

    const handleOpenModal=(type)=>{
        showModal(true)
        setModalType(type)
    }

    const handleCloseModal=()=>{
        showModal(false)
    }

    return (
        <div className='addresses'>
            <div className='d-flex mb-3'>
                <button className='btn primary-btn ml-auto' onClick={()=>handleOpenModal(0)}>Add Address</button>
            </div>
            <ul className='address-list'>
                <li>
                    <div className='details-ctr'>
                        <p className='name'>{user?.fullname}</p>
                        <p className='address'>174-C N Carpio Street 6th Avenue 1400, Caloocan City, 4103</p>
                        <p className='phone'>+63 919 662 9325</p>
                    </div>
                    <div className='action-btns'>
                        <button className='btn btn-block primary-btn' onClick={()=>handleOpenModal(1)}>Edit</button>
                        <div style={{width: 20, height: 20}}/>
                        <button className='btn btn-block primary-btn outlined' onClick={()=>handleOpenModal(2)}>Delete</button>
                    </div>
                </li>
                <li>
                    <div className='details-ctr'>
                        <p className='name'>{user?.fullname}</p>
                        <p className='address'>174-C N Carpio Street 6th Avenue 1400, Caloocan City, 4103</p>
                        <p className='phone'>+63 919 662 9325</p>
                    </div>
                    <div className='action-btns'>
                        <button className='btn btn-block primary-btn' onClick={()=>handleOpenModal(1)}>Edit</button>
                        <div style={{width: 20, height: 20}}/>
                        <button className='btn btn-block primary-btn outlined' onClick={()=>handleOpenModal(2)}>Delete</button>
                    </div>
                </li>
            </ul>
            <Dialog modalShown={modalShown}
                modalType={modalType}
                onClose={handleCloseModal}/>
        </div>
    )
}

export default Index