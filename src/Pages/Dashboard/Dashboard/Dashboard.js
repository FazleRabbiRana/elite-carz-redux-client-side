import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import logo from '../../../logo.svg';
import useAuthContexts from '../../../hooks/useAuthContexts';
import {
	RiDashboardFill,
	RiShoppingCartFill,
	RiMessage2Fill,
	RiSecurePaymentFill,
	RiFileEditFill,
	RiListUnordered,
	RiPlayListAddFill,
	RiUserAddFill,
	RiHome8Fill,
	RiLogoutBoxLine,
} from 'react-icons/ri';

const Dashboard = () => {
	const { user, isAdmin, logOut } = useAuthContexts();

	return (
		<>
			<header className="dashboard-header navbar static">
				<div className="px-4 w-full flex items-center justify-between">
					<div className="logo-wrapper flex-shrink-0 w-28 md:w-36">
						<Link to="/">
							<img src={logo} alt="Elite Carz logo" className="w-full" />
						</Link>
					</div>
					<h2 className="flex-grow pl-8 truncate text-gray-400 text-right md:text-center sm:text-lg tracking-normal md:text-xl lg:text-2xl">
						{user?.displayName}
					</h2>
				</div>
			</header>
			<div className="dashboard-wrapper bg-my-yellow-cream min-h-vh-50 flex flex-nowrap space-x-2 md:space-x-4 xl:space-x-10 py-4 lg:py-8">
				<div className="dashboard-sidebar flex-shrink-0 bg-white shadow-my-around py-4 lg:py-8 px-2 lg:px-4 xl:px-6">
					<ul className="dashboard-menu flex flex-col -mt-2">
						<li className="border-b">
							<NavLink
								to="/"
								title="Home"
								className="dashboard-menu-link"
							>
								<span className="text-2xl">
									<RiHome8Fill />
								</span>
								<span className="hidden md:block pl-3">Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="home"
								title="Dashboard home"
								className="dashboard-menu-link"
							>
								<span className="text-2xl">
									<RiDashboardFill />
								</span>
								<span className="hidden md:block pl-3">Dashboard</span>
							</NavLink>
						</li>
						{!isAdmin && (
							<>
								<li className="border-t">
									<NavLink
										to="my-orders"
										title="My orders"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiShoppingCartFill />
										</span>
										<span className="hidden md:block pl-3">My Orders</span>
									</NavLink>
								</li>
								<li className="border-t">
									<NavLink
										to="add-review"
										title="Review"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiMessage2Fill />
										</span>
										<span className="hidden md:block pl-3">Review</span>
									</NavLink>
								</li>
								<li className="border-t">
									<NavLink
										to="pay"
										title="Pay"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiSecurePaymentFill />
										</span>
										<span className="hidden md:block pl-3">Pay</span>
									</NavLink>
								</li>
							</>
						)}
						{isAdmin && (
							<>
								<li className="border-t">
									<NavLink
										to="manage-all-orders"
										title="Manage all orders"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiFileEditFill />
										</span>
										<span className="hidden md:block pl-3">
											Manage All Orders
										</span>
									</NavLink>
								</li>
								<li className="border-t">
									<NavLink
										to="manage-products"
										title="Manage products"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiListUnordered />
										</span>
										<span className="hidden md:block pl-3">
											Manage Products
										</span>
									</NavLink>
								</li>
								<li className="border-t">
									<NavLink
										to="add-product"
										title="Add a product"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiPlayListAddFill />
										</span>
										<span className="hidden md:block pl-3">Add a Product</span>
									</NavLink>
								</li>
								<li className="border-t">
									<NavLink
										to="make-admin"
										title="Make admin"
										className="dashboard-menu-link"
									>
										<span className="text-2xl">
											<RiUserAddFill />
										</span>
										<span className="hidden md:block pl-3">Make Admin</span>
									</NavLink>
								</li>
							</>
						)}
						<li className="border-t">
							<button
								onClick={logOut}
								title="Logout"
								className="dashboard-menu-link"
							>
								<span className="text-2xl">
									<RiLogoutBoxLine />
								</span>
								<span className="hidden md:block pl-3">Logout</span>
							</button>
						</li>
					</ul>
				</div>
				<div className="dashboard-content flex-grow bg-white shadow-my-around py-4 lg:py-8 px-2 lg:px-4 xl:px-6">
					<div className="lg:container m-0 lg:m-0 p-0 lg:p-0">
						<Outlet />
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Dashboard;
