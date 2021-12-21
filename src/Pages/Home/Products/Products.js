import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/slices/productsSlice';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const Products = () => { 
	const dispatch = useDispatch();
	const productsState = useSelector((state) => state.productsState);
	// const { products } = productsState;
	const [homeProducts, setHomeProducts] = useState([]);

	// load all products
	useEffect(() => {
		dispatch(getProducts())
			.unwrap()
			.then(res => setHomeProducts(res.slice(0, 6)))
			.catch(err => console.log(err))
	}, [dispatch]);

	return (
		<section id="home_products" className="py-16 md:py-20 bg-my-yellow-cream">
			<div className="container">
				<div className="text-center mb-12">
					<p className="uppercase font-medium text-gray-700 font-my-title text-sm tracking-widest mb-2 md:mb-3">Find Best Cars</p>
					<h2 className="text-4xl">Our Best Products</h2>
				</div>
				{productsState.getProductsStatus === 'pending' && <LoadingStatus />}
				<div className="products-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-4 md:gap-x-6 xl:gap-x-12">
					{
						homeProducts.map((product, index) => <ProductCard 
							key={product._id} 
							product={product} 
							index={index} 
						/>)
					}
				</div>
			</div>
		</section>
	);
};

export default Products;