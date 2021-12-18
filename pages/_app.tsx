import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from 'next/app'
import Layout from '../src/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme';

// const outerTheme = createTheme({
//   typography:{
//     fontFamily: 'SF Compact Display',
//   }
// });
function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ThemeProvider theme={theme}>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    
  )
}

export default MyApp
