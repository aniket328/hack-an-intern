import React from 'react';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotlyGraph = () => {

	const appData = useSelector((state) => state.appData.data);

  // sort the time
  appData['market_prices']

	let x = [];
	let y = [];

	appData['market_prices'].forEach((element) => {
    console.log(element['datetime'])
		x.push(element['datetime']);
    console.log(typeof element['datetime'])
		y.push(element['price']);
	});
  console.log(x)
	var data = [
		{
			x: x,
			y: y,
			type: 'scatter',
			line: {color: '#fff'}
		},
	];
	return (
		<div className="">
			<Plot
				data={data}
				layout={{
					// plot_bgcolor: '#21e185',
					// paper_bgcolor: '#21e185',
					plot_bgcolor: '#0c8ce9',
					paper_bgcolor: '#0c8ce9',

					// plot_bgcolor: '#1A1B1E',
					// paper_bgcolor: '#1A1B1E',

					margin: { l: '0', r: '0', t: '0', b: '35' },
					width: '500',
					height: '200',
					modebar: { remove: [] },
				}}
				config = {{
					displayModeBar: false
				}}
			/>
		</div>
	);
};

export default PlotlyGraph;
