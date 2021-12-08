import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { store } from '../store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';

import { ThemeProviderWrapper } from '../components/ThemeProviderWrapper';

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
          <CssBaseline />
        </SnackbarProvider>
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default MyApp;
