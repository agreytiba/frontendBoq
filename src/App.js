
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AppMain from './appMain/AppMain';
function App() {
	const [ theme, colorMode ] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				
			<AppMain/>
				<ToastContainer />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
