import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthContexts from '../../../../hooks/useAuthContexts';

const MainMenu = () => {
	const { user } = useAuthContexts();

	return (
		<ul className="main-menu-list">
			<li>
				<NavLink
					to="/"
					className="hover:text-my-primary"
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/all-products"
					className="hover:text-my-primary"
				>
					All Products
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/all-blogs"
					className="hover:text-my-primary"
				>
					All Blogs
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					className="hover:text-my-primary"
				>
					Contact
				</NavLink>
			</li>
			{user.email && (
				<li>
					<NavLink
						to="/dashboard/home"
						className="hover:text-my-primary"
					>
						Dashboard
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default MainMenu;
