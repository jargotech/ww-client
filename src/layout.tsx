import Footer from './components/Footer/footer'
import Navbar from './components/Navbar/navbar'
import { useRouter } from 'next/router';


export default function Layout({ children }: any) {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <main className={router.pathname == '/' || router.pathname == '/about-us' ? "site-main" : ""}>{children}</main>
    </>
  )
}