import React from 'react'
import Link from 'next/link'
import  { IoNotificationsSharp as NotificationIcon } from 'react-icons/io5'
import Transactions from './Transactions'
import { Select } from '@mantine/core'
import { useRouter } from 'next/router'
// import { useSelector, useDispatch } from 'react-redux'

const NavBar = () => {

    const router = useRouter()

    // const dispatch = useDispatch()

	const mode1 = (
		<div>
			
		</div>
	)

	const mode2 = (
		<div>

		</div>
	)

  return (
		<div className="w-full px-48 h-20 mb-4 mt-4 flex justify-between items-center font-mono ">
			<div
				className="text-white text-3xl font-black cursor-pointer" 
				onClick={(e) => {
					e.preventDefault();
					router.push('/');
				}}
			>
				<span>Stock</span><span className='hover:text-[#0c8ce9] transition duration-500'>Lift</span>
				<span className='text-[#888]'> - by Team Akatsuki</span>
			</div>
			<div className="flex space-x-4 items-center text-lg">
				{/* dowpdown */}
				<Select
					label=""
					className='focus:outline-none'
					placeholder="Select Page"
					onChange={(route) => router.push(route)}
					data={[
						{ value: '/', label: 'Dashboard', group: 'Dashboards' },
						{ value: '/orders', label: 'Orders', group: 'Tables' },
						{ value: '/userportfolio', label: 'User Portfolios', group: 'Tables' },
						{ value: '/update_user', label: 'Update User', group: 'User Operations' },
						{ value: '/add_user', label: 'Add User', group: 'User Operations' },
					]}
				/>
				{/* <Link href="/transactions"> */}
				{/* <div className='px-4 py-2 rounded-md transition duration-500 hover:bg-[#ffffff22] grid items-center'>
                    Transactions
                </div> */}
				<Transactions toShow="History" />
				{/* </Link> */}
				{/* <Link href="/notifications">  */}
				{/* <div className='px-4 text-2xl py-2 rounded-md transition duration-500 hover:bg-[#ffffff22] grid items-center'> */}
				<Transactions toShow={<NotificationIcon />} />
				{/* </div> */}
				{/* </Link> */}
			</div>
		</div>
	);
}

export default NavBar