import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import icon from '../images/icon.png'
import { ToastContainer } from 'react-toastify';

function App(props) {

	const [isLoaded, setLoadState]=useState(false)

	useEffect(()=>{
		setLoadState(true)
	},[])

	let content = null
	
	if(isLoaded){
		content = props.children
	}else{
		content = <div style = {styles.pre_loader}>
			
				</div>
	}

	return (
		<>
			<Helmet
				meta={[
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				]}>
				<link rel="icon" href={icon} />
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
				<title>Wine Time</title>
			</Helmet>
			{content}
			<ToastContainer/>
		</>
	)
}

export default App;

const styles = {
	pre_loader:{
		background: "#72b1e9",
		backgroundSize: "cover",
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	}
}
