import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuthContexts from '../../../hooks/useAuthContexts';
import LoadingStatus from '../../Shared/LoadingStatus/LoadingStatus';

const PrivateRoute = ({ children }) => {
	const { user, isLoading } = useAuthContexts();
	const location = useLocation();
	
	if (isLoading) {
		return <LoadingStatus />;
	}

	if (user.email) {
		return children;
	}

	return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;