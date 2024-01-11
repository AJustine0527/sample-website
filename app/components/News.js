import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Slider from 'react-slick';

export default function News(props){

    const [visibleSlides, setVisibleSlides] = useState(2)

    useEffect(()=>{
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize)
        };
    },[])

    const handleWindowResize = () => {
        if (window) {
            let slides = 2
            if (window.innerWidth < 768) {
                slides = 1
            }else{
                slides = 2
            }
            setVisibleSlides(slides)
        }
    }

    let sliderSettings = {
        dots: false,
        dotsClass: "thumbs",
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: visibleSlides,
        slidesToScroll: 1
    };


    const news = [
        {
            date: moment(),
            title: "Roberta's Bitchin' Kitchen | Episode Two with Mike Cooking Sea Scallops",
            desc: "In episode 2 of Roberta's Bitchin' Kitchen, @RobertasBitchinKitchen shows her friend Mike how to cook sea scallops with fresh thyme over a sweet pea basil pureé."
        },
        {
            date: moment().subtract(1,"day"),
            title: "At Home Circuit Workout with Dannah Eve",
            desc: "Finding time for yourself can be hard. That's why Dannah Eve is here to help guide us all on a 30 minute HIIT workout that you can do at home."
        },
        {
            date: moment().subtract(2,"day"),
            title: "Roberta's Bitchin' Kitchen | Episode Two with Mike Cooking Sea Scallops",
            desc: "In episode 2 of Roberta's Bitchin' Kitchen, @RobertasBitchinKitchen shows her friend Mike how to cook sea scallops with fresh thyme over a sweet pea basil pureé."
        }
    ]

    return (
        <div className='news-ctr'>
            <Slider {...sliderSettings}>
                {
                    news.map((item, index) => {
                        return (
                            <div className='px-3' key={index}>
                                <div className='news-box'>
                                    <h6>{moment(item.date).format("MMMM DD, YYYY")}</h6>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}