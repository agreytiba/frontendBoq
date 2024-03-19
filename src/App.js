import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppMain from "./appMain/AppMain";
import { AppContextProvider } from "./useContextApi/AppContext";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <CssBaseline />
          <AppMain />
          <ToastContainer />
        </AppContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
