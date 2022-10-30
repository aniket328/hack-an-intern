import React from 'react';
import { Table,Text } from '@mantine/core';
import { useSelector } from 'react-redux';

const USER_VALS = [
	{ name: 'User1', stock: 100, fiat: 5000 },
	{ name: 'User2', stock: 100, fiat: 5000 },
	{ name: 'User3', stock: 100, fiat: 5000 },
	{ name: 'User4', stock: 100, fiat: 5000 },
	{ name: 'User5', stock: 100, fiat: 5000 },
	{ name: 'User6', stock: 100, fiat: 5000 },
	{ name: 'User7', stock: 100, fiat: 5000 },
	{ name: 'User8', stock: 100, fiat: 5000 },
	{ name: 'User9', stock: 100, fiat: 5000 },
	{ name: 'User10', stock: 100, fiat: 5000 },
];
const UserPortFolio = () => {

	const appData = useSelector(state => state.appData.data)

	const rows = appData['user_portfolios'].map((element) => {
		console.log(element)
		return (<tr key={element.id}>
			<td>{element.user_name}</td>
			<td>{element.stocks}</td>
			<td>{element.fiat}</td>
		</tr>)
});
	return (
		<div className="font-poppins rounded-3xl bg-gray-800 p-5 mx-40 my-8 text-center justify-center">
			<h6 className="text-3xl font-medium mb-10 text-center">User Portfolio</h6>
			<div className='flex justify-center'>
			<Table highlightOnHover verticalSpacing ="md">
				<thead>
					<tr>
					
						<th><Text align="center">Name</Text></th>
						<th><Text align="center">Stock</Text></th>
						<th><Text align="center">Fiat</Text></th>
					
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			</div>
		</div>
	);
};

export default UserPortFolio;
