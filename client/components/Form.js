import { TextInput, Checkbox, Button, Group, Box,Select,Stack ,Space, MantineProvider,NumberInput} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons'
import { setData } from '../store/appDataSlice'
import { showNotification, hideNotification } from '@mantine/notifications';
import { Timestamp } from 'firebase/firestore'

function Form() {

	const appData = useSelector(state => state.appData.data)

	const [orderType, setOrderType] = useState('limit')
	const dispatch = useDispatch()

	const submitValues = async (values) => {

		// console.log(values)
		// validate the quantity > 0, price > 0
		// if (quantity <= 0 || price <= 0) {
			
		// 	showNotification({
		// 		id: 'invalid-input',
		// 		title: 'invalid input',
		// 		message: 'Hey there, invalid input! 🤥',
		// 		// loading: true
		// 	})

		// 	return
		// }

		showNotification({
			id: 'adding-order-notif',
            title: 'Adding your order',
            message: 'Hey there, adding your order! 🤥',
			loading: true
		})

		const reqBody = {
			user_id: values.user_id,
			order_type: values.order_type, 
			quantity: values.quantity,
			price: values.price
		}

		try {
			
			const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${values.mode}`, reqBody)
		
			console.log(res.status)
			console.log(res.data)

			hideNotification('adding-order-notif')

			if (res.status >= 200 && res.status < 300) {
				
				showNotification({
					id: 'added-order-notif',
					title: 'Added your order',
					message: 'Hey there, added your order! 🤥',
					icon: <IconCheck />
					// loading: true
				})

				// fetch data
				axios
					.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-data`)
					.then(res => {
					const data = res.data
			
					// // extracting the list of user names
					// data['user_portfolios'].forEach(price)
			
					// convert market prices to datetime
					data['market_prices'].forEach((price, idx) => {
						data['market_prices'][idx]['datetime'] = (new Timestamp(price['datetime']['_seconds'], price['datetime']['_nanoseconds'])).toDate()
					})
			
					// sorting the market prices
					data['market_prices'].sort((price1, price2) => (price1['datetime'] - price2['datetime']))
					
					let pending_buy_orders_total = 0
					data['pending_buy_orders'].forEach(order => pending_buy_orders_total += (order['price'] * order['quantity']))
					data['pending_buy_orders_total'] = pending_buy_orders_total
					
					let pending_sell_orders_total = 0
					data['pending_sell_orders'].forEach(order => pending_sell_orders_total += (order['price'] * order['quantity']))
					data['pending_sell_orders_total'] = pending_sell_orders_total

					// getting the current market price
					const x = data['market_prices'].at(-1)
					data['current_market_price'] = x['price']
					
					// convert transaction to datetime
					data['transactions'].forEach((trans, idx) => {
						data['transactions'][idx]['datetime'] = (new Timestamp(trans['datetime']['_seconds'], trans['datetime']['_nanoseconds'])).toDate()
					})
			
					// sorting the market prices
					data['transactions'].sort((trans1, trans2) => -(trans1['datetime'] - trans2['datetime']))
					
			
					dispatch(setData(data))
				})
					
			} else {
				
				showNotification({
					id: 'failed-order-notif',
					title: 'Failed to add your order',
					message: res.data,
					icon: <IconX />
					// loading: true
				})

			}

		} catch (e) {
			console.log(e.response.data)
			showNotification({
				id: 'failed-order-notif',
				title: 'Failed to add your order',
				message: e.response.data,
				icon: <IconX />
				// loading: true
			})
		}

	}

	const form = useForm({
		initialValues: {
			mode: 'buy',
			user_id: null,
			order_type: 'limit',
			quantity: 0,
			price: 0
		}
	});

	return (
		<div className="font-poppins text-2xl font-bold rounded-3xl bg-gray-800 border-[1px] w-3/4 p-5">
			{/* {orderType} */}

			<div className='mb-4 text-2xl font-medium text-center '>Add Order</div>

			<Box className='px-10' mx="auto">
				<form onSubmit={form.onSubmit((values) => submitValues(values))}>
					<Stack
						spacing="xs"
						sx={(theme) => ({
							backgroundColor:
								theme.colorScheme === 'dark' ? '#00000' : theme.colors.gray[0],
							height: 220,
						})}
					>
						<Select
							label=""
							// placeholder="Buy"
							data={[
								{ value: 'buy', label: 'Buy' },
								{ value: 'sell', label: 'Sell' },
							]}
							{...form.getInputProps('mode')}
						/>
						<Select
							label=""
							placeholder="Select User"
							data={appData['user_portfolios'].map((portfolio) => ({
								value: portfolio.id,
								label: portfolio.user_name,
							}))}
							{...form.getInputProps('user_id')}
						/>
						<Select
							label=""
							placeholder="Order Type"
							// onChange={(e) => {
							// 	console.log(e)
							// }}
							// ={setOrderType}
							data={[
								{ value: 'Limit', label: 'Limit' },
								{ value: 'Market', label: 'Market' },
							]}
							{...form.getInputProps('order_type')}
						/>
						<div style={{ display: 'flex' }}>
							<NumberInput
								placeholder="Quantity"
								label=""
								defaultValue={0}
								withAsterisk
								type="number"
								{...form.getInputProps('quantity')}
							/>
							<Space w="md" />
							<NumberInput
								placeholder="At price"
								label=""
								defaultValue={0}
								withAsterisk
								type="number"
								{...form.getInputProps('price')}
							/>
						</div>

						<MantineProvider theme={{ primaryShade: { dark: 8 } }}>
							<Group position="center">
								<Button
									type="submit"
									variant="filled"
									color="blue"
									fullWidth
									className="bg-[#0c8ce9]"
									// className="bg-[#21e185]"
								>
									Place Order
								</Button>
							</Group>
						</MantineProvider>
					</Stack>
				</form>
			</Box>
		</div>
	);
}

export default Form;


{/* <form onSubmit={
	form.onSubmit((values) => console.log(values))}>
				
					
			</form> */}