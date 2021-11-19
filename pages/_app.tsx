import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const outerTheme = createTheme({
  typography:{
    fontFamily: 'SF Compact Display',
  }
});
function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ThemeProvider theme={outerTheme}>
      <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
    
  )
}

export default MyApp
