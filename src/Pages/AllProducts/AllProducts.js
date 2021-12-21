import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/productsSlice';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';
import LoadingStatus from '../Shared/LoadingStatus/LoadingStatus';
import ProductCard from '../Shared/ProductCard/ProductCard';

const AllProducts = () => {
	const dispatch = useDispatch();
	const productsState = useSelector((state) => state.productsState);
	// const { products } = productsState;
	const [allProducts, setAllProducts] = useState([]);

	// load all products
	useEffect(() => {
		dispatch(getProducts())
			.unwrap()
			.then(res => {
				// console.log(res);
				setAllProducts(res);
			})
	}, [dispatch]);

	return (
		<>
			<HeaderNavbar />
			<main id="all_products_page" className="all-products-page pt-16 md:pt-20">
				<section id="all_products" className="py-8 lg:py-12">
					<div className="text-center mb-8">
						<h2 className="text-4xl">Our Products</h2>
					</div>
					{productsState.getProductsStatus === 'pending' && <LoadingStatus />}
					<div className="container">
						<div className="products-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-4 md:gap-x-6 xl:gap-x-12">
							{allProducts.map((product, index) => <ProductCard 
								key={product._id} 
								product={product} 
								index={index} 
							/>)}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default AllProducts;
