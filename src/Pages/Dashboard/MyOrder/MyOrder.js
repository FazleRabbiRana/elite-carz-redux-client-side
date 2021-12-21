import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';
import { deleteOrder } from '../../../redux/slices/ordersSlice';

// initialize Swal (sweet alert)
const MySwal = withReactContent(Swal);

const MyOrder = ({ order, myOrders, setMyOrders, index }) => {
	const { name, image, price } = order?.orderedProduct;
	const dispatch = useDispatch();

	// handle remove order
	const handleRemoveOrder = id => {
		// return if already completed order
		if (order?.status.toLowerCase() === 'shipped') {
			MySwal.fire({
				icon: 'warning',
				title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Can't remove.</span>`,
				html: `<p class="text-sm">Order already completed!</p>`,
				confirmButtonText: `OK`,
				buttonsStyling: false,
				customClass: {
					confirmButton: 'btn-regular py-2',
				},
			});
			return;
		}

		// process remove order
		MySwal.fire({
			icon: 'warning',
			title: 'Are you sure?',
			html: `<span class="text-sm">You won't be able to revert this!</span>`,
			confirmButtonText: 'Yes, delete',
			showCancelButton: true,
			buttonsStyling: false,
			customClass: {
				confirmButton: 'btn-regular bg-red-500 py-2 mr-4',
				cancelButton: 'btn-regular py-2',
			},
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deleteOrder(id))
					.unwrap()
					.then(res => {
						if (res.deletedCount) {
							const remaining = myOrders.filter(order => order._id !== id);
							setMyOrders(remaining);
							MySwal.fire({
								icon: 'success',
								title: `<span class="inline-block font-medium text-xl md:text-2xl tracking-normal md:tracking-normal leading-normal md:leading-normal">Order DELETED successfully!</span>`,
								confirmButtonText: `OK`,
								buttonsStyling: false,
								customClass: {
									confirmButton: 'btn-regular py-2',
								},
							});
						}
					})
					.catch(err => console.log(err))
			}
		});
	};

	// initialize aos plugin
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div 
			className="single-order-block bg-gray-100 group sm:flex sm:flex-nowrap sm:items-center justify-between lg:max-w-xl"
			data-aos="fade-up" 
			data-aos-duration="700" 
			data-aos-delay={`${index * 100 + 50}`}
			data-aos-once="true"
			data-aos-anchor-placement="top-bottom"
		>
			<div className="flex-grow flex flex-nowrap">
				<div className="image flex-shrink-0 w-20 sm:w-28 md:w-36 overflow-hidden">
					<img src={image} alt={name} className="w-full h-full object-cover object-center" />
				</div>
				<div className="flex-grow py-1 px-2 font-my-title text-sm md:text-base">
					<h4 className="font-normal text-base tracking-normal md:text-lg">{name}</h4>
					<p className="sm:block">&#36;{price}</p>
					<p className="sm:block">Status: {order?.status}</p>
				</div>
			</div>
			<div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end p-2 space-x-2 sm:space-x-0 sm:space-y-3">
				<button className="btn-regular w-20 py-1 px-4">
					Pay
				</button>
				<button
					onClick={() => handleRemoveOrder(order?._id)}
					className={`btn-regular py-1 px-4 w-20 bg-red-600 ${order?.status.toLowerCase() === 'shipped' && 'opacity-40'}`}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default MyOrder;
