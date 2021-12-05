import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { Theme, ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from '../store';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useAppSelector } from '../hooks';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ThemeProviderWrapper = ({ children }: { children: any }) => {

  // import { deepPurple, amber } from '@mui/material/colors';

  const theming = useAppSelector(state => state.theming);

  let theme = createTheme({
    palette: {
      mode: theming.darkmode ? 'dark' : 'light'
      // primary: deepPurple,
      // secondary: amber
    }
  });

  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <SnackbarProvider>
          <Head>
            <title>Wander the Halls</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default MyApp;
