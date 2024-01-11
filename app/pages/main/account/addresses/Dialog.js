import React from 'react'
import Modal from 'react-responsive-modal'
import Select from 'react-select'

const modalStyle = {
    modal: {
        padding: 0,
        background: 'none',
        width: "100%",
        maxWidth: 500,
        margin: "auto"
    }
}

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

    let content = null
    
    if(modalType == 2){
        content = <div className="modal-content">
            <p className="modal-title">Delete Address</p>
            <p className="modal-description">Are you sure you want to delete this address ?</p>
            <div className='modal-buttons'>
                <button className='btn btn-link' onClick={handleCloseModal}>Cancel</button>
                <button className='btn primary-btn'>Delete</button>
            </div>
        </div>
    }else{
        content = <div className="modal-content">
            <p className="modal-title">{modalType==0?"Add":"Edit"} Address</p>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            placeholder='First Name'/>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            placeholder='Last Name'/>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <input type="text"
                    className='form-control'
                    placeholder='Address 1'/>
            </div>
            <div className='form-group'>
                <input type="text"
                    className='form-control'
                    placeholder='Address 2'/>
            </div>
            <div className='form-group'>
                <Select options={[]} styles={selectStyles} placeholder="Province"/>
            </div>
            <div className='form-group'>
                <Select options={[]} styles={selectStyles} placeholder="City"/>
            </div>
            <div className='form-group'>
                <input type="text"
                    className='form-control'
                    placeholder='Postal/ZIP Code'/>
            </div>
            <div className='form-group'>
                <input type="text"
                    className='form-control'
                    placeholder='Phone'/>
            </div>
            <div className='modal-buttons'>
                <button className='btn btn-link' onClick={handleCloseModal}>Cancel</button>
                <button className='btn primary-btn'>{modalType==0?"Submit":"Update"}</button>
            </div>
        </div>
    }

    return(
        <Modal modalId='modalWithForm' open={modalShown} closeOnOverlayClick={false} showCloseIcon={false} onClose={handleCloseModal} styles={modalStyle}>
            {content}
        </Modal>
    )
}