import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import AllProducts from './Pages/AllProducts/AllProducts';
import AllBlogs from './Pages/AllBlogs/AllBlogs';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import ProductDetail from './Pages/ProductDetail/ProductDetail/ProductDetail';
import ScrollUpButton from "react-scroll-up-button";
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import StartFromTop from './Pages/Shared/StartFromTop/StartFromTop';
import Terms from './Pages/Terms/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import Contact from './Pages/Contact/Contact';
import 'aos/dist/aos.css';
import MyOrders from './Pages/Dashboard/MyOrders/MyOrders';
import AddReview from './Pages/Dashboard/AddReview/AddReview';
import Pay from './Pages/Dashboard/Pay/Pay';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import ManageAllOrders from './Pages/Dashboard/ManageAllOrders/ManageAllOrders';
import ManageProducts from './Pages/Dashboard/ManageProducts/ManageProducts';
import AddProduct from './Pages/Dashboard/AddProduct/AddProduct';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';

function App() {
  return (
    <AuthProvider>
      <StartFromTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route 
            path="product/:productId" 
            element={<PrivateRoute>
              <ProductDetail />
            </PrivateRoute>} 
          />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="blog/:blogId" element={<BlogDetail />} />
          <Route path="login" element={<Login />} />
          <Route 
            path="contact" 
            element={<PrivateRoute>
              <Contact />
            </PrivateRoute>} 
          />
          <Route path="terms-conditions" element={<Terms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route 
            path="dashboard" 
            element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
          >
            <Route path="home" element={<DashboardHome />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="add-review" element={<AddReview />} />
            <Route path="pay" element={<Pay />} />
            <Route 
              path="manage-all-orders" 
              element={<AdminRoute>
                <ManageAllOrders />
              </AdminRoute>} 
            />
            <Route 
              path="manage-products" 
              element={<AdminRoute>
                <ManageProducts />
              </AdminRoute>} 
            />
            <Route 
              path="add-product" 
              element={<AdminRoute>
                <AddProduct />
              </AdminRoute>} 
            />
            <Route 
              path="make-admin" 
              element={<AdminRoute>
                <MakeAdmin />
              </AdminRoute>} 
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ScrollUpButton
          ShowAtPosition={300}
          AnimationDuration={700}
          ContainerClassName="w-12 h-12 bg-blue-400 bg-opacity-60 text-white text-2xl flex items-center justify-center text-center fixed bottom-5 cursor-pointer duration-500 ease-in-out"
          style={{right: '-120%', opacity: 0, zIndex: 999}}
          ToggledStyle={{right: '20px', opacity: 1}}
        >
          <HiOutlineChevronDoubleUp />
        </ScrollUpButton>
      </div>
    </AuthProvider>
  );
}

export default App;
