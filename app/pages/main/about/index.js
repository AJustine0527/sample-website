import React, { useEffect } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash';
import sec3_img from '../../../images/sec3_img.jpg'
import sec5_img from '../../../images/sec5_img.jpg'
import desc_ic from '../../../images/desc_ic.png'
import News from '../../../components/News';

export default function Index(props) {

    const history = browserHistory

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const handleViewAll=()=>{
        history.push('/all-products')
    }

    return (
        <div id='about'>
            {/* <div className='sec1'>
                <div className='container'>
                    <div className='heads'>
                        <h6>Watch Video</h6>
                        <h1>About our wines</h1>
                    </div>
                </div>
            </div> */}
            <div className='sec2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>Our Process</h6>
                                    <h1>Extended fermentation</h1>
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
                                        <h3>Ferment to dry</h3>
                                        <p>This allows us to lower sugar levels, so each bottle of wine has less than 1 gram of sugar.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='ic-ctr'>
                                        <img src={desc_ic} width="100%"/>
                                    </div>
                                    <div className='desc-box'>
                                        <h3>Proprietary process</h3>
                                        <p>Our process takes out more tannins, sugars, and histamines.</p>
                                        <p>Our still wines average less than 1 gram of sugar per liter or less than 0.09 grams of sugar per 5oz glass. Our still wines have less sugar in an entire bottle than what is in one 5oz glass of the top 10 wine brands in the US.</p>
                                    </div>
                                </li>
                                <li>
                                    <div className='ic-ctr'>
                                        <img src={desc_ic} width="100%"/>
                                    </div>
                                    <div className='desc-box'>
                                        <h3>Filtration</h3>
                                        <p>We use the latest technology in cross-flow filtration, triple filtering our wines. This process keeps our wines gluten-free and vegan friendly.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-lg-6 mb-3 mb-lg-0'>
                            <div className='details-ctr'>
                                <div className='heads'>
                                    <h6>The Team</h6>
                                    <h1>Who we are</h1>
                                    <h3>Wine Time was made for those looking for great tasting wines that fit their lifestyle.</h3>
                                </div>
                                <p>What started as an idea quickly took off among friends, family, and others. Wine Time is for those who were looking for wines that were a better fit for their lifestyle, whatever that fit might be.</p>
                                <button className='btn primary-btn' onClick={handleViewAll}>View all wines</button>
                            </div>
                        </div>
                        <div className='col-12 col-lg-6'>
                            <div className='img-ctr'>
                                <img src={sec3_img} width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sec4'>
                <div className='container'>
                    <div className='details-ctr'>
                        <div className='heads'>
                            <h6>Get to know our wines</h6>
                            <h1>Nutritional Breakdown</h1>
                        </div>
                        <p>Below is a nutritional breakdown, per 5oz glass, for each of our amazing wines. We focus on crafting clean, great tasting wines with significantly less sugar, fewer sulfites, and no flavor additives without lowering alcohol.</p>
                    </div>
                </div>
            </div>
            <div className='sec5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h1>Red Wines</h1>
                            <ul>
                                <li><a href='javascript:void(0)'>Cabernet Sauvignon</a> average analysis per 5oz glass: 0.12g of sugar, 121 calories, 4.8g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Holiday Red</a> average analysis per 5oz glass: 0.01g of sugar, 120 calories, 3.5g of carbohydrates, 13.9% alcohol</li>
                                <li><a href='javascript:void(0)'>Pinot Noir</a> average analysis per 5oz glass: 0.08g of sugar, 119 calories, 4.6g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Red Blend</a> average analysis per 5oz glass: 0.13g of sugar, 121 calories, 4.8g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Rosé</a> average analysis per 5oz glass: 0.10g of sugar, 110 calories, 2.9g of carbohydrates, 12.5% alcohol</li>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            <h1>White Wines</h1>
                            <ul>
                                <li><a href='javascript:void(0)'>Cabernet Sauvignon</a> average analysis per 5oz glass: 0.12g of sugar, 121 calories, 4.8g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Holiday Red</a> average analysis per 5oz glass: 0.01g of sugar, 120 calories, 3.5g of carbohydrates, 13.9% alcohol</li>
                                <li><a href='javascript:void(0)'>Pinot Noir</a> average analysis per 5oz glass: 0.08g of sugar, 119 calories, 4.6g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Red Blend</a> average analysis per 5oz glass: 0.13g of sugar, 121 calories, 4.8g of carbohydrates, 13.5% alcohol</li>
                                <li><a href='javascript:void(0)'>Rosé</a> average analysis per 5oz glass: 0.10g of sugar, 110 calories, 2.9g of carbohydrates, 12.5% alcohol</li>
                            </ul>
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