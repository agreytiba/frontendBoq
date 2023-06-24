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
import Appointment from './scenes/appointment';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';


function App() {
	const [ theme, colorMode ] = useMode();
	const [ isSidebar, setIsSidebar ] = useState(true);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					 <Sidebar isSidebar={isSidebar} />
					<main className="content">
						<Topbar setIsSidebar={setIsSidebar} />
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/register" element={<Register/>} />
							<Route path="/user" element={<User/>} />
							<Route path="/users" element={<Users/>} />
							<Route path="/doctors" element={<Doctor />} />
							<Route path="/patients" element={<Patient />} />
							<Route path="/bar" element={<Bar />} />
							<Route path="/appointments" element={<Appointment />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
