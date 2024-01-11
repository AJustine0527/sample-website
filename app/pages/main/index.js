import React from 'react';
import _ from "lodash"
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Index(props) {

    return (
        <div id="site">
            <Header {...props}/>
            {props.children}
            <Footer/>
        </div>
    )
}