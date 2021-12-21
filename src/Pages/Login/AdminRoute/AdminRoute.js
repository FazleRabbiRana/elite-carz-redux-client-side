import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const AdminRoute = ({ children }) => {
	const { user, isAdmin, isLoading } = useAuthContexts();
	const location = useLocation();
	
	if (isLoading) {
		return <LoadingStatus />;
	}

	if (user.email && isAdmin) {
		return children;
	}
	
	return <Navigate to="/dashboard/home" state={{ from: location }} />;
};

export default AdminRoute;