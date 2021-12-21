import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../redux/slices/blogsSlice';
import BlogCard from '../Shared/BlogCard/BlogCard';
import Footer from '../Shared/Footer/Footer';
import HeaderNavbar from '../Shared/Header/HeaderNavbar/HeaderNavbar';
import LoadingStatus from '../Shared/LoadingStatus/LoadingStatus';

const AllBlogs = () => {
	const dispatch = useDispatch();
	const blogsState = useSelector((state) => state.blogsState);
	const { blogs } = blogsState;

	// load all blogs
	useEffect(() => {
		dispatch(getBlogs());
	}, [dispatch]);

	return (
		<>
			<HeaderNavbar />
			<main id="all_blogs_page" className="all-blogs-page pt-16 md:pt-20">
				<section id="all_blogs" className="py-8 lg:py-12 bg-true-gray-100 bg-opacity-50">
					<div className="text-center mb-8">
						<h2 className="text-4xl">Our Blogs</h2>
					</div>
					{blogsState.getBlogsStatus === 'pending' && <LoadingStatus />}
					<div className="container">
						<div className="blogs-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 xl:gap-x-10">
						{
							blogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} />)
						}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default AllBlogs;