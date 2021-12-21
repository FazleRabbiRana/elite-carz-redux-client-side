import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import MyOrder from '../MyOrder/MyOrder';
import { getOrders } from '../../../redux/slices/ordersSlice';

const MyOrders = () => {
	const dispatch = useDispatch();
	const ordersState = useSelector((state) => state.ordersState);
	const [myOrders, setMyOrders] = useState([]);
	const { user } = useAuthContexts();

	// load all orders by email 
	useEffect(() => {
		dispatch(getOrders(user?.email))
			.then(res => {
				setMyOrders(res.payload);
			})
			.catch(err => console.log(err))
	}, [dispatch, user?.email]);

	return (
		<section id="my_orders" className="my-orders">
			<div className="mb-6 flex flex-nowrap justify-between gap-4 lg:max-w-xl">
				<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none">
					My Orders <span className="text-gray-400">{myOrders?.length}</span>
				</h3>
				<Link to="/all-products" className='font-my-title text-lg leading-none border-b-2 border-my-primary transition hover:text-my-primary-dark'>
					Order More
				</Link>
			</div>
			{ordersState.getOrdersStatus === 'pending' && <LoadingStatus />}
			<div className="orders-wrapper flex flex-col space-y-4">
				{
					myOrders.map((order, index) => <MyOrder 
						key={order._id}
						order={order}
						myOrders={myOrders}
						setMyOrders={setMyOrders}
						index={index}
					/>)
				}
			</div>
		</section>
	);
};

export default MyOrders;