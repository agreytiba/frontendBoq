import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Users from './scenes/user';
import Login from './scenes/login';
import Register from './scenes/register';
import Calendar from './scenes/calendar/calendar';
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
					{user &&<Sidebar isSidebar={isSidebar} />}
					<main className="content">
						<Topbar setIsSidebar={setIsSidebar} />
						<div className={isSidebar ? 'notCollapseItems' : 'collapseItems'}>
							<Routes>
								<Route path="/register" element={<Register />} />
								<Route path="/login" element={<Login />} />

								<Route element={<ProtectedRoutes />}>
									<Route path="/" element={<Dashboard />} />
									<Route path="/home" element={<Home />} />
									<Route path="/users" element={<Users />} />
									<Route path="/mteja" element={<UserPage />} />
									<Route path="/boq" element={<Boq />} />
									<Route path="/mtoahuduma" element={<SellerPage />} />
									<Route path="/bidhaa" element={<Products/>} />
									<Route path="/watoahuduma" element={<ServiceProviders/>} />
									<Route path="/ramani" element={<Maps/>} />
									<Route path="/blog" element={<Blog/>} />
								
									
								</Route>
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
