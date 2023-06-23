import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import User from './scenes/user';
import Bar from './scenes/bar';
import Doctor from './scenes/doctor';
import Patient from './scenes/patient';
import Appointment from './scenes/appointment';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';

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
							<Route path="/" element={<Dashboard />} />
							<Route path="/users" element={<User/>} />
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
