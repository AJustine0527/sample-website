import React from 'react'
import Modal from 'react-responsive-modal'
import Select from 'react-select'
import cs from '../../../../images/products/cabernet-sauvignon_medium.avif'
import hr from '../../../../images/products/holiday-red_medium.avif'

const selectStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        boxShadow: state.isFocused?"0 0 0 0.2rem #9e742b69":"none",
        borderColor: state.isFocused?"#9e742b":"#ced4da",
        '&:hover': {
            borderColor: state.isFocused?"#9e742b":"#ced4da"
        },
        borderRadius: 0,
        height: 50,
        fontSize: 12,
        textTransform: "uppercase"
    }),
}

export default function Dialog(props){

    const { modalShown, modalType } = props

    const handleCloseModal=()=>{
        props.onClose()
    }


    const modalStyle = {
        modal: {
            padding: 0,
            background: 'none',
            width: "100%",
            maxWidth: modalType == 1?500:750,
            margin: "auto"
        }
    }

    let content = null
    
    if(modalType == 1){
        content = <div className="modal-content">
            <p className="modal-title">Cancel Order</p>
            <p className="modal-description">Are you sure you want to canel this order ?</p>
            <div className='modal-buttons'>
                <button className='btn btn-link' onClick={handleCloseModal}>Close</button>
                <button className='btn primary-btn'>Yes, Cancel</button>
            </div>
        </div>
    }else{
        content = <div className="modal-content">
            <p className="modal-title">Order Details</p>
            <div className='order-list'>
                <table className='table table-borderless'>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th style={{width: 200, textAlign: "center"}}>Quantity</th>
                            <th style={{width: 200, textAlign: "right"}}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className='prod-ctr'>
                                    <img src={cs} width="100%"/>
                                    <div className='details-ctr'>
                                        <p className='prod-name'>Cabernet Sauvignon</p>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>x1</td>
                            <td>
                                <p className='price'>₱{Number(1500).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='prod-ctr'>
                                    <img src={hr} width="100%"/>
                                    <div className='details-ctr'>
                                        <p className='prod-name'>Holiday Red</p>
                                    </div>
                                </div>
                            </td>
                            <td className='text-center'>x1</td>
                            <td>
                                <p className='price'>₱{Number(1300).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="">
                                <p className='total-price'><small>Total Amount</small> ₱{Number(3000).toLocaleString("en",{maximumFractionDigits: 2})}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='modal-buttons'>
                <button className='btn btn-link' onClick={handleCloseModal}>Close</button>
            </div>
        </div>
    }

    return(
        <Modal modalId='orderModal' open={modalShown} closeOnOverlayClick={false} showCloseIcon={false} onClose={handleCloseModal} styles={modalStyle}>
            {content}
        </Modal>
    )
}