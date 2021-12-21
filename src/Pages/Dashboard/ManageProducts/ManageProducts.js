import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuthContexts from '../../../hooks/useAuthContexts';
import { getProducts } from '../../../redux/slices/productsSlice';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import ManageProduct from '../ManageProduct/ManageProduct';

const ManageProducts = () => {
	const dispatch = useDispatch();
	const productsState = useSelector((state) => state.productsState);
	const [allProducts, setAllProducts] = useState([]);
	const { user } = useAuthContexts();

	// load all products
	useEffect(() => {
		dispatch(getProducts())
			.then(res => {
				// console.log(res);
				setAllProducts(res.payload);
			})
			.catch(err => console.log(err))
	}, [dispatch, user.email]);

	return (
		<section id="my_products" className="my-products">
			<h3 className="uppercase font-semibold text-lg lg:text-2xl leading-none lg:leading-none mb-6">Manage Products</h3>
			{productsState.getOrdersStatus === 'pending' && <LoadingStatus />}
			<div className="products-wrapper flex flex-col space-y-4">
				{
					allProducts.map((product, index) => <ManageProduct 
						key={product._id}
						product={product}
						allProducts={allProducts}
						setAllProducts={setAllProducts}
						index={index}
					/>)
				}
			</div>
		</section>
	);
};

export default ManageProducts;