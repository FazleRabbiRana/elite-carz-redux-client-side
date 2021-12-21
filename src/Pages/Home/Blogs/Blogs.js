import React, { useEffect, useState } from 'react';
import BlogCard from '../../Shared/BlogCard/BlogCard';
import blogBg from '../../../images/bg/bg-3.jpg';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../../../redux/slices/blogsSlice';

const Blogs = () => {
	const dispatch = useDispatch();
	const blogsState = useSelector((state) => state.blogsState);
	const [homeBlogs, setHomeBlogs] = useState([]);

	// load all blogs
	useEffect(() => {
		dispatch(getBlogs())
			.unwrap()
			.then(res => {
				// console.log(res);
				setHomeBlogs(res.slice(0, 3));
			})
			.catch(err => console.log(err))
	}, [dispatch]);

	// blog section bg
	const bgImg = {
		backgroundImage: `url(${blogBg})`,
	}

	return (
		<section id="home_blogs" className="py-16 md:py-20 bg-no-repeat bg-cover bg-center bg-gray-900 bg-opacity-50 bg-blend-overlay" style={bgImg}>
			<div className="container">
				<div className="text-center mb-12">
					<p className="uppercase font-medium text-white font-my-title text-sm tracking-widest mb-2 md:mb-3">Articles from blog</p>
					<h2 className="text-my-primary text-4xl">Read Our Articles</h2>
				</div>
				{blogsState.getBlogsStatus === 'pending' && <LoadingStatus />}
				<div className="blogs-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 sm:gap-x-6 xl:gap-x-10">
					{
						homeBlogs.map((blog, index) => <BlogCard key={blog._id} blog={blog} index={index} />)
					}
				</div>
			</div>
		</section>
	);
};

export default Blogs;