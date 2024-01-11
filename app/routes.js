import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';
import App from './pages/app';

import Main from './pages/main/index'
import Home from './pages/main/home/index'
import About from './pages/main/about/index'
import Contact from './pages/main/contact/index'
import Products from './pages/main/products/index'
import ProductPreview from './pages/main/productPreview/index'
import Cart from './pages/main/cart/index'
import Login from './pages/main/login/index'
import Register from './pages/main/register/index'
import Account from './pages/main/account/index'
import Profile from './pages/main/account/profile/index'
import Addresses from './pages/main/account/addresses/index'
import Orders from './pages/main/account/orders/index'

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {

	return (
		<Route path="/" component={App}>
			<IndexRedirect to = "/main"/>
			<Route path="/main" component={Main}>
				<IndexRedirect to = "/home"/>
				<Route path="/home" component={Home} />
				<Route path="/about-us" component={About} />
				<Route path="/contact-us" component={Contact} />
				<Route path="/all-products" component={Products} />
				<Route path="/product/preview/:prodname" component={ProductPreview} />
				<Route path="/cart" component={Cart} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/account" component={Account}>
					<IndexRedirect to = "/account/profile"/>
					<Route path="/account/profile" component={Profile} />
					<Route path="/account/addresses" component={Addresses} />
					<Route path="/account/order-history" component={Orders} />
				</Route>
			</Route>
		</Route>
	);
};

