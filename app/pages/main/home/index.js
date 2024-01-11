import React, { useEffect, useState } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import sec2_img from '../../../images/sec2_img.jpg'
import sec5_img from '../../../images/sec5_img.jpg'
import desc_ic from '../../../images/desc_ic.png'
import moment from 'moment';
import Slider from 'react-slick';
import News from '../../../components/News';

export default function Index(props) {

    const history = browserHistory

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        <div id='home'>
            <div className='sec1'>
                <div className='container'>
                    <div className='intro-box'>
                        <h1>Make pour decisions.</h1>
                        <p>For people who want to enjoy their wine – and feel good about it.</p>
                        <button className='btn btn-block primary-btn outlined'>Learn More</button>
                    </div>
                </div>
            </div>
            <div className='sec2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>Who we are</h6>
                                    <h1>About Wine Time</h1>
                                    <h3>We believe you should know what’s actually in each glass of wine you drink. At Wine Time we share what’s in each bottle, from sugar content to calories and carbs consumed – everything in between.</h3>
                                </div>
                                <p>Wine Time was born around a table with friends and family looking for an alternative to other wines that fit our lifestyles. From there it grew as we found more and more people were looking for wines that were a better fit for their lifestyle, whatever that fit might be.</p>
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <div className='img-ctr'>
                                <img src={sec2_img} width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>Our Benefits</h6>
                                    <h1>Why Wine Time?</h1>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <ul className='desc-ctr'>
                                <li>
                                    <div className='ic-ctr'>
                                        <img src={desc_ic} width="100%"/>
                                    </div>
                                    <div className='desc-box'>
                                        <h3>Less is more.</h3>
                                        <p>It’s easy. In an average analysis per 5oz glass against the top 10 wine brands in the US, Wine Time has significantly less sugar. And we do it all without flavor additives and sacrificing flavor.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='ic-ctr'>
                                        <img src={desc_ic} width="100%"/>
                                    </div>
                                    <div className='desc-box'>
                                        <h3>A better fit</h3>
                                        <p>Wine Times are gluten-free and vegan for those looking for a wine that encourages and fits life choices, however they live.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='ic-ctr'>
                                        <img src={desc_ic} width="100%"/>
                                    </div>
                                    <div className='desc-box'>
                                        <h3>No compromises</h3>
                                        <p>Wine Times are full-bodied and full-flavored without sacrificing alcohol through our proprietary process.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>We want you to love our wines</h6>
                                    <h1>For a great tasting, no nonsense wine.</h1>
                                    <h3>60-day, 100% Money-Back Guarantee</h3>
                                </div>
                                <p>If for any reason you aren’t satisfied with your purchase, return all unopened bottles within 60 days for a 100% refund on your entire purchase. Plus, we pay 100% of return shipping costs.</p>
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <div className='img-ctr'>
                                <img src={sec5_img} width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec6'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-4 mb-3 mb-lg-0'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>Everything you want to know</h6>
                                    <h1>Latest News</h1>
                                    <button className='btn primary-btn outlined'>View All Articles</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-8'>
                            <News/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}