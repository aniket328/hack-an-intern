import React from "react";
import PlotlyGraph from "./PlotlyGraph";
import { useSelector } from "react-redux";

const Graph = () => {
	
	const appData = useSelector(state => state.appData.data)
	
	if (appData == null) {
		return <Loading />
	}
	
	const currentMarketPrice = appData['current_market_price']

	// console.log('ooio')
	// console.log()

	// console.log(`current market price is ${currentMarketPrice}`)


	return (
		<div className="font-poppins font-bold rounded-3xl border-[1px] bg-[#0c8ce9] h-[45vh] w-3/4 p-5 overflow-hidden flex flex-col text-end">
			<p className="text-xs text-white">Current Market Price</p>
			<p className="text-4xl  text-white"> $ {currentMarketPrice}</p>
			<PlotlyGraph />
		</div>
	);
};

const Loading = () => {
	return (
		<div className='font-poppins font-bold rounded-3xl bg-[#9168e9] w-3/4 p-5 overflow-hidden flex flex-col text-end'>
			Loading...
		</div>
	)
}

export default Graph;
