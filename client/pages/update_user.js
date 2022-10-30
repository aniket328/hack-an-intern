import React from 'react'
import { TextInput, Checkbox, Button, Group, Box,Select,Stack ,Space, MantineProvider,NumberInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios'
// import { useSelector } from 'react-redux';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios'
import { useRouter } from 'next/router'
import { Notification } from '@mantine/core';
import { IconCheck, IconX, IconDatabase } from '@tabler/icons'
import { setData } from '../store/appDataSlice'
import { showNotification, hideNotification } from '@mantine/notifications';
import { Timestamp } from 'firebase/firestore'

const UpdateUser = () => {

	const router = useRouter()
	const dispatch = useDispatch()

	const submitValues = async (values) => {

		showNotification({
			id: 'updating-user-notif',
            title: 'Updating user',
            message: 'Hey there, updating user! 🤥',
			loading: true
		})

		const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update_user`, values);

		hideNotification('updating-user-notif')

		if (res.status >= 200 && res.status < 300) {
			
			showNotification({
				id: 'updated-user-notif',
				title: 'Updated user',
				message: 'Hey there, updated the user! 🤥',
				icon: <IconCheck />
				// loading: true
			})

			// update data
			showNotification({
				id: 'fetching-data',
				title: 'fetching updated data from server',
				message: 'hold on when we pull updated data from the server',
				loading: true
			})

			const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-data`)
			
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

			hideNotification('fetching-data')

			showNotification({
				id: 'data-loaded',
				title: 'updated data loaded from server',
				message: 'data loaded from server',
				icon: <IconCheck />
			})

			router.push('/')
				
		} else {
			
			showNotification({
				id: 'failed-update-notif',
				title: 'Failed to update the user',
				message: 'Hey there, failed to update the user! 🤥',
				icon: <IconX />
				// loading: true
			})

		}

	}
 
	const form2 = useForm({
		initialValues: {
			id: null,
			stocks: 0,
			fiat: 0
		},
	});

	const users = useSelector(state => state.appData.data)
	console.log('user portfolios: ')
	let userrs = []
	users['user_portfolios'].forEach(user => {
		userrs.push({
			value: user.id,
			label: user.user_name
		})
	})
	console.log(userrs)

	return (
		<div className="w-screen h-[85vh] flex px-56">
			{/* add user */}
			<div className='w-2/3 flex flex-col justify-center px-10 space-y-10'>
				<div className='text-5xl font-mono'>Update User</div>
			<form
				onSubmit={form2.onSubmit((values) => submitValues(values))}
			>
				<Stack
					spacing="xs"
					sx={(theme) => ({
						backgroundColor:
							theme.colorScheme === 'dark' ? '#00000' : theme.colors.gray[0],
						height: 220,
					})}
				>
					{/* <TextInput placeholder="name" label="Name" withAsterisk /> */}
					<Select
						label="User"
						data={userrs}
						onChange={(e) => console.log(e)}
						{...form2.getInputProps('id')}
					/>
					<Space w="md" />
					<NumberInput
						placeholder="stocks"
						label="Stocks"
						defaultValue={0}
						withAsterisk
						{...form2.getInputProps('stocks')}
					/>
					<Space w="md" />
					<NumberInput
						placeholder="fiat"
						label="Fiat"
						defaultValue={0}
						withAsterisk
						{...form2.getInputProps('fiat')}
					/>
					<Space w="xl" />

					<MantineProvider theme={{ primaryShade: { dark: 8 } }}>
						<Group position="center">
							<Button
								type="submit"
								variant="filled"
								color="blue"
								fullWidth
								className="bg-[#0c8ce9]"
							>
								Update User
							</Button>
						</Group>
					</MantineProvider>
				</Stack>
			</form>
			</div>
			<div className='right-pane right-pane-2 rounded-xl'>

			</div>
		</div>
	);
}
export default UpdateUser