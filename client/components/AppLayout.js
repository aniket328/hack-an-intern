import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Timestamp } from 'firebase/firestore';
import { setData } from '../store/appDataSlice'
import Footer from '../components/Footer'
import { setLoading } from '../store/loadingSlice';

const Loading = () => {
	return (
		<div>Loading...</div>
	)
}

const AppLayout = ({ children }) => {
  
	const loading = useSelector(state => state.loading.value)

	// console.log(loading)

    const dispatch = useDispatch()

    const [error, setError] = useState(false);

	useEffect(() => {
		console.log('use effect');
		console.log(loading);
		axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-data`)
			.then((res) => {
				const data = res.data;

				const userIdToName = {};

				data['user_portfolios'].forEach((user) => {
					userIdToName[user.id] = user.user_name;
				});

				data['userIdToName'] = userIdToName;

				// convert market prices to datetime
				data['market_prices'].forEach((price, idx) => {
					data['market_prices'][idx]['datetime'] = new Timestamp(
						price['datetime']['_seconds'],
						price['datetime']['_nanoseconds']
					).toDate();
				});

				// sorting the market prices
				data['market_prices'].sort(
					(price1, price2) => price1['datetime'] - price2['datetime']
				);

                let pending_buy_orders_total = 0
                data['pending_buy_orders'].forEach(order => pending_buy_orders_total += (order['price'] * order['quantity']))
                data['pending_buy_orders_total'] = pending_buy_orders_total
                
                let pending_sell_orders_total = 0
                data['pending_sell_orders'].forEach(order => pending_sell_orders_total += (order['price'] * order['quantity']))
                data['pending_sell_orders_total'] = pending_sell_orders_total

				// getting the current market price
				const x = data['market_prices'].at(-1);
				data['current_market_price'] = x['price'];

				// convert transaction to datetime
				data['transactions'].forEach((trans, idx) => {
					data['transactions'][idx]['datetime'] = new Timestamp(
						trans['datetime']['_seconds'],
						trans['datetime']['_nanoseconds']
					).toDate();
				});

				// sorting the market prices
				data['transactions'].sort(
					(trans1, trans2) => -(trans1['datetime'] - trans2['datetime'])
				);

				dispatch(setData(data));

				dispatch(setLoading(false))
			});
	}, []);
    
  
    return (
        <div>
            <NavBar />
            {/* { loading ? children : <Loading /> } */}
            { children }
			<Footer />
        </div>
  )
}

export default AppLayout