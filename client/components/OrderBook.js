import React from 'react'
import { Table,Grid,Col } from '@mantine/core';
import { useSelector } from 'react-redux';



const OrderBook = () => {


    // const rows = BUY_VALS.map((element) => (
	// 		<tr key={element.quantity}>
	// 			<td>{element.quantity}</td>
	// 			<td>{element.price}</td>
				
	// 		</tr>
	// ));
	const data = useSelector((state) => state.appData.data)
	console.log(typeof data)
	
	
	const brows = data['pending_buy_orders'].slice(0, 3).map((element) => (
		// console.log('element')
		// console.log(element)
		<tr key={element['id']}>
			<td>{element['quantity']}</td>
			<td>{element['price']}</td>
		</tr>
	));

	const srows = data['pending_sell_orders'].slice(0, 3).map((element) => (
		<tr key={element['id']}>
			<td>{element['quantity']}</td>
			<td>{element['price']}</td>
		</tr>
	));
  return (
		<div className='font-poppins font-bold rounded-3xl bg-gray-800 border-[1px] w-3/4 p-8 h-[45vh]'>
				<h6 className = 'text-2xl font-medium text-center mb-4'>Order Book</h6>
			<Grid>
				<Col span={6}>
				  <h6 className = 'text-base font-bold text-cyanBlue'>Buy</h6>
				  <div className=''>
					<Table  horizontalSpacing='xs'>
						<thead>
							<tr className = 'text-base'>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody className = 'font-medium'>{brows}</tbody>
					  </Table>
					</div>
				</Col>
				<Col span={6}>
					<h6 className = 'text-base font-bold text-purple'>Sell</h6>
					<Table horizontalSpacing='xs'>
						<thead>
							<tr className = 'text-base'>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody className = 'font-medium'>{srows}</tbody>
					</Table>
			  </Col>
			  <Col span={6}>
					
					<Table horizontalSpacing='xs' verticalSpacing='xs'>
						<thead>
							<tr className = 'text-base'>
								<th>Total</th>
								<th>{ data['pending_buy_orders_total'] }</th>
							</tr>
						</thead>
					</Table>
			  </Col>
			  <Col span={6}>
					
					<Table horizontalSpacing='xs' verticalSpacing='xs'>
						<thead>
							<tr className = 'text-base'>
								<th>Total</th>
								<th>{ data['pending_sell_orders_total'] }</th>
							</tr>
						</thead>
					</Table>
			  </Col>
			  
			</Grid>
		</div>
	);
}

export default OrderBook