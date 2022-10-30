import React from 'react'
import { useState } from 'react';
import { Drawer, Button, Group ,Table} from '@mantine/core';
import UserPortFolio from './UserPortFolio';
import { useSelector } from 'react-redux';

const Transactions = ({ toShow }) => {

	const appData = useSelector(state => state.appData.data)
	const transactions = appData['transactions']

	console.log(transactions)
	console.log(appData['userIdToName'])
	
    const [opened, setOpened] = useState(false);
	
    const rows = transactions.map((element) => (
			<tr key={element.id}>
				<td>{element.buyer}</td>
				<td>{element.seller}</td>
				{/* <td>{appData['userIdToName'][element.buyer]}</td>
				<td>{appData['userIdToName'][element.seller]}</td> */}
				{/* <td>{appData['user_portfolios'][element.buyer]['name']}</td> */}
				<td>{element.quantity}</td>
				<td>{element.price}</td>
				{/* <td>{element.time}</td> */}
			</tr>
		));
		console.log(rows.length)
		
  return (
		<div>
			<Drawer position='right'
				className="overflow-scroll px-2"
				opened={opened}
				onClose={() => setOpened(false)}
				title="Transaction History"
				padding="xl"
				size="45%"
			>
				{
					<div>
						<Table>
							<thead>
								<tr>
									<th>Buyer</th>
									<th>Seller</th>
									<th>Quantity</th>
									<th>Price</th>
									{/* <th>Time</th> */}
								</tr>
							</thead>
							<tbody>{rows}</tbody>
						</Table>
					</div>
				}
			</Drawer>

			<Group position="right">
				<Button className = 'bg-[#0c8ce9]' color="#0c8ce9" onClick={() => setOpened(true)} > { toShow } </Button>
			</Group>
		</div>
	);
}

export default Transactions