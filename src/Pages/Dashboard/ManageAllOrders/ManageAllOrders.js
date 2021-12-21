import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/slices/ordersSlice';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import ManageOrderItem from '../ManageOrderItem/ManageOrderItem';

const ManageAllOrders = () => {
	const dispatch = useDispatch();
	const ordersState = useSelector((state) => state.ordersState);
	const [allOrders, setAllOrders] = useState([]);

	// load all orders
	useEffect(() => {
		dispatch(getOrders())
			.then(res => {
				setAllOrders(res.payload);
			})
			.catch(err => console.log(err))
	}, [dispatch]);

	return (
		<section id="manage_all_orders" className="manage-all-orders">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">Manage All Orders</h3>
			{ordersState.getOrdersStatus === 'pending' && <LoadingStatus />}
			<div className="orders-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-10 sm:gap-x-4 md:gap-y-6">
				{
					allOrders.map((order, index) => <ManageOrderItem 
						key={order._id}
						order={order}
						allOrders={allOrders}
						setAllOrders={setAllOrders}
						index={index}
					/>)
				}
				{/* {
					allOrders.map((order, index) => <div 
						key={order._id}
						order={order}
						allOrders={allOrders}
						setAllOrders={setAllOrders}
						index={index}
					>Order: {index}</div>)
				} */}
			</div>
		</section>
	);
};

export default ManageAllOrders;