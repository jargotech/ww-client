import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from 'next/app'
import Layout from '../src/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';
import AuthContext from '../src/context/AuthContext';
import React, { useState } from "react";

// const outerTheme = createTheme({
//   typography:{
//     fontFamily: 'SF Compact Display',
//   }
// });

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </ThemeProvider>

  )
}

export default MyApp
