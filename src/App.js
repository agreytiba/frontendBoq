import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Users from './scenes/user';
import Login from './scenes/login';
import Register from './scenes/register';
import User from './access level/User';
import Bar from './scenes/bar';
import Doctor from './scenes/doctor';
import Patient from './scenes/patient';
import Form from './scenes/form'
import Appointment from './scenes/appointment';
import Profile from "./scenes/user/profile"
import Calendar from "./scenes/calendar/calendar"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import "./App.css"
function App() {
	const [ theme, colorMode ] = useMode();
	const [ isSidebar, setIsSidebar ] = useState(true);
	// get all  properties from react reduc state
  const { user } = useSelector(
    (state) => state.auth
  )
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				
				<div className="app">
					{(user && user.token) && <Sidebar isSidebar={isSidebar} />}
					<main className="content">
						 <Topbar setIsSidebar={setIsSidebar} />
						<div className={isSidebar ?"notCollapseItems": "collapseItems"}>
							<Routes>
							
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login/>} />
							<Route element={<ProtectedRoutes/>}>
							<Route path="/" element={<Dashboard />} />
							<Route path="/user" element={<User/>} />
							<Route path="/user/profile" element={<Profile/>} />
							<Route path="/users" element={<Users/>} />
							<Route path="/doctors" element={<Doctor />} />
							<Route path="/patients" element={<Patient />} />
							<Route path="/bar" element={<Bar />} />
							<Route path="/todos" element={<Calendar />} />
								<Route path="/appointments" element={<Appointment />} />
							</Route>
						</Routes>
						</div>
					</main>
				</div>
				<ToastContainer/>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
