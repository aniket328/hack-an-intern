import React from 'react'
import { Table } from '@mantine/core';
import { useSelector } from 'react-redux';


const UserPortFolio = () => {
	const data = useSelector((state) => state.appData.data);
    const rows = data['user_portfolios'].slice(0,5).map((element) => (
			<tr key={element.id}>
				<td>{element.user_name}</td>
				<td>{element.stocks}</td>
				<td>{element.fiat}</td>
			</tr>
		));
  return (
		<div className="font-poppins rounded-3xl bg-gray-800 w-3/4 p-5 border-[1px]">
			<h6 className="text-2xl font-medium text-center mb-4">User Portfolio</h6>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Stock</th>
						<th>Fiat</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</div>
	);
}

export default UserPortFolio