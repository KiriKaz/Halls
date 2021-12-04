import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import theme from '../styles/theme';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from '../src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Wander the Halls</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
