import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Dialog from './Dialog';
import moment from 'moment';

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
        <div className='orders'>
            <ul className='order-list'>
                <li>
                    <div className='details-ctr'>
                        <p className='ordernum'>Order #123ABC</p>
                        <p className='date'>{moment().format("MMM DD, YYYY hh:mm A")}</p>
                        <p className='total'>Order Total: <strong>₱{Number(1500).toLocaleString("en",{maximumFractionDigits: 2})}</strong></p>
                    </div>
                    <div className='action-btns'>
                        <button className='btn btn-block primary-btn' onClick={()=>handleOpenModal(0)}>View</button>
                        <div style={{width: 20, height: 20}}/>
                        <button className='btn btn-block primary-btn outlined' onClick={()=>handleOpenModal(1)}>Cancel</button>
                    </div>
                </li>
                <li>
                    <div className='details-ctr'>
                        <p className='ordernum'>Order #123ABC</p>
                        <p className='date'>{moment().format("MMM DD, YYYY hh:mm A")}</p>
                        <p className='total'>Order Total: <strong>₱{Number(1500).toLocaleString("en",{maximumFractionDigits: 2})}</strong></p>
                    </div>
                    <div className='action-btns'>
                        <button className='btn btn-block primary-btn' onClick={()=>handleOpenModal(0)}>View</button>
                    </div>
                </li>
                <li>
                    <div className='details-ctr'>
                        <p className='ordernum'>Order #123ABC</p>
                        <p className='date'>{moment().format("MMM DD, YYYY hh:mm A")}</p>
                        <p className='total'>Order Total: <strong>₱{Number(1500).toLocaleString("en",{maximumFractionDigits: 2})}</strong></p>
                    </div>
                    <div className='action-btns'>
                        <button className='btn btn-block primary-btn' onClick={()=>handleOpenModal(0)}>View</button>
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