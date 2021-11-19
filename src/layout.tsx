import Footer from './components/Footer/footer'
import Navbar from './components/Navbar/navbar'

export default function Layout({ children }:any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}