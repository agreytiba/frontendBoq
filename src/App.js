import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Users from './scenes/user';
import Login from './scenes/login';
import Register from './scenes/register';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './scenes/home';
import Boq from './scenes/boq';
import UserPage from './scenes/userpage';
import SellerPage from './scenes/seller';
import Products from './scenes/products';
import ServiceProviders from './scenes/serviceProvider';
import Maps from './scenes/map';
import Blog from './scenes/blog';
import Upload from './scenes/upload';
import ForgotPassword from './scenes/forgotpassword';
import SingleBlog from './scenes/blog/SingleBlog';
import AllPdf from './scenes/map/AllPdf';
import TypeChecker from './scenes/map/TypeChecker';
import UnitChecker from './scenes/map/UnitChecker';
import FailedChecker from './scenes/map/FailedChecker';
import MyMaps from './scenes/userpage/MyMaps';
import CreateFoudation from './scenes/boq/CreateFoudation';
import CreateWalling from './scenes/boq/CreateWalling';
import CreateRoufing from './scenes/boq/CreateRoufing';
import CreateBoq from './scenes/boq/CreateBoq';
import Orders from './scenes/order';
import Failed from './scenes/map/Failed';
import Passed from './scenes/map/Passed';

function App() {
	const [ theme, colorMode ] = useMode();
	const [ isSidebar, setIsSidebar ] = useState(true);
	// get all  properties from react reduc state
	const { user } = useSelector((state) => state.auth);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<div className="app">
					{( user?.accessLevel === "admin" && isSidebar) &&<Sidebar />}
					<main className="content">
						<Topbar setIsSidebar={setIsSidebar} />
						<div className={(isSidebar && user?.accessLevel === "admin") ? 'notCollapseItems' : ''}>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/register" element={<Register />} />
								<Route path="/login" element={<Login />} />
                                 <Route path="/forgot" element={<ForgotPassword />} />
                                {(user?.accessLevel === "admin" ) && <Route path="/allpdf" element={<AllPdf/>} />}
								{(user?.accessLevel === "admin" ||  user?.accessLevel ==="user") && <Route path="/mymaps" element={<MyMaps />} />}
	
								{(user?.accessLevel === "admin" ) && <Route path="/maps" element={<Maps/>} />}
								{(user?.accessLevel === "admin" ) && <Route path="/failed" element={<Failed/>} />}
								{(user?.accessLevel === "admin" ) && <Route path="/passed" element={<Passed/>} />}
	
								{/* boq routes */}
                               { (user?.accessLevel === "admin" || user?.accessLevel ==="boq") && <Route path="/createfoundation" element={<CreateFoudation/>} />}
                               { (user?.accessLevel === "admin" || user?.accessLevel ==="boq") && <Route path="/createwalling" element={<CreateWalling/>} />}
                               { (user?.accessLevel === "admin" || user?.accessLevel ==="boq") && <Route path="/createroufing" element={<CreateRoufing/>} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "boq") && <Route path="/createboq" element={<CreateBoq setIsSidebar={setIsSidebar} />} />}
								   
								{user?.accessLevel === "admin" && <Route path="/users" element={<Users />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "user") && <Route path="/upload" element={<Upload />} />} 
									{/* {(user?.accessLevel === "admin" || user?.accessLevel ==="user") &&<Route path="mteja/myboq" element={<MyBoq />} />} */}
								
								{/* blog routes */}
								{(user?.accessLevel === "admin") && <Route path="/blog" element={<Blog />} />}
								{(user?.accessLevel === "admin" ) && <Route path="/blog/:id" element={<SingleBlog />} />}
									
								{/* order */}
                                	{(user?.accessLevel === "admin"|| user?.accessLevel === "user" ) && <Route path="/orders" element={<Orders/>} />}
								{/*=== USER PAGES ==== */}
								{/* admin user */}
								{(user?.accessLevel === "admin") &&	<Route path="/dashboard" element={<Dashboard />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "user") && <Route path="/mteja" element={<UserPage />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "seller") && <Route path="/mtoahuduma" element={<SellerPage />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel ==="boq") &&<Route path="/boq" element={<Boq />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "pricetag") && <Route path="/bidhaa" element={<Products />} />}
								{(user?.accessLevel === "admin") && <Route path="/watoahuduma" element={<ServiceProviders />} />}
								{(user?.accessLevel === "admin" || user?.accessLevel ==="checker") &&<Route path="/ramani" element={<Maps/>} />}
								{(user?.accessLevel === "admin" || user?.accessLevel === "typechecker") && <Route path="/pangaramani" element={<TypeChecker />} />} 
								{(user?.accessLevel === "admin" || user?.accessLevel === "unitchecker") && <Route path="/vipimo" element={<UnitChecker />} />} 
								{(user?.accessLevel === "admin" || user?.accessLevel === "failedchecker") && <Route path="/suggestion" element={<FailedChecker />} />} 
									
								
							</Routes>
						</div>
					</main>
				</div>
				<ToastContainer />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
