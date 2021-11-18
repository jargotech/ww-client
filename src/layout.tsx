import Footer from './components/Footer/footer'
import Navbar from './components/Navbar/Navbar'

export default function Layout({ children }:any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}