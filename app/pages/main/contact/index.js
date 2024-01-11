import React, { useEffect } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';

export default function Index(props) {

    const history = browserHistory

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        <div id='contact'>
            <div className='sec1'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>Feel free to contact us</h6>
                                    <h1>Let's Connect</h1>
                                    <h3>Looking for a better wine-life balance? We're here to help.</h3>
                                </div>
                                <a href="javascript:void(0)">Facebook</a>
                                <a href="javascript:void(0)">Instagram</a>
                                <a href="javascript:void(0)">Pinterest</a>
                                <a href="javascript:void(0)">Tiktok</a>
                                <button className='btn btn-block primary-btn'>Find Wine Time Store</button>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    <div className='contact-box'>
                                        <h5>Customer Service</h5>
                                        <a href="javascript:void(0)">mail@winetime.com</a>
                                    </div>
                                    <div className='contact-box'>
                                        <h5>Media Inquiries</h5>
                                        <a href="javascript:void(0)">press@winetime.com</a>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6'>
                                    <div className='contact-box'>
                                        <h5>Wine Timery</h5>
                                        <p>8418 S. Lac Jac Ave Parlier, CA 93648</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h1>Send us a message</h1>
                                    <p>Our customers are important to us. We focus on quality products full of flavor and our customers are the judge of that. So let us know how we're doing or feel free to ask a question, we're ready to help.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <div className='form-ctr'>
                                <div className='form-group'>
                                    <input type="text" className='form-control' placeholder='Name'/>
                                </div>
                                <div className='form-group'>
                                    <input type="text" className='form-control' placeholder='Email'/>
                                </div>
                                <div className='form-group'>
                                    <input type="text" className='form-control' placeholder='Phone'/>
                                </div>
                                <div className='form-group'>
                                    <textarea rows={5} className='form-control' placeholder='Message'/>
                                </div>
                                <button className='btn btn-block primary-btn outlined'>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}