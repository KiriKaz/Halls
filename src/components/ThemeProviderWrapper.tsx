import { createTheme, responsiveFontSizes, ThemeOptions, ThemeProvider } from "@mui/material";
import { useAppSelector } from "../hooks";

const ThemeProviderWrapper = ({ children }: { children: any }) => {

  // import { deepPurple, amber } from '@mui/material/colors';

  const theming = useAppSelector(state => state.theming);

  const darkmodeTheme: ThemeOptions = {
    palette: {
      mode: 'dark'
    }
  };

  const lightmodeTheme: ThemeOptions = {
    palette: {
      mode: 'light'
    }
  };

  let theme = createTheme(theming.darkmode ? darkmodeTheme : lightmodeTheme);

  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export { ThemeProviderWrapper };